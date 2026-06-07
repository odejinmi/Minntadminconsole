import {
  ArrowRightLeft,
  CreditCard,
  DollarSign,
  ReceiptText,
  RefreshCw,
  Users,
  type LucideIcon,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenuePayoutsChart } from "@/components/dashboard/RevenuePayoutsChart";
import { MiniTrendCard } from "@/components/dashboard/MiniTrendCard";
import {
  getDisputes,
  getOverviewMetrics,
  getRevenuePayouts,
  getRewards,
  getUserGrowth,
} from "@/lib/data/overview";

const METRIC_ICONS: Record<string, LucideIcon> = {
  totalRevenue: DollarSign,
  totalTransactions: ArrowRightLeft,
  totalUsers: Users,
  fxSwapVolume: RefreshCw,
  activeCards: CreditCard,
  billPaymentVolume: ReceiptText,
};

const TREND_PERIOD = "Last 30 days";

export default async function OverviewPage(): Promise<React.ReactElement> {
  const [metrics, revenuePayouts, userGrowth, rewards, disputes] =
    await Promise.all([
      getOverviewMetrics(),
      getRevenuePayouts(),
      getUserGrowth(),
      getRewards(),
      getDisputes(),
    ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <StatCard
            key={metric.id}
            metric={metric}
            icon={METRIC_ICONS[metric.id] ?? DollarSign}
          />
        ))}
      </section>

      <RevenuePayoutsChart data={revenuePayouts} />

      <section className="grid gap-4 lg:grid-cols-3">
        <MiniTrendCard
          title="User Growth"
          value="0"
          period={TREND_PERIOD}
          data={userGrowth}
        />
        <MiniTrendCard
          title="Rewards"
          value="0"
          period={TREND_PERIOD}
          data={rewards}
        />
        <MiniTrendCard
          title="Disputes"
          value="0"
          period={TREND_PERIOD}
          data={disputes}
        />
      </section>
    </div>
  );
}
