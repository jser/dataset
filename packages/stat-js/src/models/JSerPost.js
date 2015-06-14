// LICENSE : MIT
"use strict";
export default class JSerPost {
    constructor(post) {
        this.title = post["title"];
        this.url = post["url"];
        this.content = post["content"];
        this.category = post["category"];
        this.date = new Date(post["date"]);
        /** @type string[] */
        this.tags = post["tags"] || [];
    }
}