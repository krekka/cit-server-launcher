import CarbonSettings from '~icons/carbon/settings';
import CarbonUserAvatar from '~icons/carbon/user-avatar';
import CarbonView from '~icons/carbon/view';
import CarbonGameConsole from '~icons/carbon/game-console';
import CarbonLogout from '~icons/carbon/logout';

export const UserGridMenuEntries = [
    {
        icon: CarbonSettings,
        text: "Налаштування",
        color: "bg-indigo-500 hover:bg-indigo-700",
        url: "/settings"
    },
    {
        icon: CarbonUserAvatar,
        text: "Профілі",
        color: "bg-orange-500",
        isDisabled: true
    },
    {
        icon: CarbonView,
        text: "Скіни",
        color: "bg-pink-500",
        isDisabled: true
    },
    {
        icon: CarbonGameConsole,
        text: "Інші ігри",
        color: "bg-purple-500",
        isDisabled: true
    },
    {
        icon: CarbonLogout,
        text: "Вийти",
        color: "bg-red-500 hover:bg-red-700"
    }
]