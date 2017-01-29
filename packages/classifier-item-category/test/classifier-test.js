// MIT © 2017 azu
"use strict";
const assert = require("assert");
const JSerStat = require("jser-stat").JSerStat;
const CategoryKey = require("jser-item-category-parser").CategoryKey;
const classifier = require("../src/index").classifier;
const stat = new JSerStat();

describe("classifier", () => {
    it("#classifyItem should return Category", () => {
        const category = classifier.classifyItem({
            title: "classifier-item-category GitHub",
            url: "https://github.com/jser/classifier-item-category",
            content: "アイテムをカテゴリ分類するlibrary",
            tags: ["library", "node.js", "JavaScript"]
        });
        assert(category === CategoryKey.SoftwareLibrary);
    });
    it("#classifyText should return Category", () => {
        const category = classifier.classifyText("これはGitHubで公開されている言語処理のライブラリです");
        assert(category === CategoryKey.SoftwareLibrary);
    });
    it("test case 書籍に分類されていた", () => {
        const item = stat.findItemWithURL("https://developers.google.com/web/updates/2017/01/scrolling-intervention");
        const category = classifier.classifyItem(item);
        assert(category === CategoryKey.Article)
    })
});