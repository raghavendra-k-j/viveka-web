/* 
enum FormStatus {
  draft(status: "Draft", name: "Draft"),
  published(status: "Published", name: "Published"),
  archived(status: "Archived", name: "Archived");

  final String status;
  final String name;

  bool get isDraft => this == FormStatus.draft;
  bool get isPublished => this == FormStatus.published;
  bool get isArchived => this == FormStatus.archived;

  const FormStatus({
    required this.status,
    required this.name,
  });

  static FormStatus? fromStatus(String? status) {
    if (status == null) return null;
    for (FormStatus formStatus in FormStatus.values) {
      if (formStatus.status.toLowerCase() == status.toLowerCase()) {
        return formStatus;
      }
    }
    return null;
  }
}

*/


type FormStatusParams = {
    status: string;
    name: string;
}

export class FormStatus {

    static draft = new FormStatus({
        status: "Draft",
        name: "Draft",
    });

    static published = new FormStatus({
        status: "Published",
        name: "Published",
    });

    static archived = new FormStatus({
        status: "Archived",
        name: "Archived",
    });

    static values = [this.draft, this.published, this.archived];
    static valuesMap = {
        [this.draft.status]: this.draft,
        [this.published.status]: this.published,
        [this.archived.status]: this.archived,
    };

    private constructor(params: FormStatusParams) {
        this.status = params.status;
        this.name = params.name;
    }

    status: string;
    name: string;

    // Getter methods
    get isDraft(): boolean {
        return this === FormStatus.draft;
    }

    get isPublished(): boolean {
        return this === FormStatus.published;
    }

    get isArchived(): boolean {
        return this === FormStatus.archived;
    }

    // Static method to create an instance from a status string
    static fromStatus(status: string | null): FormStatus | null {
        if (!status) return null;
        return this.valuesMap[status] || null;
    }

}