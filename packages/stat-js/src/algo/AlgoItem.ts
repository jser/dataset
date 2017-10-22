// LICENSE : MIT
"use strict";
import { findIndexesBetween } from "./algoSearch";
import { JSerItem } from "../models/JSerItem";

// for algorithm
export class AlgoItem {
    private items: JSerItem[];
    private itemTimes: number[];

    /**
     *
     * @param {JSerItem[]} items
     */
    constructor(items: JSerItem[]) {
        this.items = items;
        /**
         * @type number[] 昇順となった各Itemのtime配列
         */
        this.itemTimes = items.map(function(item) {
            return item.date.getTime();
        });
    }

    /**
     *
     * @param {Date} beginDate
     * @param {Date} endDate
     * @returns {JSerItem[]}
     */
    findItemsBetween(beginDate: Date, endDate: Date) {
        const indexes = findIndexesBetween(this.itemTimes, beginDate, endDate);
        const first = indexes[0];
        const last = indexes[indexes.length - 1];
        if (indexes.length === 0) {
            return [];
        }
        if (first > last) {
            return [];
        }
        return this.items.slice(first, last + 1);
    }
}
