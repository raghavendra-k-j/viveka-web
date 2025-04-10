import { JSONParams } from "@/core/types/JSONParams";

type UserBaseProps = {
    id: number;
    userName?: string;
    email: string;
    mobile?: string;
    name: string;
    emailVerified: boolean;
}

export class UserBase {
    id: number;
    userName?: string;
    email: string;
    mobile?: string;
    name: string;
    emailVerified: boolean;

    constructor(props: UserBaseProps) {
        this.id = props.id;
        this.userName = props.userName;
        this.email = props.email;
        this.mobile = props.mobile;
        this.name = props.name;
        this.emailVerified = props.emailVerified;
    }

    static fromJson(json: JSONParams): UserBase {
        return new UserBase({
            id: json.id,
            userName: json.userName,
            email: json.email,
            mobile: json.mobile,
            name: json.name,
            emailVerified: json.emailVerified
        });
    }


}