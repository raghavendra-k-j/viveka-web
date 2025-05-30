import { ElementType } from "react";
import { ButtonSize } from "./ButtonSize";
import clsx from "clsx";

export type OutlinedButtonTheme = 'neutral' |'primary' | 'success' | 'danger' | (string & {});

interface OutlinedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: ButtonSize;
    theme?: OutlinedButtonTheme;
    disabled?: boolean;
    loading?: boolean;
    children?: React.ReactNode;
    as?: ElementType; 
}

export const OutlinedButton: React.FC<OutlinedButtonProps> = ({
    size = 'md',
    theme = 'neutral',
    disabled = false,
    loading = false,
    children,
    className = '',
    as: Component = 'button',
    ...rest
}) => {
    const isDisabled = disabled || loading;

    const classes = clsx(
        'btn',
        'btn--outlined',
        `btn--outlined-${theme}`,
        `btn--${size}`,
        'shadow-xs',
        {
            'btn--disabled': isDisabled,
            'btn--loading': loading,
        },
        className
    );

    return (
        <Component className={classes} disabled={isDisabled} {...rest}>
            {loading && (
                <span className="btn__loader"></span>
            )}
            <span className="btn__content">{children}</span>
        </Component>
    );
};
