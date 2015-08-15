// LICENSE : MIT
"use strict";
var assert = require("assert");
var JSerStat = require("jser-stat").JSerStat;
var stat = new JSerStat();
assert(stat.getJSerWeeks().length > 0);
var firstWeek = stat.findJSerWeek(1);
assert(firstWeek.weekNumber === 1);
