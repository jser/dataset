// MIT © 2017 azu
"use strict";
import { ContentParser } from "./content-parser";
import { addLineBreakAfterHTML } from "./patch/add-line-break-after-html";
import * as path from "path";
import moment = require("moment-timezone");
import urlJoin = require('url-join');

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

export interface PostDetail {
    meta: ParseMetaResult;
    items: PostDetailItem[];
}

export interface PostDetailItem {
    category: string;
    title: string;
    url: string;
    tags: string[];
    content: string;
    relatedLinks: { url: string; title: string }[];
}

export interface ParseDetailsOptions {
    // Example: baseURL is `https://jser.info/`
    // https://jser.info/2018/05/02/node.js-10.0.0-npm-6.0.0-electron-2.0.0/
    // It is used for meta.url
    // Default: https://jser.info/
    baseURL?: string;
    // markdown filePath
    // It is used for meta.date and meta.url
    filePath?: string;
}

function getMeta(AST: any, options?: ParseDetailsOptions): ParseMetaResult {
    const frontMatter = select.one(AST, "yaml");
    const meta = jsYaml.safeLoad(frontMatter.value, "utf8");
    if (options && options.filePath) {
        const fileName = path.basename(options.filePath);
        const result = fileName.match(/(\d{4})-(\d{2})-(\d{2})-(.*)\.md$/);
        if (!result) {
            throw new Error("No match date file name");
        }
        const year = result[1];
        const month = result[2];
        const day = result[3];
        const slug = result[4];
        // use default date
        if (meta.date) {
            meta.date = moment.tz(meta.date, "Asia/Tokyo").utc().toISOString();
        } else {
            meta.date = moment.utc(`${year}-${month}-${day}`, "YYYY-MM-DD").tz("Asia/Tokyo").toISOString();
        }
        // set url
        const baseURL = options.baseURL || "https://jser.info/";
        const utcDate = meta.date ? moment.tz(meta.date, "Asia/Tokyo") : moment.utc(`${year}-${month}-${day}`, "YYYY-MM-DD").tz("Asia/Tokyo");
        meta.url = urlJoin(baseURL, `${utcDate.format("YYYY/MM/DD")}/${slug}/`)
    }
    return meta;
}

function getItems(AST: any, content: string): PostDetailItem[] {
    const allCategory = select(AST, "html[value*=<h1]");
    const results: PostDetailItem[] = [];
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
    return results;
}

/**
 * parse and return items and meta
 */
export function parse(content: string, options?: ParseDetailsOptions): PostDetail {
    const AST = remark.parse(addLineBreakAfterHTML(content));
    const meta = getMeta(AST, options);
    const results = getItems(AST, content);
    return {
        meta,
        items: results
    };
}
