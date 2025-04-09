"use client";

import AdminFormLayout, { AdminFormLayoutParams } from "@/ui/features/admin/forms/byid/layout";
import { AdminFormLayoutContextProvider } from "@/ui/features/admin/forms/byid/storeContext";
import { useParams } from "next/navigation";


export default function AdminFormLayoutRoute({ children, }: { children: React.ReactNode }) {

    const params = useParams<AdminFormLayoutParams>();

    return (
        <AdminFormLayoutContextProvider layoutParams ={params}>
            <AdminFormLayout layoutParams={params}>{children}</AdminFormLayout>
        </AdminFormLayoutContextProvider>);
}
