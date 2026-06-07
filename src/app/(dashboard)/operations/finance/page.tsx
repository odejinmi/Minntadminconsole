import {
  DollarSign,
  TrendingDown,
  TrendingUp,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/reusables/PageHeader";
import { ExportRefreshActions } from "@/components/reusables/ExportRefreshActions";
import { StatCard } from "@/components/dashboard/StatCard";
import { ProfitLossChart } from "@/components/operations/ProfitLossChart";
import { getFinanceStats, getProfitLoss } from "@/lib/data/finance";

const STAT_ICONS: Record<string, LucideIcon> = {
  revenueMtd: TrendingUp,
  costsMtd: TrendingDown,
  netProfit: DollarSign,
  treasuryBalance: Wallet,
};

export default async function FinancePage(): Promise<React.ReactElement> {
  const [stats, profitLoss] = await Promise.all([
    getFinanceStats(),
    getProfitLoss(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <PageHeader
        title="Finance"
        subtitle="Treasury, revenue analytics, settlements and P&L."
      >
        <ExportRefreshActions />
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((metric) => (
          <StatCard
            key={metric.id}
            metric={metric}
            icon={STAT_ICONS[metric.id] ?? DollarSign}
          />
        ))}
      </section>

      <ProfitLossChart data={profitLoss} />
    </div>
  );
}
