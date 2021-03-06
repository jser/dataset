// LICENSE : MIT
"use strict";
import { JSerItem } from "../models/JSerItem";
// @ts-ignore
import { TfIdf } from "natural";

// merge sort
let mergeSort = (arr: any[]): any => {
    if (arr.length < 2) {
        return arr;
    }

    let middle = arr.length / 2,
        left = arr.slice(0, middle),
        right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
};

let merge = (left: any, right: any) => {
    let result = [];

    while (left.length && right.length) {
        right[0].measure <= left[0].measure ? result.push(left.shift()) : result.push(right.shift());
    }

    while (left.length) {
        result.push(left.shift());
    }
    while (right.length) {
        result.push(right.shift());
    }

    return result;
};
var ignoreWord = function (word: string) {
    if (word.length <= 1) {
        return false;
    }
    // 数字と.のみは除外
    if (/^v?[\d\.]+$/.test(word)) {
        return false;
    }
    if (/[\?&=]/.test(word)) {
        return false;
    }
    if (/^\.(html|md|php)$/i.test(word)) {
        return false;
    }
    return true;
};

function urlToWords(url: string) {
    var pathList = url.split("/");
    var pathNames = pathList[pathList.length - 1].split(/([-_]|\.html$|\.md$|\.php$|#)/i);
    return pathNames.filter(ignoreWord);
}

export default class NaturalSearcher {
    private items: JSerItem[];
    private tfidf: any;

    constructor(items: JSerItem[]) {
        this.items = items;
        this.tfidf = new TfIdf();
        this.addItemsAsDocuments(this.items);
    }

    addItemsAsDocuments(items: JSerItem[]) {
        items.forEach((item) => {
            var urlKeyString = urlToWords(item.url).join(" ");
            var relatedString = item.relatedLinks
                .map(function (relatedObject) {
                    return relatedObject.title + " " + urlToWords(relatedObject.url).join(" ");
                })
                .join("");
            var tagsString = (item.tags || []).join(" ");
            // 全部を使うと長すぎるコンテンツが有利になりすぎるので絞る
            var slicedContent = item.content.slice(0, 200);
            this.tfidf.addDocument(
                item.title + "\n" + tagsString + "\n" + slicedContent + "\n" + urlKeyString + "\n" + relatedString
            );
        });
    }

    /**
     *
     * @param {JSerItem} targetItem
     * @param {number} limit
     */
    findRelatedItems(targetItem: JSerItem, limit: number) {
        var targetIndex = this.items.indexOf(targetItem);
        if (targetIndex === -1) {
            this.items.some(function (item, index) {
                if (item.isEqualItem(item)) {
                    targetIndex = index;
                    return true;
                }
                return false;
            });
            if (targetIndex === -1) {
                throw new Error("Not found this item: " + targetItem);
            }
        }
        var terms = this.tfidf.listTerms(targetIndex);
        var results: any[] = [];
        this.tfidf.tfidfs(
            terms.map(function (term: any) {
                return term.term;
            }),
            function (i: number, measure: any) {
                results.push({
                    index: i,
                    measure: measure,
                });
            }
        );
        var sorted = mergeSort(results);
        // tifidf -> item
        var matchItems = [];
        for (var i = 0, len = Math.min(sorted.length, limit + 1); i < len; i++) {
            // 自分自身は含めない
            let matchItem = this.items[sorted[i].index];
            if (this.items[targetIndex].isEqualItem(matchItem)) {
                continue;
            }
            matchItems.push(matchItem);
        }
        return matchItems;
    }
}
