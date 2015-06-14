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
                resolve(JSON.parse(body));
            });
        }).on('error', function (e) {
            reject("Got error: " + e.message);
        });
    });
}
function saveAsync(filePath, body) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(filePath, JSON.stringify(body), function (error, response) {
            if (error) {
                return reject(error);
            }
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