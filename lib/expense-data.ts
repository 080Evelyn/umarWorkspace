export type Expense = {
  id: string;
  title: string;
  category: string;
  amount: number;
  date: string;
  paymentMethod: string;
  description: string;
};

export const expenseCategories = [
  "Utilities",
  "Rent",
  "Maintenance",
  "Salaries",
  "Office Supplies",
  "Internet",
  "Marketing",
  "Other",
];

export const paymentMethods = ["Cash", "Card", "Transfer"];

export const initialExpenses: Expense[] = [
  {
    id: "EXP-001",
    title: "Electricity Bill",
    category: "Utilities",
    amount: 85000,
    date: "2026-11-08",
    paymentMethod: "Transfer",
    description: "Monthly electricity payment",
  },
  {
    id: "EXP-002",
    title: "Office Cleaning",
    category: "Maintenance",
    amount: 25000,
    date: "2026-11-07",
    paymentMethod: "Cash",
    description: "Cleaning services for the workspace",
  },
  {
    id: "EXP-003",
    title: "Internet Subscription",
    category: "Internet",
    amount: 35000,
    date: "2026-11-05",
    paymentMethod: "Transfer",
    description: "Monthly internet subscription",
  },
  {
    id: "EXP-004",
    title: "Office Stationery",
    category: "Office Supplies",
    amount: 18500,
    date: "2026-11-04",
    paymentMethod: "Card",
    description: "Paper, pens and other office supplies",
  },
  {
    id: "EXP-005",
    title: "Staff Payment",
    category: "Salaries",
    amount: 250000,
    date: "2026-11-03",
    paymentMethod: "Transfer",
    description: "Staff salary payment",
  },
  {
    id: "EXP-006",
    title: "Plumbing Repairs",
    category: "Maintenance",
    amount: 42000,
    date: "2026-11-01",
    paymentMethod: "Cash",
    description: "Repairs to the restroom plumbing",
  },
  {
    id: "EXP-007",
    title: "Workspace Rent",
    category: "Rent",
    amount: 180000,
    date: "2026-10-28",
    paymentMethod: "Transfer",
    description: "Monthly workspace rent",
  },
  {
    id: "EXP-008",
    title: "Social Media Promotion",
    category: "Marketing",
    amount: 30000,
    date: "2026-10-25",
    paymentMethod: "Card",
    description: "Workspace promotional campaign",
  },
];