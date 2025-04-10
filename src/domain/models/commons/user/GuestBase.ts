import { JSONParams } from "@/core/types/JSONParams";

type GuestBaseProperties = {
    id: number;
    email: string;
    mobile?: string;
    name: string;
    emailVerified: boolean;
}

export class GuestBase {
    id: number;
    email: string;
    mobile?: string;
    name: string;
    emailVerified: boolean;

    constructor(properties: GuestBaseProperties) {
        this.id = properties.id;
        this.email = properties.email;
        this.mobile = properties.mobile;
        this.name = properties.name;
        this.emailVerified = properties.emailVerified;
    }

    static fromJson(json: JSONParams): GuestBase {
        return new GuestBase({
            id: json.id,
            email: json.email,
            mobile: json.mobile,
            name: json.name,
            emailVerified: json.emailVerified
        });
    }
}