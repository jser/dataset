// LICENSE : MIT
"use strict";
import * as assert from "assert";
import RelatedLink from "./JSerItemRelatedLink";

export class JSerItem {
    title: string;
    url: string;
    content: string;
    tags: string[];
    date: Date;
    relatedLinks: {
        title: string;
        url: string;
    }[];

    constructor(item: any) {
        /** @type {string} */
        this.title = item["title"];
        /** @type {string} */
        this.url = item["url"];
        /** @type {string} */
        this.content = item["content"];
        /** @type {string[]} */
        this.tags = item["tags"] || [];
        /** @type {Date} */
        this.date = new Date(item["date"]);
        var relatedLinks = item["relatedLinks"] || [];
        /** @type {JSerItemRelatedLink[]} */
        this.relatedLinks = relatedLinks.map(function(link: any) {
            return new RelatedLink(link);
        });
    }

    /**
     * @param {JSerItem} item
     * @returns {boolean}
     */
    isEqualItem(item: JSerItem) {
        assert(item != null, "item should not be null");
        return this.url === item.url;
    }
}
