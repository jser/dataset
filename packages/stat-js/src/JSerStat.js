// LICENSE : MIT
"use strict";
import Item from "./models/JSerItem"
import Post from "./models/JSerPost"
import Week from "./models/JSerWeek"
import AlgoItem from "./algo/AlgoItem"
import AlgoPost from "./algo/AlgoPost.js"

function filterJSerCategory(article) {
    return /jser/i.test(article.category);
}
export default class JSerStat {
    constructor() {
        this._rawItems = require("../data/items.json");
        this._rawPosts = require("../data/posts.json");
        this.items = this._rawItems.map(function (item) {
            return new Item(item);
        });
        // JSer カテゴリだけにする
        this.posts = this._rawPosts.filter(filterJSerCategory).map((post, index) => {
            return new Post(index + 1, post);
        });
        this.algoItem = new AlgoItem(this.items);
    }

    /**
     * 全部で何週あるかを返す(投稿記事の数と一致)
     * @returns {Number}
     */
    getTotalWeekCount() {
        return this.posts.length;
    }

    /**
     * beginからendの範囲のJSerItemの配列を返す
     * @param beginDate {Date}
     * @param endDate {Date}
     * @returns {JSerItem[]}
     */
    getItemsBetWeen(beginDate, endDate) {
        return this.algoItem.findItemsBetween(beginDate, endDate);
    }

    /**
     * 全てのJSerWeekの配列を返す
     * @returns {JSerWeek[]}
     */
    getJSerWeeks() {
        var results = [];
        this.posts.reduce((currentPost, nextPost)=> {
            var jserWeek = new Week(currentPost, nextPost, this.algoItem);
            results.push(jserWeek);
            return nextPost;
        });
        return results;
    }

    /**
     * beginからendの範囲のJSerWeekの配列を返す
     * @param beginDate
     * @param endDate
     * @returns {JSerWeek[]}
     */
    getJSerWeeksBetWeen(beginDate, endDate) {
        var results = [];
        var algoPost = new AlgoPost(this.posts);
        var posts = algoPost.findPostsBetween(beginDate, endDate);
        posts.reduce((currentPost, nextPost)=> {
            var jserWeek = new Week(currentPost, nextPost, this.algoItem);
            results.push(jserWeek);
            return nextPost;
        });
        return results;
    }

    /**
     * JSer.info #xxx を返す
     * @param number number start with 1
     * @returns {JSerWeek}
     */
    getJSerWeek(number) {
        if (number <= 0) {
            throw new Error(`number:${number} should be >= 1`);
        }
        if (number > this.posts.length) {
            return null;
        }
        var targetPost = this.posts[number - 1];
        var nextPost = this.posts[number];
        return new Week(targetPost, nextPost, this.algoItem);
    }
}