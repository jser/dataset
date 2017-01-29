// MIT © 2017 azu
"use strict";
const CategoryKey = require("jser-item-category-parser").CategoryKey;
const addDocumentToClassifier = (classifier, tag, category) => {
    classifier.addDocument([`__${tag}__`], category);

};
/**
 * @param classifier
 */
export default function learnJSerInfo(classifier) {
    const addDocument = addDocumentToClassifier.bind(this, classifier);
    // ReleaseNote
    addDocument("ReleaseNote", CategoryKey.Headline);
    // Articles
    addDocument("話", CategoryKey.Article);
    addDocument("tutorial", CategoryKey.Article);
    // SlideVideo
    addDocument("発表", CategoryKey.SlideVideo);
    for (let i = 0; i < 10; i++) {
        addDocument("スライド", CategoryKey.SlideVideo);
        addDocument("slide", CategoryKey.SlideVideo);
        addDocument("video", CategoryKey.SlideVideo);
        addDocument("動画", CategoryKey.SlideVideo);
    }
    // Tools
    addDocument("フレームワーク", CategoryKey.SoftwareLibrary);
    addDocument("ライブラリ", CategoryKey.SoftwareLibrary);
    addDocument("library", CategoryKey.SoftwareLibrary);
    addDocument("Tool", CategoryKey.SoftwareLibrary);
    addDocument("Tools", CategoryKey.SoftwareLibrary);
    addDocument("ツール", CategoryKey.SoftwareLibrary);
    addDocument("CLI", CategoryKey.SoftwareLibrary);
    // Book
    for (let i = 0; i < 10; i++) {
        addDocument("本", CategoryKey.Book);
        addDocument("書籍", CategoryKey.Book);
        addDocument("book", CategoryKey.Book);
        addDocument("ebook", CategoryKey.Book);
    }
}