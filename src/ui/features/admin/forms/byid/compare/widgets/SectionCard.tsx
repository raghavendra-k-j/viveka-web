import clsx from "clsx";
import { ReactNode } from "react";

interface CompareCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

const CompareSectionCard = (props: CompareCardProps) => {
    const { children, className, ...rest } = props;
    return (
        <div className={`border border-default bg-surface shadow-sm ${className ?? ''}`} {...rest}>
            {children}
        </div>
    );
}


type CompareSectionCardTitleProps = {
    children: ReactNode;
    className?: string;
};

const CompareSectionCardTitle = ({ children, className }: CompareSectionCardTitleProps) => {
    return (
        <h2 className={clsx("fs-md font-bold text-content-primary", className)}>
            {children}
        </h2>
    );
};

export { CompareSectionCard, CompareSectionCardTitle };