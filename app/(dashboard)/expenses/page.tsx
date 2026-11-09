"use client";

import { useMemo, useState } from "react";
import {
  Wallet,
  TrendingDown,
  Receipt,
  Plus,
  Search,
  ChevronDown,
  CalendarDays,
  ArrowUpRight,
  X,
} from "lucide-react";

import {
  initialExpenses,
  expenseCategories,
  type Expense,
} from "@/lib/expense-data";

import AddExpenseModal from "@/components/expenses/AddExpenseModal";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const categoryColors: Record<string, string> = {
  Utilities: "bg-blue-500",
  Rent: "bg-purple-500",
  Maintenance: "bg-amber-500",
  Salaries: "bg-green-600",
  "Office Supplies": "bg-pink-500",
  Internet: "bg-cyan-500",
  Marketing: "bg-orange-500",
  Other: "bg-slate-500",
};

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);

  const currentMonth = new Date().toISOString().slice(0, 7);

  const monthlyExpenses = expenses.filter((expense) =>
    expense.date.startsWith(currentMonth)
  );

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const monthlyTotal = monthlyExpenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  const categoryBreakdown = useMemo(() => {
    const totals = expenses.reduce<Record<string, number>>((result, expense) => {
      result[expense.category] =
        (result[expense.category] || 0) + expense.amount;

      return result;
    }, {});

    return Object.entries(totals)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage:
          totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [expenses, totalExpenses]);

  const filteredExpenses = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return expenses
      .filter((expense) => {
        const matchesSearch =
          expense.title.toLowerCase().includes(searchTerm) ||
          expense.category.toLowerCase().includes(searchTerm) ||
          expense.id.toLowerCase().includes(searchTerm) ||
          expense.description.toLowerCase().includes(searchTerm);

        const matchesCategory =
          selectedCategory === "All" ||
          expense.category === selectedCategory;

        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [expenses, search, selectedCategory]);

  const handleAddExpense = (expenseData: Omit<Expense, "id">) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `EXP-${String(Date.now()).slice(-6)}`,
    };

    setExpenses((previous) => [newExpense, ...previous]);
    setModalOpen(false);
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("All");
  };

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Expense Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Track workspace spending and manage expense records.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-green-800"
        >
          <Plus size={18} />
          Add Expense
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-green-50 p-2.5 text-green-700">
              <Wallet size={20} />
            </div>
            <span className="text-xs font-medium text-slate-400">
              All records
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Total Expenses</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            {formatCurrency(totalExpenses)}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Across all recorded expenses
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-blue-50 p-2.5 text-blue-700">
              <CalendarDays size={20} />
            </div>
            <span className="text-xs font-medium text-slate-400">
              Current month
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">This Month</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            {formatCurrency(monthlyTotal)}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Expenses recorded this month
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-amber-50 p-2.5 text-amber-700">
              <Receipt size={20} />
            </div>
            <span className="text-xs font-medium text-slate-400">
              All records
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Expense Records</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            {expenses.length.toLocaleString()}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Total recorded transactions
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-purple-50 p-2.5 text-purple-700">
              <TrendingDown size={20} />
            </div>
            <span className="text-xs font-medium text-slate-400">
              Average amount
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Average Expense</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            {formatCurrency(
              expenses.length > 0 ? totalExpenses / expenses.length : 0
            )}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Per recorded transaction
          </p>
        </div>
      </div>

      {/* Spending by category */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-slate-900">
              Spending by Category
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Understand where workspace expenses are going.
            </p>
          </div>
          <span className="text-xs text-slate-400">
            Based on all recorded expenses
          </span>
        </div>

        {categoryBreakdown.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
            {categoryBreakdown.slice(0, 6).map((item) => (
              <div key={item.category}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                        categoryColors[item.category] || "bg-slate-500"
                      }`}
                    />
                    <span className="truncate text-sm font-medium text-slate-700">
                      {item.category}
                    </span>
                  </div>

                  <span className="shrink-0 text-sm font-semibold text-slate-800">
                    {formatCurrency(item.amount)}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${
                      categoryColors[item.category] || "bg-slate-500"
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>

                <p className="mt-1 text-right text-xs text-slate-400">
                  {item.percentage.toFixed(1)}%
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="py-8 text-center text-sm text-slate-500">
            No expense categories to display yet.
          </p>
        )}
      </div>

      {/* Expense records */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-semibold text-slate-900">
                Expense Records
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                View and filter recorded workspace expenses.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative min-w-0 sm:w-72">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search expenses..."
                  className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-9 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                  >
                    <X size={15} />
                  </button>
                )}
              </div>

              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(event) =>
                    setSelectedCategory(event.target.value)
                  }
                  className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-3 pr-10 text-sm text-slate-700 outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 sm:w-48"
                >
                  <option value="All">All Categories</option>
                  {expenseCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
              </div>
            </div>
          </div>

          {(search || selectedCategory !== "All") && (
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs text-slate-500">
                Showing {filteredExpenses.length} of {expenses.length} records
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

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">Expense</th>
                <th className="px-5 py-4">Category</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Payment Method</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4 text-right">Reference</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.map((expense) => (
                <tr
                  key={expense.id}
                  className="transition hover:bg-slate-50/70"
                >
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        {expense.title}
                      </p>
                      <p className="mt-1 max-w-xs truncate text-xs text-slate-500">
                        {expense.description || "No description provided"}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                      {expense.category}
                    </span>
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                    {formatDate(expense.date)}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-600">
                    {expense.paymentMethod}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-800">
                    {formatCurrency(expense.amount)}
                  </td>

                  <td className="px-5 py-4 text-right text-xs font-medium text-slate-500">
                    {expense.id}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredExpenses.length === 0 && (
            <div className="px-5 py-16 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <Receipt size={22} />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-slate-900">
                No expenses found
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Try another search term or category.
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

        {filteredExpenses.length > 0 && (
          <div className="flex flex-col gap-2 border-t border-slate-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-slate-500">
              Showing {filteredExpenses.length} expense record
              {filteredExpenses.length === 1 ? "" : "s"}
            </p>
            <p className="text-xs text-slate-400">
              Sample records for frontend preview
            </p>
          </div>
        )}
      </div>

      {/* Add expense modal */}
      <AddExpenseModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddExpense}
      />
    </div>
  );
}