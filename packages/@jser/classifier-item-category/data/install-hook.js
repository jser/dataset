// LICENSE : MIT
"use strict";
const fs = require("fs");
const path = require("path");
const request = require("request");
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
const promise = getURLAsync("https://jser.info/public/build/item-category.json");
const filePath = path.join(__dirname, "item-category.json");
promise.then(items => {
    return saveAsync(filePath, items);
}).catch(function (error) {
    console.error(error.stack)
});