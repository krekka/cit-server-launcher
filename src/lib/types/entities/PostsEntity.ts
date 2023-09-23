import type { RecordModel } from "pocketbase";

export interface PostsEntity extends RecordModel {
    id: string;
    title: string;
    description: string;
    url?: string;
}