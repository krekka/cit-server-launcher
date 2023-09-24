import type { DownloadState } from "."
import type { DownloadsEntity } from "../../types";

export type DownloadProgress = Map<String, boolean>;

// Store interface
export interface DownloaderStoreInterface {
    state: DownloadState;
    currentManifest?: {
        path?: string;
        download: DownloadsEntity;
    };
    progress: DownloadProgress;
}