export type InputSizeProps = {
    px: string;
    py: string;
    fontSize: string;
    iconSize: string;
    borderRadius: string;
    borderThickness: string;
};

export class InputSize {
    px: string;
    py: string;
    fontSize: string;
    iconSize: string;
    borderRadius: string;
    borderThickness: string;

    constructor(props: InputSizeProps) {
        this.px = props.px;
        this.py = props.py;
        this.fontSize = props.fontSize;
        this.iconSize = props.iconSize;
        this.borderRadius = props.borderRadius;
        this.borderThickness = props.borderThickness;
    }

    static medium = new InputSize({
        px: "var(--dimen-input-md-px)",
        py: "var(--dimen-input-md-py)",
        fontSize: "var(--dimen-input-md-fs)",
        iconSize: "var(--dimen-input-md-icon-size)",
        borderRadius: "var(--dimen-input-radius)",
        borderThickness: "var(--dimen-input-border-thickness)"
    });

    static small = new InputSize({
        px: "var(--dimen-input-sm-px)",
        py: "var(--dimen-input-sm-py)",
        fontSize: "var(--dimen-input-sm-fs)",
        iconSize: "var(--dimen-input-sm-icon-size)",
        borderRadius: "var(--dimen-input-radius)",
        borderThickness: "var(--dimen-input-border-thickness)"
    });
}
