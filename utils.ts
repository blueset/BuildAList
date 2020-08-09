import _ from "lodash";

export function dropDuplicates(seq: string[], preserveEmpty: boolean = false): string[] {
    return _.uniqWith(seq, (a: string, b: string): boolean => {
        a = a.trim(); b = b.trim();
        if (preserveEmpty && a === "" && b === "") {
            return false;
        }
        return a === b;
    });
}

export const STRINGS = {
    en:
    {
        help: `Use /create LIST_CONTENT to create a list.
Use line breaks to separate items
Reply to a list to add to it.
Reply -ENTRY_CONTENT to remove an entry from a list.`,
        defaultHelp: "Reply to a list to add items.",
        header: "Reply to add to the list. Reply -ENTRY_CONTENT to remove an entry."
    },
    zhHans: {
        help: `使用 /create [列表内容] 以创建列表。
用换行符分隔项目。
回复列表可添加项目。
回复 -项目内容 可删除项目。`,
        defaultHelp: "若要添加项目，请回复一个列表。",
        header: "回复以添加项目，回复 -项目内容 以删除项目。"
    }
};