import { AppException } from "@/core/exceptions/AppException";
import clsx from "clsx";
import React, { JSX } from "react";

type AppErrorViewProps = {
    message: string;
    description: string | null;
    actions: React.ReactNode[];
    className?: string;
    component?: keyof JSX.IntrinsicElements;
    e?: AppException;
};

export default function AppErrorView({
    message,
    description,
    actions,
    className,
    component: Component = "div",
    e,
}: AppErrorViewProps) {
    return (
        <Component className={clsx("flex flex-col justify-center text-center", className)}>
            <h1 className="fs-md-p font-semibold text-content-primary text-center">{message}</h1>
            {description && <p className="fs-md text-content-secondary">{description}</p>}
            {actions.length > 0 && (
                <div className="mt-6 flex justify-center space-x-4">
                    {actions.map((action, index) => (
                        <div key={index}>{action}</div>
                    ))}
                </div>
            )}
            {e && (<div>{e.cause as any}</div>)}
        </Component>
    );
}
