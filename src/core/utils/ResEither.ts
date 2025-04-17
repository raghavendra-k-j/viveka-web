export class ResEither<E extends Error, T> {
    error: E | null;
    data: T | null;

    constructor(error: E | null = null, data: T | null = null) {
        this.error = error;
        this.data = data;
    }

    static success<E extends Error, T>(data: T): ResEither<E, T> {
        return new ResEither<E, T>(null, data);
    }

    static failure<E extends Error, T>(error: E): ResEither<E, T> {
        return new ResEither<E, T>(error, null);
    }

    get hasData(): boolean {
        return this.data !== null;
    }

    get hasError(): boolean {
        return this.error !== null;
    }

    public getOrThrow(): T {
        if (this.hasError) {
            throw this.error;
        }
        if (this.hasData) {
            return this.data as T;
        }
        throw new Error("No data available in ResEither.");
    }
}
