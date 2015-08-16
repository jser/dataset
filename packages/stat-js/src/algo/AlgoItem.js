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
        if (indexes.length === 0) {
            return [];
        }
        if (indexes.length === 1) {
            return this.items.slice(indexes[0], indexes[0] + 1);
        }
        return this.items.slice(indexes[0], indexes[indexes.length - 1] + 1);
    }
}