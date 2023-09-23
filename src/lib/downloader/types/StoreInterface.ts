import type { DownloadState } from "."
import type { DownloadsEntity } from "../../types";


// Store interface
export interface DownloaderStoreInterface {
    state: DownloadState;
    currentManifest?: {
        path?: string;
        download: DownloadsEntity
    };
}