// LICENSE : MIT
"use strict";
import JSerItem from "./models/JSerItem"
import JSerPost from "./models/JSerPost"
import JSerWeek from "./models/JSerWeek"
export default class JSerStat {
    constructor() {
        this._rawItems = require("./data/items.json");
        this._rawPosts = require("./data/posts.json");
        this.items = this._rawItems.map(function (item) {
            return new JSerItem(item);
        });
        this.posts = this._rawPosts.map(function (post) {
            return new JSerPost(post);
        });
    }

    getJSerWeeks() {
        var results = [];
        this.posts.reduce(function (currentPost, nextPost) {
            var jserWeek = new JSerWeek(currentPost, nextPost, items);
            results.push(jserWeek);
            return nextPost;
        }, []);
        return results;
    }
}