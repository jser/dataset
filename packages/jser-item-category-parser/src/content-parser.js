// MIT © 2017 azu
"use strict";
const execall = require("execall");
const debug = require("debug")("jser-item-category-parser");
export class CurrentContent {
    constructor() {
        // date is missing
        this.title = undefined;
        this.url = undefined;
        this.tags = [];
        this.content = undefined;
        this.relatedLinks = [];
    }

    addContent(content) {
        if (this.content) {
            this.content += `\n\n${content}`;
        } else {
            this.content = content;
        }
    }
}

const isNoLinkList = node => {
    if (node.type === "list") {
        return node.children.some(listItem => {
            const paragraph = listItem.children[0];
            const link = paragraph.children[0];
            return link.type !== "link";
        });
    }
    return false;
};

export class ContentParser {
    get MARK() {
        return {
            SKIP: "SKIP",
            CONTINUE: "CONTINUE"
        };
    }

    constructor() {
        this.contents = [];
        this.currentContent = new CurrentContent();
    }

    process(nodeList, text) {
        const processPattern = this.processPattern;
        let processIndex = 0;
        let nodeIndex = 0;
        while (nodeIndex !== nodeList.length) {
            const node = nodeList[nodeIndex];
            const process = processPattern[processIndex];
            const result = process(node, text);
            debug(`nodeIndex: ${nodeIndex}, processIndex: ${processIndex}, node: %O`, node);
            if (result === this.MARK.SKIP) {
                processIndex++;
            } else if (result === this.MARK.CONTINUE) {
                nodeIndex++;
            } else {
                nodeIndex++;
                processIndex++;
            }
            if (processIndex === processPattern.length) {
                this.contents.push(this.currentContent);
                this.currentContent = new CurrentContent();
                processIndex = 0;
            }
        }
    }

    get processPattern() {
        /**
         ## StealJS 1.0 Release
         [www.bitovi.com/blog/stealjs-1.0-release](https://www.bitovi.com/blog/stealjs-1.0-release "StealJS 1.0 Release")

         <p class="jser-tags jser-tag-icon"><span class="jser-tag">JavaScript</span> <span class="jser-tag">Tools</span> <span class="jser-tag">library</span> <span class="jser-tag">ReleaseNote</span></p>

         開発時は動的なモジュールローダで、本番時はsteal-toolsでのproduction buildでbundleできるStealJS 1.0リリース

         - [Easy ES6 with StealJS - YouTube](https://www.youtube.com/watch?v=VKydmxRm6w8 "Easy ES6 with StealJS - YouTube")

         */
        return [
            node => {
                if (node.type !== "thematicBreak") {
                    throw new Error("should start thematicBreak", node);
                }
            },
            /*
            ## StealJS 1.0 Release
             */
            (node, text) => {
                if (node.type !== "heading" && node.depth === 2) {
                    throw new Error("should start heading", node);
                }
                this.currentContent.title = text
                    .slice(node.position.start.offset, node.position.end.offset)
                    .replace(/^## /, "");
            },
            /* URL
            [www.bitovi.com/blog/stealjs-1.0-release](https://www.bitovi.com/blog/stealjs-1.0-release "StealJS 1.0 Release")

             */
            node => {
                if (node.type !== "paragraph") {
                    throw new Error("should start heading", node);
                }
                const link = node.children[0];
                if (link.type !== "link") throw new Error("should link", node);
                this.currentContent.url = link.url;
            },
            node => {
                if (node.type !== "html") {
                    throw new Error("should start html", node);
                }
                const tagPattern = /<span class="jser-tag">(.*?)<\/span>/g;
                const matches = execall(tagPattern, node.value);
                this.currentContent.tags = matches.map(match => {
                    return match.sub[0];
                });
            },
            // list
            // 場合によってはcontentが2つ?
            // content
            (node, text) => {
                // 本文に箇条書きを書いてるパターン
                if (isNoLinkList(node)) {
                    this.currentContent.addContent(text.slice(node.position.start.offset, node.position.end.offset));
                    return this.MARK.CONTINUE;
                } else if (node.type === "blockquote") {
                    this.currentContent.addContent(text.slice(node.position.start.offset, node.position.end.offset));
                    return this.MARK.CONTINUE;
                } else if (node.type === "paragraph") {
                    this.currentContent.addContent(text.slice(node.position.start.offset, node.position.end.offset));
                    return this.MARK.CONTINUE;
                }
                return this.MARK.SKIP;
            },
            node => {
                if (node.type !== "list") {
                    return this.MARK.SKIP;
                }
                node.children.forEach(listItem => {
                    const paragraph = listItem.children[0];
                    const link = paragraph.children[0];
                    const title = link.children[0].value;
                    this.currentContent.relatedLinks.push({
                        title,
                        url: link.url
                    });
                });
            },
            // 複数list
            node => {
                if (node.type !== "list") {
                    return this.MARK.SKIP;
                }
                node.children.forEach(listItem => {
                    const paragraph = listItem.children[0];
                    const link = paragraph.children[0];
                    const title = link.children[0].value;
                    this.currentContent.relatedLinks.push({
                        title,
                        url: link.url
                    });
                });
                return this.MARK.CONTINUE;
            }
        ];
    }
}
