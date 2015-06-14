// LICENSE : MIT
"use strict";
/**
 * {タグ名:出現回数}のオブジェクトを返す
 * @param weeks
 * @returns {{string:number}}
 */
export function countTagsByGroup(weeks) {
    var rank = {};
    weeks.forEach(function (week) {
        week.items.forEach(function (item) {
            item.tags.forEach(function (tag) {
                rank[tag] = ++rank[tag] || 1;
            });
        });
    });
    return rank;
}