// LICENSE : MIT
"use strict";
import JSerPost from "./JSerPost"
import JSerItem from "./JSerItem"
class JSerWeek {
    constructor() {
        this.beginDate = new Date();
        this.endDate = new Date();
        /** @type JSerPost */
        this.post = null;
        /** @type JSerItem[]*/
        this.items = [];
    }
}