// LICENSE : MIT
"use strict";
export class JSerPost {
    // start with 1
    postNumber: number;
    /** @type {string} */
    title: string;
    /** @type {string} */
    url: string;
    /** @type {string} */
    content: string;
    /** @type {string} */
    category: string;
    /** @type {Date} */
    date: Date;
    /** @type {string[]} */
    tags: string[];

    constructor(number: number, post: any) {
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
