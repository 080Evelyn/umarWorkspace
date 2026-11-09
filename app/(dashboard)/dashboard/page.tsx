import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Users,
  UserCheck,
  Activity,
  TrendingUp,
} from "lucide-react";
import LogoutButton from "@/components/dashboard/LogoutButton";

import StatCard from "@/components/dashboard/StatCard";

import {
  dashboardStats,
  recentVisits,
  visitorActivity,
} from "@/lib/mock-data";

export default function DashboardPage() {
  const maxVisitors = Math.max(
    ...visitorActivity.map((item) => item.visitors)
  );

  return (
    <div className="space-y-7">

      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Workspace Overview
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Monitor your workspace activities and performance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50">
            <CalendarDays size={16} />
            Today
          </button>

          <LogoutButton />
        </div>
      </section>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat, index) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            description={stat.description}
            index={index}
          />
        ))}
      </section>

      {/* Charts and active visitors */}
      <section className="grid grid-cols-1 gap-5 xl:grid-cols-3">

        {/* Visitor activity chart */}
        <div className="rounded-xl border border-gray-200 bg-white p-5 xl:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Visitor Activity
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Weekly visitor attendance overview
              </p>
            </div>

            <span className="flex items-center gap-1 text-xs font-semibold text-green-700">
              <TrendingUp size={14} />
              This week
            </span>
          </div>

          {/* Chart */}
          <div className="mt-8 flex h-[230px] items-end justify-between gap-3 border-b border-gray-100 pb-2">
            {visitorActivity.map((item) => {
              const height =
                (item.visitors / maxVisitors) * 100;

              return (
                <div
                  key={item.day}
                  className="flex h-full flex-1 flex-col items-center justify-end gap-3"
                >
                  <span className="text-[10px] font-medium text-gray-500">
                    {item.visitors}
                  </span>

                  <div className="flex h-full w-full items-end justify-center">
                    <div
                      className="w-full max-w-[35px] rounded-t-md bg-green-600 transition-all hover:bg-green-700"
                      style={{
                        height: `${height}%`,
                      }}
                    />
                  </div>

                  <span className="text-[11px] text-gray-500">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active visitors */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-gray-900">
                Currently In Space
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Live occupancy overview
              </p>
            </div>

            <div className="rounded-lg bg-green-50 p-2 text-green-700">
              <Activity size={19} />
            </div>
          </div>

          <div className="mt-7 flex items-center justify-center">
            <div className="relative flex h-40 w-40 items-center justify-center rounded-full border-[13px] border-green-100">
              <div className="absolute inset-[-13px] rounded-full border-[13px] border-transparent border-t-green-600 border-r-green-600 rotate-[-45deg]" />

              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">
                  16
                </h2>

                <p className="mt-1 text-[11px] text-gray-500">
                  Active visitors
                </p>
              </div>
            </div>
          </div>

          <div className="mt-7 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-gray-500">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                Occupied
              </span>

              <span className="font-semibold text-gray-800">
                16
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-gray-500">
                <span className="h-2 w-2 rounded-full bg-green-100" />
                Available
              </span>

              <span className="font-semibold text-gray-800">
                24
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent visits */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 p-5">
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Recent Visits
            </h3>

            <p className="mt-1 text-xs text-gray-500">
              Latest visitor check-in activities
            </p>
          </div>

          <a
            href="/desk"
            className="flex items-center gap-1 text-xs font-semibold text-green-700 hover:text-green-800"
          >
            View all
            <ArrowRight size={15} />
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-[11px] font-semibold text-gray-500">
                  VISITOR
                </th>

                <th className="px-5 py-4 text-[11px] font-semibold text-gray-500">
                  VISIT ID
                </th>

                <th className="px-5 py-4 text-[11px] font-semibold text-gray-500">
                  SERVICE
                </th>

                <th className="px-5 py-4 text-[11px] font-semibold text-gray-500">
                  CHECK-IN
                </th>

                <th className="px-5 py-4 text-[11px] font-semibold text-gray-500">
                  STATUS
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {recentVisits.map((visit) => (
                <tr
                  key={visit.id}
                  className="transition-colors hover:bg-gray-50"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-50 text-xs font-bold text-green-800">
                        {visit.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")}
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-gray-800">
                          {visit.name}
                        </p>

                        <p className="mt-1 text-[10px] text-gray-400">
                          {visit.phone}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-xs text-gray-500">
                    {visit.id}
                  </td>

                  <td className="px-5 py-4 text-xs text-gray-600">
                    {visit.service}
                  </td>

                  <td className="px-5 py-4">
                    <span className="flex items-center gap-2 text-xs text-gray-600">
                      <Clock3 size={14} className="text-gray-400" />
                      {visit.checkIn}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold ${visit.status === "Active"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {visit.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bottom information */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <Users size={22} />
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Total customer base
            </p>

            <h3 className="mt-1 text-lg font-bold text-gray-900">
              1,284 Customers
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="rounded-xl bg-purple-50 p-3 text-purple-600">
            <UserCheck size={22} />
          </div>

          <div>
            <p className="text-xs text-gray-500">
              Customer retention
            </p>

            <h3 className="mt-1 text-lg font-bold text-gray-900">
              78%
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}