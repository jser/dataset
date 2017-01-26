// MIT © 2017 azu
"use strict";
const natural = require("natural");
const url = require("url");
const itemCategory = require("../data/item-category.json");
const categoryMap = new Map();
/**
 * @param {JSerItem} item
 * @returns {string}
 */
const stringifyJSerItem = (item) => {
    return `${item.tags.join(", ")} "${item.url}" "${item.title}" ${item.content}`;
};
const createClassifier = ({itemCategory, jserStat}) => {
    const classifier = new natural.BayesClassifier();
    /**
     * @type {JSerItem[]}
     */
    const allItems = jserStat.items;
    // setup
    itemCategory.forEach(item => {
        categoryMap.set(item.url, item.category);
    });
    allItems.forEach(item => {
        if (!categoryMap.has(item.url)) {
            return;
        }
        const category = categoryMap.get(item.url);
        const itemDate = stringifyJSerItem(item);
        classifier.addDocument(itemDate, category);
    });
    classifier.train();
    return classifier;
};

module.exports = class JSerClassifier {
    /**
     * @param {Array} itemCategory json data
     * @param {JSerStat} jserStat
     */
    constructor({itemCategory, jserStat}) {
        this.itemCategory = itemCategory;
        this.jserStat = jserStat;
        this.classifier = createClassifier({itemCategory, jserStat});
    }

    /**
     * @param {JSerItem} jserItem
     * @returns {string} Category of jser-item-category-parser
     */
    classifyItem(jserItem) {
        return this.classifier.classify(stringifyJSerItem(jserItem));
    }

    /**
     * @param {string} text
     * @returns {string} Category of jser-item-category-parser
     */
    classifyText(text) {
        return this.classifier.classify(text);
    }
};