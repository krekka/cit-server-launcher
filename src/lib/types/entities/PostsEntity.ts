import type { RecordModel } from "pocketbase";

export interface PostsEntity extends RecordModel {
    id: string;
    type: "UPDATE" | "ANOUNCEMENT",
    title: string;
    description: string;
    url?: string;
}