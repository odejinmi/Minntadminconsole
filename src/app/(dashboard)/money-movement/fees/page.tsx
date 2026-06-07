import {
  DollarSign,
  Divide,
  Settings,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { FeesTable } from "@/components/money/FeesTable";
import { getFees, getFeeStats } from "@/lib/data/fees";

const STAT_ICONS: Record<string, LucideIcon> = {
  feesNgn: DollarSign,
  feesUsd: DollarSign,
  feeEvents: TrendingUp,
  avgFee: Divide,
};

export default async function FeesPage(): Promise<React.ReactElement> {
  const [stats, { data, total }] = await Promise.all([
    getFeeStats(),
    getFees(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Fees
          </h1>
          <p className="text-sm text-muted-foreground">
            All platform-level fees collected across transfers, cards, FX, bills
            and withdrawals.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Settings className="size-4" />
          Configure fees
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

      <FeesTable fees={data} total={total} />
    </div>
  );
}
