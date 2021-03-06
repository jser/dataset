import assert from "assert";
import { CategoryKey } from "@jser/post-parser";
import { JSerStat } from "@jser/stat";
import { JSerClassifier } from "../src/index";
import { fetchItems, fetchPostDetails, fetchPosts } from "@jser/data-fetcher";

describe("classifier", () => {
    let classifier;
    let stat;
    before(() => {
        const promises = [fetchPostDetails(), fetchItems(), fetchPosts()];
        return Promise.all(promises).then(([details, items, posts]) => {
            classifier = new JSerClassifier({
                postDetails: details
            });
            stat = new JSerStat(items, posts);
        });
    });
    it("#classifyItem should return Category", () => {
        const category = classifier.classifyItem({
            title: "classifier-item-category GitHub",
            url: "https://github.com/jser/classifier-item-category",
            content: "アイテムをカテゴリ分類するlibrary",
            tags: ["library", "node.js", "JavaScript"]
        });
        assert.strictEqual(category, CategoryKey.SoftwareLibrary);
    });
    it("#classifyText should return Category", () => {
        const category = classifier.classifyText("これはGitHubで公開されている言語処理のライブラリです");
        assert.strictEqual(category, CategoryKey.SoftwareLibrary);
    });
    it("test case URLのみ", () => {
        const item = stat.findItemWithURL("https://developers.google.com/web/updates/2017/01/scrolling-intervention");
        const category = classifier.classifyItem(item);
        assert.strictEqual(category, CategoryKey.Article);
    });
    it("test case ウェブサービスに分類されていた - absoluteTagによりArticleになる", () => {
        const item = stat.findItemWithURL(
            "https://hackernoon.com/how-to-set-up-e2e-browser-testing-for-your-github-project-89c24e15a84"
        );
        const category = classifier.classifyItem(item);
        assert.strictEqual(category, CategoryKey.Article, JSON.stringify(classifier.getClassifications(item), null, 4));
    });
});
