import {
  Users,
  UserCheck,
  UserRound,
  Wallet,
  TrendingUp,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  description: string;
  index: number;
}

const icons = [
  Users,
  UserCheck,
  UserRound,
  Wallet,
];

const iconColors = [
  "bg-blue-50 text-blue-600",
  "bg-green-50 text-green-700",
  "bg-purple-50 text-purple-600",
  "bg-orange-50 text-orange-600",
];

export default function StatCard({
  title,
  value,
  change,
  description,
  index,
}: StatCardProps) {
  const Icon = icons[index] || Users;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 transition-shadow hover:shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-medium text-gray-500">
          {title}
        </p>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            iconColors[index] || iconColors[0]
          }`}
        >
          <Icon size={20} strokeWidth={1.8} />
        </div>
      </div>

      <h2 className="mt-4 text-2xl font-bold tracking-tight text-gray-900">
        {value}
      </h2>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-xs font-semibold text-green-700">
          <TrendingUp size={14} />
          {change}
        </span>

        <span className="text-[11px] text-gray-400">
          {description}
        </span>
      </div>
    </div>
  );
}