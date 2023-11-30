import Pocketbase from "pocketbase";
import { AuthStore } from "../stores";

export const PocketbaseInstance = new Pocketbase("https://cit.playbox.network", AuthStore);