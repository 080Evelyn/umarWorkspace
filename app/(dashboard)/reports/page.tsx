"use client";

import { useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Percent,
  CalendarDays,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
} from "lucide-react";

import {
  monthlyReports,
  expenseReportCategories,
  recentFinancialRecords,
} from "@/lib/report-data";

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(amount);

const formatCompactCurrency = (amount: number) => {
  if (amount >= 1_000_000) {
    return `₦${(amount / 1_000_000).toFixed(1)}m`;
  }

  if (amount >= 1_000) {
    return `₦${(amount / 1_000).toFixed(0)}k`;
  }

  return `₦${amount}`;
};

const pieColors = [
  "#15803d",
  "#2563eb",
  "#d97706",
  "#9333ea",
  "#0891b2",
  "#db2777",
  "#ea580c",
  "#64748b",
];

const periods = [
  { label: "Last 3 Months", value: "3" },
  { label: "Last 6 Months", value: "6" },
  { label: "This Year", value: "all" },
];

export default function ReportsPage() {
  const [period, setPeriod] = useState("all");

  const filteredReports = useMemo(() => {
    if (period === "all") return monthlyReports;

    return monthlyReports.slice(-Number(period));
  }, [period]);

  const totalRevenue = filteredReports.reduce(
    (total, item) => total + item.revenue,
    0
  );

  const totalExpenses = filteredReports.reduce(
    (total, item) => total + item.expenses,
    0
  );

  const netProfit = totalRevenue - totalExpenses;

  const profitMargin =
    totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;

  const chartData = filteredReports.map((item) => ({
    ...item,
    profit: item.revenue - item.expenses,
  }));

  const categoryTotal = expenseReportCategories.reduce(
    (total, item) => total + item.amount,
    0
  );

  const filteredCategoryData = expenseReportCategories
    .map((item) => ({
      ...item,
      percentage:
        categoryTotal > 0 ? (item.amount / categoryTotal) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);

  const activePeriodLabel =
    periods.find((item) => item.value === period)?.label ?? "This Year";

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Financial Reports
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor revenue, expenses and workspace profitability.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5">
          <CalendarDays size={17} className="text-green-700" />
          <span className="text-sm text-slate-600">Reporting Period</span>
          <select
            value={period}
            onChange={(event) => setPeriod(event.target.value)}
            className="max-w-[140px] bg-transparent text-sm font-medium text-slate-800 outline-none"
            aria-label="Select reporting period"
          >
            {periods.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Financial summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-green-50 p-2.5 text-green-700">
              <TrendingUp size={20} />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-green-700">
              <ArrowUpRight size={14} />
              Income
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Total Revenue</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            {formatCurrency(totalRevenue)}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            {activePeriodLabel}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-red-50 p-2.5 text-red-600">
              <TrendingDown size={20} />
            </div>
            <span className="flex items-center gap-1 text-xs font-medium text-red-600">
              <ArrowDownRight size={14} />
              Spending
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Total Expenses</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            {formatCurrency(totalExpenses)}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            {activePeriodLabel}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-blue-50 p-2.5 text-blue-700">
              <Wallet size={20} />
            </div>
            <span
              className={`text-xs font-medium ${
                netProfit >= 0 ? "text-green-700" : "text-red-600"
              }`}
            >
              {netProfit >= 0 ? "Positive balance" : "Negative balance"}
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Net Profit</p>
          <h3
            className={`mt-1 text-2xl font-bold ${
              netProfit >= 0 ? "text-slate-900" : "text-red-600"
            }`}
          >
            {formatCurrency(netProfit)}
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Revenue minus expenses
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="rounded-lg bg-purple-50 p-2.5 text-purple-700">
              <Percent size={20} />
            </div>
            <span className="text-xs font-medium text-slate-400">
              Profitability
            </span>
          </div>

          <p className="mt-5 text-sm text-slate-500">Profit Margin</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-900">
            {profitMargin.toFixed(1)}%
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            Net profit as a percentage of revenue
          </p>
        </div>
      </div>

      {/* Revenue and expense comparison */}
      <div className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-slate-900">
              Revenue vs Expenses
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Compare monthly income against spending.
            </p>
          </div>

          <span className="text-xs text-slate-400">
            {activePeriodLabel} · 2026
          </span>
        </div>

        <div className="mt-6 h-[320px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={filteredReports}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              barGap={8}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e2e8f0"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 12 }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#64748b", fontSize: 11 }}
                tickFormatter={formatCompactCurrency}
                width={65}
              />

              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  fontSize: 12,
                }}
              />

              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ fontSize: 12, paddingBottom: 20 }}
              />

              <Bar
                dataKey="revenue"
                name="Revenue"
                fill="#15803d"
                radius={[5, 5, 0, 0]}
                maxBarSize={32}
              />

              <Bar
                dataKey="expenses"
                name="Expenses"
                fill="#f59e0b"
                radius={[5, 5, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Profit trend and expense breakdown */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Profit trend */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div>
            <h2 className="font-semibold text-slate-900">
              Net Profit Trend
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Monthly revenue remaining after expenses.
            </p>
          </div>

          <div className="mt-6 h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  dy={8}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  tickFormatter={formatCompactCurrency}
                  width={65}
                />

                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    fontSize: 12,
                  }}
                />

                <Line
                  type="monotone"
                  dataKey="profit"
                  name="Net Profit"
                  stroke="#15803d"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#15803d" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Expense distribution */}
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div>
            <h2 className="font-semibold text-slate-900">
              Expense Distribution
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Breakdown of expenses by category.
            </p>
          </div>

          <div className="mt-4 grid grid-cols-1 items-center gap-4 sm:grid-cols-2">
            <div className="h-[240px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={filteredCategoryData}
                    dataKey="amount"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={62}
                    outerRadius={95}
                    paddingAngle={3}
                  >
                    {filteredCategoryData.map((item, index) => (
                      <Cell
                        key={item.name}
                        fill={pieColors[index % pieColors.length]}
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #e2e8f0",
                      fontSize: 12,
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-3">
              {filteredCategoryData.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between gap-3"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor:
                          pieColors[index % pieColors.length],
                      }}
                    />
                    <span className="truncate text-xs text-slate-600">
                      {item.name}
                    </span>
                  </div>

                  <span className="shrink-0 text-xs font-semibold text-slate-800">
                    {item.percentage.toFixed(1)}%
                  </span>
                </div>
              ))}

              <div className="border-t border-slate-100 pt-3">
                <p className="text-xs text-slate-500">Total expenses</p>
                <p className="mt-1 text-sm font-bold text-slate-900">
                  {formatCurrency(categoryTotal)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly financial breakdown */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-5">
          <h2 className="font-semibold text-slate-900">
            Monthly Financial Breakdown
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Revenue, expenses and net profit for each month.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">Month</th>
                <th className="px-5 py-4">Revenue</th>
                <th className="px-5 py-4">Expenses</th>
                <th className="px-5 py-4">Net Profit</th>
                <th className="px-5 py-4">Profit Margin</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredReports.map((item) => {
                const profit = item.revenue - item.expenses;
                const margin =
                  item.revenue > 0 ? (profit / item.revenue) * 100 : 0;

                return (
                  <tr
                    key={item.month}
                    className="transition hover:bg-slate-50/70"
                  >
                    <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                      {item.month} 2026
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">
                      {formatCurrency(item.revenue)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-700">
                      {formatCurrency(item.expenses)}
                    </td>

                    <td
                      className={`whitespace-nowrap px-5 py-4 text-sm font-semibold ${
                        profit >= 0 ? "text-green-700" : "text-red-600"
                      }`}
                    >
                      {formatCurrency(profit)}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-700">
                      {margin.toFixed(1)}%
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="border-t border-slate-100 px-5 py-4">
          <p className="text-xs text-slate-400">
            Figures shown are illustrative sample data, not actual workspace accounts.
          </p>
        </div>
      </div>

      {/* Recent financial activity */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center gap-3 border-b border-slate-100 p-5">
          <div className="rounded-lg bg-slate-100 p-2 text-slate-600">
            <FileText size={19} />
          </div>
          <div>
            <h2 className="font-semibold text-slate-900">
              Recent Financial Activity
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              A sample of recent income and expense records.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left">
            <thead className="bg-slate-50">
              <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">Description</th>
                <th className="px-5 py-4">Reference</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4 text-right">Amount</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {recentFinancialRecords.map((record) => (
                <tr key={record.id}>
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">
                    {record.description}
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-500">
                    {record.id}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                    {record.date}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                        record.type === "Income"
                          ? "bg-green-50 text-green-700"
                          : "bg-red-50 text-red-600"
                      }`}
                    >
                      {record.type}
                    </span>
                  </td>

                  <td
                    className={`whitespace-nowrap px-5 py-4 text-right text-sm font-semibold ${
                      record.type === "Income"
                        ? "text-green-700"
                        : "text-red-600"
                    }`}
                  >
                    {record.type === "Income" ? "+" : "-"}
                    {formatCurrency(record.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}