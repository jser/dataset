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
    constructor(rawItems, rawPosts) {
        this._rawItems = rawItems || require("../data/items.json");
        this._rawPosts = rawPosts || require("../data/posts.json");
        /** @type {JSerItem[]} */
        this.items = this._rawItems.map(function (item) {
            return new Item(item);
        });
        // JSer カテゴリだけにする
        /** @type {JSerPost[]} */
        this.posts = this._rawPosts.filter(filterJSerCategory).map((post, index) => {
            return new Post(index + 1, post);
        });
        /**
         *  @type {AlgoItem}
         *  @private
         **/
        this._algoItem = new AlgoItem(this.items);
        /**
         * @type {AlgoPost}
         * @private
         */
        this._algoPost = new AlgoPost(this.posts);
    }

    /**
     * 全部で何週あるかを返す(投稿記事の数と一致)
     * @returns {number}
     */
    getTotalWeekCount() {
        return this.posts.length;
    }

    /**
     * beginからendの範囲のJSerItemの配列を返す
     * @param {Date} beginDate
     * @param {Date} endDate
     * @returns {JSerItem[]}
     */
    findItemsBetween(beginDate, endDate) {
        return this._algoItem.findItemsBetween(beginDate, endDate);
    }

    // deprecated
    getItemsBetWeen(beginDate, endDate) {
        return this.findItemsBetween(beginDate, endDate)
    }

    /**
     * 全てのJSerWeekの配列を返す
     * @returns {JSerWeek[]}
     */
    getJSerWeeks() {
        return this.posts.reduce((results, currentPost, index)=> {
            var nextPost = this.posts[index + 1];
            var jserWeek = new Week(currentPost, nextPost, this._algoItem);
            results.push(jserWeek);
            return results;
        }, []);
    }

    /**
     * beginからendの範囲のJSerWeekの配列を返す
     * @param {Date} beginDate
     * @param {Date} endDate
     * @returns {JSerWeek[]}
     */
    findJSerWeeksBetween(beginDate, endDate) {
        var results = [];
        var algoPost = this._algoPost;
        var posts = algoPost.findPostsBetween(beginDate, endDate);
        posts.reduce((currentPost, nextPost)=> {
            var jserWeek = new Week(currentPost, nextPost, this._algoItem);
            results.push(jserWeek);
            return nextPost;
        });
        return results;
    }

    // deprecated
    getJSerWeeksBetWeen(beginDate, endDate) {
        return this.findJSerWeeksBetween(beginDate, endDate)
    }

    /**
     * JSer.info #xxx を返す
     * @param {number} number number start with 1
     * @returns {JSerWeek}
     */
    findJSerWeek(number) {
        if (number <= 0) {
            throw new Error(`number:${number} should be >= 1`);
        }
        if (number > this.posts.length) {
            return null;
        }
        var targetPost = this.posts[number - 1];
        var nextPost = this.posts[number];
        return new Week(targetPost, nextPost, this._algoItem);
    }

    // deprecated
    getJSerWeek(number) {
        return this.findJSerWeek(number);
    }

    /**
     * JSerItemを含んでいるJSerWeekを検索して返す.
     * @param {JSerItem} jserItem
     * @return {JSerWeek} The week contain this jserItem.
     */
    findWeekWithItem(jserItem) {

    }
}