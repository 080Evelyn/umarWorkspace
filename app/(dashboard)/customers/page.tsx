
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Users,
  UserCheck,
  UserPlus,
  Search,
  Eye,
  ChevronDown,
  ArrowUpRight,
  X,
  RefreshCw,
} from "lucide-react";

import { apiRequest } from "@/lib/api";
import type { Customer } from "@/lib/customer-data";

import CustomerDetailsModal from "@/components/customers/CustomerDetailsModal";

type CustomerAnalyticsRecord = {
  customerId: string;
  customerName: string;
  phoneNumber: string;
  totalVisits: number;
  monthlyVisits: number;
  isRegular: boolean;
  customerTag: string;
  totalSpent: number;
  firstVisitDate: string;
  lastVisitDate: string;
  preferredServiceType: string;
};

type CustomerAnalyticsResponse = {
  totalCustomersCount: number;
  regularCustomersCount: number;
  occasionalCustomersCount: number;
  regularThreshold: number;
  regularPercentage: number;
  year: number;
  month: number;
  customers: CustomerAnalyticsRecord[];
};

type CustomerType = "Regular" | "Occasional" | "New";

const EMPTY_SUMMARY: CustomerAnalyticsResponse = {
  totalCustomersCount: 0,
  regularCustomersCount: 0,
  occasionalCustomersCount: 0,
  regularThreshold: 0,
  regularPercentage: 0,
  year: 0,
  month: 0,
  customers: [],
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date: string) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const customerBadgeStyles: Record<CustomerType, string> = {
  Regular: "bg-green-50 text-green-700",
  Occasional: "bg-amber-50 text-amber-700",
  New: "bg-blue-50 text-blue-700",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function unwrapResponse(response: unknown): unknown {
  let current = response;

  for (let depth = 0; depth < 5; depth++) {
    if (!isRecord(current) || !("data" in current)) {
      return current;
    }

    current = current.data;
  }

  return current;
}

function getCustomerType(record: CustomerAnalyticsRecord): CustomerType {
  const tag = record.customerTag?.trim().toLowerCase();

  if (tag === "new") return "New";
  if (record.isRegular || tag === "regular") return "Regular";

  return "Occasional";
}

function normalizeCustomer(record: CustomerAnalyticsRecord): Customer {
  return {
    id: record.customerId,
    name: record.customerName || "Unnamed Customer",
    email: "",
    phone: record.phoneNumber || "",
    joinedDate: formatDate(record.firstVisitDate),
    totalVisits: Number(record.totalVisits) || 0,
    lastVisit: formatDate(record.lastVisitDate),
    totalSpent: Number(record.totalSpent) || 0,
    customerType: getCustomerType(record),
  };
}

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    try {
      const parsed = JSON.parse(error.message);

      return (
        parsed.message ||
        parsed.error ||
        parsed.detail ||
        error.message
      );
    } catch {
      return error.message;
    }
  }

  return "Unable to load customer records. Please try again.";
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [summary, setSummary] =
    useState<CustomerAnalyticsResponse>(EMPTY_SUMMARY);

  const [search, setSearch] = useState("");
  const [customerType, setCustomerType] = useState("All");

  const [selectedCustomer, setSelectedCustomer] =
    useState<Customer | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadCustomers = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await apiRequest<unknown>(
        "/analytics/customers",
        {
          method: "GET",
        }
      );

      const data = unwrapResponse(response);

      if (!isRecord(data) || !Array.isArray(data.customers)) {
        throw new Error(
          "The customer analytics endpoint returned an unexpected response."
        );
      }

      const analytics = data as unknown as CustomerAnalyticsResponse;

      const normalizedCustomers = analytics.customers.map(
        (record) => normalizeCustomer(record)
      );

      setSummary({
        ...EMPTY_SUMMARY,
        ...analytics,
      });

      setCustomers(normalizedCustomers);
    } catch (err) {
      console.error("Customer loading error:", err);
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const regularCustomers = summary.regularCustomersCount;
  const newCustomers = customers.filter(
    (customer) => customer.customerType === "New"
  ).length;

  const totalVisits = customers.reduce(
    (total, customer) => total + customer.totalVisits,
    0
  );

  const filteredCustomers = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm) ||
        customer.phone.toLowerCase().includes(searchTerm) ||
        customer.id.toLowerCase().includes(searchTerm);

      const matchesType =
        customerType === "All" ||
        customer.customerType === customerType;

      return matchesSearch && matchesType;
    });
  }, [customers, search, customerType]);

  const clearFilters = () => {
    setSearch("");
    setCustomerType("All");
  };

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Customer Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and understand your workspace customers and their activity.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          <Users size={17} className="text-green-700" />
          <span>Customer Directory</span>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center rounded-xl border border-slate-200 bg-white py-16">
          <div className="text-center">
            <RefreshCw
              size={25}
              className="mx-auto animate-spin text-green-700"
            />
            <p className="mt-3 text-sm text-slate-500">
              Loading customer records...
            </p>
          </div>
        </div>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <h3 className="text-sm font-semibold text-red-800">
            Unable to load customers
          </h3>

          <p className="mt-2 text-sm text-red-600">{error}</p>

          <button
            type="button"
            onClick={loadCustomers}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            <RefreshCw size={15} />
            Try again
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-green-50 p-2.5 text-green-700">
                  <Users size={20} />
                </div>

                <span className="flex items-center gap-1 text-xs font-medium text-green-700">
                  <ArrowUpRight size={14} />
                  Customer base
                </span>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Total Customers
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {summary.totalCustomersCount.toLocaleString()}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Registered workspace customers
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-blue-50 p-2.5 text-blue-700">
                  <UserCheck size={20} />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Returning customers
                </span>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Regular Customers
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {regularCustomers.toLocaleString()}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Customers meeting the regular visit threshold
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-purple-50 p-2.5 text-purple-700">
                  <UserPlus size={20} />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  First-time customers
                </span>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                New Customers
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {newCustomers.toLocaleString()}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Records tagged as new by the backend
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-amber-50 p-2.5 text-amber-700">
                  <ArrowUpRight size={20} />
                </div>

                <span className="text-xs font-medium text-slate-400">
                  Across all customers
                </span>
              </div>

              <p className="mt-5 text-sm text-slate-500">
                Total Recorded Visits
              </p>

              <h3 className="mt-1 text-2xl font-bold text-slate-900">
                {totalVisits.toLocaleString()}
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Combined visits from returned records
              </p>
            </div>
          </div>

          {/* Customer directory */}
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="border-b border-slate-100 p-5">
              <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
                <div>
                  <h2 className="font-semibold text-slate-900">
                    Customer Directory
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Browse customer profiles and visit records.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  {/* Search */}
                  <div className="relative min-w-0 sm:w-72">
                    <Search
                      size={17}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      type="text"
                      value={search}
                      onChange={(event) => setSearch(event.target.value)}
                      placeholder="Search name, phone or ID..."
                      className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    />

                    {search && (
                      <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                        aria-label="Clear search"
                      >
                        <X size={15} />
                      </button>
                    )}
                  </div>

                  {/* Customer type filter */}
                  <div className="relative">
                    <select
                      value={customerType}
                      onChange={(event) =>
                        setCustomerType(event.target.value)
                      }
                      className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-10 text-sm text-slate-700 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:w-44"
                    >
                      <option value="All">All Customers</option>
                      <option value="Regular">Regular</option>
                      <option value="Occasional">Occasional</option>
                      <option value="New">New</option>
                    </select>

                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={loadCustomers}
                    disabled={isLoading}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                  >
                    <RefreshCw size={15} />
                    Refresh
                  </button>
                </div>
              </div>

              {(search || customerType !== "All") && (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-xs text-slate-500">
                    Showing {filteredCustomers.length} of {customers.length} customers
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-xs font-medium text-green-700 hover:text-green-800"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="bg-slate-50">
                  <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Customer ID</th>
                    <th className="px-5 py-4">Total Visits</th>
                    <th className="px-5 py-4">Last Visit</th>
                    <th className="px-5 py-4">Total Spent</th>
                    <th className="px-5 py-4">Customer Type</th>
                    <th className="px-5 py-4 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {filteredCustomers.map((customer) => {
                    const initials = customer.name
                      .split(" ")
                      .map((part) => part[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase();

                    return (
                      <tr
                        key={customer.id}
                        className="transition hover:bg-slate-50/70"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-50 text-sm font-semibold text-green-700">
                              {initials || "C"}
                            </div>

                            <div className="min-w-0">
                              <p className="whitespace-nowrap text-sm font-semibold text-slate-800">
                                {customer.name}
                              </p>

                              <p className="mt-1 text-xs text-slate-500">
                                {customer.phone || "No phone number"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          <span className="block max-w-[150px] truncate" title={customer.id}>
                            {customer.id}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm font-medium text-slate-800">
                          {customer.totalVisits}
                        </td>

                        <td className="px-5 py-4 text-sm text-slate-600">
                          {customer.lastVisit || "—"}
                        </td>

                        <td className="px-5 py-4 text-sm font-medium text-slate-800">
                          {formatCurrency(customer.totalSpent)}
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${customerBadgeStyles[customer.customerType]
                              }`}
                          >
                            {customer.customerType}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => setSelectedCustomer(customer)}
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-green-200 hover:bg-green-50 hover:text-green-700"
                          >
                            <Eye size={15} />
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              {/* Empty state */}
              {filteredCustomers.length === 0 && (
                <div className="px-5 py-16 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <Users size={22} />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-slate-900">
                    No customers found
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Try changing your search or customer-type filter.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-4 text-sm font-medium text-green-700 hover:text-green-800"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </div>

            {/* Table footer */}
            {filteredCustomers.length > 0 && (
              <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-slate-500">
                  Showing {filteredCustomers.length} customer
                  {filteredCustomers.length === 1 ? "" : "s"}
                </p>

                <p className="text-xs text-slate-400">
                  Live customer records from your workspace
                </p>
              </div>
            )}
          </div>

          {/* Customer details modal */}
          <CustomerDetailsModal
            customer={selectedCustomer}
            onClose={() => setSelectedCustomer(null)}
          />
        </>
      )}
    </div>
  );
}
