interface ChartProps { data: { date: string; amount: number }[]; }

export function Chart({ data }: ChartProps) {
  const max = Math.max(1, ...data.map(d => d.amount));
  return (
    <div className="rounded-lg border bg-white p-4">
      <p className="text-sm font-medium text-gray-500 mb-2">Sales Trend</p>
      <svg width="100%" height={120} viewBox={`0 0 ${data.length * 28} 120`} preserveAspectRatio="none">
        {data.map((d, i) => {
          const h = (d.amount / max) * 100;
          return <rect key={i} x={i * 28} y={120 - h} width={20} height={h} fill="#0d6efd" rx={2} />;
        })}
      </svg>
      {data.length === 0 && <p className="text-xs text-gray-400 text-center mt-2">No data</p>}
    </div>
  );
}
