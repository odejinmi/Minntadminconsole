import {
  DollarSign,
  Download,
  Gamepad2,
  Lightbulb,
  Smartphone,
  Tv,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { BillPaymentsTable } from "@/components/money/BillPaymentsTable";
import { getBillPayments, getBillStats } from "@/lib/data/bills";

const STAT_ICONS: Record<string, LucideIcon> = {
  totalVolume: DollarSign,
  airtime: Smartphone,
  internetData: Wifi,
  electricity: Lightbulb,
  cableTv: Tv,
  betting: Gamepad2,
};

export default async function BillPaymentsPage(): Promise<React.ReactElement> {
  const [stats, { data, total }] = await Promise.all([
    getBillStats(),
    getBillPayments(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Bill Payments
          </h1>
          <p className="text-sm text-muted-foreground">
            Track utility, airtime, data, TV and education payments across
            providers.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="size-4" />
          Export
        </Button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((metric) => (
          <StatCard
            key={metric.id}
            metric={metric}
            icon={STAT_ICONS[metric.id] ?? DollarSign}
          />
        ))}
      </section>

      <BillPaymentsTable bills={data} total={total} />
    </div>
  );
}
