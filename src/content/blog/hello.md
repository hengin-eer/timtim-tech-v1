---
cover: "./hello-01.jpg"
title: "テスト記事をこれから書こうとも思ったり思わなかったりするけれど、とりあえず書いてみた、っていう内容が詰め込まれている記事"
author: timdaik
updatedAt: "2024-11-20"
tag: ["ポエム", "日常"]
---
# はじめに
こちらはテスト記事です。

こちらはテスト記事です。こちらはテスト記事です。こちらはテスト記事です。

こちらはテスト記事です。こちらはテスト記事です。こちらはテスト記事です。こちらはテスト記事です。こちらはテスト記事です。こちらはテスト記事です。

## Hello World!
「Hello, World!」
こちらはテスト記事です。
これからどんどんブログ記事を追加していくので、お楽しみに！！

## いろいろ試してみる
行けるかな？

### 基本

- 鶏
  - 比内地鶏
  - シャモ
  - 一般
- 豚
  - あぐー豚
  - イベリコ豚
- 牛
  - 近江牛
  - 飛騨牛
  - タスマニアビーフ

1. 一富士
   1. ふじさん
2. 二鷹
   1. たかさん
3. 三茄子
   1. なすび

効いてる→ [Google](https://google.co.jp)はこちら！

効いていない→ google.co.jp はこちら！

| title | description |
|---|---|
|ズワイガニ|ちゃんと蟹の仲間なので足が10本ある。ちゃんと蟹の仲間なので足が10本ある。ちゃんと蟹の仲間なので足が10本ある。|
|タラバガニ|ヤドカリの仲間なので足が8本しかない。ヤドカリの仲間なので足が8本しかない。ヤドカリの仲間なので足が8本しかない。|

> 👆 たしか合っていたよね...?
> 
> そうだよね、そうだったよね？
> 
> ...な～ら～ば～！！

### 画像、ソースコード

![](./tim-bird.png)

メインアイコンのハクセキレイちゃん

![text](./hello-01.jpg)

これは去年くらいの写真。

👇 初期のブログレイアウトのソースコード。ファイル名とかコピー機能とか追加していきたいね～

```astro
---
import type { MarkdownLayoutProps } from "astro";
import Layout from "./Layout.astro";

type Props = MarkdownLayoutProps<{
    title: string;
    author: string
    updatedAt: string;
    tag: string[];
}>

const { frontmatter: blog } = Astro.props
---

<Layout title={`${blog} | timtim.tech`}>
    <div class="header">
        <h1>{blog.title}</h1>
        <p>{blog.author}</p>
        <p>{blog.updatedAt}</p>
        <ul>
            {blog.tag.map((tag) => (
                <li>{tag}</li>
            ))}
        </ul>
    </div>
    <div class="contents">
        <slot />
    </div>
</Layout>
```
