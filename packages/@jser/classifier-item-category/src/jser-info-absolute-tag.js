// MIT © 2017 azu
"use strict";

import { CategoryKey } from "@jser/post-parser";

/**
 *
 * @param {string} tag
 * @returns {string|null}
 */
const matchTagWithCategory = (tag) => {
    switch (tag) {
        case "article":
            return CategoryKey.Article;
        case "news":
            return CategoryKey.Headline;
        case "slide":
        case "video":
            return CategoryKey.SlideVideo;
        case "book":
        case "ebook":
            return CategoryKey.Book;

        default:
            return null;
    }
};
/**
 * 特定のtagは特定のカテゴリに分類する絶対的な基準を扱います。
 * ここでの決定は最も強い影響力があります。
 * @param {JSerItem} jserItem
 * @return {string|null}
 */
export default function (jserItem) {
    if(!jserItem.tags){
        return;
    }
    for (let tag of jserItem.tags) {
        const matchTag = matchTagWithCategory(tag);
        if (matchTag) {
            return matchTag;
        }
    }
    return null;
}
