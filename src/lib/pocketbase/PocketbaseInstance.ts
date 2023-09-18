import Pocketbase from "pocketbase";
import { AuthStore } from "../stores";

export const PocketbaseInstance = new Pocketbase("https://cit-server-backend.k8s.odzi.dog", AuthStore);