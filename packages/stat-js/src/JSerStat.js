// LICENSE : MIT
"use strict";
require('array.prototype.find');

import Item from "./models/JSerItem"
import Post from "./models/JSerPost"
import Week from "./models/JSerWeek"
import AlgoItem from "./algo/AlgoItem"
import AlgoPost from "./algo/AlgoPost.js"
import NaturalSearcher from "./natural/NaturalSearcher"
function filterJSerCategory(article) {
    return /jser/i.test(article.category);
}
export default class JSerStat {
    constructor(rawItems, rawPosts) {
        this._rawItems = rawItems ;
        this._rawPosts = rawPosts;
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
         *
         * @type {JSerWeek[]}
         * @private
         */
        this._weeks = [];
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
        /**
         * @type {NaturalSearcher}
         */
        this.naturalSearch = null;
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
        if (this._weeks.length === 0) {
            this._weeks = this.posts.reduce((results, currentPost, index)=> {
                var prevPost = this.posts[index - 1];
                var jserWeek = new Week(currentPost, prevPost, this._algoItem);
                results.push(jserWeek);
                return results;
            }, []);
        }
        return this._weeks;
    }

    /**
     * beginからendの範囲のJSerWeekの配列を返す
     * @param {Date} beginDate
     * @param {Date} endDate
     * @returns {JSerWeek[]}
     */
    findJSerWeeksBetween(beginDate, endDate) {
        var algoPost = this._algoPost;
        var posts = algoPost.findPostsBetween(beginDate, endDate);
        return posts.reduce((results, currentPost, index)=> {
            var prevPost = this.posts[index - 1];
            var jserWeek = new Week(currentPost, prevPost, this._algoItem);
            results.push(jserWeek);
            return results;
        }, []);
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
        var prevPost = this.posts[number - 2];
        return new Week(targetPost, prevPost, this._algoItem);
    }

    // deprecated
    getJSerWeek(number) {
        return this.findJSerWeek(number);
    }

    /**
     * JSerItemを含んでいるJSerWeekを検索して返す.
     * @param {Object} jserItem the jserItem is raw object for JSerItem
     * @return {JSerWeek|null} The week contain this jserItem.
     * 未来の記事などJSerWeekに所属していない場合もある
     */
    findWeekWithItem(jserItem) {
        var targetItem = new Item(jserItem);
        var tenDaysAfter = new Date(targetItem.date);
        tenDaysAfter.setDate(targetItem.date.getDate() + 12);
        var jSerWeeks = this.findJSerWeeksBetween(targetItem.date, tenDaysAfter);
        return jSerWeeks.find(week => {
            if (week.post.date < targetItem.date) {
                return false;
            }
            return week.items.some(item => {
                return targetItem.isEqualItem(item);
            });
        });
    }

    /**
     * URLとマッチするJSerItemを返す
     * @param {string} URL
     * @return {JSerItem}
     */
    findItemWithURL(URL) {
        return this.items.find(item => {
            return item.url === URL;
        });
    }

    /**
     * `item` と関連するJSerItemの配列を返す
     * @param {JSerItem} item
     * @param {number} limit
     * @returns {JSerItem[]}
     */
    findRelatedItems(item, limit = 10) {
        if (this.naturalSearch == null) {
            this.naturalSearch = new NaturalSearcher(this.items);
        }
        return this.naturalSearch.findRelatedItems(item, limit);
    }
}