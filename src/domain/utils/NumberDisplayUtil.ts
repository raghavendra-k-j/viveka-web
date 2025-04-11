export class NumberDisplayUtil {
    
    /**
     * Formats a number to a string with the given decimal places.
     * Removes trailing zeros after the decimal point if not needed.
     * 
     * @param number - The number to format.
     * @param roundTo - Number of decimal places to round to.
     * @returns A formatted string representation of the number.
     */
    static formatDecimal({ number, roundTo }: { number: number; roundTo: number }): string {
        if (isNaN(number) || !isFinite(number)) {
            return "-";
        }

        // Round the number
        const multiplier = Math.pow(10, roundTo);
        const rounded = Math.round(number * multiplier) / multiplier;

        // Convert to string with fixed decimals, then trim trailing zeros
        let formatted = rounded.toFixed(roundTo);

        // Remove trailing '.00' or unnecessary decimal zeros
        if (formatted.includes('.')) {
            formatted = formatted.replace(/\.?0+$/, '');
        }

        return formatted;
    }
}
