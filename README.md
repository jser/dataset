# DataSet [![Build Status](https://travis-ci.org/jser/dataset.svg?branch=master)](https://travis-ci.org/jser/dataset)


A DataSet monorepo for jser.info

## Data list

- Item: 紹介したサイト(URLや関連URLを含め)のこと
    - 1 Item = 1 サイト
- Post: JSer.infoに投稿される記事のこと
    - 1 Post = 1 記事
- Post Item: Jser.infoに投稿された記事中のItemのこと
    - 基本的にはItemと同じだが、Postはカテゴリ分けされた表示
    - 1 Post Item = 1 サイト
    - 制限: カテゴリ区別が付けられたのは[2014-08-03](https://jser.info/2014/08/03/renewal/)からであるため、それ以前のデータは含まれない
    - Postにはすべての記事は含まれるがPost Itemのデータは含まれていない

## Fetcher

- [ ] @jser/data-fetcher

## Parser

## Changelog

See [Releases page](https://github.com/jser/dataset/releases).

## Running tests

    yarn
    yarn bootstrap
    yarn test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/jser/dataset/issues).

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
