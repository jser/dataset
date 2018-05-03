// MIT © 2017 azu
"use strict";
const fs = require("fs");
const path = require("path");
const { parse } = require("../src/index");
const assert = require("assert");
describe("parse", () => {
    context("fixtures-post", () => {
        const fixtureContent = fs.readFileSync(
            path.join(__dirname, "fixtures", "2017-01-04-postcss-chrome-fusebox.md"),
            "utf-8"
        );
        it("should return array", () => {
            const results = parse(fixtureContent);
            assert(typeof results.meta === "object");
            assert(Array.isArray(results.items));
        });
    });
});
