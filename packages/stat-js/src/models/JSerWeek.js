// LICENSE : MIT
"use strict";
export default class JSerWeek {
    constructor(currentPost, nextPost, algoItem) {
        /** @type {number} */
        this.weekNumber = currentPost.postNumber;
        /** @type {Date} */
        this.beginDate = currentPost.date;
        /** @type {Date} */
        this.endDate = nextPost ? nextPost.date : null;
        /** @type {JSerPost} */
        this.post = currentPost;
        /** @type {JSerItem[]} */
        this.items = algoItem.findItemsBetween(this.beginDate, this.endDate || new Date());
    }
}