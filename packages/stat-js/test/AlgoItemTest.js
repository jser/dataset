// LICENSE : MIT
"use strict";
import assert from "power-assert"
import JSerItem from "../src/models/JSerItem.js"
import AlgoItem from "../src/algo/AlgoItem.js"
var rawItems = require("./fixtures/items.json");
describe("AlgoItem", function () {
    var algo;
    beforeEach(function () {
        var items = rawItems.map(function (item) {
            return new JSerItem(item);
        });
        algo = new AlgoItem(items);
    });
    describe("when initialized", function () {
        it("should has this.itemTimeIndex", function () {
            assert(algo.itemTimeIndex instanceof Array);
        });
    });
    describe("#findItem", function () {
        it("should return array", function () {
            var items = algo.findItems(new Date("2011-01-31T15:00:00.000Z"), new Date("2015-06-13T13:22:37.167Z"));
            assert(items.length, 2);
        });
        it("should return array", function () {
            var items = algo.findItems(new Date("1999-01-21T15:00:00.000Z"), new Date("2000-06-13T13:22:37.167Z"));
            assert.equal(items.length, 0);
        });
    });
});