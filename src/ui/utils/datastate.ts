import { AppException } from "@/core/exceptions/AppException";


enum DataStateStatus {
    INITIAL, LOADING, SUCCESS, ERROR
}

type DataStateParams<T> = {
    status: DataStateStatus;
    data?: T | null;
    error?: AppException | null;
}


class DataState<T> {
    readonly status: DataStateStatus;
    readonly data: T | null;
    readonly error: AppException | null;

    constructor(params: DataStateParams<T>) {
        this.status = params.status;
        this.data = params.data ?? null;
        this.error = params.error ?? null;
    }

    static initial<T>({ data = null }: { data?: T | null } = {}): DataState<T> {
        return new DataState<T>({ status: DataStateStatus.INITIAL, data });
    }

    static loading<T>({ data = null }: { data?: T | null } = {}): DataState<T> {
        return new DataState<T>({ status: DataStateStatus.LOADING, data });
    }

    static success<T>(data: T): DataState<T> {
        return new DataState<T>({ status: DataStateStatus.SUCCESS, data });
    }

    static error<T>({ error, data = null }: { error: AppException; data?: T | null }): DataState<T> {
        return new DataState<T>({ status: DataStateStatus.ERROR, error, data });
    }

    get isInitOrLoading() {
        return this.isInitial || this.isLoading;
    }

    get isInitial(): boolean {
        return this.status === DataStateStatus.INITIAL;
    }

    get isLoading(): boolean {
        return this.status === DataStateStatus.LOADING;
    }
    

    get isSuccess(): boolean {
        return this.status === DataStateStatus.SUCCESS;
    }

    get isError(): boolean {
        return this.status === DataStateStatus.ERROR;
    }

    toString(): string {
        return `DataState { status: ${DataStateStatus[this.status]}, data: ${JSON.stringify(this.data)}, error: ${this.error?.message ?? null} }`;
    }



        
}

export { DataState, DataStateStatus };