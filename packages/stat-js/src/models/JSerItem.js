// LICENSE : MIT
"use strict";
export default class JSerItem {
    constructor(item) {
        /** @type string */
        this.title = item["title"];
        /** @type string */
        this.url = item["url"];
        /** @type string[] */
        this.tags = item["tags"] || [];
        /** @type Date */
        this.date = new Date(item["date"]);
        /** @type JSerItemRelatedLink */
        this.relatedLinks = item["relatedLinks"] || [];
    }
}