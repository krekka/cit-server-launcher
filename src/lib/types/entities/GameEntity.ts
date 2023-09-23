import type { RecordModel } from "pocketbase";

export interface GameEntity extends RecordModel {
    name: string;
    description: string;
    currentDownloadManifest: string;
    news: Array<string>;
}