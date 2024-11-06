import { parseISO } from "date-fns";

export const formattedTime = (date: string) => {
    const parsedDate = parseISO(date);

    const diffInSeconds = Math.floor((Date.now() - parsedDate.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'now';
    } else if (diffInSeconds < 3600) {
        return `${Math.floor(diffInSeconds / 60)}min`;
    } else if (diffInSeconds < 86400) {
        return `${Math.floor(diffInSeconds / 3600)}h`;
    } else if (diffInSeconds < 31536000) {
        return `${Math.floor(diffInSeconds / 86400)}d`;
    } else {
        return `${Math.floor(diffInSeconds / 31536000)}y`;
    }
};