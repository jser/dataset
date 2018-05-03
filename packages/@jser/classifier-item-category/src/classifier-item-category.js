// MIT © 2017 azu
"use strict";
import learnJSerInfo from "./jser-info-learning";
import getAbsoluteTag from "./jser-info-absolute-tag";

const natural = require("natural");
const categoryMap = new Map();
/**
 * @param {JSerItem} item
 * @returns {string}
 */
const stringifyJSerItem = (item) => {
    const tags = item.tags ? item.tags.map(tag => `__${tag}__`).join(", ")
                         : "";
    return `${ tags} ${item.url} "${item.title}" ${item.content}`;
};
/**
 * @param {Object[]} itemCategories
 * @param {JSerItem[]} items
 * @returns {*}
 */
const createClassifier = ({ itemCategories, items }) => {
    const classifier = new natural.BayesClassifier();
    const allItems = items;
    // setup
    itemCategories.forEach(item => {
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
    learnJSerInfo(classifier);
    classifier.train();
    return classifier;
};

module.exports = class JSerClassifier {
    /**
     * @param {Object[]} itemCategories json data
     * @param {JSerItem[]} items
     */
    constructor({ itemCategories, items }) {
        this.items = items;
        this.itemCategories = itemCategories;
        this.classifier = createClassifier({ itemCategories, items });
    }

    /**
     * @param {JSerItem} jserItem
     * @returns {string} Category of jser-item-category-parser
     */
    classifyItem(jserItem) {
        const absoluteTag = getAbsoluteTag(jserItem);
        if (absoluteTag) {
            return absoluteTag
        }
        return this.classifier.classify(stringifyJSerItem(jserItem));
    }

    /**
     * @param {JSerItem} jserItem
     * @returns {Array}
     */
    getClassifications(jserItem) {
        return this.classifier.getClassifications(stringifyJSerItem(jserItem));
    }

    /**
     * @param {string} text
     * @returns {string} Category of jser-item-category-parser
     */
    classifyText(text) {
        return this.classifier.classify(text);
    }
};