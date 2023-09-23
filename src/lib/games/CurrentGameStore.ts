import { writable } from "svelte/store";
import type { CurrentGameStoreInterface } from "./types";
import { PocketbaseInstance } from "../pocketbase";
import { NewsStore } from "./news";
import { DownloaderStore } from "../downloader";

// StoreClass
class CurrentGameStoreClass {
    public subscribe;
    private update;

    constructor() {
        // @ts-ignore
        const { subscribe, update } = writable<CurrentGameStoreInterface>(null);
        
        this.subscribe = subscribe;
        this.update = update;
    }

    async fetchById(id: string) {
        return new Promise((resolve, reject) => {
            PocketbaseInstance.collection("games").getOne(id, {
                expand: "currentDownloadManifest,news"
            })
                .then(async (response) => {
                    // @ts-ignore
                    const storeData: CurrentGameStoreInterface = response;

                    this.update(() => {
                        return storeData;
                    })

                    // Initializing Downloader
                    await DownloaderStore.loadSavedData();
                    if (response.expand?.currentDownloadManifest != null) {
                        await DownloaderStore.initializeWithManifest(response.expand?.currentDownloadManifest);
                    } else {
                        await DownloaderStore.initialize();
                    }

                    // Populating news store
                    NewsStore.addPosts(response.expand?.news);

                    resolve(storeData);
                }).catch((error) => reject(error));
        });
    }
}

// Instance of this store class
export const CurrentGameStore = new CurrentGameStoreClass();