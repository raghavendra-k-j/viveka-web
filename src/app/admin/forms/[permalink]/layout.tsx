"use client";

import AdminFormLayout, { AdminFormLayoutParams } from "@/ui/features/admin/forms/byid/layout";
import { AdminFormStoreProvider } from "@/ui/features/admin/forms/byid/storeCtx";
import { useParams } from "next/navigation";


export default function AdminFormLayoutRoute({ children, }: { children: React.ReactNode }) {

    const params = useParams<AdminFormLayoutParams>();

    return (
        <AdminFormStoreProvider layoutParams ={params}>
            <AdminFormLayout layoutParams={params}>{children}</AdminFormLayout>
        </AdminFormStoreProvider>);
}
