// LICENSE : MIT
"use strict";
var fs = require("fs");
var path = require("path");
var http = require("http");
var URLMap = require("./url-mapping");
function getURLAsync(URL) {
    return new Promise(function (resolve, reject) {
        http.get(URL, function (res) {
            var body = '';
            res.setEncoding('utf8');

            res.on('data', function (chunk) {
                body += chunk;
            });
            res.on('end', function (res) {
                resolve(String(body));
            });
        }).on('error', function (e) {
            reject("Got error: " + e.message);
        });
    });
}

var posts = getURLAsync(URLMap.posts.json);
var items = getURLAsync(URLMap.items.json);
Promise.all([posts, items]).then(function ([posts, items]) {
    fs.writeFileSync(path.join(__dirname, "posts.json"), posts, "utf-8");
    fs.writeFileSync(path.join(__dirname, "items.json"), items, "utf-8");
}).catch(console.error.bind(console));