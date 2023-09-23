import { writable } from "svelte/store";
import { DownloadState, type DownloaderStoreInterface } from "./types";
import { PocketbaseInstance } from "../pocketbase";
import { getStore } from "../helpers";
import { CurrentGameStore } from "../games";
import type { DownloadsEntity, GameEntity } from "../types";
import { SerializedDownloaderStore } from "./SerializedDownloaderStore";
import { BaseDirectory, appDataDir, join } from "@tauri-apps/api/path";
import { exists, removeDir } from "@tauri-apps/api/fs";
import { invoke } from "@tauri-apps/api/tauri";

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
        const serializedData = await SerializedDownloaderStore.get<DownloaderStoreInterface['currentManifest']>(gameStore.id);
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

        const store = await getStore(this);
        const gameStore = await getStore(CurrentGameStore);

        // Checking current version and manifest information
        if (store.currentManifest == null || store.currentManifest.path == null) {
            return false;
        }

        // Checking files integrity
        for (var file of store.currentManifest.download.files) {
            if (!(await exists(await join("games", gameStore.id, file.path), { dir: BaseDirectory.AppData }))) {
                return false;
            }

            // todo: Checking this file's hash
        }

        return true;
    }

    async getUpdatesInformation(manifest: DownloadsEntity): Promise<{ needUpdate: boolean, manifest?: DownloadsEntity }> {
        this.setState(DownloadState.CHECKING_UPDATES);
        
        const store = await getStore(this);

        if (manifest.id != store.currentManifest?.download.id) {
            return { needUpdate: true, manifest };
        } else {
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
                currentManifest: {
                    ...store?.currentManifest,
                    download: manifest,
                }
            };
        });

        const store = await getStore(this);

        // Checking if we have { currentManifest.path }
        let path = store.currentManifest!.path;
        if (path == undefined) {
            // todo: let user pick this path
            path = await join(await appDataDir(), "games", gameStore.id);
            this.setDownloadPath(path);
        };

        if (path == undefined) throw new Error("[Downloader->downloadManifest] Download path is empty");

        await this.saveSerializedData();

        // Updating store state
        this.setState(DownloadState.DOWNLOADING);

        // Deleting all files from game default folder
        // if (await exists(await join("games", gameStore.id), { dir: BaseDirectory.AppData })) await removeDir(path);

        // Looping through all files in manifest and downloading them
        for (var file of manifest.files) {
            // Checking if this file exists or no
            if (await exists(await join("games", gameStore.id, file.path), { dir: BaseDirectory.AppData })) continue;

            // Asking rust backend to download this file
            await invoke("download_file", { url: file.url, path: await join(await appDataDir(), "games", gameStore.id, file.path) });

            // todo: updating progress
        }

        // todo: Sending notification about this event

        this.setState(DownloadState.DONE);
    }

    private setDownloadPath(path: string) {
        this.update((store) => {
            store.currentManifest!.path = path;
            return store;
        });
    }

    private async saveSerializedData() {
        const store = await getStore(this);
        const gameStore = await getStore(CurrentGameStore);

        await SerializedDownloaderStore.set(gameStore.id, store.currentManifest);
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