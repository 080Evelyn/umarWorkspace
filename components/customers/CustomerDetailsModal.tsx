"use client";

import {
  X,
  UserRound,
  Mail,
  Phone,
  CalendarDays,
  Wallet,
  History,
  Hash,
} from "lucide-react";

import type { Customer } from "@/lib/customer-data";

type CustomerDetailsModalProps = {
  customer: Customer | null;
  onClose: () => void;
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

export default function CustomerDetailsModal({
  customer,
  onClose,
}: CustomerDetailsModalProps) {
  if (!customer) return null;

  const initials = customer.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const badgeStyles = {
    Regular: "bg-green-50 text-green-700",
    Occasional: "bg-amber-50 text-amber-700",
    New: "bg-blue-50 text-blue-700",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Customer Details
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Customer profile and activity overview
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-lg font-semibold text-green-700">
              {initials}
            </div>

            <div className="min-w-0">
              <h3 className="text-lg font-semibold text-slate-900">
                {customer.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{customer.id}</p>
              <span
                className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${badgeStyles[customer.customerType]}`}
              >
                {customer.customerType} Customer
              </span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-500">
                <History size={16} />
                <span className="text-xs">Total Visits</span>
              </div>
              <p className="mt-2 text-2xl font-semibold text-slate-900">
                {customer.totalVisits}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-500">
                <Wallet size={16} />
                <span className="text-xs">Total Spent</span>
              </div>
              <p className="mt-2 text-xl font-semibold text-slate-900">
                {formatCurrency(customer.totalSpent)}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="mb-3 text-sm font-semibold text-slate-900">
              Contact Information
            </h4>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-100 p-2 text-slate-500">
                  <Mail size={17} />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-slate-500">Email Address</p>
                  <p className="break-all text-sm font-medium text-slate-800">
                    {customer.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-100 p-2 text-slate-500">
                  <Phone size={17} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Phone Number</p>
                  <p className="text-sm font-medium text-slate-800">
                    {customer.phone}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-100 p-2 text-slate-500">
                  <CalendarDays size={17} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Last Visit</p>
                  <p className="text-sm font-medium text-slate-800">
                    {customer.lastVisit}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-100 p-2 text-slate-500">
                  <UserRound size={17} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Customer Since</p>
                  <p className="text-sm font-medium text-slate-800">
                    {customer.joinedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-100 p-2 text-slate-500">
                  <Hash size={17} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Customer ID</p>
                  <p className="text-sm font-medium text-slate-800">
                    {customer.id}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}