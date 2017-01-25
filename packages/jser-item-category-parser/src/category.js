// MIT © 2017 azu
"use strict";
const Category = {
    Headline: "ヘッドライン",
    Article: "アーティクル",
    SlideVideo: "スライド、動画関係",
    websiteDocument: "サイト、サービス、ドキュメント",
    SoftwareLibrary: "ソフトウェア、ツール、ライブラリ関係",
    Book: "書籍関係",
};
const CompatibleCategory = {
    Headline: "ヘッドライン",
    Article: "アーティクル",
    SlideVideo: "スライド、動画関係",
    websiteDocument: "サイト、サービス",
    SoftwareLibrary: "ソフトウェア、ツール、ライブラリ関係",
    Book: "書籍関係",
};
module.exports = Category;
module.exports.CompatibleCategory = CompatibleCategory;