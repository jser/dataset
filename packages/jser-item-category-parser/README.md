# jser-item-category-parser [![Build Status](https://travis-ci.org/jser/jser-item-category-parser.svg?branch=master)](https://travis-ci.org/jser/jser-item-category-parser)

JSer.info post item category parser.

JSer.infoの記事から、各アイテムURLのカテゴリ(記事中の分類)を返す。

## Install

Install with [npm](https://www.npmjs.com/):

    npm install jser-item-category-parser

## Usage

```js
const parse = require("jser-item-category-parser").parse;
const Category = require("jser-item-category-parser").Category;
const results = parse(fs.readFileSync(path.join(__dirname, "fixtures", "2017-01-11-Node.js-v7.4.0-npm-v4-PhantomJS-2.5.0-Beta-clean-code.md"), "utf-8"));
/*
 [{
      category: "Headline",
      url: "https://groups.google.com/d/topic/phantomjs/AefOuwkgBh0",
      tags: ["browser", "ReleaseNote", "webkit"],
      content: "PhantomJS 2.5.0βリリース。\nQtWebKitがアップデートされES2015のサポート、WebPのサポートなど",
      title: "[Release] PhantomJS 2.5.0 Beta - Google グループ",
      relatedLinks: [
          {
              title: "Comparison with QtWebKit 5.6 · annulen/webkit Wiki",
              url: "https://github.com/annulen/webkit/wiki/Comparison-with-QtWebKit-5.6"
          }
      ]
  }]

 */
```

### Category

```js
const Category = {
    Headline: "ヘッドライン",
    Article: "アーティクル",
    SlideVideo: "スライド、動画関係",
    websiteDocument: "サイト、サービス、ドキュメント",
    SoftwareLibrary: "ソフトウェア、ツール、ライブラリ関係",
    Book: "書籍関係",
};
```

## Changelog

See [Releases page](https://github.com/jser/jser-item-category-parser/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/jser/jser-item-category-parser/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- [github/azu](https://github.com/azu)
- [twitter/azu_re](https://twitter.com/azu_re)

## License

MIT © azu
