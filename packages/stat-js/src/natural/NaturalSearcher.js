// LICENSE : MIT
"use strict";
const TfIdf = require("natural/lib/natural/tfidf/tfidf");
// merge sort
let mergeSort = (arr) => {
    if (arr.length < 2) {
        return arr;
    }

    let middle = parseInt(arr.length / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
};

let merge = (left, right) => {
    let result = [];

    while (left.length && right.length) {
        right[0].measure <= left[0].measure ?
        result.push(left.shift()) :
        result.push(right.shift());
    }

    while (left.length) {
        result.push(left.shift());
    }
    while (right.length) {
        result.push(right.shift());
    }

    return result;
};
var ignoreWord = function (word) {
    if (word.length <= 1) {
        return false;
    }
    // 数字と.のみは除外
    if (/^v?[\d\.]+$/.test(word)) {
        return false;
    }
    if (/[\?&=]/.test(word)) {
        return false
    }
    if (/^\.(html|md|php)$/i.test(word)) {
        return false
    }
    return true;
};
function urlToWords(url) {
    var pathList = url.split("/");
    var pathNames = pathList[pathList.length - 1].split(/([-_]|\.html$|\.md$|\.php$|#)/i);
    return pathNames.filter(ignoreWord);

}
export default class NaturalSearcher {
    constructor(items) {
        this.items = items;
        this.tfidf = new TfIdf();
        this.addItemsAsDocuments(this.items);
    }

    addItemsAsDocuments(items) {
        items.forEach((item) => {
            var urlKeyString = urlToWords(item.url).join(" ");
            var relatedString = item.relatedLinks.map(function (relatedObject) {
                return relatedObject.title + " " + urlToWords(relatedObject.url).join(" ")
            }).join("");
            var tagsString = (item.tags || []).join(" ");
            // 全部を使うと長すぎるコンテンツが有利になりすぎるので絞る
            var slicedContent = item.content.slice(0, 200);
            this.tfidf.addDocument(item.title + "\n" + tagsString + "\n" + slicedContent + "\n" + urlKeyString + "\n" + relatedString);
        });
    }

    /**
     *
     * @param {JSerItem} targetItem
     * @param {number} limit
     */
    findRelatedItems(targetItem, limit) {
        var targetIndex = this.items.indexOf(targetItem);
        if (targetIndex === -1) {
            this.items.some(function (item, index) {
                if (item.isEqualItem(item)) {
                    targetIndex = index;
                    return true;
                }
            });
            if (targetIndex === -1) {
                throw new Error("Not found this item: " + targetItem);
            }
        }
        var terms = this.tfidf.listTerms(targetIndex);
        var results = [];
        this.tfidf.tfidfs(terms.map(function (term) {
            return term.term
        }), function (i, measure) {
            results.push({
                index: i,
                measure: measure
            });
        });
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