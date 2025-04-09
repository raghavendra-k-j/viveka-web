"use client";

import React, { createContext, useContext, useEffect, useRef } from "react";
import { AdminFormLayoutStore } from "./controller";
import { AdminFormLayoutParams } from "./layout";



const AdminFormLayoutContext = createContext<AdminFormLayoutStore | null>(null);


export function AdminFormLayoutContextProvider({ children, layoutParams }: { children: React.ReactNode, layoutParams: AdminFormLayoutParams }) {
    const storeRef = useRef<AdminFormLayoutStore | null>(null);

    if (!storeRef.current) {
        storeRef.current = new AdminFormLayoutStore({ permalink: layoutParams.permalink });
    }

    useEffect(() => {
        return () => {
            storeRef.current?.dispose();
        }
    });

    return (
        <AdminFormLayoutContext.Provider value={storeRef.current}>
            {children}
        </AdminFormLayoutContext.Provider>
    );

}

export function useAdminFormLayoutStore(): AdminFormLayoutStore {
    const store = useContext(AdminFormLayoutContext);
    if (!store) {
        throw new Error('useAdminFormLayoutStore must be used within a AdminFormLayoutContextProvider');
    }
    return store;
}