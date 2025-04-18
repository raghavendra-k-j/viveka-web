/**
 * Returns a debounced version of a function that delays its execution until after
 * `delay` milliseconds have passed since the last call.
 *
 * @param func The function to debounce (can be an async function)
 * @param delay Debounce delay in milliseconds (default: 500ms)
 * @returns A debounced version of the input function
 */
export function searchDebounce<T extends (...args: any[]) => void>(
    func: T,
    delay: number = 500
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: any, ...args: Parameters<T>) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
