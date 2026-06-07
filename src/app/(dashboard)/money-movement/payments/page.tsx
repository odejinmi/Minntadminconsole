import {
  Clock,
  DollarSign,
  Download,
  Snowflake,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { PayoutsTable } from "@/components/money/PayoutsTable";
import {
  getPaymentReceipt,
  getPayoutStats,
  getPayouts,
} from "@/lib/data/payouts";

const STAT_ICONS: Record<string, LucideIcon> = {
  inflow: DollarSign,
  outflow: Snowflake,
  pendingPayouts: Clock,
  netPosition: TrendingUp,
};

export default async function PaymentsPage(): Promise<React.ReactElement> {
  const [stats, { data, total }, receipt] = await Promise.all([
    getPayoutStats(),
    getPayouts(),
    getPaymentReceipt(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Payments &amp; Payouts
          </h1>
          <p className="text-sm text-muted-foreground">
            Inbound collections and outbound payouts across banking partners.
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

      <PayoutsTable payouts={data} total={total} receipt={receipt} />
    </div>
  );
}
