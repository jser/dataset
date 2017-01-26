// MIT © 2017 azu
"use strict";
const fs = require("fs");
const path = require("path");
const parse = require("../src/parse");
const assert = require("assert");
describe("parse", () => {
    context("fixtures-post", () => {
        const fixtureContent = fs.readFileSync(path.join(__dirname, "fixtures", "2017-01-04-postcss-chrome-fusebox.md"), "utf-8");
        it("should return array", () => {
            const results = parse(fixtureContent);
            assert(Array.isArray(results));
        });
        it("should have {url, category}", () => {
            const results = parse(fixtureContent);
            const [result] = results;
            assert(typeof result.url === "string");
            assert(typeof result.category === "string");
        });
        it("actual results one", () => {
            const results = parse(fixtureContent);
            assert.deepEqual(results, [{
                category: 'Headline',
                url: 'https://www.bitovi.com/blog/stealjs-1.0-release'
            },
                {
                    category: 'Article',
                    url: 'https://blog.jscrambler.com/optimizing-page-speeds-with-lazyloading/'
                },
                {
                    category: 'Article',
                    url: 'https://webpack.js.org/guides/lazy-load-react/'
                },
                {
                    category: 'Article',
                    url: 'http://joe-re.hatenablog.com/entry/2016/12/29/204917'
                },
                {
                    category: 'Article',
                    url: 'http://blog.risingstack.com/node-js-interview-questions-and-answers-2017/'
                },
                {
                    category: 'Article',
                    url: 'https://tylermcginnis.com/react-interview-questions/'
                },
                {
                    category: 'Article',
                    url: 'https://medium.com/@matuzo/writing-html-with-accessibility-in-mind-a62026493412'
                },
                {
                    category: 'Article',
                    url: 'http://qiita.com/morishitter/items/4a04eb144abf49f41d7d'
                },
                {
                    category: 'Article',
                    url: 'https://www.smashingmagazine.com/2016/12/front-end-performance-checklist-2017-pdf-pages/'
                },
                {
                    category: 'Article',
                    url: 'http://www.zsoltnagy.eu/the-reflect-api-of-es6/'
                },
                {
                    category: 'Article',
                    url: 'https://birtles.wordpress.com/2016/12/27/mozanime-in-2016/'
                },
                {
                    category: 'SlideVideo',
                    url: 'https://umaar.github.io/devtools-optimise-your-web-development-workflow-2016/'
                },
                {category: 'SoftwareLibrary', url: 'http://fuse-box.org/'},
                {
                    category: 'SoftwareLibrary',
                    url: 'https://github.com/Gothdo/range'
                },
                {
                    category: 'SoftwareLibrary',
                    url: 'https://github.com/andywer/leakage'
                },
                {
                    category: 'SoftwareLibrary',
                    url: 'https://github.com/nolanlawson/marky'
                },
                {
                    category: 'SoftwareLibrary',
                    url: 'https://github.com/maniart/diffyjs'
                }]);
        });
        it("actual results two", () => {
            const results = parse(fs.readFileSync(path.join(__dirname, "fixtures", "2017-01-11-Node.js-v7.4.0-npm-v4-PhantomJS-2.5.0-Beta-clean-code.md"), "utf-8"));
            assert.deepEqual(results, [{
                category: 'Headline',
                url: 'https://medium.com/inferno-js/introducing-inferno-1-0-f3da5c4e773b'
            },
                {
                    category: 'Headline',
                    url: 'https://nodejs.org/en/blog/release/v7.4.0/'
                },
                {
                    category: 'Headline',
                    url: 'https://groups.google.com/d/topic/phantomjs/AefOuwkgBh0'
                },
                {
                    category: 'Headline',
                    url: 'https://developer.microsoft.com/en-us/microsoft-edge/platform/changelog/desktop/15002/'
                },
                {
                    category: 'Article',
                    url: 'https://codesi.nz/es6-arrow-functions-in-depth/'
                },
                {
                    category: 'Article',
                    url: 'https://tylergaw.com/articles/sass-to-postcss'
                },
                {
                    category: 'Article',
                    url: 'http://www.2ality.com/2017/01/import-operator.html'
                },
                {
                    category: 'Article',
                    url: 'http://blog.risingstack.com/yarn-vs-npm-node-js-package-managers/'
                },
                {
                    category: 'Article',
                    url: 'https://birtles.wordpress.com/2017/01/10/web-animation-in-2017/'
                },
                {
                    category: 'Article',
                    url: 'https://hackernoon.com/building-a-custom-tag-input-with-skate-js-fbd4cdf744f'
                },
                {
                    category: 'Article',
                    url: 'http://qiita.com/kyoshidajp/items/0ddb156d96bb6337f623'
                },
                {
                    category: 'WebsiteDocument',
                    url: 'https://github.com/ryanmcdermott/clean-code-javascript'
                },
                {
                    category: 'WebsiteDocument',
                    url: 'http://tategaki.github.io/'
                },
                {
                    category: 'SoftwareLibrary',
                    url: 'https://codemix.github.io/flow-runtime/'
                },
                {
                    category: 'SoftwareLibrary',
                    url: 'https://github.com/talyssonoc/structure'
                },
                {
                    category: 'SoftwareLibrary',
                    url: 'https://github.com/wheresrhys/fetch-mock'
                },
                {
                    category: 'SoftwareLibrary',
                    url: 'https://github.com/danculley/real-dom'
                },
                {category: 'SoftwareLibrary', url: 'https://xvg.now.sh/'},
                {category: 'SoftwareLibrary', url: 'https://nodekit.io/'},
                {
                    category: 'SoftwareLibrary',
                    url: 'https://github.com/jlongster/prettier'
                },
                {
                    category: 'Book',
                    url: 'http://www.oreilly.co.jp/books/9784873117836/'
                },
                {
                    category: 'Book',
                    url: 'https://www.gitbook.com/book/frontendmasters/front-end-handbook-2017/details'
                }]);
        })
    });

});