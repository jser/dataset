// LICENSE : MIT
"use strict";
import RelatedLink from "./JSerItemRelatedLink"
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
        var relatedLinks = item["relatedLinks"] || [];
        /** @type JSerItemRelatedLink[] */
        this.relatedLinks = relatedLinks.map(function (link) {
            return new RelatedLink(link);
        });
    }
}