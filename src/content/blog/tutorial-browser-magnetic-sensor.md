---
cover: "./tutorial-browser-magnetic-sensor-cover.png"
title: "いつ使うのか⁉ブラウザの磁気センサーでコンパス作ってみた"
author: timdaik
updatedAt: "2023-10-19"
tag: ["Tech"]
---
## ブラウザーの磁気センサーご存じですか？
どうも[@timtim_tech](https://x.com/timtim_tech)です
今回は諸事情によりブラウザーの磁気センサーに入門したので軽～くまとめます
メモ感覚なのでさらさらと読み流してくださいね
## 磁気センサーってなんぞや
磁気センサーって聞いてもピンとこない方もいると思います（かくいう私も）
簡単に説明すると、スマホが移動する度に地球の磁場（方角）を取得を取得するみたいな感じです
基本的にスマホにしか搭載されていないので、PCでは使えなさそうです
今回は友達の研究発表を手伝うために簡易コンパスを作ってみたかったので、この磁気センサーとやらを触ってみました
こいつは基本的に地球の磁場を基準としてx, y, z軸の角度を取得できるのでコンパスを作れます
スマホの動きに合わせて要素をアニメーションさせるウェブサイトとかも作れそうです（やってみたい）
他には何が作れるんでしょうかね...基本コンパス以外に使用用途はあるのだろうか？？
## ほな使ってみよか
とりあえず簡単なコンパス作りました スマホからアクセスしてみて下さい！

[Orientation Sample](https://hengin-eer.github.io/orientation-sample/)

さて、磁気センサーの情報がネット上に少なかったことがこの記事執筆のモチベにもなっているので、とにかく実装について書いていきます
お粗末ではありますが、レポジトリも作成したので参考になれば幸いです

[hengin\-eer/orientation\-sample: ブラウザーの磁気センサーを利用したサンプルサイト（コンパスできたよ！航海するとき使ってみてね！）](https://github.com/hengin-eer/orientation-sample)

> ⚠️注意: 今回使用する`deviceorientation`イベントはssh接続されていないと使用できないので __基本的には__ ローカル環境では動作確認できません。ssh接続するには以下の記事を参考にしてみて下さい
（ぶっちゃけ手間がかかりますし、GitHubを使って開発してGitHub Pagesでプレビュー確認、という手法をとれば、ぶっちゃけローカルで確認しないでも良いかな？って感じです。ローカルで確認したい方は頑張ってください。マジで大変でした by 友人）

[mkcertとhttp\-serverでHTTPS環境を作りAndroid\(chrome\)、iPhone\(safari\)から接続 – One IT Thing](https://one-it-thing.com/6514/)

とりあえず以下のようなHTMLを書いていきます
画像を読み込んでいるので、私のGitHubに上がっている画像、又は任意のものを準備してくださいね

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Orientation Sample</title>
</head>

<style>
    body {
        font-family: sans-serif;
        text-align: center;
    }

    h1 {
        font-size: 1.5em;
    }

    #compass {
        width: 200px;
        height: 200px;
        margin: 50px auto;
        display: block;
    }
</style>

<body>
    <h1>Orientation Sample</h1>
    <p>Direction: <span id="direction"></span></p>
    <p>Device Orientation: <span id="orientation"></span></p>

    <img id="compass" src="./assets/compass.svg" alt="compass">

    <p>Androidのみ動作確認済み</p>

    <script src="./index.js"></script>
    <script>

    </script>
</body>

</html>
```

クローンつくるならここら辺はコピペしちゃってください
次に磁気センサーを取ってくるJavaScriptをちょちょいと書いていきます

```javascript
const orientationItem = document.querySelector("#orientation");
const direction = document.querySelector("#direction");
const compass = document.querySelector("#compass");

let alpha = 0;
let beta = 0;
let gamma = 0;

function handleOrientation(event) {
    event.absolute = true;
    alpha = parseInt(event.alpha);
    beta = parseInt(event.beta);
    gamma = parseInt(event.gamma);

    orientationItem.innerHTML = `Alpha: ${alpha}, Beta: ${beta}, Gamma: ${gamma}`;

    if (alpha > 45 && alpha <= 135) direction.innerHTML = "East";
    else if (alpha > 135 && alpha <= 225) direction.innerHTML = "South";
    else if (alpha > 225 && alpha <= 315) direction.innerHTML = "West";
    else direction.innerHTML = "North";

    compass.style.transform = `rotate(${alpha}deg)`;
}

window.addEventListener("deviceorientationabsolute", handleOrientation);
```

とりあえず大事なところだけ解説します
## ちょい解説
まずJavaScriptの最後のコードにて一般的な`deviceorientation`を使用せず`deviceorientationabsolute`を指定しているのですが、これは地球の絶対的な方角を取得するためです
というのも一般的に磁気センサーで取得した値は、APIで方角取得時のスマホの向きを基準にしているため正確な値ではないそう
他にも地域によって磁場補正を考えたり...いろいろ大変
そしてこのイベントはAndroid版なので、Iphone版では`webkitCompassHeading`イベントを使えば良いそう

__特に理由が無ければ`deviceorientationabsolute`又は`webkitCompassHeading`を使えばいい__

次にHTMLの要素にいくつかidを振っています
JSにてそれぞれDOMを取得しています
- `direction`は3軸の方角情報を代入する要素
- `orientation`は方角を代入する要素
- `compass`はコンパスの画像

`handleOrientation`関数では`deviceorientationabsolute`で取得した`event`の方角を3軸の方角`alpha`, `beta`, `gamma`にそれぞれ代入しています
このとき`event.alpha`らを`parseInt`で囲っているのは整数化するためです（小泉構文
）そうしないと、めちゃくちゃ長い小数を吐き出すからです。小数点の切り捨てはお好みでどうぞ
そしてそれらを`orientation`idの中身に代入しています

各軸方角取得の下の処理では`alpha`軸方向の方角を取得して、`compass`が回転するように指定します
`alpha`軸は水平面に平行なので、この子を使えばコンパスが作れます
## 参考
- [端末の方向の検出 \- Web API \| MDN](https://developer.mozilla.org/ja/docs/Web/API/Device_orientation_events/Detecting_device_orientation)
- [Window: deviceorientationabsolute event \- Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientationabsolute_event)
- [DeviceOrientation Event Specification （日本語訳）](https://triple-underscore.github.io/deviceorientation-ja.html)
- [Javascriptでコンパスを作ってAndroid、iPhoneが向いている方角を特定 – One IT Thing](https://one-it-thing.com/6555/)
## このままいけば完成
完成したら友達に「見てや見てや～！方位磁針作ったで～😁」と自慢しながら一緒に回転してみて下さい
大航海時代に思いを馳せることができて意外と楽しいですよ

Androidのスマホに純正の方位磁針アプリが無かったので今回方位磁針を簡単に作ってみましたが精度がボチボチなので、暇があれば磁場補正もやってみようかな
それでは👋
