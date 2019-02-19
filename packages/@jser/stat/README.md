# @jser/stat [![Build Status](https://travis-ci.org/jser/stat-js.svg?branch=master)](https://travis-ci.org/jser/stat-js)

The statistic library for JSer.info.

JSer.infoのItemとPostを元にした統計処理やその前処理を行うライブラリです。

## Installation

    npm install @jser/stat

## Data Source

- See [README.md](../../../README.md) on project root

## Usage

### Constructor

#### new JSerStat([rawItems, rawPosts]);

Automatically load `rawItems` and `rawPosts` in Node.js.

```js
import { JSerStat } from "@jser/stat";
import { fetchItems, fetchPosts } from "@jser/data-fetcher";
Promise.all([fetchItems(), fetchPosts()]).then(([items, posts]) => {
    const stat = new JSerStat(items, posts);
    const startTime = Date.now();
    const firstWeek = stat.findJSerWeek(1);
    const weeks = stat.findJSerWeeksBetween(new Date("2013-01-31T15:00:00.000Z"), new Date("2015-06-01T13:22:37.167Z"));
    const theItem = stat.findItemWithURL("http://d.hatena.ne.jp/brazil/20110131/1296419283");
    console.log(theItem);
    /*
    JSerItem {
      title: '実行間隔を調整する - はてなダイアリー - 無料で簡単。広告のないシンプルなブログをはじめよう！',
      url: 'http://d.hatena.ne.jp/brazil/20110131/1296419283',
      content: '一定間隔内で一度のみ実行する throttle、\n一定間隔に呼び出され無ければ実行する debounce　についての解説。\nそれぞれ用途や図解も付いていて大変わかりやすい。',
      tags: [],
      date: Sat Jan 01 2011 00:00:00 GMT+0900 (JST),
      relatedLinks: [] }
    */
});
```
### Models

jser-stat has these model.

- [src/models/JSerItem.js](src/models/JSerItem.ts) from [jser/source-data](https://github.com/jser/source-data "jser/source-data")
- [src/models/JSerItemRelatedLink.js](src/models/JSerItemRelatedLink.ts) is sub model of JSerItem.
- [src/models/JSerPost.js](src/models/JSerPost.ts) from [jser/jser.github.io](https://github.com/jser/jser.github.io "jser/jser.github.io")
- [src/models/JSerWeek.js](src/models/JSerWeek.ts) is JSerItem + JSerPost

### findItemsBetween(beginDate, endDate): JSerItem[]

return JSerItems between two dates

### getJSerWeeks(): JSerWeek[]

return all JSerWeeks

### findJSerWeeksBetween(beginDate, endDate):  JSerWeek[]

return JSerWeeks between two dates

### findJSerWeek(number): JSerWeek

number start with 1.

return JSerWeek at the number.

### findWeekWithItem(itemObject): JSerWeek

return JSerWeek contain the itemObject.

### findItemWithURL(URL): JSerItem

return JSerItem match the `URL`.

### findRelatedItems(item, limit = 10): JSerItem[]

return JSerItem**s** that related the argument `item`.


## Tests

    npm test

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## License

MIT
