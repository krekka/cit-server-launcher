import type { RecordModel } from "pocketbase";

interface DownloadFileManifest {
    url: string;
    hash: string;
    path: string;
}

export interface DownloadsEntity extends RecordModel {
    id: string;
    files: Array<DownloadFileManifest>;
    created: string;
    updated: string;
}