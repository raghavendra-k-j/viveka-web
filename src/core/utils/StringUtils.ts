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

    static trimToUndefined(value: string | null | undefined): string | undefined {
        if (value == null) {
            return undefined;
        }
        const trimmed = value.trim();
        return trimmed === '' ? undefined : trimmed;
    }
    


    static trimToEmpty(value: string): string {
        if (value == null) {
            return '';
        }
        const trimmed = value.trim();
        return trimmed === '' ? '' : trimmed;
    }

}