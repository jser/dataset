// MIT © 2017 azu
"use strict";
const remarkAbstract = require("remark");
const remark = remarkAbstract();
const findAllAfter = require('unist-util-find-all-after');
const difference = require('lodash.difference');
const select = require('unist-util-select');
const is = require('unist-util-is');
const Category = require("./category");
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
    const nodesIgnores = findAllAfter(parent, end);
    return difference(nodesAfter, nodesIgnores, (nodeA, nodeB) => {
        return is(nodeA, nodeB);
    });
};
const getGroupKey = (htmlNode) => {
    const value = htmlNode.value;
    const [matchKey] = Object.keys(Category).filter(key => {
        return value.includes(Category[key]);
    });
    if (matchKey === undefined) {
        const [compatibleMatchKey] =  Object.keys(Category).filter(key => {
            return value.includes(CompatibleCategory[key]);
        });
        if (compatibleMatchKey) {
            return compatibleMatchKey;
        }
        throw new Error(`${htmlNode.value} is not category`);
    }
    return matchKey;
};
/**
 * @param {string} content
 * @returns {[*]}
 */
module.exports = function (content) {
    const AST = remark.parse(content);
    const allCategory = select(AST, 'html[value*=<h1]');
    const allLinks = select(AST, 'heading ~ paragraph > link');
    const results = [];
    allCategory.forEach((categoryNode, index) => {
        const nextCategoryNode = allCategory[index + 1];
        const currentCategory = getGroupKey(categoryNode);
        const currentCategoryNodes = betweenNodes(AST, categoryNode, nextCategoryNode);
        currentCategoryNodes.forEach(categoryNode => {
            const targetLinkNodes = select(categoryNode, 'link');
            if (targetLinkNodes.length === 0) {
                return;
            }
            const targetLinkNode = targetLinkNodes[0];
            // if this node is currentCategory, add results as currentCategory node
            allLinks.forEach(linkNode => {
                const isLinkNodeCurrentCategory = is(targetLinkNode, linkNode);
                if (isLinkNodeCurrentCategory) {
                    results.push({
                        category: currentCategory,
                        url: linkNode.url
                    });
                }
            });
        });
    });
    return results;
};