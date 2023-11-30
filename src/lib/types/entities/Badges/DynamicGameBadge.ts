import type { BadgeType } from "./BadgeType";

export interface DynamicGameBadge {
    type: BadgeType.DYNAMIC,
    url: string,
    interval: number,
}