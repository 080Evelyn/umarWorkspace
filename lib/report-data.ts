export type MonthlyReport = {
  month: string;
  revenue: number;
  expenses: number;
};

export const monthlyReports: MonthlyReport[] = [
  { month: "Jan", revenue: 1250000, expenses: 620000 },
  { month: "Feb", revenue: 1480000, expenses: 710000 },
  { month: "Mar", revenue: 1320000, expenses: 680000 },
  { month: "Apr", revenue: 1650000, expenses: 790000 },
  { month: "May", revenue: 1580000, expenses: 820000 },
  { month: "Jun", revenue: 1820000, expenses: 850000 },
  { month: "Jul", revenue: 1750000, expenses: 910000 },
  { month: "Aug", revenue: 1980000, expenses: 940000 },
  { month: "Sep", revenue: 2100000, expenses: 980000 },
  { month: "Oct", revenue: 2250000, expenses: 1050000 },
  { month: "Nov", revenue: 950000, expenses: 480000 },
];

export const expenseReportCategories = [
  { name: "Salaries", amount: 1850000 },
  { name: "Rent", amount: 1200000 },
  { name: "Utilities", amount: 850000 },
  { name: "Maintenance", amount: 620000 },
  { name: "Internet", amount: 420000 },
  { name: "Office Supplies", amount: 280000 },
  { name: "Marketing", amount: 240000 },
  { name: "Other", amount: 150000 },
];

export const recentFinancialRecords = [
  {
    id: "TRX-001",
    description: "Workspace subscriptions",
    type: "Income",
    date: "Nov 08, 2026",
    amount: 350000,
  },
  {
    id: "TRX-002",
    description: "Electricity payment",
    type: "Expense",
    date: "Nov 08, 2026",
    amount: 85000,
  },
  {
    id: "TRX-003",
    description: "Meeting room bookings",
    type: "Income",
    date: "Nov 07, 2026",
    amount: 125000,
  },
  {
    id: "TRX-004",
    description: "Internet subscription",
    type: "Expense",
    date: "Nov 05, 2026",
    amount: 35000,
  },
  {
    id: "TRX-005",
    description: "Private office payment",
    type: "Income",
    date: "Nov 04, 2026",
    amount: 275000,
  },
];