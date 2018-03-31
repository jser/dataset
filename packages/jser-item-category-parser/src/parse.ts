// MIT © 2017 azu
"use strict";
import { ContentParser } from "./content-parser";
import { addLineBreakAfterHTML } from "./patch/add-line-break-after-html";
import * as path from "path";
import moment = require("moment");

const unified = require("unified");
const markdown = require("remark-parse");
const frontmatter = require("remark-frontmatter");
const jsYaml = require("js-yaml");
const remark = unified()
    .use(markdown)
    .use(frontmatter);
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
const betweenNodes = (parent: any, start: any, end: any) => {
    const nodesAfter = findAllAfter(parent, start);
    if (!end) {
        return nodesAfter;
    }
    const nodesIgnores = [end].concat(findAllAfter(parent, end));
    return difference(nodesAfter, nodesIgnores, (nodeA: any, nodeB: any) => {
        return is(nodeA, nodeB);
    });
};
const getGroupKey = (htmlNode: any) => {
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

export interface ParseMetaResult {
    title: string;
    author: string;
    layout: string;
    category: string;
    // iso string
    date?: string;
    tag: string[];
}

export interface ParseResult {
    meta: ParseMetaResult;
    items: ParseItemResult[];
}

export interface ParseItemResult {
    category: string;
    title: string;
    url: string;
    tags: string[];
    content: string;
    relatedLinks: { url: string; title: string }[];
}

/**
 * @param {string} content
 * @returns {[*]}
 */
export function parse(content: string): ParseItemResult[] {
    return parseDetails(content).items;
}

export interface ParseDetailsOptions {
    filePath?: string;
}

export function parseDetails(content: string, options?: ParseDetailsOptions): ParseResult {
    const AST = remark.parse(addLineBreakAfterHTML(content));
    const frontMatter = select.one(AST, "yaml");
    const meta = jsYaml.safeLoad(frontMatter.value, "utf8");
    if (meta.date) {
        meta.date = moment.utc(meta.date).toISOString();
    } else if (options && options.filePath) {
        const fileName = path.basename(options.filePath);
        const result = fileName.match(/(\d{4})-(\d{2})-(\d{2})/);
        if (!result) {
            throw new Error("No match date file name");
        }
        const year = Number(result[1]);
        const month = Number(result[2]);
        const day = Number(result[3]);
        meta.date = moment.utc(`${year}-${month}-${day}`, "YYYY-MM-DD").toISOString();
    }
    const allCategory = select(AST, "html[value*=<h1]");
    const results: ParseItemResult[] = [];
    allCategory.forEach((categoryNode: any, index: number) => {
        const nextCategoryNode = allCategory[index + 1];
        const currentCategory = getGroupKey(categoryNode);
        // not found category
        if (currentCategory === null) {
            return;
        }
        const currentCategoryNodes = betweenNodes(AST, categoryNode, nextCategoryNode);
        const contentParser = new ContentParser();
        const contents = contentParser.process(currentCategoryNodes, content);
        contents.forEach(content => {
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
    return {
        meta,
        items: results
    };
}
