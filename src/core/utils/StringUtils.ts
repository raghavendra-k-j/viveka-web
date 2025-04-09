export class StringUtils {
    /**
     * Trims the input string and returns null if the result is an empty string.
     * @param value The string to trim.
     * @returns The trimmed string or null if the result is empty.
     */
    static trimToNull(value: string | null | undefined): string | null {
        if (value == null) {
            return null;
        }
        const trimmed = value.trim();
        return trimmed === '' ? null : trimmed;
    }
}