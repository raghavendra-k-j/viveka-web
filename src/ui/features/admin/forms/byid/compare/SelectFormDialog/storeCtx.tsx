import { createContext, useContext, useRef } from "react";
import { SelectFormDialogStore } from "./store";
import { useAdminFormCompareStore } from "../storeCtx";

const SelectFormDialogCtx = createContext<SelectFormDialogStore | null>(null);

export function SelectFormDialogStoreProvider({ children }: { children: React.ReactNode }) {
    const store = useRef<SelectFormDialogStore | null>(null);
    const parentStore = useAdminFormCompareStore();

    if (!store.current) {
        store.current = new SelectFormDialogStore({ parentStore });
    }

    return <SelectFormDialogCtx.Provider value={store.current}>{children}</SelectFormDialogCtx.Provider>;
}

export function useSelectFormDialogStore() {
    const store = useContext(SelectFormDialogCtx);
    if (!store) throw new Error("Must be used within SelectFormDialogStoreProvider");
    return store;
}
