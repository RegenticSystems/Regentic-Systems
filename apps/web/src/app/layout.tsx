import "./globals.css";
import type { Metadata } from "next";
import { Sidebar } from "@/components/layout/sidebar";
import { Header }  from "@/components/layout/header";

export const metadata: Metadata = { title: "Synapse ERP", description: "AI-native ERP" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        <Header />
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 p-6 overflow-y-auto">{children}</main>
        </div>
      </body>
    </html>
  );
}
