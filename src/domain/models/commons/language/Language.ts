import { JSONParams } from "@/core/types/JSONParams";

type LanguageParams = {
    id: string;
    name: string;
    translateCode: string;
    ttsCode: string;
}

export class Language {

    id: string;
    name: string;
    translateCode: string;
    ttsCode: string;

    constructor(params: LanguageParams) {
        this.id = params.id;
        this.name = params.name;
        this.translateCode = params.translateCode;
        this.ttsCode = params.ttsCode;
    }

    static fromMap(map: JSONParams): Language {
        return new Language({
            id: map['id'],
            name: map['name'],
            translateCode: map['translateCode'],
            ttsCode: map['ttsCode'],
        });
    }

}