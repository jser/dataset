// LICENSE : MIT
"use strict";
import binarysearch from "binarysearch"
export function findIndexesBetween(times, beginDate, endDate) {
    var beginTime = beginDate.getTime();
    var endTime = endDate.getTime();
    return binarysearch.range(times, beginTime, endTime);
}
export function findIndexBiggerTime(array, time) {
    var currentIndex = 0;
    for (var i = currentIndex; i < array.length; i++) {
        var comparedTime = array[i];
        if (time >= comparedTime) {
            currentIndex = i;
        } else {
            // timeより大きいものが出てきたら直前のものを返す
            return currentIndex;
        }
    }
    return -1
}

export function findIndexLessTime(array, time) {
    var currentIndex = array.length - 1;
    for (var i = currentIndex; i >= 0; i--) {
        var comparedTime = array[i];
        if (time < comparedTime) {
            currentIndex = i;
        } else {
            // timeよりも小さいものが出てきたら直前のものを返す
            return currentIndex;
        }
    }
    return -1;
}

function compare_number(a, b) {
    return a - b;
}