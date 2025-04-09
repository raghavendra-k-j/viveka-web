import { JSONParams } from "@/core/types/JSONParams";


type FormUserParams = {
    id: number;
    name: string;
}

export class FormUser {
    
    id: number;
    name: string;

    constructor(params: FormUserParams) {
        this.id = params.id;
        this.name = params.name;
    }

    static fromMap(map: { [key: string]: any }): FormUser {
        return new FormUser({
            id: map['id'],
            name: map['name'],
        });
    }

    static fromJson(json: JSONParams): FormUser {
        return new FormUser({
            id: json.id,
            name: json.name,
        });
    }

}
