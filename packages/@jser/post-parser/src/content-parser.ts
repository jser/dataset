// MIT © 2017 azu
"use strict";
const execall = require("execall");
const debug = require("debug")("jser-item-category-parser");

export interface RemarkNode {
    type: string;
    children?: RemarkNode[];
    depth?: number;
    value?: string;
    position: {
        start: {
            offset: number;
        };
        end: {
            offset: number;
        };
    };
}

export class CurrentContent {
    title!: string;
    url!: string;
    tags: string[] = [];
    content!: string;
    relatedLinks: { url: string; title: string }[] = [];

    addContent(content: string) {
        if (this.content) {
            this.content += `\n\n${content}`;
        } else {
            this.content = content;
        }
    }
}

const isNoLinkList = (node: any) => {
    if (node.type === "list") {
        return node.children.some((listItem: any) => {
            const paragraph = listItem.children[0];
            const link = paragraph.children[0];
            return link.type !== "link";
        });
    }
    return false;
};

const enum MARK {
    // finish current process
    END = "END",
    // skip process
    SKIP_PROCESS = "SKIP_PROCESS",
    // skip but continue
    CONTINUE = "CONTINUE"
}

export class ContentParser {
    private contents: Array<CurrentContent>;
    private currentContent: CurrentContent;

    constructor() {
        this.contents = [];
        this.currentContent = new CurrentContent();
    }

    process(nodeList: RemarkNode[], text: string) {
        const processPattern = this.processPattern;
        let processIndex = 0;
        let nodeIndex = 0;
        while (nodeIndex !== nodeList.length) {
            const node = nodeList[nodeIndex];
            const process = processPattern[processIndex];
            const result: MARK | any = process(node, text);
            debug(`Result: ${result}, node: %O, nodeIndex: ${nodeIndex}, processIndex: ${processIndex}`, node);
            if (result === MARK.END) {
                processIndex = Infinity; // end
            } else if (result === MARK.SKIP_PROCESS) {
                processIndex++;
            } else if (result === MARK.CONTINUE) {
                nodeIndex++;
            } else {
                nodeIndex++;
                processIndex++;
            }
            if (processIndex >= processPattern.length) {
                this.contents.push(this.currentContent);
                this.currentContent = new CurrentContent();
                processIndex = 0;
            }
        }
        return this.contents.slice();
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
            (node: RemarkNode) => {
                if (node.type !== "thematicBreak") {
                    throw new Error("should start thematicBreak");
                }
            },
            /*
            ## StealJS 1.0 Release
             */
            (node: RemarkNode, text: string) => {
                if (node.type !== "heading" && node.depth === 2) {
                    throw new Error("should start heading");
                }
                this.currentContent.title = text
                    .slice(node.position.start.offset, node.position.end.offset)
                    .replace(/^## /, "");
            },
            /* URL
            [www.bitovi.com/blog/stealjs-1.0-release](https://www.bitovi.com/blog/stealjs-1.0-release "StealJS 1.0 Release")

             */
            (node: RemarkNode) => {
                if (node.type !== "paragraph") {
                    throw new Error("should start heading");
                }
                if (!node.children) {
                    throw new Error("should start heading");
                }
                const link: any = node.children[0];
                if (link.type !== "link") {
                    throw new Error("should link");
                }
                this.currentContent.url = link.url;
            },
            (node: RemarkNode) => {
                if (node.type !== "html") {
                    // まれにtagがないコンテンツがいる
                    return MARK.SKIP_PROCESS;
                }
                const tagPattern = /<span class="jser-tag">(.*?)<\/span>/g;
                const matches = execall(tagPattern, node.value);
                this.currentContent.tags = matches.map((match: any) => {
                    return match.sub[0];
                });
                return;
            },
            // list
            // 場合によってはcontentが2つ?
            // content
            (node: RemarkNode, text: string) => {
                // 本文に箇条書きを書いてるパターン
                if (isNoLinkList(node)) {
                    this.currentContent.addContent(text.slice(node.position.start.offset, node.position.end.offset));
                    return MARK.CONTINUE;
                } else if (node.type === "blockquote") {
                    this.currentContent.addContent(text.slice(node.position.start.offset, node.position.end.offset));
                    return MARK.CONTINUE;
                } else if (node.type === "paragraph") {
                    this.currentContent.addContent(text.slice(node.position.start.offset, node.position.end.offset));
                    return MARK.CONTINUE;
                }
                return MARK.SKIP_PROCESS;
            },
            (node: RemarkNode) => {
                if (node.type !== "list") {
                    return MARK.SKIP_PROCESS;
                }
                if (!node.children) {
                    throw new Error("no children");
                }
                node.children.forEach((listItem: any) => {
                    const paragraph = listItem.children[0];
                    const link = paragraph.children[0];
                    const title = link.children[0].value;
                    this.currentContent.relatedLinks.push({
                        title,
                        url: link.url
                    });
                });
                return MARK.CONTINUE;
            },
            // 複数list
            (node: RemarkNode) => {
                if (node.type !== "list") {
                    return MARK.SKIP_PROCESS;
                }

                if (!node.children) {
                    throw new Error("no children");
                }
                node.children.forEach((listItem: any) => {
                    const paragraph = listItem.children[0];
                    const link = paragraph.children[0];
                    const title = link.children[0].value;
                    this.currentContent.relatedLinks.push({
                        title,
                        url: link.url
                    });
                });
                return MARK.CONTINUE;
            },
            (node: RemarkNode) => {
                if (node.type === "thematicBreak") {
                    return MARK.END;
                }
                // 最後尾にいろんなパターンがあるのは無視する
                return MARK.CONTINUE;
            }
        ];
    }
}
