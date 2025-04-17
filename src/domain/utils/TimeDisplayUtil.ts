export const TimeDisplayUtil = {
    formatSeconds(seconds: number): string {
        if (seconds < 0) {
            throw new Error("Seconds cannot be negative");
        }

        const totalSeconds = Math.round(seconds);

        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const remainingSeconds = totalSeconds % 60;

        const parts: string[] = [];
        if (hours > 0) {
            parts.push(`${hours}h`);
        }
        if (minutes > 0) {
            parts.push(`${minutes}m`);
        }
        if (remainingSeconds > 0 || parts.length === 0) {
            parts.push(`${remainingSeconds}s`);
        }

        return parts.join(" ");
    }
};
