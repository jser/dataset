// LICENSE : MIT
"use strict";
const assert = require("assert");
const { JSerStat } = require("../src/index");
const { JSerItem: Item } = require("../src/models/JSerItem");
const { JSerWeek: Week } = require("../src/models/JSerWeek");
const { fetchItems, fetchPosts } = require("@jser/data-fetcher");

describe("@jser/stat", function () {
    let stat;
    let _items;
    let _posts;
    before(function () {
        return Promise.all([fetchItems(), fetchPosts()]).then(([items, posts]) => {
            _items = items;
            _posts = posts;
            stat = new JSerStat(items, posts);
        });
    });
    describe("when initialized", function () {
        it("has .items", function () {
            assert(stat.items instanceof Array);
        });
        it("has .posts", function () {
            assert(stat.posts instanceof Array);
        });
    });
    describe("#getJSerWeeks", function () {
        it("should return JSerWeek[]", function () {
            var weeks = stat.getJSerWeeks();
            assert(weeks instanceof Array);
            assert(weeks[0] instanceof Week);
        });
    });
    describe("#findJSerWeekWithURL", function () {
        it("should return JSerWeek that match url", function () {
            const expectedPostURL = stat.posts[0].url;
            const week = stat.findJSerWeekWithURL(expectedPostURL);
            assert(week.post.url === expectedPostURL);
        });
    });
    describe("#findJSerWeeksBetween", function () {
        it("should return JSerWeek[]", function () {
            var weeks = stat.findJSerWeeksBetween(
                new Date("2013-01-31T15:00:00.000Z"),
                new Date("2015-06-01T13:22:37.167Z")
            );
            assert(weeks instanceof Array);
            assert(weeks.length < stat.posts.length);
            const beginWeek = weeks[0];
            assert.equal(beginWeek.post.postNumber, 108);
            assert(beginWeek instanceof Week);
            assert(beginWeek.beginDate);
            assert(beginWeek.endDate);
        });
        it("can get first week", function () {
            const weeks = stat.findJSerWeeksBetween(
                new Date("2000-01-31T15:00:00.000Z"),
                new Date("2015-06-01T13:22:37.167Z")
            );
            const fistWeek = weeks[0];
            assert(fistWeek.post.postNumber === 1);
        });
    });

    describe("#findJSerWeek", function () {
        it("should return JSerWeek[]", function () {
            var week = stat.findJSerWeek(1);
            assert(week instanceof Week);
        });
    });
    describe("findWeekWithItem", function () {
        context("when 降順のpostデータのとき", () => {
            it("ソートされたweekが取得できる", function () {
                var posts = [
                    {
                        title: "2011-01-16のJS: JSer.info初投稿の記事",
                        url: "https://jser.info/post/2774561807",
                        date: "2011-01-16T17:08:26+09:00",
                        content:
                            "JSer.infoとして初投稿になりますが今後ともよろしくお願いします。このサイトについての詳...",
                        category: "JSer",
                        tags: ["JavaScript", "URL", "design", "Java", "Game", "books"],
                    },
                    {
                        title: "2015-06-10のJS: ブラウザとES6の状況、Web Audio APIチュートリアル",
                        url: "http://jser.info/2015/06/10/es6-status-webaudio/",
                        date: "2015-06-10T12:45:00+09:00",
                        content: "JSer.info #231 - Safari 9.0の変更点が公開されています。JavaSc...",
                        category: "JSer",
                        tags: ["WebAudio", "ES6", "Safari", "Chrome", "MSEdge"],
                    }, // <=  include Changelog · winjs/winjs Wiki
                    {
                        title: "2015-05-10のJS",
                        url: "http://jser.info/2015/05/10/es6-status-webaudio/",
                        date: "2015-05-10T12:45:00+09:00",
                        content: ".....",
                        category: "JSer",
                        tags: ["WebAudio", "ES6", "Safari", "Chrome", "MSEdge"],
                    },
                ];
                var items = [
                    {
                        title: "Changelog · winjs/winjs Wiki",
                        url: "https://github.com/winjs/winjs/wiki/Changelog#v40",
                        content: "WinJS 4.0リリース",
                        tags: ["JavaScript", "library", "ReleaseNote"],
                        date: "2015-06-04T01:28:52.936Z",
                        relatedLinks: [],
                    },
                    {
                        title: "scottcorgan/immu",
                        url: "https://github.com/scottcorgan/immu",
                        content:
                            "Immutable Objectを扱うライブラリ。\nObject.definePropertyやObject.freezeを使ってArrayやObjectの変更を防止したオブジェクトを作成する",
                        tags: ["JavaScript", "library"],
                        date: "2015-08-15T16:50:28.637Z",
                        relatedLinks: [],
                    },
                ];
                var stat = new JSerStat(items, posts);
                assert(stat.getTotalWeekCount() === 3);
                // sorted
                var targetWeek = stat.findWeekWithItem(items[0]);
                var jSerWeek = stat.getJSerWeeks()[2];
                assert.equal(jSerWeek.weekNumber, targetWeek.weekNumber);
            });
        });
        it("should return JSerWeek match the JSerItem", function () {
            var posts = _posts.slice(0, 1);
            var items = _items.slice(0, 1);
            var stat = new JSerStat(items, posts);
            var week = stat.findWeekWithItem(items[0]);
            assert(stat.getTotalWeekCount() === 1);
            var jSerWeek = stat.getJSerWeeks()[0];
            assert.equal(jSerWeek.weekNumber, week.weekNumber);
        });
        it("should return null when no match", function () {
            var posts = [
                {
                    title: "2015-06-10のJS: ブラウザとES6の状況、Web Audio APIチュートリアル",
                    url: "http://jser.info/2015/06/10/es6-status-webaudio/",
                    date: "2015-06-10T12:45:00+09:00",
                    content: "JSer.info #231 - Safari 9.0の変更点が公開されています。JavaSc...",
                    category: "JSer",
                    tags: ["WebAudio", "ES6", "Safari", "Chrome", "MSEdge"],
                },
            ];
            var items = [
                {
                    title: "Changelog · winjs/winjs Wiki",
                    url: "https://github.com/winjs/winjs/wiki/Changelog#v40",
                    content: "WinJS 4.0リリース",
                    tags: ["JavaScript", "library", "ReleaseNote"],
                    date: "2015-06-10T01:28:52.936Z",
                    relatedLinks: [],
                },
                {
                    title: "scottcorgan/immu",
                    url: "https://github.com/scottcorgan/immu",
                    content:
                        "Immutable Objectを扱うライブラリ。\nObject.definePropertyやObject.freezeを使ってArrayやObjectの変更を防止したオブジェクトを作成する",
                    tags: ["JavaScript", "library"],
                    date: "2015-08-15T16:50:28.637Z",
                    relatedLinks: [],
                },
            ];
            var stat = new JSerStat(items, posts);
            var week = stat.findWeekWithItem(items[1]);
            assert(stat.getTotalWeekCount() === 1);
            assert(week == null);
        });
    });
    describe("#findItemWithURL", function () {
        it("should return JSerItem match the URL", function () {
            var posts = [
                {
                    title: "2015-06-10のJS: ブラウザとES6の状況、Web Audio APIチュートリアル",
                    url: "http://jser.info/2015/06/10/es6-status-webaudio/",
                    date: "2015-06-10T12:45:00+09:00",
                    content: "JSer.info #231 - Safari 9.0の変更点が公開されています。JavaSc...",
                    category: "JSer",
                    tags: ["WebAudio", "ES6", "Safari", "Chrome", "MSEdge"],
                },
            ];
            var items = [
                {
                    title: "Changelog · winjs/winjs Wiki",
                    url: "https://github.com/winjs/winjs/wiki/Changelog#v40",
                    content: "WinJS 4.0リリース",
                    tags: ["JavaScript", "library", "ReleaseNote"],
                    date: "2015-06-10T01:28:52.936Z",
                    relatedLinks: [],
                },
            ];
            var stat = new JSerStat(items, posts);
            var expectedItem = new Item(items[0]);
            var item = stat.findItemWithURL(items[0].url);
            assert(expectedItem.isEqualItem(item));
        });
    });
    describe.skip("#findRelatedItems", function () {
        it("should return JSerItem[] related item", function () {
            var posts = [
                {
                    title: "2015-06-10のJS: ブラウザとES6の状況、Web Audio APIチュートリアル",
                    url: "http://jser.info/2015/06/10/es6-status-webaudio/",
                    date: "2015-06-10T12:45:00+09:00",
                    content: "JSer.info #231 - Safari 9.0の変更点が公開されています。JavaSc...",
                    category: "JSer",
                    tags: ["WebAudio", "ES6", "Safari", "Chrome", "MSEdge"],
                },
            ];
            var items = [
                {
                    title: "Changelog · winjs/winjs Wiki",
                    url: "https://github.com/winjs/winjs/wiki/Changelog#v40",
                    content: "WinJS 4.0リリース",
                    tags: ["JavaScript", "library", "ReleaseNote"],
                    date: "2015-06-10T01:28:52.936Z",
                    relatedLinks: [],
                },
                {
                    title: "winjs",
                    url: "https://github.com/winjs/winjs",
                    content: "WinJS のリポジトリ",
                    tags: ["JavaScript", "library"],
                    date: "2015-06-11T01:28:52.936Z",
                    relatedLinks: [],
                },
                {
                    title: "scottcorgan/immu",
                    url: "https://github.com/scottcorgan/immu",
                    content:
                        "Immutable Objectを扱うライブラリ。\nObject.definePropertyやObject.freezeを使ってArrayやObjectの変更を防止したオブジェクトを作成する",
                    tags: ["JavaScript", "library"],
                    date: "2015-08-15T16:50:28.637Z",
                    relatedLinks: [],
                },
            ];
            var stat = new JSerStat(items, posts);
            var item = new Item(items[0]);
            var expectedRelatedItem = new Item(items[1]);
            var relatedItems = stat.findRelatedItems(item);
            assert(relatedItems[0].isEqualItem(expectedRelatedItem));
        });
    });
});
