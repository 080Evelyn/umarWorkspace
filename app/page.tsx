
import Link from "next/link";
import {
  ArrowRight,
  Activity,
  ShieldCheck,
  Users,
  Clock3,
  BarChart3,
  CheckCircle2,
  LayoutDashboard,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Visitor Management",
    description:
      "Maintain organized visitor records, manage check-ins and monitor everyone accessing your workspace.",
  },
  {
    icon: Clock3,
    title: "Visitor Check-In",
    description:
      "Record visitor arrivals and departures efficiently while keeping daily activities organized.",
  },
  {
    icon: BarChart3,
    title: "Activity & Reports",
    description:
      "Access useful insights into visitor activity, workspace usage and operational performance.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Workspace",
    description:
      "Keep visitor information organized and maintain better control over your workspace operations.",
  },
];

const stats = [
  { label: "Total Visitors", value: "1,284", change: "+12.5%" },
  { label: "Currently Inside", value: "16", change: "Live activity" },
  { label: "Today's Visits", value: "48", change: "+8.2%" },
  { label: "Active Members", value: "32", change: "Workspace team" },
];

const visits = [
  { name: "John Anderson", service: "Meeting", time: "09:30 AM", status: "Active" },
  { name: "Mary Johnson", service: "Consultation", time: "10:15 AM", status: "Active" },
  { name: "David Williams", service: "Delivery", time: "11:00 AM", status: "Completed" },
];

const bars = [42, 65, 48, 82, 58, 94, 70];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-gray-900">

      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">

          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 text-white">
              <LayoutDashboard size={22} />
            </div>

            <div>
              <h1 className="text-xl font-extrabold tracking-tight">
                Workspace<span className="text-green-700">.</span>
              </h1>
              <p className="text-[9px] font-semibold uppercase tracking-[2px] text-gray-400">
                Management System
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-gray-600 hover:text-green-700">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-green-700">
              How It Works
            </a>
            <a href="#benefits" className="text-sm font-medium text-gray-600 hover:text-green-700">
              Benefits
            </a>
          </nav>

          <Link
            href="/login"
            className="flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-800"
          >
            Login
            <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-[#f7faf7]">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-green-100/60 blur-3xl" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 md:py-28 lg:grid-cols-2 lg:px-10">

          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-green-200 bg-white px-4 py-2 text-xs font-semibold text-green-800">
              <span className="h-2 w-2 rounded-full bg-green-600" />
              Smarter Workspace Management
            </div>

            <h2 className="max-w-xl text-4xl font-extrabold leading-[1.15] tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              Manage Your Workspace.
              <span className="text-green-700"> Welcome Every Visitor.</span>
            </h2>

            <p className="mt-6 max-w-lg text-base leading-8 text-gray-600 sm:text-lg">
              A smarter way to manage visitors, organize workspace activities
              and keep your operations running smoothly. Everything you need
              to stay in control, in one place.
            </p>

            <div className="mt-9">
              <Link
                href="/login"
                className="inline-flex items-center gap-3 rounded-xl bg-green-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-green-700/20 transition hover:-translate-y-1 hover:bg-green-800"
              >
                Login to Workspace
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap items-center gap-5 text-xs font-medium text-gray-500">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-600" />
                Easy to use
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-600" />
                Organized records
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-600" />
                Real-time insights
              </span>
            </div>
          </div>

          {/* Dashboard Preview */}
          <div className="relative">
            <div className="absolute -inset-5 rounded-[30px] bg-green-200/40 blur-2xl" />

            <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl shadow-gray-300/50">

              <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-700 text-white">
                    <LayoutDashboard size={17} />
                  </div>
                  <span className="text-sm font-bold">Workspace Overview</span>
                </div>

                <span className="rounded-full bg-green-50 px-3 py-1.5 text-[10px] font-semibold text-green-700">
                  Dashboard Preview
                </span>
              </div>

              <div className="space-y-5 bg-gray-50/70 p-5">

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-gray-100 bg-white p-3">
                      <p className="text-[9px] font-medium text-gray-500">
                        {stat.label}
                      </p>
                      <h3 className="mt-2 text-xl font-extrabold text-gray-900">
                        {stat.value}
                      </h3>
                      <p className="mt-1 text-[9px] font-semibold text-green-700">
                        {stat.change}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 rounded-xl border border-gray-100 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-bold">Visitor Activity</h3>
                        <p className="mt-1 text-[9px] text-gray-400">
                          Weekly overview
                        </p>
                      </div>
                      <BarChart3 size={17} className="text-green-700" />
                    </div>

                    <div className="mt-5 flex h-28 items-end justify-between gap-2">
                      {bars.map((height, i) => (
                        <div key={i} className="flex h-full flex-1 items-end">
                          <div
                            className={`w-full rounded-t-sm ${i === 5 ? "bg-green-700" : "bg-green-200"
                              }`}
                            style={{ height: `${height}%` }}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="mt-2 flex justify-between text-[8px] text-gray-400">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(day => (
                        <span key={day}>{day}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-white p-3">
                    <Activity size={18} className="text-green-700" />
                    <div className="mt-3 flex h-16 w-16 items-center justify-center rounded-full border-[7px] border-green-100 border-t-green-700">
                      <span className="text-lg font-extrabold">16</span>
                    </div>
                    <p className="mt-3 text-center text-[9px] font-semibold text-gray-600">
                      Currently Inside
                    </p>
                  </div>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-100 bg-white">
                  <div className="border-b border-gray-100 px-4 py-3">
                    <h3 className="text-xs font-bold">Recent Visits</h3>
                  </div>

                  {visits.map((visit) => (
                    <div key={visit.name} className="flex items-center justify-between border-b border-gray-50 px-4 py-3 last:border-0">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-[10px] font-bold text-green-700">
                          {visit.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                          <p className="text-[10px] font-semibold text-gray-800">
                            {visit.name}
                          </p>
                          <p className="mt-1 text-[9px] text-gray-400">
                            {visit.service}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-[9px] text-gray-500">{visit.time}</p>
                        <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[8px] font-semibold ${visit.status === "Active"
                            ? "bg-green-50 text-green-700"
                            : "bg-gray-100 text-gray-500"
                          }`}>
                          {visit.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-xl sm:flex">
              <div className="rounded-lg bg-green-50 p-3 text-green-700">
                <ShieldCheck size={23} />
              </div>
              <div>
                <p className="text-xs font-bold">Stay Organized</p>
                <p className="mt-1 text-[10px] text-gray-500">
                  Your workspace, under control.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[2px] text-green-700">
            Everything in One Place
          </span>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Simplify the Way You Manage Your Workspace
          </h2>

          <p className="mt-5 text-sm leading-7 text-gray-500 sm:text-base">
            Spend less time managing records manually and more time focusing
            on what matters. Our platform brings your daily workspace activities
            together.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-100 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-green-200 hover:shadow-xl hover:shadow-green-900/5"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-700 transition group-hover:bg-green-700 group-hover:text-white">
                  <Icon size={23} />
                </div>

                <h3 className="mt-6 text-base font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-500">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-[#f7faf7] py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[2px] text-green-700">
              Simple and Efficient
            </span>

            <h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              A Better Way to Run Your Workspace
            </h2>

            <p className="mt-5 text-sm leading-7 text-gray-500">
              Manage your daily operations through a simple and organized process.
            </p>
          </div>

          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {[
              {
                number: "01",
                icon: LayoutDashboard,
                title: "Access Your Dashboard",
                description: "Log in to your workspace and get an overview of your operations and activities.",
              },
              {
                number: "02",
                icon: Users,
                title: "Manage Your Visitors",
                description: "Record visitor details, manage check-ins and monitor visitor activities.",
              },
              {
                number: "03",
                icon: BarChart3,
                title: "Monitor Performance",
                description: "Review workspace statistics and use reports to make informed decisions.",
              },
            ].map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative rounded-2xl bg-white p-8 shadow-sm">
                  <span className="absolute right-7 top-5 text-4xl font-black text-green-50">
                    {step.number}
                  </span>

                  <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-green-700 text-white">
                    <Icon size={25} />
                  </div>

                  <h3 className="mt-7 text-lg font-bold">{step.title}</h3>

                  <p className="mt-3 text-sm leading-7 text-gray-500">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="benefits" className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:px-10">
        <div>
          <span className="text-xs font-bold uppercase tracking-[2px] text-green-700">
            Built for Productivity
          </span>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
            More Control. Better Organization. Smarter Decisions.
          </h2>

          <p className="mt-5 text-sm leading-8 text-gray-500">
            Having organized visitor information makes daily operations
            easier. Manage your workspace with better visibility and control.
          </p>

          <div className="mt-8 space-y-5">
            {[
              "Get a clear view of daily workspace activities.",
              "Keep visitor records organized and accessible.",
              "Monitor visitor attendance and occupancy.",
              "Make better operational decisions with reports.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 size={19} className="mt-0.5 shrink-0 text-green-700" />
                <p className="text-sm font-medium text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-green-800 p-8 text-white sm:p-12">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-green-600/40 blur-2xl" />

          <div className="relative">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <Zap size={28} />
            </div>

            <h3 className="mt-8 text-3xl font-extrabold leading-tight">
              Your Workspace Deserves Better Management.
            </h3>

            <p className="mt-5 text-sm leading-8 text-green-100">
              Bring your workspace activities together with a system designed
              to make visitor management and daily operations easier.
            </p>

            <Link
              href="/login"
              className="mt-9 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-4 text-sm font-bold text-green-800 transition hover:bg-green-50"
            >
              Login to Workspace
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="border-t border-gray-100 bg-white px-5 py-20 text-center sm:px-8">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Your Workspace. One Organized System.
          </h2>

          <p className="mt-5 text-sm leading-7 text-gray-500">
            Access your workspace dashboard and manage your daily activities
            from one organized platform.
          </p>

          <Link
            href="/login"
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-green-700 px-8 py-4 text-sm font-bold text-white transition hover:bg-green-800"
          >
            Login to Workspace
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 text-center sm:flex-row sm:px-8 lg:px-10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-700 text-white">
              <LayoutDashboard size={17} />
            </div>

            <span className="text-sm font-extrabold">
              Workspace<span className="text-green-700">.</span>
            </span>
          </div>

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Workspace Management System. All rights reserved.
          </p>

          <Link href="/login" className="text-xs font-semibold text-green-700 hover:text-green-900">
            Login
          </Link>
        </div>
      </footer>

    </main>
  );
}
