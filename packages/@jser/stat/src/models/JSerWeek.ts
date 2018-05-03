// LICENSE : MIT
"use strict";
import { JSerPost } from "./JSerPost";
import { AlgoItem } from "../algo/AlgoItem";
import { JSerItem } from "./JSerItem";

export class JSerWeek {
    weekNumber: number;
    beginDate: Date;
    endDate: Date;
    post: JSerPost;
    private _items: Array<JSerItem>;
    private _algoItem: AlgoItem;

    constructor(currentPost: JSerPost, prevPost: JSerPost, algoItem: AlgoItem) {
        /** @type {number} */
        this.weekNumber = currentPost.postNumber;
        /**
         * first post has not date, fill with real firstWeek
         * new Date("2010-12-31T15:00:00.000Z") is actual started date
         * @type {Date}
         * */
        this.beginDate = prevPost ? prevPost.date : new Date("2010-12-31T15:00:00.000Z");
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
            this._items = this._algoItem.findItemsBetween(this.beginDate, this.endDate);
        }
        return this._items;
    }
}
