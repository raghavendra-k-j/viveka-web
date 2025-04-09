type FormVisibilityParams = {
    visibility: string;
    name: string;
}

export class FormVisibility {

    static public = new FormVisibility({
        visibility: "Public",
        name: "Public",
    });

    static private = new FormVisibility({
        visibility: "Private",
        name: "Private",
    });

    static values = [this.public, this.private];
    static valuesMap = {
        [this.public.visibility]: this.public,
        [this.private.visibility]: this.private,
    };

    visibility: string;
    name: string;

    constructor(params: FormVisibilityParams) {
        this.visibility = params.visibility;
        this.name = params.name;
    }


    static fromString(visibility: string | null): FormVisibility | null {
        if (!visibility) return null;
        return this.valuesMap[visibility] || null;
    }


}

