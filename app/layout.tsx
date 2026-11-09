
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Workspace Management System",
    template: "%s | Workspace Management",
  },
  description:
    "A centralized workspace operations management system for managing daily activities, resources, and business operations.",
  applicationName: "Workspace Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 antialiased">
        {children}
      </body>
    </html>
  );
}
