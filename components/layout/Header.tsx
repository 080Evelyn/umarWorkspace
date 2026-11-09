"use client";

import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/desk": "Desk Operations",
  "/customers": "Customers",
  "/expenses": "Expenses",
  "/reports": "Financial Reports",
  "/team": "Team Management",
  "/settings": "Settings",
};

export default function Header({
  onMenuClick,
}: HeaderProps) {
  const pathname = usePathname();

  const title =
    pageTitles[pathname] || "Workspace Management";

  return (
    <header className="sticky top-0 z-30 flex h-[76px] items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          aria-label="Open navigation"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-lg font-bold text-gray-900">
            {title}
          </h1>
          <p className="hidden text-xs text-gray-500 sm:block">
            Welcome back! Here's your workspace overview.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        {/* Search */}
        <div className="hidden w-64 items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 md:flex">
          <Search size={17} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-transparent text-xs outline-none placeholder:text-gray-400"
          />
        </div>

        {/* Notifications */}
        <button
          className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-white bg-red-500" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-gray-50">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-xs font-bold text-green-800">
            AD
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-xs font-semibold text-gray-800">
              Admin User
            </p>
            <p className="text-[10px] text-gray-500">
              Administrator
            </p>
          </div>

          <ChevronDown
            size={15}
            className="hidden text-gray-400 sm:block"
          />
        </button>
      </div>
    </header>
  );
}