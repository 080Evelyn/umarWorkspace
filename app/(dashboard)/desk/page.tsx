"use client";

import { useMemo, useState } from "react";

import {
  Users,
  UserCheck,
  LogOut,
  Clock,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  CheckCircle2,
  MoreHorizontal,
  CalendarDays,
  RefreshCw,
} from "lucide-react";

import CheckInModal from "@/components/desk/CheckInModal";

import {
  initialVisits,
  type Visit,
  type VisitStatus,
} from "@/lib/desk-data";

type TabType = "Active Visitors" | "Visit History";

export default function DeskOperationsPage() {
  const [visits, setVisits] = useState<Visit[]>(initialVisits);

  const [activeTab, setActiveTab] =
    useState<TabType>("Active Visitors");

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [serviceFilter, setServiceFilter] = useState("All");

  const [modalOpen, setModalOpen] = useState(false);

  const activeVisitors = visits.filter(
    (visit) => visit.status === "Active"
  );

  const checkedOutVisitors = visits.filter(
    (visit) => visit.status === "Checked Out"
  );

  const filteredVisits = useMemo(() => {
    return visits.filter((visit) => {
      const matchesSearch =
        visit.name.toLowerCase().includes(search.toLowerCase()) ||
        visit.phone.includes(search) ||
        visit.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" ||
        visit.status === statusFilter;

      const matchesService =
        serviceFilter === "All" ||
        visit.service === serviceFilter;

      const matchesTab =
        activeTab === "Active Visitors"
          ? visit.status === "Active"
          : true;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesService &&
        matchesTab
      );
    });
  }, [
    visits,
    search,
    statusFilter,
    serviceFilter,
    activeTab,
  ]);

  const handleCheckIn = (data: {
    name: string;
    phone: string;
    email: string;
    service: string;
    paymentType: string;
  }) => {
    const newVisit: Visit = {
      ...data,
      id: `VIS-${String(Date.now()).slice(-6)}`,
      checkIn: new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      checkOut: null,
      status: "Active",
    };

    setVisits((previous) => [newVisit, ...previous]);

    setActiveTab("Active Visitors");
    setSearch("");
    setStatusFilter("All");
    setServiceFilter("All");
    setModalOpen(false);
  };

  const handleCheckOut = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to check out this visitor?"
    );

    if (!confirmed) return;

    setVisits((previous) =>
      previous.map((visit) =>
        visit.id === id
          ? {
              ...visit,
              status: "Checked Out" as VisitStatus,
              checkOut: new Date().toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }
          : visit
      )
    );
  };

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setServiceFilter("All");
  };

  const statCards = [
    {
      title: "Today's Visitors",
      value: visits.length.toString(),
      description: "Total visit records",
      icon: Users,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Currently Active",
      value: activeVisitors.length.toString(),
      description: "Visitors in the workspace",
      icon: UserCheck,
      color: "bg-green-50 text-green-700",
    },
    {
      title: "Checked Out",
      value: checkedOutVisitors.length.toString(),
      description: "Completed visits",
      icon: LogOut,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Visit Activity",
      value: visits.length.toString(),
      description: "Recorded visits today",
      icon: Clock,
      color: "bg-orange-50 text-orange-600",
    },
  ];

  return (
    <div className="space-y-7">

      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-gray-900">
              Desk Operations
            </h2>

            <span className="rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-semibold text-green-700">
              Live Desk
            </span>
          </div>

          <p className="mt-1 text-sm text-gray-500">
            Manage visitor check-ins, check-outs and attendance.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-green-800"
        >
          <Plus size={17} />
          Check In Visitor
        </button>
      </section>

      {/* Date information */}
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <CalendarDays size={16} />

        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </div>

      {/* Statistics */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium text-gray-500">
                  {stat.title}
                </p>

                <div className={`rounded-xl p-2.5 ${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>

              <h3 className="mt-4 text-2xl font-bold text-gray-900">
                {stat.value}
              </h3>

              <p className="mt-2 text-[11px] text-gray-400">
                {stat.description}
              </p>
            </div>
          );
        })}
      </section>

      {/* Visitor management */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">

        {/* Tabs and controls */}
        <div className="border-b border-gray-100 p-5">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

            <div className="flex items-center gap-6 border-b border-gray-100 sm:border-0">
              {(["Active Visitors", "Visit History"] as TabType[]).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      setStatusFilter("All");
                    }}
                    className={`relative pb-3 text-xs font-semibold transition sm:pb-0 ${
                      activeTab === tab
                        ? "text-green-700"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                  >
                    {tab}

                    {tab === "Active Visitors" && (
                      <span className="ml-2 rounded-full bg-green-50 px-2 py-0.5 text-[10px] text-green-700">
                        {activeVisitors.length}
                      </span>
                    )}

                    {activeTab === tab && (
                      <span className="absolute -bottom-[1px] left-0 h-0.5 w-full rounded-full bg-green-600 sm:hidden" />
                    )}
                  </button>
                )
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2">

              {/* Search */}
              <div className="flex min-w-[180px] flex-1 items-center gap-2 rounded-lg border border-gray-200 px-3 py-2.5 sm:flex-none">
                <Search size={16} className="text-gray-400" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search visitors..."
                  className="w-full text-xs outline-none placeholder:text-gray-400 sm:w-40"
                />
              </div>

              {/* Service filter */}
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs text-gray-600 outline-none"
              >
                <option value="All">All Services</option>
                <option value="Private Office">Private Office</option>
                <option value="Hot Desk">Hot Desk</option>
                <option value="Meeting Room">Meeting Room</option>
                <option value="Virtual Office">Virtual Office</option>
              </select>

              {/* Status filter */}
              {activeTab === "Visit History" && (
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-xs text-gray-600 outline-none"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Checked Out">Checked Out</option>
                </select>
              )}

              <button
                onClick={resetFilters}
                title="Reset filters"
                className="rounded-lg border border-gray-200 p-2.5 text-gray-500 hover:bg-gray-50"
              >
                <RefreshCw size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">

            <thead className="bg-gray-50">
              <tr>
                {[
                  "VISITOR",
                  "VISIT ID",
                  "SERVICE",
                  "PAYMENT",
                  "CHECK-IN",
                  "CHECK-OUT",
                  "STATUS",
                  "ACTION",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-5 py-4 text-[10px] font-bold tracking-wide text-gray-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredVisits.map((visit) => (
                <tr
                  key={visit.id}
                  className="transition hover:bg-gray-50"
                >
                  {/* Visitor */}
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

                  <td className="px-5 py-4 text-xs text-gray-600">
                    {visit.paymentType}
                  </td>

                  <td className="px-5 py-4 text-xs text-gray-600">
                    {visit.checkIn}
                  </td>

                  <td className="px-5 py-4 text-xs text-gray-600">
                    {visit.checkOut || "—"}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                        visit.status === "Active"
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {visit.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="px-5 py-4">
                    {visit.status === "Active" ? (
                      <button
                        onClick={() => handleCheckOut(visit.id)}
                        className="flex items-center gap-1.5 rounded-lg border border-orange-200 px-3 py-2 text-[10px] font-semibold text-orange-700 transition hover:bg-orange-50"
                      >
                        <LogOut size={13} />
                        Check Out
                      </button>
                    ) : (
                      <span className="flex items-center gap-1 text-[10px] font-medium text-gray-400">
                        <CheckCircle2 size={14} />
                        Completed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Empty state */}
          {filteredVisits.length === 0 && (
            <div className="flex flex-col items-center justify-center px-5 py-16 text-center">
              <div className="rounded-full bg-gray-100 p-4 text-gray-400">
                <Search size={25} />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-gray-800">
                No visitors found
              </h3>

              <p className="mt-1 text-xs text-gray-400">
                Try changing your search or filters.
              </p>

              <button
                onClick={resetFilters}
                className="mt-4 text-xs font-semibold text-green-700"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        {/* Table footer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 px-5 py-4">
          <p className="text-[11px] text-gray-500">
            Showing {filteredVisits.length} of {visits.length} visits
          </p>

          <span className="text-[11px] text-gray-400">
            Frontend preview
          </span>
        </div>
      </section>

      {/* Check-in modal */}
      <CheckInModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCheckIn}
      />
    </div>
  );
}