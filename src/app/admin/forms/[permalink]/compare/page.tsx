import AdminFormComparePage from "@/ui/features/admin/forms/byid/compare/page";
import { AdminFormCompareContextProvider } from "@/ui/features/admin/forms/byid/compare/storeContext";

export default function AdminFormCompareRoute() {
    return (<AdminFormCompareContextProvider>
        <AdminFormComparePage />
    </AdminFormCompareContextProvider>);
}