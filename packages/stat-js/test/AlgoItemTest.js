// LICENSE : MIT
"use strict";
import assert from "power-assert"
import AlgoItem from "../src/algo/AlgoItem.js"
import Item from "../src/models/JSerItem"
var rawItems;
var defaultItems;
describe("AlgoItem", function () {
    before(function () {
        rawItems = require("./fixtures/items.json");
        defaultItems = rawItems.map(function (item) {
            return new Item(item);
        });
    });
    describe("when initialized", function () {
        var algo;
        beforeEach(function () {
            algo = new AlgoItem(defaultItems);
        });
        it("should has this.postTimeIndex", function () {
            assert(algo.itemTimes instanceof Array);
        });
    });
    describe("#findItemsBetween", function () {
        context("when initialized with fixtures", function () {
            var algo;
            beforeEach(function () {
                algo = new AlgoItem(defaultItems);
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
            var jserItems;
            beforeEach(function () {
                var data = [
                    {
                        "date": "2015-01-31T15:00:00.000Z"
                    },
                    {
                        "date": "2015-03-04T14:09:23.160Z"
                    },
                    {
                        "date": "2015-04-04T14:09:23.160Z"
                    },
                    {
                        "date": "2015-05-13T13:22:37.167Z"
                    }
                ];
                jserItems = data.map(function (item) {
                    return new Item(item);
                });
                algo = new AlgoItem(jserItems);
            });
            it("2015-01-01 ~ 2015-02-01に含まれるものを返す", function () {
                var items = algo.findItemsBetween(new Date("2015-01-01T00:00:00.000Z"), new Date("2015-02-01T00:00:00.000Z"));
                assert.equal(items.length, 1);
                assert.deepEqual(items[0], jserItems[0]);
            });
            it("2015-02-01 ~ 2015-03-01に含まれてるものがない", function () {
                var items = algo.findItemsBetween(new Date("2015-02-01T00:00:00.000Z"), new Date("2015-03-01T00:00:00.000Z"));
                assert.equal(items.length, 0);
            });
            it("2015-01-01 ~ 2015-06-01に含まれてるものを返す", function () {
                var items = algo.findItemsBetween(new Date("2015-01-01T00:00:00.000Z"), new Date("2015-06-01T00:00:00.000Z"));
                assert.equal(items.length, jserItems.length);
                assert.deepEqual(items[0], jserItems[0]);
                assert.deepEqual(items[1], jserItems[1]);
                assert.deepEqual(items[2], jserItems[2]);
                assert.deepEqual(items[3], jserItems[3]);
            });
        });
    });

});