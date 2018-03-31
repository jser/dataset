// MIT © 2017 azu
"use strict";
const fs = require("fs");
const path = require("path");
const { parse } = require("../src/");
const assert = require("assert");
describe("parse", () => {
    context("fixtures-post", () => {
        const fixtureContent = fs.readFileSync(
            path.join(__dirname, "fixtures", "2017-01-04-postcss-chrome-fusebox.md"),
            "utf-8"
        );
        it("should return array", () => {
            const results = parse(fixtureContent);
            assert(Array.isArray(results));
        });
        it("should have {url, category}", () => {
            const results = parse(fixtureContent);
            const [result] = results;
            assert.equal(typeof result.url, "string");
            assert.equal(typeof result.category, "string");
        });
        it("actual results one", () => {
            const results = parse(fixtureContent);
            assert.deepEqual(results, [
                {
                    category: "Headline",
                    title: "StealJS 1.0 Release",
                    url: "https://www.bitovi.com/blog/stealjs-1.0-release",
                    tags: ["JavaScript", "Tools", "library", "ReleaseNote"],
                    content:
                        "開発時は動的なモジュールローダで、本番時はsteal-toolsでのproduction buildでbundleできるStealJS 1.0リリース",
                    relatedLinks: [
                        { title: "Easy ES6 with StealJS - YouTube", url: "https://www.youtube.com/watch?v=VKydmxRm6w8" }
                    ]
                },
                {
                    category: "Article",
                    title: "Optimizing Page Speeds With Lazyloading | Jscrambler Blog",
                    url: "https://blog.jscrambler.com/optimizing-page-speeds-with-lazyloading/",
                    tags: ["AngularJS"],
                    content: "AngularのルーティングとコンポーネントのLazyLoadについて",
                    relatedLinks: []
                },
                {
                    category: "Article",
                    title: "Lazy Loading - React",
                    url: "https://webpack.js.org/guides/lazy-load-react/",
                    tags: ["webpack", "React"],
                    content: "webpack2を使ったReactコンポーネントのLazyLoad方法についてのドキュメント",
                    relatedLinks: []
                },
                {
                    category: "Article",
                    title: "FlowtypeでFluxアーキテクチャに型付けをするという発表をした - Please Drive Faster",
                    url: "http://joe-re.hatenablog.com/entry/2016/12/29/204917",
                    tags: ["flowtype", "Flux"],
                    content: "FlowTypeを使ってFluxアーキテクチャのパターンに型を付ける話",
                    relatedLinks: [
                        {
                            title: "flowtypeによりFluxにおいて型安全を手に入れる - Qiita",
                            url: "http://qiita.com/joe-re/items/d6fd262a8c6017f41e22"
                        }
                    ]
                },
                {
                    category: "Article",
                    title: "Node.js Interview Questions and Answers (2017 Edition) | @RisingStack",
                    url: "http://blog.risingstack.com/node-js-interview-questions-and-answers-2017/",
                    tags: ["node.js", "security"],
                    content:
                        "Node.jsにおいて良くある質問とその答えについてをQ&A形式で書かれたもの。\nコーディングスタイル、よくある書き間違い、セキュリティ、タイミング攻撃などについて",
                    relatedLinks: []
                },
                {
                    category: "Article",
                    title: "React Interview Questions",
                    url: "https://tylermcginnis.com/react-interview-questions/",
                    tags: ["React", "JavaScript"],
                    content:
                        "Reactについての疑問をQ&A形式で書かれた記事。\nClassで書くコンポーネントと関数として書くコンポーネントの違い、`refs`とは何か、`key`属性はなぜ大事なのか、コンポーネントパターンなど",
                    relatedLinks: []
                },
                {
                    category: "Article",
                    title: "Writing HTML with accessibility in mind – Medium",
                    url: "https://medium.com/@matuzo/writing-html-with-accessibility-in-mind-a62026493412",
                    tags: ["HTML", "accessibility"],
                    content:
                        "HTMLとアクセシビリティ(スクリーンリーダー)について\n`lang`属性、`alt`属性、`<buton>`要素、landmarksについて",
                    relatedLinks: []
                },
                {
                    category: "Article",
                    title: "PostCSS まとめ - Qiita",
                    url: "http://qiita.com/morishitter/items/4a04eb144abf49f41d7d",
                    tags: ["PostCSS"],
                    content: "PostCSSの概要と特徴、作られたモチベーションについて",
                    relatedLinks: []
                },
                {
                    category: "Article",
                    title: "Front-End Performance Checklist 2017 (PDF, Apple Pages) – Smashing Magazine",
                    url: "https://www.smashingmagazine.com/2016/12/front-end-performance-checklist-2017-pdf-pages/",
                    tags: ["performance", "browser"],
                    content:
                        "ウェブフロントエンドのパフォーマンスチェックリスト。\nファイルサイズ、配信方法、レンダリング、モニタリング、テスト方法などについて",
                    relatedLinks: []
                },
                {
                    category: "Article",
                    title: "The Reflect API of ES6 – Zsolt Nagy",
                    url: "http://www.zsoltnagy.eu/the-reflect-api-of-es6/",
                    tags: ["JavaScript", "ECMAScript"],
                    content: "Reflect APIについての紹介記事",
                    relatedLinks: []
                },
                {
                    category: "Article",
                    title: "MozAnime in 2016 | Nothing new",
                    url: "https://birtles.wordpress.com/2016/12/27/mozanime-in-2016/",
                    tags: ["firefox", "animation"],
                    content: "2016年におけるFirefoxのWeb Animations対応やデバッグ機能の更新点について",
                    relatedLinks: []
                },
                {
                    category: "SlideVideo",
                    title: "Optimise your web development workflow 2016",
                    url: "https://umaar.github.io/devtools-optimise-your-web-development-workflow-2016/",
                    tags: ["Chrome", "CSS", "debug", "slide", "accessibility"],
                    content:
                        "Chromeの開発者ツールについてのスライド。\n主にCSS、アクセシビリティ、パフォーマンスについて豊富なGIFアニメーションと共に紹介している。",
                    relatedLinks: []
                },
                {
                    category: "SoftwareLibrary",
                    title: "Fuse-Box bundler / API Reference",
                    url: "http://fuse-box.org/",
                    tags: ["JavaScript", "Tools"],
                    content:
                        "webpack/Browserifyのようなbundler、JSPM/SystemJSのようなloaderを機能を持つツール。\n変換結果の依存関係とキャッシュをすることで高速な変換ができる。\nプラグインで対応する変換を拡張できる",
                    relatedLinks: [
                        {
                            title: "FuseBox — bundle your project within a fraction of a second",
                            url:
                                "https://medium.com/@ivanorlov/fusebox-bundle-your-project-within-a-fraction-of-a-second-f2360ba95727"
                        }
                    ]
                },
                {
                    category: "SoftwareLibrary",
                    title: "Gothdo/range: A JavaScript implementation of the Python&#x27;s range() function.",
                    url: "https://github.com/Gothdo/range",
                    tags: ["JavaScript", "library"],
                    content: "Pythonの`range()`のJavaScript実装ライブラリ",
                    relatedLinks: []
                },
                {
                    category: "SoftwareLibrary",
                    title: "andywer/leakage: 🐛 Memory leak testing for node.",
                    url: "https://github.com/andywer/leakage",
                    tags: ["JavaScript", "node.js", "test", "libn"],
                    content: "Node.jsでメモリリークのテストを書くことができるライブラリ。",
                    relatedLinks: []
                },
                {
                    category: "SoftwareLibrary",
                    title:
                        "nolanlawson/marky: High-resolution JavaScript timer based on performance.mark() and measure()",
                    url: "https://github.com/nolanlawson/marky",
                    tags: ["JavaScript", "performance", "libn"],
                    content: "User Timing API(`performance.mark`と`performance.measure`)ベースの処理時間計測ライブラリ",
                    relatedLinks: []
                },
                {
                    category: "SoftwareLibrary",
                    title: "maniart/diffyjs: A dependency-free motion detection library for the browser",
                    url: "https://github.com/maniart/diffyjs",
                    tags: ["JavaScript", "画像"],
                    content:
                        "`MediaDevices.getUserMedia()`を使って取得した画像から、フレームごとの動きのdiffを取得できるライブラリ。\nmotion detectionライブラリ",
                    relatedLinks: []
                }
            ]);
        });
        it("actual results two", () => {
            const results = parse(
                fs.readFileSync(
                    path.join(
                        __dirname,
                        "fixtures",
                        "2017-01-11-Node.js-v7.4.0-npm-v4-PhantomJS-2.5.0-Beta-clean-code.md"
                    ),
                    "utf-8"
                )
            );
            assert.deepEqual(results, [
                {
                    category: "Headline",
                    title: "Introducing Inferno 1.0 – inferno_js – Medium",
                    url: "https://medium.com/inferno-js/introducing-inferno-1-0-f3da5c4e773b",
                    tags: ["JavaScript", "DOM", "library", "ReleaseNote"],
                    content: "Inferno 1.0リリース。\nInfernoがなぜ作られたのか、今後のロードマップについて",
                    relatedLinks: []
                },
                {
                    category: "Headline",
                    title: "Node v7.4.0 (Current) | Node.js",
                    url: "https://nodejs.org/en/blog/release/v7.4.0/",
                    tags: ["node.js", "ReleaseNote"],
                    content: "Node.js 7.4.0リリース。\nBuffer、`EventEmitter.once`のパフォーマンス改善など",
                    relatedLinks: []
                },
                {
                    category: "Headline",
                    url: "https://groups.google.com/d/topic/phantomjs/AefOuwkgBh0",
                    tags: ["browser", "ReleaseNote", "webkit"],
                    content:
                        "PhantomJS 2.5.0βリリース。\nQtWebKitがアップデートされES2015のサポート、WebPのサポートなど",
                    title: "[Release] PhantomJS 2.5.0 Beta - Google グループ",
                    relatedLinks: [
                        {
                            title: "Comparison with QtWebKit 5.6 · annulen/webkit Wiki",
                            url: "https://github.com/annulen/webkit/wiki/Comparison-with-QtWebKit-5.6"
                        }
                    ]
                },
                {
                    category: "Headline",
                    title: "Microsoft Edge build 15002 changelog - Microsoft Edge Development",
                    url: "https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/desktop/15002/",
                    tags: ["MSEdge", "ReleaseNote"],
                    content:
                        "Windows 10 build 15002リリース。\nMSEdgeでFlashがClick to playに、Web Paymentsの試験的サポート、CSP 2.0、WebVR APIのサポートなど\nまた別オリジンにおけるsetTimeout/requestAnimationFrameの呼び出し頻度を抑制するなど",
                    relatedLinks: []
                },
                {
                    category: "Article",
                    title: "ES6 arrow functions in depth",
                    url: "https://codesi.nz/es6-arrow-functions-in-depth/",
                    tags: ["JavaScript", "ECMAScript"],
                    content:
                        "Arrow Functionについて細かいところも含めて、解説してる記事。\nよくある`this`の動き、暗黙的な`return`について\nまた、`new`できない点、`new.target`や`arguements`を扱えない点についてなど",
                    relatedLinks: []
                },
                {
                    category: "Article",
                    title: "From Sass to PostCSS by Tyler Gaw",
                    url: "https://tylergaw.com/articles/sass-to-postcss",
                    tags: ["Sass", "CSS", "PostCSS"],
                    content: "SassだったものをPostCSSに置き換えるまでの話。\nSassの構文とPostCSS拡張(cssnext)の比較",
                    relatedLinks: []
                },
                {
                    category: "Article",
                    title: "ES proposal: import()",
                    url: "http://www.2ality.com/2017/01/import-operator.html",
                    tags: ["ECMAScript", "proposal"],
                    content: "現在Stage 3のProposalである、`import()`について。\ndynamic module importsに関する仕様",
                    relatedLinks: []
                },
                {
                    category: "Article",
                    title: "Yarn vs npm - The State of Node.js Package Managers | @RisingStack",
                    url: "http://blog.risingstack.com/yarn-vs-npm-node-js-package-managers/",
                    tags: ["npm", "yarn"],
                    content: "npm v4とYarnについて。\nnpm v4で追加された機能の解説、Yarnの機能やロックファイルについて",
                    relatedLinks: []
                },
                {
                    category: "Article",
                    title: "Web animation in 2017 | Nothing new",
                    url: "https://birtles.wordpress.com/2017/01/10/web-animation-in-2017/",
                    tags: ["CSS", "animation", "firefox"],
                    content: "Web Animation関連の仕様ステータスについてのまとめ",
                    relatedLinks: []
                },
                {
                    category: "Article",
                    title: "Building a custom tag input with Skate.js",
                    url: "https://hackernoon.com/building-a-custom-tag-input-with-skate-js-fbd4cdf744f",
                    tags: ["WebComponents", "library"],
                    content:
                        "Web ComponentsフレームワークであるSkate.jsを使ってタグ入力コンポーネントを作る話。\n値、スタイルの定義の仕方などについて",
                    relatedLinks: []
                },
                {
                    category: "Article",
                    title: "Flux を使わずに React コンポーネント間のコミュニケーションを行う8つの方法 - Qiita",
                    url: "http://qiita.com/kyoshidajp/items/0ddb156d96bb6337f623",
                    tags: ["React", "翻訳"],
                    content: "Reactコンポーネント同士で値の受け渡しなどのパターンについて",
                    relatedLinks: []
                },
                {
                    category: "WebsiteDocument",
                    title: "ryanmcdermott/clean-code-javascript: Clean Code concepts adapted for JavaScript",
                    url: "https://github.com/ryanmcdermott/clean-code-javascript",
                    tags: ["JavaScript", "OOP"],
                    content:
                        "クリーンコードをJavaScriptで行うガイドライン。\n読みやすいコードの書き方やオブジェクト指向プログラミング、SOLID、ES2015以降の機能使って分かりやすく書く話など",
                    relatedLinks: []
                },
                {
                    category: "WebsiteDocument",
                    title: "縦書きWeb普及委員会",
                    url: "http://tategaki.github.io/",
                    tags: ["CSS", "browser"],
                    content: "縦書きCSSについての解説サイト",
                    relatedLinks: []
                },
                {
                    category: "SoftwareLibrary",
                    title: "Flow Runtime",
                    url: "https://codemix.github.io/flow-runtime/",
                    tags: ["flowtype", "JavaScript", "library", "babel"],
                    content:
                        "Flow互換の型チェックを実装したランタイムとBabelプラグイン。\nFlowで書いたコードをランタイムチェックすることができる",
                    relatedLinks: []
                },
                {
                    category: "SoftwareLibrary",
                    title: "talyssonoc/structure: A simple schema/attributes library built on top of modern JavaScript",
                    url: "https://github.com/talyssonoc/structure",
                    tags: ["JavaScript", "library"],
                    content:
                        "ES2015 classesのモデルに対してスキーマを定義できるライブラリ。\nスキーマを元にバリデーションやシリアライズを行える",
                    relatedLinks: []
                },
                {
                    category: "SoftwareLibrary",
                    title: "wheresrhys/fetch-mock: Mock http requests made using fetch (or isomorphic-fetch)",
                    url: "https://github.com/wheresrhys/fetch-mock",
                    tags: ["Fetch", "test", "HTTP"],
                    content: "Fetch APIのモックライブラリ",
                    relatedLinks: []
                },
                {
                    category: "SoftwareLibrary",
                    title: "danculley/real-dom: A ~1K non-virtual DOM non-framework framework for simple apps",
                    url: "https://github.com/danculley/real-dom",
                    tags: ["JavaScript", "library", "React", "jsx"],
                    content:
                        "JSXで書くこともでき、ReduxライクなStateマシンを扱えるDOMコンポーネントライブラリ。\n50行ほどのコードで実装されていてとても小さい。",
                    relatedLinks: []
                },
                {
                    category: "SoftwareLibrary",
                    title: "xvg",
                    url: "https://xvg.now.sh/",
                    tags: ["SVG", "Chrome", "debug"],
                    content:
                        "SVG pathをアウトライン化、アンカーを表示することでSVGをデバッグすることができるChrome拡張",
                    relatedLinks: []
                },
                {
                    category: "SoftwareLibrary",
                    title: "NodeKit",
                    url: "https://nodekit.io/",
                    tags: ["node.js", "webkit", "Electron"],
                    content:
                        "Node.jsをiOS/Android/Windowsなどのアプリで組み込んで使うようのフレームワーク。\nJavaScriptのバインディングにJavaScriptCoreやChackraCoreを使う",
                    relatedLinks: []
                },
                {
                    category: "SoftwareLibrary",
                    title: "jlongster/prettier: Prettier is an opinionated JavaScript formatter.",
                    url: "https://github.com/jlongster/prettier",
                    tags: ["JavaScript", "Tools"],
                    content: "折り返し桁数ベースのJavaScript整形ツール",
                    relatedLinks: [
                        { title: "A Prettier JavaScript Formatter", url: "http://jlongster.com/A-Prettier-Formatter" }
                    ]
                },
                {
                    category: "Book",
                    title: "O&#x27;Reilly Japan - 初めてのJavaScript 第3版",
                    url: "http://www.oreilly.co.jp/books/9784873117836/",
                    tags: ["JavaScript", "book"],
                    content: "2017年1月20日発売\nLearning JavaScriptの翻訳本。\nES2015+に対応した内容",
                    relatedLinks: [
                        {
                            title: "初めてのJavaScript 第3版 サポートページ — マーリンアームズ",
                            url: "http://www.marlin-arms.com/support/ljs3/"
                        }
                    ]
                },
                {
                    category: "Book",
                    title: "Front-end Handbook 2017 · GitBook",
                    url: "https://www.gitbook.com/book/frontendmasters/front-end-handbook-2017/details",
                    tags: ["JavaScript", "CSS", "book"],
                    content: "フロントエンドに関する電子書籍の2017年版",
                    relatedLinks: [
                        {
                            title: "Front-end Handbook 2016 · GitBook",
                            url: "https://www.gitbook.com/book/frontendmasters/front-end-handbook/details"
                        }
                    ]
                }
            ]);
        });
    });
});
