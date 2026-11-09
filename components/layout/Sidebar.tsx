"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MonitorCheck,
  Users,
  Wallet,
  ChartNoAxesCombined,
  UsersRound,
  Settings,
  Building2,
  X,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const navigation = [
  {
    title: "MAIN MENU",
    items: [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
      {
        name: "Desk Operations",
        href: "/desk",
        icon: MonitorCheck,
      },
      {
        name: "Customers",
        href: "/customers",
        icon: Users,
      },
    ],
  },
  {
    title: "MANAGEMENT",
    items: [
      {
        name: "Expenses",
        href: "/expenses",
        icon: Wallet,
      },
      {
        name: "Financial Reports",
        href: "/reports",
        icon: ChartNoAxesCombined,
      },
      {
        name: "Team Management",
        href: "/team",
        icon: UsersRound,
      },
    ],
  },
];

export default function Sidebar({
  open,
  onClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-[76px] items-center justify-between border-b border-gray-100 px-6">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-white">
              <Building2 size={22} />
            </div>

            <div>
              <h2 className="text-[15px] font-bold tracking-tight text-gray-900">
                Workspace
              </h2>
              <p className="text-[11px] text-gray-500">
                Management System
              </p>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-7">
          {navigation.map((group) => (
            <div key={group.title}>
              <p className="mb-3 px-3 text-[10px] font-bold tracking-[1.5px] text-gray-400">
                {group.title}
              </p>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  const active =
                    pathname === item.href ||
                    (item.href !== "/dashboard" &&
                      pathname.startsWith(`${item.href}/`));

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-3 rounded-lg px-3 py-3 text-[13px] font-medium transition-colors ${
                        active
                          ? "bg-green-50 text-green-800"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <Icon size={19} strokeWidth={1.8} />

                      <span>{item.name}</span>

                      {active && (
                        <span className="ml-auto h-2 w-2 rounded-full bg-green-600" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}

          <div>
            <p className="mb-3 px-3 text-[10px] font-bold tracking-[1.5px] text-gray-400">
              PREFERENCES
            </p>

            <Link
              href="/settings"
              onClick={onClose}
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-[13px] font-medium ${
                pathname.startsWith("/settings")
                  ? "bg-green-50 text-green-800"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Settings size={19} strokeWidth={1.8} />
              Settings
            </Link>
          </div>
        </nav>

        {/* User information */}
        <div className="border-t border-gray-100 p-4">
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-800">
              AD
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-gray-900">
                Workspace Admin
              </p>
              <p className="text-[11px] text-gray-500">
                Administrator
              </p>
            </div>

            <LogOut size={17} className="text-gray-400" />
          </div>
        </div>
      </aside>
    </>
  );
}