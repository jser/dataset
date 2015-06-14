// LICENSE : MIT
"use strict";
export default class JSerPost {
    constructor(post) {
        /** @type string */
        this.title = post["title"];
        /** @type string */
        this.url = post["url"];
        /** @type string */
        this.content = post["content"];
        /** @type string */
        this.category = post["category"];
        this.date = new Date(post["date"]);
        /** @type string[] */
        this.tags = post["tags"] || [];
    }
}