import { ButtonSize } from "./ButtonSize";
import clsx from 'clsx';

export type FilledButtonTheme = 'primary' | 'success' | 'danger' | (string & {});

interface FilledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    size?: ButtonSize;
    theme?: FilledButtonTheme;
    disabled?: boolean;
    loading?: boolean;
    children?: React.ReactNode;
}

export const FilledButton: React.FC<FilledButtonProps> = ({
    size = 'md',
    theme = 'primary',
    disabled = false,
    loading = false,
    children,
    className = '',
    ...rest
}) => {
    const isDisabled = disabled || loading;

    const classes = clsx(
        'btn',
        `btn--filled`,
        `btn--filled-${theme}`,
        `btn--${size}`,
        `shadow-sm`,
        { 'btn--disabled': isDisabled, 'btn--loading': loading },
        className
    );

    return (
        <button className={classes} disabled={isDisabled} {...rest}>
            {loading && (
                <span className="btn__loader"></span>
            )}
            <span className="btn__content">{children}</span>
        </button>
    );
};
