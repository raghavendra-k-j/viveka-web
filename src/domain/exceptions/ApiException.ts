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
        Object.setPrototypeOf(this, ApiException.prototype);
    }

    get isForbidden() { return this.statusCode === 403; }
    get isNotFound() { return this.statusCode === 404; }
    get isUnauthorized() { return this.statusCode === 401; }
    get isBadRequest() { return this.statusCode === 400; }
    get isConflict() { return this.statusCode === 409; }
    get isTooManyRequests() { return this.statusCode === 429; }
    get isServiceUnavailable() { return this.statusCode === 503; }
    get isGatewayTimeout() { return this.statusCode === 504; }

    get isClientError(): boolean {
        return (
            this.isBadRequest ||
            this.isUnauthorized ||
            this.isForbidden ||
            this.isNotFound ||
            this.isConflict
        );
    }

    get isServerError(): boolean {
        return this.statusCode !== null && this.statusCode >= 500 && this.statusCode < 600;
    }


    toString(): string {
        return `ApiException: ${this.statusCode !== null ? this.statusCode : "No Status Code"} - ${this.message}${this.hasDesc() ? ` - ${this.description}` : ""}`;
    }

    static fromApiError(error: unknown): ApiException {
        // Axios-like error with response
        if (typeof error === "object" && error !== null) {
            const errObj = error as any;

            // Try to extract status and error response
            const statusCode = errObj?.response?.status ?? null;
            const responseData: JSONParams = errObj?.response?.data ?? null;

            // Check if both message and description are available
            if (responseData && typeof responseData === "object") {
                const { message, description } = responseData;

                // If both message and description are available, use them
                if (message && description) {
                    return new ApiException({
                        message: message,
                        description: description,
                        data: responseData.data ?? null,
                        errorCode: responseData.errorCode ?? null,
                        statusCode: statusCode,
                    });
                }
            }
        }

        // Fallback for unknown structures or missing message/description
        return new ApiException({
            message: "Something went wrong",
            description: "An unexpected error occurred. We couldn't process your request at the moment.",
            data: error,
            statusCode: null,
            errorCode: null,
        });
    }

}
