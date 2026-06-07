import {
  CircleCheck,
  Clock,
  DollarSign,
  Download,
  RefreshCw,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { VolumeAreaChart } from "@/components/dashboard/VolumeAreaChart";
import { TransactionsTable } from "@/components/money/TransactionsTable";
import {
  getHourlyVolume,
  getMoneyTransactions,
  getTransactionDetail,
  getTransactionStats,
} from "@/lib/data/transactions";

const STAT_ICONS: Record<string, LucideIcon> = {
  totalVolume: DollarSign,
  successful: CircleCheck,
  failed: X,
  pending: Clock,
};

export default async function TransactionsPage(): Promise<React.ReactElement> {
  const [stats, volume, { data, total }, detail] = await Promise.all([
    getTransactionStats(),
    getHourlyVolume(),
    getMoneyTransactions(),
    getTransactionDetail(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Transactions
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor every movement across bank, card, mobile money and stablecoin
            rails in real time.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="size-4" />
            Export
          </Button>
          <Button className="gap-2">
            <RefreshCw className="size-4" />
            Refresh
          </Button>
        </div>
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

      <VolumeAreaChart data={volume} />

      <TransactionsTable transactions={data} total={total} detail={detail} />
    </div>
  );
}
