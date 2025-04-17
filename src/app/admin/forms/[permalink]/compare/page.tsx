import AdminFormComparePage from "@/ui/features/admin/forms/byid/compare/page";
import { AdminFormCompareStoreProvider } from "@/ui/features/admin/forms/byid/compare/storeCtx";

export default function AdminFormCompareRoute() {
    return (<AdminFormCompareStoreProvider>
        <AdminFormComparePage />
    </AdminFormCompareStoreProvider>);
}