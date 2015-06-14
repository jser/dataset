// LICENSE : MIT
"use strict";
import {findIndexBiggerTime,findIndexLessTime} from "./algoSearch.js"

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
        this.itemTimeIndex = items.map(function (item) {
            return item.date.getTime();
        });
    }

    findPostsBetween(beginDate, endDate) {
        var beginTime = beginDate.getTime();
        var endTime = endDate.getTime();
        var beginItemIndex = findIndexBiggerTime(this.itemTimeIndex, beginTime);
        var endItemIndex = findIndexLessTime(this.itemTimeIndex, endTime);
        // 範囲外なら空
        if (beginItemIndex === -1 || endItemIndex === -1) {
            return [];
        }
        return this.items.slice(beginItemIndex, endItemIndex);
    }

}