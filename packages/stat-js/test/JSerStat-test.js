// LICENSE : MIT
"use strict";
import assert from "power-assert"
import JSerStat from "../src/JSerStat"
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
        var stat;
        var items;
        var posts;
        before(function () {
            posts = [
                {
                    "title": "2015-06-10のJS: ブラウザとES6の状況、Web Audio APIチュートリアル",
                    "url": "http://jser.info/2015/06/10/es6-status-webaudio/",
                    "date": "2015-06-10T12:45:00+09:00",
                    "content": "JSer.info #231 - Safari 9.0の変更点が公開されています。JavaSc...",
                    "category": "JSer",
                    "tags": ["WebAudio", "ES6", "Safari", "Chrome", "MSEdge"]
                }
            ];
            items = [
                {
                    "title": "Changelog · winjs/winjs Wiki",
                    "url": "https://github.com/winjs/winjs/wiki/Changelog#v40",
                    "content": "WinJS 4.0リリース",
                    "tags": ["JavaScript", "library", "ReleaseNote"],
                    "date": "2015-06-10T01:28:52.936Z",
                    "relatedLinks": []
                }
            ];
            stat = new JSerStat(items, posts);
        });
        it("should return JSerWeek match the JSerItem", function () {
            var week = stat.findWeekWithItem(items[0]);
            assert(stat.getTotalWeekCount() === 1);
            var jSerWeek = stat.getJSerWeeks()[0];
            assert.equal(jSerWeek.weekNumber, week.weekNumber);
        });
    });
    describe("#findItemWithURL", function () {
        var stat;
        var items;
        var posts;
        before(function () {
            posts = [
                {
                    "title": "2015-06-10のJS: ブラウザとES6の状況、Web Audio APIチュートリアル",
                    "url": "http://jser.info/2015/06/10/es6-status-webaudio/",
                    "date": "2015-06-10T12:45:00+09:00",
                    "content": "JSer.info #231 - Safari 9.0の変更点が公開されています。JavaSc...",
                    "category": "JSer",
                    "tags": ["WebAudio", "ES6", "Safari", "Chrome", "MSEdge"]
                }
            ];
            items = [
                {
                    "title": "Changelog · winjs/winjs Wiki",
                    "url": "https://github.com/winjs/winjs/wiki/Changelog#v40",
                    "content": "WinJS 4.0リリース",
                    "tags": ["JavaScript", "library", "ReleaseNote"],
                    "date": "2015-06-10T01:28:52.936Z",
                    "relatedLinks": []
                }
            ];
            stat = new JSerStat(items, posts);
        });
        it("should return JSerItem match the URL", function () {
            var expectedItem = new Item(items[0]);
            var item = stat.findItemWithURL(items[0].url);
            assert(expectedItem.isEqualItem(item));
        });
    });
});
