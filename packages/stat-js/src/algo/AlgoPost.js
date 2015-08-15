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
        return findIndexesBetween(this.postTimeIndex, beginDate, endDate).map(itemIndex => this.posts[itemIndex]);
    }

}