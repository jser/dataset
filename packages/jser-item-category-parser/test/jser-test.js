// MIT © 2017 azu
"use strict";
const fs = require("fs");
const assert = require("assert");
const path = require("path");
const { parseDetails } = require("../src/index");

const fixturesDir = path.join(__dirname, "jser.github.io");
describe("Snapshot testing", () => {
    fs
        .readdirSync(fixturesDir)
        .filter(filePath => {
            return path.extname(filePath) === ".md";
        })
        .forEach(caseName => {
            it(`Test ${caseName}`, function() {
                const postMarkdownFile = path.join(fixturesDir, caseName);
                const actual = parseDetails(postMarkdownFile);
                const expectedFilePath = `${postMarkdownFile}.json`;
                // UPDATE_SNAPSHOT=1 npm test で呼び出したときはスナップショットを更新
                if (process.env.UPDATE_SNAPSHOT) {
                    fs.writeFileSync(expectedFilePath, JSON.stringify(actual, null, 4));
                    this.skip(); // スキップ
                    return;
                }
                // inputとoutputを比較する
                const expected = JSON.parse(fs.readFileSync(expectedFilePath, "utf-8"));
                assert.deepEqual(
                    actual,
                    expected,
                    `

    at ${postMarkdownFile}:1:1

${JSON.stringify(actual)}

`
                );
            });
        });
});
