"use client";

import { useState, FormEvent } from "react";
import { X, UserPlus, LoaderCircle } from "lucide-react";
import {
  serviceTypes,
  paymentTypes,
} from "@/lib/desk-data";

interface CheckInModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    phone: string;
    email: string;
    service: string;
    paymentType: string;
  }) => void;
}

export default function CheckInModal({
  open,
  onClose,
  onSubmit,
}: CheckInModalProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    paymentType: "",
  });

  if (!open) return null;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    onSubmit(form);

    setForm({
      name: "",
      phone: "",
      email: "",
      service: "",
      paymentType: "",
    });

    setLoading(false);
  };

  const inputStyle =
    "mt-2 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-50 p-2.5 text-green-700">
              <UserPlus size={21} />
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900">
                Check In Visitor
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Register a new workspace visitor.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">

          <div>
            <label className="text-xs font-semibold text-gray-700">
              Visitor Full Name *
            </label>

            <input
              required
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              placeholder="Enter visitor's full name"
              className={inputStyle}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Phone Number *
              </label>

              <input
                required
                type="tel"
                value={form.phone}
                onChange={(e) =>
                  setForm({ ...form, phone: e.target.value })
                }
                placeholder="08012345678"
                className={inputStyle}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="visitor@example.com"
                className={inputStyle}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-gray-700">
                Service Type *
              </label>

              <select
                required
                value={form.service}
                onChange={(e) =>
                  setForm({ ...form, service: e.target.value })
                }
                className={inputStyle}
              >
                <option value="">Select service</option>

                {serviceTypes.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700">
                Payment Type *
              </label>

              <select
                required
                value={form.paymentType}
                onChange={(e) =>
                  setForm({
                    ...form,
                    paymentType: e.target.value,
                  })
                }
                className={inputStyle}
              >
                <option value="">Select payment</option>

                {paymentTypes.map((payment) => (
                  <option key={payment} value={payment}>
                    {payment}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-200 px-5 py-3 text-xs font-semibold text-gray-600 hover:bg-gray-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-3 text-xs font-semibold text-white transition hover:bg-green-800 disabled:opacity-60"
            >
              {loading && (
                <LoaderCircle size={15} className="animate-spin" />
              )}

              Confirm Check-in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}