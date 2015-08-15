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
        return findIndexesBetween(this.itemTimes, beginDate, endDate).map(itemIndex => this.items[itemIndex]);
    }
}