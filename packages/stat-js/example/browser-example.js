// LICENSE : MIT
"use strict";
var startTime = Date.now();
var assert = require("assert");
var JSerStat = require("jser-stat").JSerStat;
var stat = new JSerStat();
assert(stat.getJSerWeeks().length > 0);
var firstWeek = stat.findJSerWeek(1);
assert(firstWeek.weekNumber === 1);
var weeks = stat.findJSerWeeksBetween(new Date("2013-01-31T15:00:00.000Z"), new Date("2015-06-01T13:22:37.167Z"));
assert(weeks.length > 0);
var theItem = stat.findItemWithURL("http://d.hatena.ne.jp/brazil/20110131/1296419283");
console.log(theItem);
console.log("Total: " + (Date.now() - startTime) + "ms");