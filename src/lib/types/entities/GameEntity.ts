import type { RecordModel } from "pocketbase";
import type { GameBadge } from "./Badges";

export interface GameBannerImage {
    url: string;
}

export interface GameEntity extends RecordModel {
    name: string;
    description: string;
    bannerImages: Array<GameBannerImage>;
    currentDownloadManifest: string;
    news: Array<string>;
    links:  Array<{
        text: string,
        url: string
    }>,
    badges: Array<GameBadge>
}