import { FormStatus } from "../../commons/forms/FormStatus";

export class AdminFormStatus {
    static readonly DRAFT = new AdminFormStatus("Draft", "Draft");
    static readonly PUBLISHED = new AdminFormStatus("Published", "Published");
    static readonly ACTIVE = new AdminFormStatus("Active", "Active");
    static readonly CLOSED = new AdminFormStatus("Closed", "Closed");
    static readonly ARCHIVED = new AdminFormStatus("Archived", "Archived");

    readonly status: string;
    readonly name: string;

    private constructor(status: string, name: string) {
        this.status = status;
        this.name = name;
    }

    get isDraft(): boolean {
        return this === AdminFormStatus.DRAFT;
    }

    get isPublished(): boolean {
        return this === AdminFormStatus.PUBLISHED;
    }

    get isActive(): boolean {
        return this === AdminFormStatus.ACTIVE;
    }

    get isClosed(): boolean {
        return this === AdminFormStatus.CLOSED;
    }

    get isArchived(): boolean {
        return this === AdminFormStatus.ARCHIVED;
    }

    static fromDbStatus({
        dbStatus,
        now,
        startDate,
        endDate,
    }: {
        dbStatus: FormStatus;
        now: Date;
        startDate?: Date;
        endDate?: Date;
    }): AdminFormStatus {
        if (dbStatus.isDraft) return AdminFormStatus.DRAFT;
        if (dbStatus.isArchived) return AdminFormStatus.ARCHIVED;
        if (dbStatus.isPublished) {
            if (startDate && (startDate.getTime() >= now.getTime())) {
                return AdminFormStatus.PUBLISHED;
            }
            if (endDate && (endDate.getTime() < now.getTime())) {
                return AdminFormStatus.CLOSED;
            }
            return AdminFormStatus.ACTIVE;
        }
        throw new Error('Invalid FormStatus');
    }
}
