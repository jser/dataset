// MIT © 2017 azu
"use strict";
const Category = require("jser-item-category-parser").Category;
const CategoryKey = require("jser-item-category-parser").CategoryKey;
const JSerClassifier = require("./classifier-item-category");
module.exports.classifier = require("./classifier");
module.exports.Category = Category;
module.exports.CategoryKey = CategoryKey;
module.exports.JSerClassifier = JSerClassifier;