// LICENSE : MIT
"use strict";
const _Posts = require("../data/posts.json");
const _Items = require("../data/items.json");
import { JSerStat as InternalJSerStat } from "./JSerStat";

const JSerStat = function _JSerStat(items = _Items, posts = _Posts) {
    return new InternalJSerStat(items, posts);
};
import * as compute from "./compute/compute-tags";

export { JSerStat, compute };
