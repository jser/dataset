// LICENSE : MIT
"use strict";
export default class JSerItemRelatedLink {
    title: string;
    url: string;

    constructor(link: any) {
        /** @type {string} */
        this.title = link["title"];
        /** @type {string} */
        this.url = link["url"];
    }
}
