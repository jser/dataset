# DataSet [![Build Status](https://travis-ci.org/jser/dataset.svg?branch=master)](https://travis-ci.org/jser/dataset)

A DataSet monorepo for jser.info

## データの種類

- Item: 紹介したサイト(URLや関連URLを含め)のこと
    - 1 Item = 1 サイト
    - API: <http://jser.info/source-data/items.json>
- Post: JSer.infoに投稿される記事のこと
    - 1 Post = 1 記事
    - API: <http://jser.info/posts.json>
- Post Item: Jser.infoに投稿された記事中のItemのこと
    - 基本的にはItemと同じだが、Postはカテゴリ分けされた表示
    - 1 Post Item = 1 サイト
    - 制限: カテゴリ区別が付けられたのは[2014-08-03](https://jser.info/2014/08/03/renewal/)からであるため、それ以前のデータは含まれない
    - Postにはすべての記事は含まれるがPost Itemのデータは含まれていない
    - API: <https://jser.info/public/data/post-details.json>

## Fetcher

[@jser/data-fetcher][] を使うことでデータを取得できます。

```ts
import { fetchItems, fetchPostDetails, fetchPosts } from "@jser/data-fetcher";
// Item
await fetchItems();
// Post
await fetchPosts();
// Post Details include Post Item
await fetchPostDetails();
```

## 分析

- [@jser/classifier-item-category][]: 文字列からJSer.infoではどのカテゴリに分類されるかを推論します
- [@jser/stat][]: JSer.infoのデータを使った統計の前処理ライブラリ
    - 指定した日付のItemの取得、Postの取得、関連する記事の検索などが行えます。

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


[@jser/post-parser]: packages/@jser/post-parser
[@jser/data-fetcher]: packages/@jser/data-fetcher
[@jser/classifier-item-category]: packages/@jser/classifier-item-category
[@jser/stat]: packages/@jser/stat
