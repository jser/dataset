// LICENSE : MIT
"use strict";
import assert from "power-assert"
import JSerStat from "../src/JSerStat"
import JSerWeek from "../src/models/JSerWeek"
import {countByGroup} from "../src/compute/compute-tags.js"
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
            var rank = countByGroup(weeks);
            assert(weeks instanceof Array);
            assert(weeks[0] instanceof JSerWeek)
        });
    });
    describe("#getJSerWeek", function () {
        var stat;
        before(function () {
            stat = new JSerStat();
        });
        it("should return JSerWeek[]", function () {
            var week = stat.getJSerWeek(1);
            assert(week instanceof JSerWeek)
        });
    });
});