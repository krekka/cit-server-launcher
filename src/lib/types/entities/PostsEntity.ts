import type { RecordModel } from "pocketbase";

export interface PostsEntity extends RecordModel {
    id: string;
    type: "UPDATE",
    title: string;
    description: string;
    url?: string;
}