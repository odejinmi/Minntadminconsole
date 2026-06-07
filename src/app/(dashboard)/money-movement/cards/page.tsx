import {
  CreditCard,
  DollarSign,
  Download,
  Snowflake,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { VirtualCardsTable } from "@/components/money/VirtualCardsTable";
import { getVirtualCardStats, getVirtualCards } from "@/lib/data/virtual-cards";

const STAT_ICONS: Record<string, LucideIcon> = {
  spend: DollarSign,
  frozen: Snowflake,
  activeCards: CreditCard,
  declineRate: X,
};

export default async function VirtualCardsPage(): Promise<React.ReactElement> {
  const [stats, { data, total }] = await Promise.all([
    getVirtualCardStats(),
    getVirtualCards(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Virtual Cards
          </h1>
          <p className="text-sm text-muted-foreground">
            Issue, freeze and monitor multi-currency virtual cards.
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
            icon={STAT_ICONS[metric.id] ?? CreditCard}
          />
        ))}
      </section>

      <VirtualCardsTable cards={data} total={total} />
    </div>
  );
}
