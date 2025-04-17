import React from "react";
import clsx from "clsx";

export type SearchInputSize = "sm" | "md" | (string & {});

interface BaseSearchInputProps {
    onSubmit?: (value: string) => void;
    inputSize?: SearchInputSize;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

type SearchInputProps = BaseSearchInputProps &
    React.InputHTMLAttributes<HTMLInputElement>;

export const SearchInput: React.FC<SearchInputProps> = (props) => {
    const { inputSize = "md", disabled = false, value = "" } = props;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && props.onSubmit) {
            props.onSubmit(props.value as string);
        }
    };

    const resolvedSizeClass = clsx("search-input", {
        [`search-input--${inputSize}`]: inputSize,
        [props.className ?? ""]: props.className,
    });

    return (
        <div className={resolvedSizeClass} aria-disabled={disabled}>
            <input
                type="text"
                className="search-input__input"
                placeholder={props.placeholder}
                value={props.value ?? ""}
                onChange={(e) =>
                    (props.onChange as (e: React.ChangeEvent<HTMLInputElement>) => void)?.(e)
                }
                onKeyDown={handleKeyDown}
                disabled={disabled}
                {...props}
            />

            {/* Clear Button */}
            {props.value && !props.disabled && (
                <button
                    type="button"
                    className="search-input__clear"
                    onClick={() =>
                        (props.onChange as (e: React.ChangeEvent<HTMLInputElement>) => void)?.({
                            target: { value: "" },
                        } as React.ChangeEvent<HTMLInputElement>)
                    }
                    aria-label="Clear search input"
                >
                </button>
            )}
        </div>
    );
};
