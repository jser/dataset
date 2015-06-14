// LICENSE : MIT
"use strict";

export default class JSerPost {
    constructor() {
        this.title = "";
        this.url = "";
        this.content = "";
        this.category = "";
        this.date = new Date();
        /** @type string[] */
        this.tags = [];
    }
}