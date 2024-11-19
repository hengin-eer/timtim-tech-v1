---
layout: "@layoutBlog"
cover: "./hello-01.jpg"
title: テスト記事をこれから書こうとも思ったり思わなかったりするけれど、とりあえず書いてみた、っていう内容が詰め込まれている記事
author: timdaik
updatedAt: 2024-11-20
tag: ["ポエム", "日常"]
---
## Hello World!
こちらはテスト記事です。
これからどんどんブログ記事を追加していくので、お楽しみに！！

### いろいろ試してみる
行けるかな？

- 鶏
- 豚
- 牛

1. 一富士
2. 二鷹
3. 三茄子

効いてる→ [Google](https://google.co.jp)はこちら！

効いていない→ google.co.jp はこちら！

| title | description |
|---|---|
|ズワイガニ|ちゃんと蟹の仲間なので足が10本ある|
|タラバガニ|ヤドカリの仲間なので足が8本しかない|

> 👆 たしか合っていたよね...?

![](./tim-bird.png)
メインアイコンのハクセキレイちゃん

![text](./hello-01.jpg)

これは去年くらいの写真。

👇 初期のブログレイアウトのソースコード

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