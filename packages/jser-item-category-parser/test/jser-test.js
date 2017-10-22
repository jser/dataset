// MIT © 2017 azu
"use strict";
const fs = require("fs");
const assert = require("assert");
const path = require("path");
const parse = require("../src/parse");

describe("JSDoc plugin", () => {
    const fixturesDir = path.join(__dirname, "jser.github.io");
    fs.readdirSync(fixturesDir).map(caseName => {
        it(`should parse ${caseName.replace(/-/g, " ")}`, () => {
            const actualPath = path.join(fixturesDir, caseName);
            const content = fs.readFileSync(actualPath, "utf-8");
            try {
                const actual = parse(content);
            } catch (error) {
                console.log(`at ${actualPath}:1:1`);
                assert.ifError(error);
            }
        });
    });
});
