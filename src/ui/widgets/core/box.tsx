import React from "react";
import clsx from "clsx";

export function Center({ children }: { children: React.ReactNode }) {
    return <div className="flex justify-center items-center">{children}</div>;
}

export function Row({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return <div className={`flex flex-row ${className}`}>{children}</div>;
}

export function Column({ children, className = "" }: { children: React.ReactNode, className?: string }) {
    return <div className={`flex flex-col ${className}`}>{children}</div>;
}

export function Expanded({ children, xClassName = "" }: { children: React.ReactNode, xClassName?: string }) {
    return <div className={clsx("flex-1", xClassName)}>{children}</div>;
}

export function Flexible({ children, grow = true, shrink = true, basis = "0" }: {
    children: React.ReactNode,
    grow?: boolean,
    shrink?: boolean,
    basis?: string
}) {
    const growClass = grow ? "grow" : "grow-0";
    const shrinkClass = shrink ? "shrink" : "shrink-0";
    return <div className={`${growClass} ${shrinkClass} basis-[${basis}]`}>{children}</div>;
}

export function Align({
    children,
    horizontal = "center",
    vertical = "center",
    direction = "row",
    className = ""
}: {
    children: React.ReactNode,
    horizontal?: "start" | "center" | "end" | "between" | "around" | "evenly",
    vertical?: "start" | "center" | "end" | "stretch",
    direction?: "row" | "column",
    className?: string
}) {
    const justifyMap = {
        start: "justify-start",
        center: "justify-center",
        end: "justify-end",
        between: "justify-between",
        around: "justify-around",
        evenly: "justify-evenly"
    };

    const alignMap = {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch"
    };

    const flexDirection = direction === "column" ? "flex-col" : "flex-row";

    return (
        <div className={`flex ${flexDirection} ${justifyMap[horizontal]} ${alignMap[vertical]} ${className}`}>
            {children}
        </div>
    );
}


export function Fill({ children }: { children: React.ReactNode }) {
    return <div className="w-full h-full">{children}</div>;
}
