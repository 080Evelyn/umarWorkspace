"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/api";

type AuthGuardProps = {
    children: React.ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter();
    const [checking, setChecking] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        let active = true;

        async function checkSession() {
            try {
                await getCurrentUser();

                if (active) {
                    setAuthenticated(true);
                }
            } catch (error) {
                console.error("Session verification failed:", error);

                if (active) {
                    router.replace("/login");
                }
            } finally {
                if (active) {
                    setChecking(false);
                }
            }
        }

        checkSession();

        return () => {
            active = false;
        };
    }, [router]);

    if (checking || !authenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
                    <p className="mt-4 text-sm font-medium text-slate-500">
                        Verifying your session...
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}