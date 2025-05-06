// LICENSE : MIT
"use strict";
import { JSerWeek } from "../models/JSerWeek";
import { JSerItem } from "../models/JSerItem";

/**
 * {タグ名:出現回数}のオブジェクトを返す
 * @param {JSerWeek[]} weeks
 * @returns {{string:number}}
 */
export function countTagsByGroup(weeks: JSerWeek[]): { [index: string]: number } {
    return countByGroup(weeks, function (item: JSerItem) {
        var rank: any = {};
        item.tags.forEach(function (tag) {
            rank[tag] = ++rank[tag] || 1;
        });
        return rank;
    });
}

/**
 * Counts items by group based on a provided counting function, aggregating the results.
 *
 * @param {JSerWeek[]} weeks - An array of JSerWeek objects. Each JSerWeek contains items to process.
 * @param {Function} countFn - A function that processes an item and returns an object where keys represent group names
 *                             and values represent counts to be aggregated.
 * @return {Object} An object where keys are group names and values are the aggregated counts for those groups.
 */
export function countByGroup(weeks: JSerWeek[], countFn: any): { [index: string]: number } {
    var rank: any = {};
    weeks.forEach(function (week) {
        week.items.forEach(function (item) {
            var ret = countFn(item);
            var keys: string[] = Object.keys(ret);
            keys.forEach(function (key) {
                rank[key] = (rank[key] || 0) + ret[key];
            });
        });
    });
    return rank;
}
