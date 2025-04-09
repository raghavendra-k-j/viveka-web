import { Dialog, DialogPanel } from "@headlessui/react";
import { ReactNode } from "react";
import clsx from "clsx";

type DialogCardProps = {
    children: ReactNode;
    isOpen: boolean;
    onClose: VoidFunction;
    panelClassName?: string;
};

export function DialogCard({
    children,
    isOpen,
    onClose,
    panelClassName = "bg-white shadow-lg rounded-sm max-w-md w-full max-h-[90vh] overflow-hidden",
}: DialogCardProps) {
    return (
        <Dialog open={isOpen} onClose={onClose} className={clsx("relative", "z-50")}>
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center">
                <DialogPanel className={clsx(panelClassName)}>
                    {children}
                </DialogPanel>
            </div>
        </Dialog>
    );
}


export function DialogHeader({ children, onClose }: { children: ReactNode, onClose?: VoidFunction }) {
    return (
        <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-bold">{children}</h2>
            {onClose && (
                <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                    X
                </button>
            )}
        </div>
    );
}

export function DialogFooter({ children }: { children: ReactNode }) {
    return (
        <div className="flex items-center justify-end p-4 border-t">
            {children}
        </div>
    );
}
