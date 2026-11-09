"use client";

import { useState } from "react";
import {
  Building2,
  BriefcaseBusiness,
  CreditCard,
  Receipt,
  Settings2,
  Plus,
  Check,
  X,
  Save,
  ToggleLeft,
  ToggleRight,
  Info,
} from "lucide-react";

import {
  initialWorkspaceSettings,
  initialServiceTypes,
  initialPaymentTypes,
  initialExpenseCategories,
  type WorkspaceSettings,
  type ConfigurableOption,
} from "@/lib/settings-data";

type SettingsTab = "workspace" | "services" | "payments" | "expenses";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("workspace");

  const [workspace, setWorkspace] = useState<WorkspaceSettings>(
    initialWorkspaceSettings
  );

  const [services, setServices] = useState<ConfigurableOption[]>(
    initialServiceTypes
  );

  const [payments, setPayments] = useState<ConfigurableOption[]>(
    initialPaymentTypes
  );

  const [expenseCategories, setExpenseCategories] = useState<
    ConfigurableOption[]
  >(initialExpenseCategories);

  const [newService, setNewService] = useState("");
  const [newPayment, setNewPayment] = useState("");
  const [newExpense, setNewExpense] = useState("");

  const [saved, setSaved] = useState(false);

  const tabs = [
    { id: "workspace", label: "Workspace", icon: Building2 },
    { id: "services", label: "Service Types", icon: BriefcaseBusiness },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "expenses", label: "Expense Categories", icon: Receipt },
  ] as const;

  const updateWorkspace = (
    field: keyof WorkspaceSettings,
    value: string
  ) => {
    setWorkspace((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const toggleOption = (
    setter: React.Dispatch<React.SetStateAction<ConfigurableOption[]>>,
    id: string
  ) => {
    setter((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, active: !item.active } : item
      )
    );
  };

  const addOption = (
    value: string,
    setter: React.Dispatch<React.SetStateAction<ConfigurableOption[]>>,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const trimmed = value.trim();

    if (!trimmed) return;

    setter((prev) => {
      const alreadyExists = prev.some(
        (item) => item.name.toLowerCase() === trimmed.toLowerCase()
      );

      if (alreadyExists) return prev;

      return [
        ...prev,
        {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          name: trimmed,
          active: true,
        },
      ];
    });

    setValue("");
  };

  const handleSaveWorkspace = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaved(true);
  };

  const activeCount = (items: ConfigurableOption[]) =>
    items.filter((item) => item.active).length;

  return (
    <div className="space-y-6 pb-10">
      {/* Page heading */}
      <div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Settings2 size={16} />
          <span>Workspace Configuration</span>
        </div>

        <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Settings
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage your workspace information and operational preferences.
            </p>
          </div>
        </div>
      </div>

      {/* Overview cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <OverviewCard
          icon={Building2}
          label="Workspace"
          value="Profile"
          description="Business information"
        />

        <OverviewCard
          icon={BriefcaseBusiness}
          label="Service Types"
          value={services.length.toString()}
          description={`${activeCount(services)} active`}
        />

        <OverviewCard
          icon={CreditCard}
          label="Payment Methods"
          value={payments.length.toString()}
          description={`${activeCount(payments)} active`}
        />

        <OverviewCard
          icon={Receipt}
          label="Expense Categories"
          value={expenseCategories.length.toString()}
          description={`${activeCount(expenseCategories)} active`}
        />
      </div>

      {/* Main settings area */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        {/* Settings navigation */}
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-3">
          <p className="px-3 pb-3 pt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
            General Settings
          </p>

          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition ${
                    isActive
                      ? "bg-green-50 text-green-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* Settings content */}
        <main className="min-w-0 space-y-5">
          {activeTab === "workspace" && (
            <section className="rounded-xl border border-slate-200 bg-white">
              <div className="border-b border-slate-100 p-5 sm:p-6">
                <h2 className="font-semibold text-slate-900">
                  Workspace Information
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Update the basic information associated with your workspace.
                </p>
              </div>

              <form onSubmit={handleSaveWorkspace} className="p-5 sm:p-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <FormField
                    label="Workspace Name"
                    value={workspace.workspaceName}
                    onChange={(value) =>
                      updateWorkspace("workspaceName", value)
                    }
                    placeholder="Enter workspace name"
                  />

                  <FormField
                    label="Email Address"
                    value={workspace.email}
                    onChange={(value) => updateWorkspace("email", value)}
                    placeholder="Enter email address"
                    type="email"
                  />

                  <FormField
                    label="Phone Number"
                    value={workspace.phone}
                    onChange={(value) => updateWorkspace("phone", value)}
                    placeholder="Enter phone number"
                  />

                  <FormField
                    label="Address"
                    value={workspace.address}
                    onChange={(value) => updateWorkspace("address", value)}
                    placeholder="Enter workspace address"
                  />

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Timezone
                    </label>
                    <select
                      value={workspace.timezone}
                      onChange={(e) =>
                        updateWorkspace("timezone", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    >
                      <option value="Africa/Lagos">
                        Africa/Lagos (WAT)
                      </option>
                      <option value="UTC">UTC</option>
                      <option value="Europe/London">Europe/London</option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                      Currency
                    </label>
                    <select
                      value={workspace.currency}
                      onChange={(e) =>
                        updateWorkspace("currency", e.target.value)
                      }
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100"
                    >
                      <option value="NGN - Nigerian Naira">
                        NGN - Nigerian Naira (₦)
                      </option>
                      <option value="USD - US Dollar">
                        USD - US Dollar ($)
                      </option>
                      <option value="GBP - British Pound">
                        GBP - British Pound (£)
                      </option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center">
                  {saved && (
                    <span className="flex items-center gap-2 text-sm text-green-700">
                      <Check size={16} />
                      Changes saved locally
                    </span>
                  )}

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800"
                  >
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              </form>
            </section>
          )}

          {activeTab === "services" && (
            <OptionManager
              title="Service Types"
              description="Manage the services customers can select when checking in."
              items={services}
              newValue={newService}
              setNewValue={setNewService}
              onAdd={() =>
                addOption(newService, setServices, setNewService)
              }
              onToggle={(id) => toggleOption(setServices, id)}
              placeholder="e.g. Dedicated Office"
              addLabel="Add Service"
            />
          )}

          {activeTab === "payments" && (
            <OptionManager
              title="Payment Methods"
              description="Manage the payment methods available when recording customer visits."
              items={payments}
              newValue={newPayment}
              setNewValue={setNewPayment}
              onAdd={() =>
                addOption(newPayment, setPayments, setNewPayment)
              }
              onToggle={(id) => toggleOption(setPayments, id)}
              placeholder="e.g. POS"
              addLabel="Add Payment Method"
            />
          )}

          {activeTab === "expenses" && (
            <OptionManager
              title="Expense Categories"
              description="Organise workspace expenses into categories for reporting."
              items={expenseCategories}
              newValue={newExpense}
              setNewValue={setNewExpense}
              onAdd={() =>
                addOption(
                  newExpense,
                  setExpenseCategories,
                  setNewExpense
                )
              }
              onToggle={(id) =>
                toggleOption(setExpenseCategories, id)
              }
              placeholder="e.g. Transportation"
              addLabel="Add Category"
            />
          )}

          {/* Information note */}
          <div className="flex gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <Info className="mt-0.5 shrink-0 text-blue-600" size={18} />
            <div>
              <p className="text-sm font-semibold text-blue-900">
                About workspace settings
              </p>
              <p className="mt-1 text-sm leading-6 text-blue-800">
                Changes on this page currently exist only in the browser
                session. They will not update the live workspace until the
                backend API is connected.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

/* Reusable overview card */
function OverviewCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <div className="rounded-lg bg-green-50 p-2 text-green-700">
          <Icon size={18} />
        </div>
      </div>

      <p className="mt-3 text-2xl font-bold text-slate-900">{value}</p>
      <p className="mt-1 text-xs text-slate-500">{description}</p>
    </div>
  );
}

/* Reusable form field */
function FormField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
      />
    </div>
  );
}

/* Reusable option manager */
function OptionManager({
  title,
  description,
  items,
  newValue,
  setNewValue,
  onAdd,
  onToggle,
  placeholder,
  addLabel,
}: {
  title: string;
  description: string;
  items: ConfigurableOption[];
  newValue: string;
  setNewValue: (value: string) => void;
  onAdd: () => void;
  onToggle: (id: string) => void;
  placeholder: string;
  addLabel: string;
}) {
  const activeCount = items.filter((item) => item.active).length;

  return (
    <section className="rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-100 p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-slate-900">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">{description}</p>
          </div>

          <span className="w-fit rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
            {activeCount} Active
          </span>
        </div>
      </div>

      {/* Add new option */}
      <div className="border-b border-slate-100 bg-slate-50/70 p-5 sm:p-6">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Add New
        </label>

        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAdd();
              }
            }}
            placeholder={placeholder}
            className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none transition placeholder:text-slate-400 focus:border-green-600 focus:ring-2 focus:ring-green-100"
          />

          <button
            type="button"
            onClick={onAdd}
            disabled={!newValue.trim()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-green-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus size={16} />
            {addLabel}
          </button>
        </div>
      </div>

      {/* Existing options */}
      <div className="p-5 sm:p-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-semibold text-slate-800">
            Existing Options
          </p>
          <p className="text-xs text-slate-400">
            {items.length} total
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed border-slate-200 py-10 text-center">
            <p className="text-sm text-slate-500">
              No options have been added yet.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-4 py-4 first:pt-2 last:pb-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-800">
                    {item.name}
                  </p>
                  <span
                    className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      item.active
                        ? "bg-green-50 text-green-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {item.active ? "Active" : "Inactive"}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onToggle(item.id)}
                  className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    item.active
                      ? "text-slate-500 hover:bg-slate-100"
                      : "text-green-700 hover:bg-green-50"
                  }`}
                >
                  {item.active ? (
                    <>
                      <ToggleRight size={19} />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <ToggleLeft size={19} />
                      Activate
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}