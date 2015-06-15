// LICENSE : MIT
"use strict";
import assert from "power-assert"
import AlgoItem from "../src/algo/AlgoItem.js"
import JSerItem from "../src/models/JSerItem.js"
var rawItems;
var items;
describe("AlgoItem", function () {
    before(function(){
        rawItems = require("./fixtures/items.json");
        items = rawItems.map(function (item) {
            return new JSerItem(item);
        });
    });
    describe("when initialized", function () {
        var algo;
        beforeEach(function () {
            algo = new AlgoItem(items);
        });
        it("should has this.postTimeIndex", function () {
            assert(algo.itemTimeIndex instanceof Array);
        });
    });
    describe("#findItemsBetween", function () {
        context("when initialized with fixtures", function () {
            var algo;
            beforeEach(function () {
                algo = new AlgoItem(items);
            });
            it("should return array", function () {
                var items = algo.findItemsBetween(new Date("2011-01-31T15:00:00.000Z"), new Date("2015-06-13T13:22:37.167Z"));
                assert(items.length, 2);
            });
            it("should return one array", function () {
                var items = algo.findItemsBetween(new Date("2011-01-30T15:00:00.000Z"), new Date("2011-02-01T15:00:00.000Z"));
                assert(items.length, 1);
            });
            context("arguments are outdated", function () {
                it("should return empty []", function () {
                    var items = algo.findItemsBetween(new Date("1999-01-21T15:00:00.000Z"), new Date("2000-06-13T13:22:37.167Z"));
                    assert.equal(items.length, 0);
                });
            });
        });
        context("when", function () {
            var algo;
            beforeEach(function () {
                var data = [
                    {
                        "title": "Home | marty.js",
                        "url": "http://martyjs.org/",
                        "content": "Fluxアーキテクチャ実装のライブラリ。\n基本的なStore、Dispatcher、Actionがあり、追加でConstant値の作成、Storageを指定して管理出来るStateが用意されてる。\nChromeのデバッグで流れを見られるようになってる",
                        "tags": [],
                        "date": "2015-01-31T11:48:08.894Z",
                        "relatedLinks": []
                    }
                ];
                var items = data.map(function (item) {
                    return new JSerItem(item);
                });
                algo = new AlgoItem(items);
            });
            it("2015-01-01 ~ 2015-02-01に含まれる", function () {
                var items = algo.findItemsBetween(new Date("2015-01-01T00:00:00.000Z"), new Date("2015-02-01T00:00:00.000Z"));
                assert.equal(items.length, 1);
            });
        });
    });

});