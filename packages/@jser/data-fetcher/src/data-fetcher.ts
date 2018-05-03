const fetch = require('cross-fetch');

export interface JserItem {
    title: string;
    url: string;
    content: string;
    date: string;
    tags?: string[];
    relatedLinks?: RelatedLinksItem[];
    viaURL?: string | null;
}

export interface RelatedLinksItem {
    title: string;
    url: string;
}

export const fetchItems = (): Promise<JserItem[]> => {
    return fetch("http://jser.info/source-data/items.json")
        .then((res: Response) => {
            if (!res.ok) {
                return Promise.reject(new Error(`items.json: ${res.statusText}`));
            }
            return res;
        })
        .then((res: Response) => res.json())
};


export interface JserPost {
    title: string;
    url: string;
    date: string;
    content: string;
    category: string;
    tags: string[];
}

export const fetchPosts = (): Promise<JserPost[]> => {
    return fetch("http://jser.info/posts.json")
        .then((res: Response) => {
            if (!res.ok) {
                return Promise.reject(new Error(`posts.json: ${res.statusText}`));
            }
            return res;
        })
        .then((res: Response) => res.json())
};

export interface PostItem {
    category: string;
    title: string;
    url: string;
    tags: string[];
    content: string;
    relatedLinks: PostItemRelatedLinksItem[];
}

export interface PostItemRelatedLinksItem {
    title: string;
    url: string;
}


export const fetchPostDetails = (): Promise<PostItem[]> => {
    return fetch("https://jser.info/public/build/item-category.json")
        .then((res: Response) => {
            if (!res.ok) {
                return Promise.reject(new Error(`item-category.json": ${res.statusText}`));
            }
            return res;
        })
        .then((res: Response) => res.json())
};
