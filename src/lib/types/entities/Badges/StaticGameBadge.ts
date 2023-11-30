import type { BadgeType } from "./BadgeType";

export interface StaticGameBadge {
    type: BadgeType.STATIC,
    text: string,
    color?: string,
};