# jser-stat [![Build Status](https://travis-ci.org/jser/stat-js.svg?branch=master)](https://travis-ci.org/jser/stat-js)

JSer.info stat library

## Installation

    npm install jser-stat

## Data Source

- http://jser.info/source-data/items.json
    - [jser/source-data](https://github.com/jser/source-data "jser/source-data")
    - jser/jser.infoの記事元となるサイトのデータを一つのJSONとして固めたもの
- http://jser.info/posts.json
    - jser.infoの投稿した記事のデータ


## Usage

API Document: http://jser.info/stat-js/

### Constructor

#### new JSerStat([rawItems, rawPosts]);

Automatically load `rawItems` and `rawPosts` in Node.js.

```js
var JSerStat = require("jser-stat").JSerStat;
var stat = new JSerStat();
var startTime = Date.now();
var firstWeek = stat.findJSerWeek(1);
var weeks = stat.findJSerWeeksBetween(new Date("2013-01-31T15:00:00.000Z"), new Date("2015-06-01T13:22:37.167Z"));
var theItem = stat.findItemWithURL("http://d.hatena.ne.jp/brazil/20110131/1296419283");
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
```

Manually load `rawItems` and `rawPosts` in Browser.

```js
function fetchURL(URL) {
    return new Promise(function (resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', URL);
        req.onload = function () {
            if (req.status == 200) {
                resolve(req.response);
            } else {
                reject(Error(req.statusText));
            }
        };
        req.onerror = function () {
            reject(Error(req.statusText));
        };
        req.send();
    });
}
function getStat() {
    return Promise.all([
        fetchURL("http://jser.info/posts.json"),
        fetchURL("http://jser.info/source-data/items.json")
    ]).then(([postString. itemsString]) => {
        var posts = JSON.parse(postString).reverse();
        var items = JSON.parse(itemsString);
        var jSerStat = new JSerStat(items, posts);
        return jSerStat;
    });
}
```

### Models

jser-stat has these model.

- [src/models/JSerItem.js](src/models/JSerItem.js) from [jser/source-data](https://github.com/jser/source-data "jser/source-data")
- [src/models/JSerItemRelatedLink.js](src/models/JSerItemRelatedLink.js) is sub model of JSerItem.
- [src/models/JSerPost.js](src/models/JSerPost.js) from [jser/jser.github.io](https://github.com/jser/jser.github.io "jser/jser.github.io")
- [src/models/JSerWeek.js](src/models/JSerWeek.js) is JSerItem + JSerPost

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

## CLI

### Update stat data

Install jser-stat and add `update-jser-stat` command

    $(npm bin)/update-jser-stat
    
Update `data/items.json` adn `data/posts.json`

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
