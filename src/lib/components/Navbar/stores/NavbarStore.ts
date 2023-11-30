import { writable } from "svelte/store";

interface NavbarStoreInterface {
    showBackButton?: boolean
}

class NavbarStoreClass {
    public subscribe;
    private update;

    constructor() {
        const { subscribe, update } = writable<NavbarStoreInterface>({
            showBackButton: false
        });
        this.subscribe = subscribe;
        this.update = update;
    }

    public showBackButton() {
        this.update((store) => {
            store.showBackButton = true;
            return store;
        })
    }

    public hideBackButton() {
        this.update((store) => {
            store.showBackButton = false;
            return store;
        })
    }
}

export const NavbarStore = new NavbarStoreClass();