// LICENSE : MIT
"use strict";
/**
 * {タグ名:出現回数}のオブジェクトを返す
 * @param {JSerWeek[]} weeks
 * @returns {{string:number}}
 */
export function countTagsByGroup(weeks) {
    return countByGroup(weeks, function (item) {
        var rank = {};
        item.tags.forEach(function (tag) {
            rank[tag] = ++rank[tag] || 1;
        });
        return rank;
    });
}
export function countByGroup(weeks, countFn) {
    var rank = {};
    weeks.forEach(function (week) {
        week.items.forEach(function (item) {
            var ret = countFn(item);
            var keys = Object.keys(ret);
            keys.forEach(function (key) {
                rank[key] = (rank[key] || 0) + ret[key];
            });
        });
    });
    return rank;
}