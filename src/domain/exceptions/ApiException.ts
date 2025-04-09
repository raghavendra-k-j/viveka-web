import { AppException, AppExceptionParams } from "@/core/exceptions/AppException";
import { JSONParams } from "@/core/types/JSONParams";
import { Logger } from "@/core/utils/logger";

type ApiExceptionParams = AppExceptionParams & {
    statusCode?: number | null;
    errorCode?: string | null;
};



export class ApiException extends AppException {
    statusCode: number | null;

    constructor(params: ApiExceptionParams) {
        super(params);
        this.statusCode = params.statusCode ?? null;
    }

    get isForbidden() { return this.statusCode === 403; }
    get isNotFound() { return this.statusCode === 404; }
    get isUnauthorized() { return this.statusCode === 401; }
    get isServerError() { return this.statusCode === 500; }
    get isBadRequest() { return this.statusCode === 400; }
    get isConflict() { return this.statusCode === 409; }
    get isTooManyRequests() { return this.statusCode === 429; }
    get isServiceUnavailable() { return this.statusCode === 503; }
    get isGatewayTimeout() { return this.statusCode === 504; }

    toString(): string {
        return `ApiException: ${this.statusCode !== null ? this.statusCode : "No Status Code"} - ${this.message}${this.hasDesc() ? ` - ${this.description}` : ""}`;
    }

    static fromApiError(error: unknown): ApiException {
        Logger.error("ApiException.fromApiError: error:", error);

        // Axios-like error with response
        if (typeof error === "object" && error !== null) {
            const errObj = error as any;

            // Try to extract status and error response
            const statusCode = errObj?.response?.status ?? null;
            const responseData: JSONParams = errObj?.response?.data ?? null;

            if (responseData && typeof responseData === "object") {
                return new ApiException({
                    message: responseData.message || "Unknown API error",
                    description: responseData.description ?? null,
                    data: responseData.data ?? null,
                    errorCode: responseData.errorCode ?? null,
                    statusCode: statusCode,
                });
            }
        }

        // Fallback for unknown structures
        return new ApiException({
            message: "An unknown API error occurred",
            description: error instanceof Error ? error.message : null,
            data: error,
            statusCode: null,
            errorCode: null,
        });
    }
}
