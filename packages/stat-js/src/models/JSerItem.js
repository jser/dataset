// LICENSE : MIT
"use strict";
export default class JSerItem {
    constructor() {
        this.title = "";
        this.url = "";
        /** @type string[] */
        this.tags = [];
        this.date = new Date;
        /** @type JSerItemRelatedLink */
        this.relatedLinks = [];
    }
}