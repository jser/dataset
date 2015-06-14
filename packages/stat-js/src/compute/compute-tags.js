// LICENSE : MIT
"use strict";
export function countByGroup(weeks) {
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