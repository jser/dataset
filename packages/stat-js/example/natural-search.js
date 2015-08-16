// LICENSE : MIT
"use strict";
var startTime = Date.now();
var JSerStat = require("jser-stat").JSerStat;
var stat = new JSerStat();
var item = stat.items[stat.items.length - 1];
console.log("Search: " + item.title);
console.log("Result:");
stat.findRelatedItems(item).forEach(function (item) {
    console.log("\t"
        + item.title
        + "\n"
        + "\t"
        + item.url);
});
console.log("Total: " + (Date.now() - startTime) + "ms");