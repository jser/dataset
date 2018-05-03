# DataSet [![Build Status](https://travis-ci.org/jser/dataset.svg?branch=master)](https://travis-ci.org/jser/dataset)

JSer.infoのデータセットをまとめたmonorepoです。

JSer.infoで収集しているデータや記事を書くために利用している統計ライブラリなどが公開されています。

## データの種類

- Item: 紹介するサイトのこと
    - 1 Item = 1 サイト
    - すべてのデータのoriginとなるものです
    - サイトごとにタイトル、URL、登録した日付、タグなどが含まれています
    - API: <http://jser.info/source-data/items.json>
- Post: JSer.infoに投稿される記事のこと
    - 1 Post = 1 記事
    - それぞれの記事のタイトル、URL、タグ、日付などが含まれます
    - [@jser/stat][]を使うことでItemとPostを元に指定したサイトが紹介された記事を検索できます
    - API: <http://jser.info/posts.json>
- Post Item: Jser.infoに投稿された記事中のItem(サイト)のこと
    - 1 Post Item = 1 サイト
    - 基本的にはItemと同じだが、Post ItemはPost(記事)におけるカテゴリ（ヘッドラインなど）が含まれます
    - カテゴリの種類は [@jser/post-parser][] を参照してください
    - Itemを元に投稿時に編集している場合などもあるため、ItemとPost Itemは必ずしも一致するわけではありません
    - 制限: カテゴリ区別が付けられたのは[2014-08-03](https://jser.info/2014/08/03/renewal/)からであるため、それ以前のデータは含まれない
    - Postにはすべての記事は含まれるがPost Itemのデータは含まれていない
    - API: <https://jser.info/public/data/post-details.json>

データは個別だと扱いにくい場合などがあります。
また、時期によって特定のプロパティが欠損してる場合もあるため、後述する分析ライブラリなどのHigh LevelなAPIを利用することを推奨します。

[@jser/data-fetcher][]でデータとして取得し、[@jser/stat][]などの分析ライブラリに与えて利用するとある程度正規化されます。

統計データの閲覧やCSVデータの取得なら[JSer.info Data Dashboard](https://jser.info/data-dashboard/)も利用できます。

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

## 分析ライブラリ

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
