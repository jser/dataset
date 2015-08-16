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
        /** @type {JSerItem[]} */
        this._items = [];
        this._algoItem = algoItem;
    }

    get items() {
        if (this._items.length === 0) {
            var pastDate = new Date(1995, 11, 17);
            this._items = this._algoItem.findItemsBetween(this.beginDate || pastDate, this.endDate)
        }
        return this._items;
    }
}