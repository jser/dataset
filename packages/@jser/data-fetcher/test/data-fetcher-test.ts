import * as assert from "assert";
import { fetchItems, fetchPostDetails, fetchPosts } from "../src/data-fetcher";

describe("data-fetcher", () => {
    it("should fetch items", () => {
        return fetchItems().then((items) => {
            assert.ok(Array.isArray(items));
        });
    });
    it("should fetch posts", () => {
        return fetchPosts().then((posts) => {
            assert.ok(Array.isArray(posts));
        });
    });
    it("should fetch postDetails", () => {
        return fetchPostDetails().then((details) => {
            assert.ok(Array.isArray(details));
        });
    });
});
