/**
 * Ensures the given promise takes at least `minDelay` milliseconds to resolve.
 *
 * @param promise The async operation (e.g. API call)
 * @param minDelay Minimum delay in milliseconds (default: 1000ms)
 * @returns The resolved result of the original promise
 */
export async function withMinimumDelay<T>(promise: Promise<T>, minDelay: number = 300): Promise<T> {
    const delay = new Promise((resolve) => setTimeout(resolve, minDelay));
    const [result] = await Promise.all([promise, delay]);
    return result;
}
