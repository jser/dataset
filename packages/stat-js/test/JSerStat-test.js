// LICENSE : MIT
"use strict";
import assert from "power-assert"
import {JSerStat} from "../src/";
import Item from "../src/models/JSerItem"
import Week from "../src/models/JSerWeek"
import {countTagsByGroup} from "../src/compute/compute-tags.js"
describe("jser-stat", function () {
    describe("when initialized", function () {
        var stat;
        before(function () {
            stat = new JSerStat();
        });
        it("has .items", function () {
            assert(stat.items instanceof Array);
        });
        it("has .posts", function () {
            assert(stat.posts instanceof Array);
        });
    });
    describe("#getJSerWeeks", function () {
        var stat;
        before(function () {
            stat = new JSerStat();
        });
        it("should return JSerWeek[]", function () {
            var weeks = stat.getJSerWeeks();
            assert(weeks instanceof Array);
            assert(weeks[0] instanceof Week)
        });
    });
    describe("#findJSerWeeksBetween", function () {
        var stat;
        before(function () {
            stat = new JSerStat();
        });
        it("should return JSerWeek[]", function () {
            var weeks = stat.findJSerWeeksBetween(new Date("2013-01-31T15:00:00.000Z"), new Date("2015-06-01T13:22:37.167Z"));
            assert(weeks instanceof Array);
            assert(weeks[0] instanceof Week);
            assert(weeks.length < stat.posts.length);
        });
    });

    describe("#findJSerWeek", function () {
        var stat;
        before(function () {
            stat = new JSerStat();
        });
        it("should return JSerWeek[]", function () {
            var week = stat.findJSerWeek(1);
            assert(week instanceof Week)
        });
    });
    describe("findWeekWithItem", function () {
        it("should return JSerWeek match the JSerItem", function () {
            var posts = [
                {
                    "title": "2015-06-10のJS: ブラウザとES6の状況、Web Audio APIチュートリアル",
                    "url": "http://jser.info/2015/06/10/es6-status-webaudio/",
                    "date": "2015-06-10T12:45:00+09:00",
                    "content": "JSer.info #231 - Safari 9.0の変更点が公開されています。JavaSc...",
                    "category": "JSer",
                    "tags": ["WebAudio", "ES6", "Safari", "Chrome", "MSEdge"]
                }
            ];
            var items = [
                {
                    "title": "Changelog · winjs/winjs Wiki",
                    "url": "https://github.com/winjs/winjs/wiki/Changelog#v40",
                    "content": "WinJS 4.0リリース",
                    "tags": ["JavaScript", "library", "ReleaseNote"],
                    "date": "2015-06-10T01:28:52.936Z",
                    "relatedLinks": []
                },
                {
                    "title": "scottcorgan/immu",
                    "url": "https://github.com/scottcorgan/immu",
                    "content": "Immutable Objectを扱うライブラリ。\nObject.definePropertyやObject.freezeを使ってArrayやObjectの変更を防止したオブジェクトを作成する",
                    "tags": ["JavaScript", "library"],
                    "date": "2015-08-15T16:50:28.637Z",
                    "relatedLinks": []
                }
            ];
            var stat = new JSerStat(items, posts);
            var week = stat.findWeekWithItem(items[0]);
            assert(stat.getTotalWeekCount() === 1);
            var jSerWeek = stat.getJSerWeeks()[0];
            assert.equal(jSerWeek.weekNumber, week.weekNumber);
        });
        it("should return null when no match", function () {
            var posts = [
                {
                    "title": "2015-06-10のJS: ブラウザとES6の状況、Web Audio APIチュートリアル",
                    "url": "http://jser.info/2015/06/10/es6-status-webaudio/",
                    "date": "2015-06-10T12:45:00+09:00",
                    "content": "JSer.info #231 - Safari 9.0の変更点が公開されています。JavaSc...",
                    "category": "JSer",
                    "tags": ["WebAudio", "ES6", "Safari", "Chrome", "MSEdge"]
                }
            ];
            var items = [
                {
                    "title": "Changelog · winjs/winjs Wiki",
                    "url": "https://github.com/winjs/winjs/wiki/Changelog#v40",
                    "content": "WinJS 4.0リリース",
                    "tags": ["JavaScript", "library", "ReleaseNote"],
                    "date": "2015-06-10T01:28:52.936Z",
                    "relatedLinks": []
                },
                {
                    "title": "scottcorgan/immu",
                    "url": "https://github.com/scottcorgan/immu",
                    "content": "Immutable Objectを扱うライブラリ。\nObject.definePropertyやObject.freezeを使ってArrayやObjectの変更を防止したオブジェクトを作成する",
                    "tags": ["JavaScript", "library"],
                    "date": "2015-08-15T16:50:28.637Z",
                    "relatedLinks": []
                }
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
                    "title": "2015-06-10のJS: ブラウザとES6の状況、Web Audio APIチュートリアル",
                    "url": "http://jser.info/2015/06/10/es6-status-webaudio/",
                    "date": "2015-06-10T12:45:00+09:00",
                    "content": "JSer.info #231 - Safari 9.0の変更点が公開されています。JavaSc...",
                    "category": "JSer",
                    "tags": ["WebAudio", "ES6", "Safari", "Chrome", "MSEdge"]
                }
            ];
            var items = [
                {
                    "title": "Changelog · winjs/winjs Wiki",
                    "url": "https://github.com/winjs/winjs/wiki/Changelog#v40",
                    "content": "WinJS 4.0リリース",
                    "tags": ["JavaScript", "library", "ReleaseNote"],
                    "date": "2015-06-10T01:28:52.936Z",
                    "relatedLinks": []
                }
            ];
            var stat = new JSerStat(items, posts);
            var expectedItem = new Item(items[0]);
            var item = stat.findItemWithURL(items[0].url);
            assert(expectedItem.isEqualItem(item));
        });
    });
    describe("#findRelatedItems", function () {
        it("should return JSerItem[] related item", function () {
            var posts = [
                {
                    "title": "2015-06-10のJS: ブラウザとES6の状況、Web Audio APIチュートリアル",
                    "url": "http://jser.info/2015/06/10/es6-status-webaudio/",
                    "date": "2015-06-10T12:45:00+09:00",
                    "content": "JSer.info #231 - Safari 9.0の変更点が公開されています。JavaSc...",
                    "category": "JSer",
                    "tags": ["WebAudio", "ES6", "Safari", "Chrome", "MSEdge"]
                }
            ];
            var items = [
                {
                    "title": "Changelog · winjs/winjs Wiki",
                    "url": "https://github.com/winjs/winjs/wiki/Changelog#v40",
                    "content": "WinJS 4.0リリース",
                    "tags": ["JavaScript", "library", "ReleaseNote"],
                    "date": "2015-06-10T01:28:52.936Z",
                    "relatedLinks": []
                },
                {
                    "title": "winjs",
                    "url": "https://github.com/winjs/winjs",
                    "content": "WinJS のリポジトリ",
                    "tags": ["JavaScript", "library"],
                    "date": "2015-06-11T01:28:52.936Z",
                    "relatedLinks": []
                },
                {
                    "title": "scottcorgan/immu",
                    "url": "https://github.com/scottcorgan/immu",
                    "content": "Immutable Objectを扱うライブラリ。\nObject.definePropertyやObject.freezeを使ってArrayやObjectの変更を防止したオブジェクトを作成する",
                    "tags": ["JavaScript", "library"],
                    "date": "2015-08-15T16:50:28.637Z",
                    "relatedLinks": []
                }
            ];
            var stat = new JSerStat(items, posts);
            var item = new Item(items[0]);
            var expectedRelatedItem = new Item(items[1]);
            var relatedItems = stat.findRelatedItems(item);
            assert(relatedItems[0].isEqualItem(expectedRelatedItem))
        });
    });
});
