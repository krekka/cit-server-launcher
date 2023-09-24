import { PocketbaseInstance } from "../pocketbase";
import type { DownloadsEntity } from "../types";

export function parseDownloadsManifest(manifest: DownloadsEntity): DownloadsEntity {
    return {
        ...manifest,
        expand: undefined,
        files: manifest.expand?.files.map((file: Record<string, string>) => ({
            url: `${PocketbaseInstance.baseUrl}/api/files/${file.collectionId}/${file.id}/${file.file}`,
            hash: file.hash,
            path: file.path,
        })),
    };
};