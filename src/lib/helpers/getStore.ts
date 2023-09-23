import type { Readable, Unsubscriber } from "svelte/store";

export function getStore<T>(store: Readable<T>): Promise<T> {
    return new Promise((resolve) => {
        let unsubscribe: Unsubscriber;
        unsubscribe = store.subscribe((storeData) =>{
            resolve(storeData);
            if (unsubscribe) unsubscribe();
        })
    });
}