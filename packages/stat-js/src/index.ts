// LICENSE : MIT
"use strict";
export const DefaultData = {
    posts: require("../data/posts.json"),
    items: require("../data/items.json")
};

export { JSerStat } from "./JSerStat";

import * as compute from "./compute/compute-tags";

export { compute };
