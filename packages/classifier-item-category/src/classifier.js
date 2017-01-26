// MIT © 2017 azu
"use strict";
const itemCategory = require("../data/item-category.json");
const JSerStat = require("jser-stat").JSerStat;
const JSerClassifier = require("./classifier-item-category");
const jserStat = new JSerStat();
module.exports = new JSerClassifier({
    itemCategory,
    jserStat
});