// LICENSE : MIT
"use strict";
import JSerItem from "./models/JSerItem"
import JSerPost from "./models/JSerPost"
import JSerWeek from "./models/JSerWeek"
import AlgoItem from "./algo/AlgoItem"
function filterJSerCategory(article) {
    return /jser/i.test(article.category);
}
export default class JSerStat {
    constructor() {
        this._rawItems = require("./data/items.json");
        this._rawPosts = require("./data/posts.json");
        this.items = this._rawItems.map(function (item) {
            return new JSerItem(item);
        });
        // JSer カテゴリだけにする
        this.posts = this._rawPosts.filter(filterJSerCategory).map(function (post) {
            return new JSerPost(post);
        });
        this.algoItem = new AlgoItem(this.items);
    }

    getJSerWeeks() {
        var results = [];
        this.posts.reduce((currentPost, nextPost)=> {
            var jserWeek = new JSerWeek(currentPost, nextPost, this.algoItem);
            results.push(jserWeek);
            return nextPost;
        });
        return results;
    }
}