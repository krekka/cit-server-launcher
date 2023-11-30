import type { ECurrentGameStatus } from ".";
import type { GameEntity } from "../../types";

export type CurrentGameStoreInterface = GameEntity & {
    status: ECurrentGameStatus
};