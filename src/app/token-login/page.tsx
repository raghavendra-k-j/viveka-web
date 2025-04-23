import TokenLoginView from "@/ui/features/auth/token-login/TokenLoginView";
import { Suspense } from "react";

export default function Page() {
    return <Suspense>
        <TokenLoginView />
    </Suspense>;
}
