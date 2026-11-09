export type WorkspaceSettings = {
  workspaceName: string;
  email: string;
  phone: string;
  address: string;
  timezone: string;
  currency: string;
};

export type ConfigurableOption = {
  id: string;
  name: string;
  active: boolean;
};

export const initialWorkspaceSettings: WorkspaceSettings = {
  workspaceName: "Workspace Management",
  email: "admin@workspace.com",
  phone: "+234 800 000 0000",
  address: "Lagos, Nigeria",
  timezone: "Africa/Lagos",
  currency: "NGN - Nigerian Naira",
};

export const initialServiceTypes: ConfigurableOption[] = [
  { id: "service-1", name: "Private Office", active: true },
  { id: "service-2", name: "Hot Desk", active: true },
  { id: "service-3", name: "Meeting Room", active: true },
  { id: "service-4", name: "Virtual Office", active: true },
];

export const initialPaymentTypes: ConfigurableOption[] = [
  { id: "payment-1", name: "Cash", active: true },
  { id: "payment-2", name: "Card", active: true },
  { id: "payment-3", name: "Bank Transfer", active: true },
];

export const initialExpenseCategories: ConfigurableOption[] = [
  { id: "expense-1", name: "Rent", active: true },
  { id: "expense-2", name: "Salaries", active: true },
  { id: "expense-3", name: "Utilities", active: true },
  { id: "expense-4", name: "Maintenance", active: true },
  { id: "expense-5", name: "Internet", active: true },
  { id: "expense-6", name: "Office Supplies", active: true },
  { id: "expense-7", name: "Marketing", active: true },
  { id: "expense-8", name: "Other", active: true },
];