import {
  DollarSign,
  Download,
  Gauge,
  Repeat,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { CurrencyRatesTable } from "@/components/money/CurrencyRatesTable";
import { getCurrencyRates, getSwapStats } from "@/lib/data/swap";

const STAT_ICONS: Record<string, LucideIcon> = {
  swapVolume: DollarSign,
  currencySwaps: Repeat,
  avgMargin: Gauge,
};

export default async function CurrencySwapPage(): Promise<React.ReactElement> {
  const [stats, { data, total }] = await Promise.all([
    getSwapStats(),
    getCurrencyRates(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Currency Swap
          </h1>
          <p className="text-sm text-muted-foreground">
            Live FX rates, swap volume and margins. Edit per-country buy/sell
            rates inline.
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="size-4" />
          Export
        </Button>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((metric) => (
          <StatCard
            key={metric.id}
            metric={metric}
            icon={STAT_ICONS[metric.id] ?? DollarSign}
          />
        ))}
      </section>

      <CurrencyRatesTable rates={data} total={total} />
    </div>
  );
}
