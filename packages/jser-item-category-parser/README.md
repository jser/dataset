# jser-item-category-parser

JSer.info post item category parser.

JSer.infoの記事から、各アイテムURLのカテゴリ(記事中の分類)を返す。

## Install

Install with [npm](https://www.npmjs.com/):

    npm install jser-item-category-parser

## Usage

```js
const parse = require("jser-item-category-parser").parse;
const results = parse(fs.readFileSync(path.join(__dirname, "fixtures", "2017-01-11-Node.js-v7.4.0-npm-v4-PhantomJS-2.5.0-Beta-clean-code.md"), "utf-8"));
/*
 [{
    category: 'Headline',
    url: 'https://medium.com/inferno-js/introducing-inferno-1-0-f3da5c4e773b'
}]

 */
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
