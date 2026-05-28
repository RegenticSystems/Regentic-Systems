import { Card, CardHeader, CardTitle, CardContent } from "@synapse/ui";

interface KPICardProps { title: string; value: number | string; suffix?: string; }

export function KPICard({ title, value, suffix = "" }: KPICardProps) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle></CardHeader>
      <CardContent><span className="text-2xl font-bold">{value}{suffix}</span></CardContent>
    </Card>
  );
}
