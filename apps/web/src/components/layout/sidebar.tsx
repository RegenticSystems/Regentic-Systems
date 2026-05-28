import Link from "next/link";

const NAV = [
  { href: "/",           label: "Dashboard" },
  { href: "/inventory",  label: "Inventory"  },
  { href: "/invoices",   label: "Invoices"   },
  { href: "/workflow",   label: "Workflows"  },
  { href: "/ai",         label: "AI Copilot" },
  { href: "/reports",    label: "Reports"    },
  { href: "/admin",      label: "Admin"      },
];

export function Sidebar() {
  return (
    <aside className="flex flex-col w-64 h-full px-4 py-3 space-y-1 border-r bg-white">
      {NAV.map(({ href, label }) => (
        <Link key={href} href={href}
          className="rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-100">
          {label}
        </Link>
      ))}
    </aside>
  );
}
