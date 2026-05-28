"use client";
import { useQuery }    from "@tanstack/react-query";
import { KPICard }     from "@/components/widgets/kpi-card";
import { Chart }       from "@/components/widgets/chart";

export default function Dashboard() {
  const { data: inventory = [] } = useQuery({
    queryKey: ["inventory"],
    queryFn: () => fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory/products`).then(r => r.json()),
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Products"    value={inventory.length} />
        <KPICard title="Total Stock Units" value={inventory.reduce((s: number, p: any) => s + (p.stock?.reduce((ss: number, st: any) => ss + st.quantity, 0) ?? 0), 0)} />
        <KPICard title="Revenue (MTD)"     value="—" />
        <KPICard title="Open Workflows"    value="—" />
      </div>
      <Chart data={[]} />
    </div>
  );
}
