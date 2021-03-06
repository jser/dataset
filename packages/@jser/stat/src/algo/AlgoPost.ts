// LICENSE : MIT
"use strict";
import { findIndexesBetween } from "./algoSearch";
import { JSerPost } from "../models/JSerPost";

// for algorithm
export default class AlgoPost {
    private posts: JSerPost[];
    private postTimeIndex: number[];

    /**
     *
     * @param {JSerPost[]} posts
     */
    constructor(posts: JSerPost[]) {
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
    findPostsBetween(beginDate: Date, endDate: Date) {
        var indexes = findIndexesBetween(this.postTimeIndex, beginDate, endDate);
        var first = indexes[0];
        var last = indexes[indexes.length - 1];

        if (indexes.length === 0) {
            return [];
        }
        // [1, 0] or [ 1, -1]
        if (first > last && last <= 0) {
            return [];
        }
        // [1, 10]
        return this.posts.slice(first, last + 1);
    }
}
