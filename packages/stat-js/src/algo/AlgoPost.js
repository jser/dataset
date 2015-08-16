// LICENSE : MIT
"use strict";
import {findIndexesBetween} from "./algoSearch.js"

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

    /**
     *
     * @param {Date} beginDate
     * @param {Date} endDate
     * @returns {JSerPost[]}
     */
    findPostsBetween(beginDate, endDate) {
        var indexes = findIndexesBetween(this.postTimeIndex, beginDate, endDate);
        if (indexes.length === 0) {
            return [];
        }
        if (indexes.length === 1) {
            return this.posts.slice(indexes[0], indexes[0] + 1);
        }
        return this.posts.slice(indexes[0], indexes[indexes.length - 1] + 1);
    }

}