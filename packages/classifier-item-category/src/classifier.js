// MIT © 2017 azu
"use strict";
const itemCategories = require("../data/item-category.json");
const JSerStat = require("jser-stat").JSerStat;
const JSerClassifier = require("./classifier-item-category");
const jserStat = new JSerStat();
module.exports = new JSerClassifier({
    itemCategories,
    items: jserStat.items
});