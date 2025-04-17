import { StringUtils } from "../utils/StringUtils";

export type AppExceptionParams = {
    message: string;
    description?: string | null;
    data?: any;
};

export class AppException extends Error {
    
    description: string | null;
    data: any | null;

    constructor(params: AppExceptionParams) {
        super(params.message);
        this.description = StringUtils.trimToNull(params.description);
        this.data = params.data;
        Object.setPrototypeOf(this, AppException.prototype);
    }

    public hasDesc(): boolean {
        return this.description !== null;
    }

    static fromAny(e: unknown): AppException {
        if (e instanceof AppException) {
            return e;
        }
        if (e instanceof Error) {
            return new AppException({ message: e.message.trim() || "An unexpected error occurred", description: e.message.trim(), data: e });
        }
        if (typeof e === "string") {
            return new AppException({ message: e, description: e });
        }
        if (typeof e === "object" && e !== null && "message" in e) {
            return new AppException({ message: String(e.message), description: String(e.message), data: e });
        }

        return new AppException({ message: "An unexpected error occurred" });
    }


    static intentionalError({ description }: { description?: string | null } = {}): AppException {
        const defaultDescription = description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
        return new AppException({ message: "Intentional error", description: defaultDescription });
    }
    

    toString(): string {
        return `AppException: ${this.message}${this.hasDesc() ? ` - ${this.description}` : ""}`;
    }

}
