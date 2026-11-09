"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logout, clearAccessToken } from "@/lib/api";

export default function LogoutButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    async function handleLogout() {
        if (loading) return;

        setLoading(true);

        try {
            await logout();
        } catch (error) {
            console.error("Logout request failed:", error);
        } finally {
            // Clear the local access token even if the API request fails.
            clearAccessToken();

            router.replace("/login");
            router.refresh();
        }
    }

    return (
        <button
            type="button"
            onClick={handleLogout}
            disabled={loading}
            className="flex w-fit items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
            <LogOut size={16} />
            {loading ? "Signing out..." : "Logout"}
        </button>
    );
}