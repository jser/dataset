// LICENSE : MIT
"use strict";
import {findIndexBiggerTime,findIndexLessTime} from "./algoSearch.js"

// for algorithm
export default class AlgoPost {
    /**
     *
     * @param {JSerPost[]} posts
     */
    constructor(posts) {
        this.posts = posts;
        /**
         * @type number[] 昇順となった各Postのtime配列
         */
        this.postTimeIndex = posts.map(function (post) {
            return post.date.getTime();
        });
    }

    findPostsBetween(beginDate, endDate) {
        var beginTime = beginDate.getTime();
        var endTime = endDate.getTime();
        var beginItemIndex = findIndexBiggerTime(this.postTimeIndex, beginTime);
        var endItemIndex = findIndexLessTime(this.postTimeIndex, endTime);
        // 範囲外なら空
        if (beginItemIndex === -1 || endItemIndex === -1) {
            return [];
        }
        return this.posts.slice(beginItemIndex, endItemIndex);
    }

}