// MIT © 2017 azu
"use strict";
const classifier = require("jser-classifier-item-category").classifier;
const JSerStat = require("jser-stat").JSerStat;
const stat = new JSerStat();
const items = stat.findItemsBetween(new Date(2016, 1, 1), new Date(2017, 1, 1));
const outputHTML = (items) => {
    let lists = items.map(item => {
        return `<li>${item.category}: <a href="${item.url}">${item.title}</a></li>`;
    });
    return `<ul>
    ${lists.join("\n")}
</ul>`
};
const categorizedItems = items.map(item => {
    const category = classifier.classifyItem(item);
    return {
        title: item.title,
        url: item.url,
        category
    };
});
const HTML = outputHTML(categorizedItems);
require("fs").writeFileSync(__dirname + "/index.html", HTML, "utf-8");