// MIT © 2017 azu
"use strict";
const Category = {
    Headline: "ヘッドライン",
    Article: "アーティクル",
    SlideVideo: "スライド、動画関係",
    WebsiteDocument: "サイト、サービス、ドキュメント",
    SoftwareLibrary: "ソフトウェア、ツール、ライブラリ関係",
    Book: "書籍関係"
};
const CategoryKey = {
    Headline: "Headline",
    Article: "Article",
    SlideVideo: "SlideVideo",
    WebsiteDocument: "WebsiteDocument",
    SoftwareLibrary: "SoftwareLibrary",
    Book: "Book"
};
const CompatibleCategory = {
    Headline: "ヘッドライン",
    Article: "アーティクル",
    SlideVideo: "スライド、動画関係",
    WebsiteDocument: "サイト、サービス",
    SoftwareLibrary: "ソフトウェア、ツール、ライブラリ関係",
    Book: "書籍関係"
};
module.exports.Category = Category;
module.exports.CategoryKey = CategoryKey;
module.exports.CompatibleCategory = CompatibleCategory;
