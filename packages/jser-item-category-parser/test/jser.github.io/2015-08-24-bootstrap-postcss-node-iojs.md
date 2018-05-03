---
title: "2015-08-24のJS: Bootstrap 4α、PostCSS 5.0、Node.jsとio.js"
author: azu
layout: post
date : 2015-08-24T22:00
category: JSer
tags:
    - CSS
    - bootstrap
    - Node.js
    - io.js
    - community

---

JSer.info #242 - CSSフレームワークであるBootstrap 4 alphaがリリースされました。

- [Bootstrap 4 alpha · Bootstrap Blog](http://blog.getbootstrap.com/2015/08/19/bootstrap-4-alpha/ "Bootstrap 4 alpha · Bootstrap Blog")

メジャーアップデートとなる4のα版ですが、 Bootstrap本体の言語がLessからSassへ移行しています。

IE8のサポートを終了し、単位として`rem`を利用するようになり、flexboxをオプションで利用できるようになっています。
wellsやthumbnails、panelsのコンポーネントは廃止してcardsに統合していくようです。

またプラグインがES6で書きなおされUMDモジュールとして提供されるようになり、ノーマライズスタイルを[Reboot](http://v4-alpha.getbootstrap.com/content/reboot/ "Reboot")にまとめるなど色々な変更が含まれています。

同時に[Bootstrap Themes](http://themes.getbootstrap.com/ "Bootstrap Themes")というBootstrapのテーマを扱う公式サイトも公開されています。

----

CSSを扱うツールの基盤となる[PostCSS 5.0](https://github.com/postcss/postcss/releases/tag/5.0.0 "PostCSS 5.0")がリリースされました。

パース部分もオプショナル化し[SCSS parser](https://github.com/postcss/postcss-scss "SCSS parser")を使うことでCSSだけではなくSCSSもパース出来るようになっています。

PostCSSについては[PostCSS とは何か // Speaker Deck](https://speakerdeck.com/jmblog/postcss-tohahe-ka "PostCSS とは何か // Speaker Deck")というスライドによくまとまっているので、CSS周りのツールに興味がある人は見てみるといいと思います。

----

[どうしてこうなった？ Node.jsとio.jsの分裂と統合の行方。これからどう進化していくのか？ // Speaker Deck](https://speakerdeck.com/yosuke_furukawa/dousitekounatuta-node-dot-jstoio-dot-jsfalsefen-lie-totong-he-falsexing-fang-korekaradoujin-hua-siteikufalseka "どうしてこうなった？ Node.jsとio.jsの分裂と統合の行方。これからどう進化していくのか？ // Speaker Deck")というスライドでは、Node.jsの歴史、io.jsがなぜできたのか、コミュニティと開発体制、Node.js v4.0での統合に向けてなど、Node.jsプロジェクトで起きていた騒動についてまとめられています。

- [YAPC::ASIA 2015で「どうしてこうなった？ Node.jsとio.jsの分裂と統合の行方。これからどう進化していくのか？」というタイトルで発表してきた。 - from scratch](http://yosuke-furukawa.hatenablog.com/entry/2015/08/24/152147 "YAPC::ASIA 2015で「どうしてこうなった？ Node.jsとio.jsの分裂と統合の行方。これからどう進化していくのか？」というタイトルで発表してきた。 - from scratch")

また、[4.0 is the new 1.0 — Node & JavaScript — Medium](https://medium.com/node-js-javascript/4-0-is-the-new-1-0-386597a3436d "4.0 is the new 1.0 — Node & JavaScript — Medium")という記事でNode.jsとio.jsの統合のスケジュールなどについて書かれているので見てみるといいと思います。

----
<h1 class="site-genre">ヘッドライン</h1>

----

## Bootstrap 4 alpha · Bootstrap Blog
[blog.getbootstrap.com/2015/08/19/bootstrap-4-alpha/](http://blog.getbootstrap.com/2015/08/19/bootstrap-4-alpha/ "Bootstrap 4 alpha · Bootstrap Blog")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">CSS</span> <span class="jser-tag">library</span> <span class="jser-tag">ReleaseNote</span></p>

Bootstrap 4αリリース。
LessからSassへの移行、IE8のサポートを終了し`rem`を利用するように、flexboxをオプションで利用できるように、プラグインをES6で書きなおし、リセットスタイルをRebootにまとめるなど

- [Bootstrap 4 alpha · Bootstrap Blog](http://blog.getbootstrap.com/2015/08/19/bootstrap-4-alpha/ "Bootstrap 4 alpha · Bootstrap Blog")

----

## Release 5.0 “President Valac” · postcss/postcss
[github.com/postcss/postcss/releases/tag/5.0.0](https://github.com/postcss/postcss/releases/tag/5.0.0 "Release 5.0 “President Valac” · postcss/postcss")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">CSS</span> <span class="jser-tag">library</span> <span class="jser-tag">ReleaseNote</span></p>

CSSの変換を扱うPostCSS 5.0リリース。
`safe`オプションが別プロジェクトへ、
`parser`や`stringifier`などもオプション化、
SCSSのパースにも対応するなど

----

## Release RxJS Version 3.1 · Reactive-Extensions/RxJS
[github.com/Reactive-Extensions/RxJS/releases/tag/v3.1.0](https://github.com/Reactive-Extensions/RxJS/releases/tag/v3.1.0 "Release RxJS Version 3.1 · Reactive-Extensions/RxJS")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">Rx</span> <span class="jser-tag">JavaScript</span> <span class="jser-tag">library</span> <span class="jser-tag">Electron</span></p>

RxJS 3.1 リリース。
`resultSelector`がオプショナルに、TypeScript定義ファイルが書き直されるなど

----

## Release 1.1.0 - 2015.08.17 · zloirock/core-js
[github.com/zloirock/core-js/releases/tag/v1.1.0](https://github.com/zloirock/core-js/releases/tag/v1.1.0 "Release 1.1.0 - 2015.08.17 · zloirock/core-js")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">JavaScript</span> <span class="jser-tag">library</span> <span class="jser-tag">ReleaseNote</span></p>

core-js 1.1.0 リリース。
string paddingのプロポーサルへの追従、trimLeft/trimRightの追加、Reflect.enumerateはキャッシュされたkeyをiterateするようになるなど

- [Question about \[\[Enumerate\]\] and property decision timing](https://esdiscuss.org/topic/question-about-enumerate-and-property-decision-timing "Question about [[Enumerate]] and property decision timing")

----

## ESLint 1.2.0 released - ESLint - Pluggable JavaScript linter
[eslint.org/blog/2015/08/eslint-1.2.0-released/](http://eslint.org/blog/2015/08/eslint-1.2.0-released/ "ESLint 1.2.0 released - ESLint - Pluggable JavaScript linter")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">JavaScript</span> <span class="jser-tag">Tools</span> <span class="jser-tag">ReleaseNote</span></p>

ESLint 1.2.0リリース。
文字列結合にTemplate Stringsを使うようにするルール、コールバックにArrow Functionを優先するルールなどの追加、`commonjs`のenvironment定義が追加された

----
<h1 class="site-genre">アーティクル</h1>

----

## はてなブックマーク検索を作りながらFlux Utilsについて学ぶ | Web Scratch
[efcl.info/2015/08/24/flux-utils/](http://efcl.info/2015/08/24/flux-utils/ "はてなブックマーク検索を作りながらFlux Utilsについて学ぶ | Web Scratch")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">JavaScript</span> <span class="jser-tag">Flux</span> <span class="jser-tag">React</span> <span class="jser-tag">tutorial</span></p>

Flux UtilsとReactを使ってアプリを作りながら、Flux Utilsについて学ぶチュートリアル。
StoreのstateがImmutableであったり、Containerなどの動作について

----

## JavaScript の イテレータ を極める！ - Qiita
[qiita.com/kura07/items/cf168a7ea20e8c2554c6](http://qiita.com/kura07/items/cf168a7ea20e8c2554c6 "JavaScript の イテレータ を極める！ - Qiita")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">JavaScript</span> <span class="jser-tag">ECMAScript</span></p>

Iterator、Iterable、Generatorについてそれぞれが何か、どのように使うかについて書かれている

----

## Proper testing of Angular JS applications with ES6 modules — Medium
[medium.com/@tomastrajan/proper-testing-of-angular-js-applications-with-es6-modules-8cf31113873f](https://medium.com/@tomastrajan/proper-testing-of-angular-js-applications-with-es6-modules-8cf31113873f "Proper testing of Angular JS applications with ES6 modules — Medium")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">JavaScript</span> <span class="jser-tag">AngularJS</span> <span class="jser-tag">testing</span> <span class="jser-tag">library</span></p>

ES6 modulesとAngularJS。
ES6 modulesとして読み込みテストできるようにするためには、どのようにコードを書くかという話

----

## reactjs - ES6版React.jsチュートリアル - Qiita
[qiita.com/nownabe/items/2d8b92d95186c3941de0](http://qiita.com/nownabe/items/2d8b92d95186c3941de0 "reactjs - ES6版React.jsチュートリアル - Qiita")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">React</span> <span class="jser-tag">ECMAScript</span> <span class="jser-tag">tutorial</span></p>

ReactのチュートリアルをES6 Classesなどを使って書いた場合にどうなるかについてをチュートリアル形式で書かれている。

- [チュートリアル | React](http://facebook.github.io/react/docs/tutorial-ja-JP.html "チュートリアル | React")

----

## Vue.js Tutorial - Vegibit
[vegibit.com/vue-js-tutorial/](http://vegibit.com/vue-js-tutorial/ "Vue.js Tutorial - Vegibit")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">JavaScript</span> <span class="jser-tag">library</span> <span class="jser-tag">tutorial</span></p>

Vue.jsについてのチュートリアル。
基本的な使い方、Vue.jsのEvent、Filter、Componentsなどについて

----

## Windows 10 virtual machines now available on Microsoft Edge Dev | Microsoft Edge Dev Blog
[blogs.windows.com/msedgedev/2015/08/17/windows-10-virtual-machines-now-available-on-microsoft-edge-dev/](http://blogs.windows.com/msedgedev/2015/08/17/windows-10-virtual-machines-now-available-on-microsoft-edge-dev/ "Windows 10 virtual machines now available on Microsoft Edge Dev | Microsoft Edge Dev Blog")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">MS</span> <span class="jser-tag">MSEdge</span> <span class="jser-tag">仮想化</span></p>

MSEdgeが使えるWindows 10のVirtual Machine(VM)が公開された

----
<h1 class="site-genre">スライド、動画関係</h1>

----

## PostCSS とは何か // Speaker Deck
[speakerdeck.com/jmblog/postcss-tohahe-ka](https://speakerdeck.com/jmblog/postcss-tohahe-ka "PostCSS とは何か // Speaker Deck")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">CSS</span> <span class="jser-tag">Tools</span> <span class="jser-tag">スライド</span></p>

PostCSSについてのスライド。
PostCSSを使った変換の仕組み、それぞれのプラグインが単機能であるので組み合わせて利用できる。
csssnext、PreCSS、cssnanoなどのプラグインパックについて。
またSassの代わりに利用することについて

----

## どうしてこうなった？ Node.jsとio.jsの分裂と統合の行方。これからどう進化していくのか？ // Speaker Deck
[speakerdeck.com/yosuke\_furukawa/dousitekounatuta-node-dot-jstoio-dot-jsfalsefen-lie-totong-he-falsexing-fang-korekaradoujin-hua-siteikufalseka](https://speakerdeck.com/yosuke_furukawa/dousitekounatuta-node-dot-jstoio-dot-jsfalsefen-lie-totong-he-falsexing-fang-korekaradoujin-hua-siteikufalseka "どうしてこうなった？ Node.jsとio.jsの分裂と統合の行方。これからどう進化していくのか？ // Speaker Deck")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">node.js</span> <span class="jser-tag">歴史</span></p>

Node.jsの歴史、io.jsがでてきた経緯、そしてNode.jsとio.jsが統合された経緯について。
またコミュニティにおけるオープンガバナンスモデルについて

----

## Effective ES6
[www.slideshare.net/teppeis/effective-es6](http://www.slideshare.net/teppeis/effective-es6 "Effective ES6")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">ECMAScript</span> <span class="jser-tag">スライド</span></p>

ES6について幅広く紹介してるスライド。
ES5以下でのベストプラクティスがES6の機能や構文で解決できることやES6で新しく入った機能について書かれている。

----

## Ginza.rb で Quipper のシングルページアプリケーション開発について発表しました - @kyanny&#x27;s blog
[blog.kyanny.me/entry/2015/08/20/014509](http://blog.kyanny.me/entry/2015/08/20/014509 "Ginza.rb で Quipper のシングルページアプリケーション開発について発表しました - @kyanny's blog")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">JavaScript</span> <span class="jser-tag">スライド</span> <span class="jser-tag">backbone.js</span></p>

Backbone.js/Chaplin/Marionette/React それぞれのシングルページアプリケーション開発における利点や問題点についてのスライド。
Railsとの共存についてなど

----

## Functional programming in JavaScript - YouTube
[www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84](https://www.youtube.com/playlist?list=PL0zVEGEvSaeEd9hlmCXrk5yUyqUag-n84 "Functional programming in JavaScript - YouTube")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">JavaScript</span> <span class="jser-tag">関数型プログラミング</span> <span class="jser-tag">動画</span></p>

関数型JavaScriptについてのスクリーンキャスト

----
<h1 class="site-genre">サイト、サービス、ドキュメント</h1>

----

## Dev Tips - Developer Tips by Umar Hansa
[umaar.com/dev-tips/](https://umaar.com/dev-tips/ "Dev Tips - Developer Tips by Umar Hansa")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">Chrome</span> <span class="jser-tag">debug</span> <span class="jser-tag">Tips</span></p>

Chrome開発者ツールのTips集

----
<h1 class="site-genre">ソフトウェア、ツール、ライブラリ関係</h1>

----

## Falcor: One Model Everywhere
[netflix.github.io/falcor/](http://netflix.github.io/falcor/ "Falcor: One Model Everywhere")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">JavaScript</span> <span class="jser-tag">library</span></p>

Netflixのモデル + data fetchライブラリ。
JSON Graphでデータを一つのドメインモデルとして表現して、そのモデルを元にサーバはルーティング、クライアントはデータの取得を行える。
またクライアントではキャッシュの設定が行える

- [The Netflix Tech Blog: Netflix Releases Falcor Developer Preview](http://techblog.netflix.com/2015/08/falcor-developer-preview.html "The Netflix Tech Blog: Netflix Releases Falcor Developer Preview")
- [▶ Netflix JavaScript Talks - Falcor - YouTube](https://www.youtube.com/watch?v=z8UgDZ4rXBU "▶ Netflix JavaScript Talks - Falcor - YouTube")

----

## stylelint
[stylelint.io/](http://stylelint.io/ "stylelint")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">CSS</span> <span class="jser-tag">Tools</span></p>

CSSのLintツール。
PostCSSのプラグインとしても利用できる。

----
<h1 class="site-genre">書籍関係</h1>

----

## JavaScript Domain-Driven Design | PACKT Books
[www.packtpub.com/web-development/javascript-domain-driven-design](https://www.packtpub.com/web-development/javascript-domain-driven-design "JavaScript Domain-Driven Design | PACKT Books")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">JavaScript</span> <span class="jser-tag">book</span></p>

JavaScriptでのDDDについての書籍

----

## Beautiful JavaScript — Medium
[medium.com/@valueof/beautiful-javascript-8aa69998add0](https://medium.com/@valueof/beautiful-javascript-8aa69998add0 "Beautiful JavaScript — Medium")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">JavaScript</span> <span class="jser-tag">book</span></p>

Beautiful JavaScript リリース。

- [Beautiful JavaScript - O&#x27;Reilly Media](http://shop.oreilly.com/product/0636920030706.do "Beautiful JavaScript - O'Reilly Media")

----

## Amazon: AngularJS　アプリケーションプログラミング: 山田 祥寛
[www.amazon.co.jp/dp/4774175684](http://www.amazon.co.jp/dp/4774175684 "Amazon: AngularJS　アプリケーションプログラミング: 山田 祥寛")

<p class="jser-tags jser-tag-icon"><span class="jser-tag">AngularJS</span> <span class="jser-tag">book</span></p>

AngularJSについての書籍

----
