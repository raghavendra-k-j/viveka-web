export interface NumberCompareResult {
    difference: number;
    percentageChange: number | null;
}

export class NumberCompareUtil {

    public static compare(baseValue: number, newValue: number): NumberCompareResult {
        if (typeof baseValue !== 'number' || !isFinite(baseValue)) {
            throw new Error(`Invalid baseValue: "${baseValue}". Must be a finite number.`);
        }
        if (typeof newValue !== 'number' || !isFinite(newValue)) {
            throw new Error(`Invalid newValue: "${newValue}". Must be a finite number.`);
        }

        const difference = newValue - baseValue;
        let percentageChange: number | null;

        if (baseValue === 0) {
            if (newValue === 0) {
                percentageChange = 0;
            } else {
                percentageChange = null;
            }
        } else {
            percentageChange = (difference / baseValue) * 100;
        }

        return {
            difference,
            percentageChange,
        };
    }
}

