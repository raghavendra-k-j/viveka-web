import React from "react";

type LoaderTheme = 'primary' | 'neutral' | 'success' | 'danger' | (string & {});

type LoaderProps = {
    size?: string;
    thickness?: string;
    theme?: LoaderTheme;
};

export const Loader: React.FC<LoaderProps> = ({
    size,
    thickness,
    theme = 'primary',
}) => {
    const styleVars: Record<string, string> = {};

    if (size) {
        styleVars["--loader-size"] = size;
    }

    if (thickness) {
        styleVars["--loader-thickness"] = thickness;
    }

    return (
        <span
            className={`loader loader--${theme}`}
            style={styleVars}
            role="status"
            aria-live="polite"
        />
    );
};
