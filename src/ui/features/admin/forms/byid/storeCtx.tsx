"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { AdminFormStore } from "./store";
import { AdminFormLayoutParams } from "./layout";


const AdminFormCtx = createContext<AdminFormStore | null>(null);


export function AdminFormStoreProvider({ children, layoutParams }: { children: React.ReactNode, layoutParams: AdminFormLayoutParams }) {
    const storeRef = useRef<AdminFormStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = new AdminFormStore({ permalink: layoutParams.permalink });
    }

    useEffect(() => {
        return () => {
            storeRef.current?.dispose();
        }
    });

    return (
        <AdminFormCtx.Provider value={storeRef.current}>
            {children}
        </AdminFormCtx.Provider>
    );

}

export function useAdminFormStore(): AdminFormStore {
    const store = useContext(AdminFormCtx);
    if (!store) {
        throw new Error('useAdminFormStore must be used within a AdminFormStoreProvider');
    }
    return store;
}