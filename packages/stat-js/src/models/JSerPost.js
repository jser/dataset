// LICENSE : MIT
"use strict";
export default class JSerPost {
    constructor(number, post) {
        /** @type {number} */
            // start with 1
        this.postNumber = number;
        /** @type {string} */
        this.title = post["title"];
        /** @type {string} */
        this.url = post["url"];
        /** @type {string} */
        this.content = post["content"];
        /** @type {string} */
        this.category = post["category"];
        /** @type {Date} */
        this.date = new Date(post["date"]);
        /** @type {string[]} */
        this.tags = post["tags"] || [];
    }
}