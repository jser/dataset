// LICENSE : MIT
"use strict";
import assert from "power-assert"
import Stat from "../src/jser-stat.js"
describe("jser-stat", function () {
    describe("when initialized", function () {
        var stat;
        beforeEach(function () {
            stat = new Stat();
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
        beforeEach(function () {
            stat = new Stat();
        });
        it("should return JSerWeek[]", function () {
            var weeks = stat.getJSerWeeks();
        });
    });
});