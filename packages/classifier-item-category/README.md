# jser-classifier-item-category [![Build Status](https://travis-ci.org/jser/classifier-item-category.svg?branch=master)](https://travis-ci.org/jser/classifier-item-category)

Classifier category from JSer item or text.

テキストからJSer.infoにおけるカテゴライズをベイズ推論して、カテゴリ名を返します。

カテゴリは次の通りです。

```js
var Category = {
    Headline: "ヘッドライン",
    Article: "アーティクル",
    SlideVideo: "スライド、動画関係",
    WebsiteDocument: "サイト、サービス、ドキュメント",
    SoftwareLibrary: "ソフトウェア、ツール、ライブラリ関係",
    Book: "書籍関係"
};
```

- [jser/jser-item-category-parser: JSer.info post item category parser.](https://github.com/jser/jser-item-category-parser)
- [jser/stat-js: JSer.info stat library](https://github.com/jser/stat-js)
- [NaturalNode/natural: general natural language facilities for node](https://github.com/NaturalNode/natural "NaturalNode/natural: general natural language facilities for node")K

## Install

Install with [npm](https://www.npmjs.com/):

    npm install jser-classifier-item-category

## Usage

```js
const classifier = require("jser-classifier-item-category");
const CategoryKey = require("jser-classifier-item-category").CategoryKey;
classifier.classifyText("This is Library text.");
// === CategoryKey.SoftwareLibrary
```

## Changelog

See [Releases page](https://github.com/jser/classifier-item-category/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm i -d && npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/jser/classifier-item-category/issues).

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
