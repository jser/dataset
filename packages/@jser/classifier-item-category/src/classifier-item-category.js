// MIT © 2017 azu
"use strict";
import learnJSerInfo from "./jser-info-learning";
import getAbsoluteTag from "./jser-info-absolute-tag";

import { CategoryKey } from "@jser/post-parser";
const natural = require("natural");
/**
 * @param {PostDetailItem} item
 * @returns {string}
 */
const stringifyJSerItem = (item) => {
    const tags = item.tags ? item.tags.map(tag => `__${tag}__`).join(", ")
        : "";
    return `${tags} ${item.url} "${item.title}" ${item.content}`;
};
// タグでカテゴリが決まるものは学習しない
const NO_TRAIN_CATEGORY = [CategoryKey.Headline];
/**
 * @param {PostDetailItem} item
 * @returns {boolean}
 */
const noTrainCategory = (item) => {
    return NO_TRAIN_CATEGORY.includes(item.category);
}
/**
 * @param {PostDetail[]} postDetails
 * @returns {*}
 */
const createClassifier = ({ postDetails }) => {
    const classifier = new natural.BayesClassifier();
    // setup
    postDetails.forEach(postDetail => {
        postDetail.items.forEach(item => {
            if (noTrainCategory(item)) {
                return;
            }
            const category = item.category;
            const itemDate = stringifyJSerItem(item);
            classifier.addDocument(itemDate, category);
        });
    });
    learnJSerInfo(classifier);
    classifier.train();
    return classifier;
};

export class JSerClassifier {
    /**
     * @param {PostDetail[]} postDetails json data
     */
    constructor({ postDetails }) {
        this.classifier = createClassifier({ postDetails });
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
}
