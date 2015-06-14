// LICENSE : MIT
"use strict";
import JSerItem from "./models/JSerItem"
import JSerPost from "./models/JSerPost"
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

    getItems() {

    }
}