// LICENSE : MIT
"use strict";
import assert from "power-assert"
import JSerStat from "../src/JSerStat"
import JSerWeek from "../src/models/JSerWeek"
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
            assert(weeks[0] instanceof JSerWeek)
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
            assert(weeks[0] instanceof JSerWeek);
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
            assert(week instanceof JSerWeek)
        });
    });
});