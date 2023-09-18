import { AsyncAuthStore } from "pocketbase";
import { SerializedAuthStore } from "./SerializedAuthStore";

export const AuthStore = new AsyncAuthStore({
    save: async (serialized) => await SerializedAuthStore.set("data", serialized),
    initial: await SerializedAuthStore.get<string>("data") ?? "",
})