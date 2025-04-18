import React, { useRef } from "react";
import clsx from "clsx";
import { SearchIcon, X } from "lucide-react";

export type SearchInputSize = "sm" | "md" | "lg" | (string & {});

interface BaseSearchInputProps {
  onSubmit?: (value: string) => void;
  inputSize?: SearchInputSize;
  onClear?: () => void;
}

export type SearchInputProps = BaseSearchInputProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

export const SearchInput: React.FC<SearchInputProps> = ({
  onSubmit,
  onClear,
  inputSize = "md",
  value,
  onChange,
  className,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSubmit) {
      onSubmit(value);
    }
  };

  const handleClear = () => {
    onClear?.();
    inputRef.current?.focus();
  };

  return (
    <div
      className={clsx("search-input", `search-input--${inputSize}`, className)}
    >
      <span className="search-input__icon">
        <SearchIcon size="100%" strokeWidth={1.5} />
      </span>

      <input
        type="search"
        ref={inputRef}
        value={value}
        onChange={onChange}
        onKeyDown={handleKeyDown}
        className="search-input__field"
        placeholder="Search..."
        {...rest}
      />

      {value && (
        <span className="search-input__clear" onClick={handleClear}>
          <X size="100%" strokeWidth={1.5} />
        </span>
      )}
    </div>
  );
};
