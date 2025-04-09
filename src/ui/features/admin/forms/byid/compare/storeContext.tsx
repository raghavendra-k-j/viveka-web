"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { AdminFormCompareStore } from "./controller";
import { useAdminFormLayoutStore } from "../storeContext";



const AdminFormCompareContext = createContext<AdminFormCompareStore | null>(null);


export function AdminFormCompareContextProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AdminFormCompareStore | null>(null);
    const parentStore = useAdminFormLayoutStore();

    if (!storeRef.current) {
        storeRef.current = new AdminFormCompareStore({ parentStore: parentStore });
    }

    useEffect(() => {
        return () => {
            storeRef.current?.dispose();
        }
    });

    return (
        <AdminFormCompareContext.Provider value={storeRef.current}>
            {children}
        </AdminFormCompareContext.Provider>
    );

}

export function useAdminFormCompareStore(): AdminFormCompareStore {
    const store = useContext(AdminFormCompareContext);
    if (!store) {
        throw new Error('useAdminFormCompareStore must be used within a AdminFormCompareContextProvider');
    }
    return store;
}