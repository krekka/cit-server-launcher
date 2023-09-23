import { writable } from "svelte/store";
import { DownloadState, type DownloaderStoreInterface } from "./types";
import { PocketbaseInstance } from "../pocketbase";
import { getStore } from "../helpers";
import { CurrentGameStore } from "../games";
import type { DownloadsEntity, GameEntity } from "../types";
import { SerializedDownloaderStore } from "./SerializedDownloaderStore";

// StoreClass
class DownloaderStoreClass {
    public subscribe;
    private update;

    constructor() {
        const { subscribe, update  } = writable<DownloaderStoreInterface>({
            state: DownloadState.IDLE
        });

        this.subscribe = subscribe;
        this.update = update;
    }

    // Methods
    async initialize() {
        const gameStore = await getStore(CurrentGameStore);
        return this.initializeWithManifest(await this.getLatestDownloadManifest(gameStore.id));
    }

    async initializeWithManifest(manifest: DownloadsEntity) {
        const store = await getStore(this);
        const gameStore = await getStore(CurrentGameStore);

        // 1. Checking updates
        //    IF updates exists DOWNLOAD THEM
        const updateInformation = await this.getUpdatesInformation(manifest);

        if (updateInformation.needUpdate) {
            // Downloading this updates
            this.downloadManifest(updateInformation.manifest!);
        } else {
            // 3. ELSE check files
            if (await this.isFilesIntact()) {
                // Everything's alright
                this.setState(DownloadState.DONE);
            } else {
                // 4. Redownloading current game
                let manifest: DownloadsEntity | null = null;

                if (store.currentManifest == null) {
                    manifest = await this.getLatestDownloadManifest(gameStore.id);
                }

                if (manifest == null) throw new Error("[Downloader->initialize] Could not get current game's download manifest");

                this.downloadManifest(manifest);
            }
        }        
    }

    async loadSavedData() {
        const gameStore = await getStore(CurrentGameStore);

        // Loading saved store data
        const serializedData = await SerializedDownloaderStore.get<DownloadsEntity>(gameStore.id);
        if (serializedData != null) {
            this.update((store) => {
                store.currentManifest = serializedData;
                return store;
            });
        };
    }

    async isFilesIntact(): Promise<boolean> {
        // Updating state of this store
        this.setState(DownloadState.CHECKING_FILES);

        // Checking current version and manifest information

        // Checking files integrity

        return true;
    }

    async getUpdatesInformation(manifest: DownloadsEntity): Promise<{ needUpdate: boolean, manifest?: DownloadsEntity }> {
        this.setState(DownloadState.CHECKING_UPDATES);

        const store = await getStore(this);

        console.log(manifest, store.currentManifest);

        if (manifest.id != store.currentManifest?.id) {
            console.log("Need update");
            return { needUpdate: true, manifest };
        } else {
            console.log("No");
            return { needUpdate: false };
        };
    }

    async getLatestDownloadManifest(gameId: string): Promise<DownloadsEntity> {
        const game = await PocketbaseInstance.collection("games").getOne<GameEntity>(gameId);
        return PocketbaseInstance.collection("downloads").getOne<DownloadsEntity>(game.currentDownloadManifest);
    }

    private async downloadManifest(manifest: DownloadsEntity) {
        const gameStore = await getStore(CurrentGameStore);

        // Saving this manifest information
        this.update((store) => {
            return {
                ...store,
                currentManifest: manifest,
            };
        });

        await SerializedDownloaderStore.set(gameStore.id, manifest);

        // Updating store state
        this.setState(DownloadState.DOWNLOADING);

        // Deleting all files from game default folder

        // Looping through all files and downloading them
    }

    private setState(state: DownloadState) {
        this.update((store) => {
            store.state = state;
            return store;
        })
    }
}

// Exporting this store instance
export const DownloaderStore = new DownloaderStoreClass();