import { writable } from "svelte/store";
import type { NewsStoreInterface } from "./types";
import type { PostsEntity } from "../../types";

// StoreClass
class NewsStoreClass {
    public subscribe;
    private update;

    constructor() {
        const { subscribe, update } = writable<NewsStoreInterface>([]);
        this.subscribe = subscribe;
        this.update = update;
    }

    // Methods
    addPosts(news: Array<PostsEntity>) {
        this.update((store) => [...store, ...news]);
    }

    clear() {
        this.update(() => []);
    }
}

// Exporting instance of this store
export const NewsStore = new NewsStoreClass();