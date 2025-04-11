import React, { useEffect, useMemo } from "react";
import { debounce } from "lodash";
import { Search, X } from "lucide-react";
import { InputSize } from "./InputSize";

type SearchInputProps = {
    value: string;
    onChange: (value: string) => void;
    onDebouncedChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
    debounceDelay?: number;
    placeholder?: string;
    disabled?: boolean;
    size?: InputSize;
};

export const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChange,
    onDebouncedChange,
    onSubmit,
    debounceDelay = 300,
    placeholder = "Search...",
    disabled = false,
    size = InputSize.medium,
}) => {
    const debouncedChange = useMemo(
        () =>
            onDebouncedChange
                ? debounce(onDebouncedChange, debounceDelay)
                : undefined,
        [onDebouncedChange, debounceDelay]
    );

    useEffect(() => {
        if (debouncedChange) {
            debouncedChange(value);
        }
        return () => {
            debouncedChange?.cancel();
        };
    }, [value, debouncedChange]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && onSubmit) {
            onSubmit(value);
        }
    };

    const inputStyle: React.CSSProperties = size
        ? {
            padding: `${size.py} ${size.px} ${size.py} 0`,
            fontSize: size.fontSize,
            borderRadius: size.borderRadius,
            borderWidth: size.borderThickness,
        }
        : {};

    const iconSize = size.iconSize;

    return (
        <div
            className={`
                relative flex items-center w-full
                text-[var(--color-content-primary)]
                bg-[var(--color-surface)]
                border border-[var(--color-input-border)]
                hover:border-[var(--color-input-border-hover)]
                focus-within:border-[var(--color-input-border-focused)]
                focus-within:ring-1 focus-within:ring-[var(--color-input-border-focused)]
                disabled:bg-[var(--color-surface)]
                disabled:text-[var(--color-content-disabled)]
                disabled:border-[var(--color-input-border)]
                disabled:cursor-not-allowed
                shadow-xs
                transition-colors
                rounded
            `}
            style={inputStyle}
        >
            {/* Search Icon */}
            <div className="pl-2 text-[var(--color-content-secondary)] pointer-events-none">
                <Search size={18} />
            </div>

            {/* Input Field */}
            <input
                type="text"
                className={`
                    flex-1 bg-transparent outline-none border-none
                    placeholder-[var(--color-content-placeholder)]
                    px-2
                `}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                disabled={disabled}
            />

            {/* Clear Icon */}
            {value && !disabled && (
                <button
                    type="button"
                    className="pr-2 text-[var(--color-content-tertiary)] hover:text-[var(--color-content-secondary)]"
                    onClick={() => onChange("")}
                    aria-label="Clear search input"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
};
