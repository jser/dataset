/**
 * Avoid to bug remark parse joining html and paragraph.
 *
 * ```
 * <p class="jser-tags jser-tag-icon"><span class="jser-tag">node.js</span> <span class="jser-tag">ReleaseNote</span></p>
 * Node v0.12.3リリース
 * ```
 *
 * to
 *
 * ```
 * <p class="jser-tags jser-tag-icon"><span class="jser-tag">node.js</span> <span class="jser-tag">ReleaseNote</span></p>
 *
 * Node v0.12.3リリース
 * ```
 */
export const addLineBreakAfterHTML = (text: string): string => {
    const PATTERN = /(<\/span><\/p>)\n([^\n])/g;
    return text.replace(PATTERN, "$1\n\n$2");
};
