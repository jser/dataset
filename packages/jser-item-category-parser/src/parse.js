// MIT © 2017 azu
"use strict";
import { ContentParser } from "./content-parser";

const remarkAbstract = require("remark");
const remark = remarkAbstract();
const findAllAfter = require("unist-util-find-all-after");
const difference = require("lodash.difference");
const select = require("unist-util-select");
const is = require("unist-util-is");
const Category = require("./category").Category;
const CompatibleCategory = require("./category").CompatibleCategory;

/**
 *
 * @param {Object} parent
 * @param {Object} start
 * @param {Object} [end]
 * @returns {Array}
 */
const betweenNodes = (parent, start, end) => {
    const nodesAfter = findAllAfter(parent, start);
    if (!end) {
        return nodesAfter;
    }
    const nodesIgnores = [end].concat(findAllAfter(parent, end));
    return difference(nodesAfter, nodesIgnores, (nodeA, nodeB) => {
        return is(nodeA, nodeB);
    });
};
const getGroupKey = htmlNode => {
    const value = htmlNode.value;
    const [matchKey] = Object.keys(Category).filter(key => {
        return value.indexOf(Category[key]) !== -1;
    });
    if (matchKey !== undefined) {
        return matchKey;
    }
    const [compatibleMatchKey] = Object.keys(Category).filter(key => {
        return value.indexOf(CompatibleCategory[key]) !== -1;
    });
    if (compatibleMatchKey) {
        return compatibleMatchKey;
    }
    return null;
};
/**
 * @param {string} content
 * @returns {[*]}
 */
module.exports = function(content) {
    const AST = remark.parse(content);
    const allCategory = select(AST, "html[value*=<h1]");
    const results = [];
    allCategory.forEach((categoryNode, index) => {
        const nextCategoryNode = allCategory[index + 1];
        const currentCategory = getGroupKey(categoryNode);
        // not found category
        if (currentCategory === null) {
            return;
        }
        const currentCategoryNodes = betweenNodes(AST, categoryNode, nextCategoryNode);
        const contentParser = new ContentParser();
        contentParser.process(currentCategoryNodes, content);
        contentParser.contents.forEach(content => {
            results.push({
                category: currentCategory,
                title: content.title,
                url: content.url,
                tags: content.tags,
                content: content.content,
                relatedLinks: content.relatedLinks
            });
        });
    });
    return results;
};
