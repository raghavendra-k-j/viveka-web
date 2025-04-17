"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { AdminFormCompareStore } from "./store";
import { useAdminFormStore } from "../storeCtx";


const AdminFormCompareCtx = createContext<AdminFormCompareStore | null>(null);


export function AdminFormCompareStoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AdminFormCompareStore | null>(null);
    const parentStore = useAdminFormStore();

    if (!storeRef.current) {
        storeRef.current = new AdminFormCompareStore({ parentStore: parentStore });
    }

    useEffect(() => {
        return () => {
            storeRef.current?.dispose();
        }
    });

    return (
        <AdminFormCompareCtx.Provider value={storeRef.current}>
            {children}
        </AdminFormCompareCtx.Provider>
    );

}

export function useAdminFormCompareStore(): AdminFormCompareStore {
    const store = useContext(AdminFormCompareCtx);
    if (!store) {
        throw new Error('useAdminFormCompareStore must be used within a AdminFormCompareStoreProvider');
    }
    return store;
}