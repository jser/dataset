// LICENSE : MIT
"use strict";
var fs = require("fs");
var path = require("path");
var http = require("http");
var request = require("request");
var URLMap = require("./url-mapping");
if (typeof Promise === "undefined") {
    console.log("This env doesn't support Promise");
    process.exit(0);
}
function getURLAsync(URL) {
    return new Promise(function (resolve, reject) {
        request(URL, function (error, response, body) {
            if (error) {
                return reject(error);
            }
            if (response.statusCode == 200) {
                resolve(JSON.parse(body));
            } else {
                reject('error: ' + response.statusCode);
            }
        })
    });
}
function saveAsync(filePath, body) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filePath, JSON.stringify(body), function (error, response) {
            if (error) {
                return reject(error);
            }
            console.log("Saved! " + filePath);
            resolve(response);
        });
    });
}
var posts = getURLAsync(URLMap.posts.json);
var items = getURLAsync(URLMap.items.json);
Promise.all([posts, items]).then(function (results) {
    var postData = results[0];
    var itemData = results[1];
    // 昇順となるように合わせる
    var postsFs = saveAsync(path.join(__dirname, "posts.json"), postData.reverse());
    var itemsFs = saveAsync(path.join(__dirname, "items.json"), itemData);
    return Promise.all([postsFs, itemsFs]);
}).catch(function (error) {
    console.error(error.stack)
});