// LICENSE : MIT
"use strict";
export default class JSerWeek {
    constructor(currentPost, prevPost, algoItem) {
        /** @type {number} */
        this.weekNumber = currentPost.postNumber;
        /** @type {Date} */
        this.beginDate = prevPost ? prevPost.date : null;
        /** @type {Date} */
        this.endDate = currentPost.date;
        /** @type {JSerPost} */
        this.post = currentPost;
        var pastDate = new Date(1995, 11, 17);
        /** @type {JSerItem[]} */
        this.items = algoItem.findItemsBetween(this.beginDate || pastDate, this.endDate);
    }
}