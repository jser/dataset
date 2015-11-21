// LICENSE : MIT
"use strict";
const _Posts = require("../data/posts.json");
const _Items = require("../data/items.json");
const JSerStat = require("./JSerStat");
module.exports = {
    JSerStat: function _JSerStat(items = _Items, posts = _Posts) {
        return new JSerStat(items, posts);
    },
    compute: require("./compute/compute-tags")
};