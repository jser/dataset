// LICENSE : MIT
"use strict";
import {findIndexesBetween} from "./algoSearch.js"

// for algorithm
export default class AlgoItem {
    /**
     *
     * @param {JSerItem[]} items
     */
    constructor(items) {
        this.items = items;
        /**
         * @type number[] 昇順となった各Itemのtime配列
         */
        this.itemTimes = items.map(function (item) {
            return item.date.getTime();
        });
    }

    /**
     *
     * @param {Date} beginDate
     * @param {Date} endDate
     * @returns {JSerItem[]}
     */
    findItemsBetween(beginDate, endDate) {
        var indexes = findIndexesBetween(this.itemTimes, beginDate, endDate);
        var first = indexes[0];
        var last = indexes[indexes.length - 1];
        if (indexes.length === 0) {
            return [];
        }
        if (first > last) {
            return [];
        }
        return this.items.slice(first, last + 1);
    }
}