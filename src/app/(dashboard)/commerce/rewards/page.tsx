import { DollarSign, Gift, Users as UsersIcon, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/reusables/PageHeader";
import { ExportRefreshActions } from "@/components/reusables/ExportRefreshActions";
import { StatCard } from "@/components/dashboard/StatCard";
import { RewardsTable } from "@/components/commerce/RewardsTable";
import { getRewardStats, getRewards } from "@/lib/data/rewards";

const STAT_ICONS: Record<string, LucideIcon> = {
  activeMembers: UsersIcon,
  rewardsIssued: Gift,
  cashbackPaid: DollarSign,
};

export default async function RewardsPage(): Promise<React.ReactElement> {
  const [stats, { data, total }] = await Promise.all([
    getRewardStats(),
    getRewards(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <PageHeader
        title="Rewards & Loyalty"
        subtitle="Cashback, points and tiered loyalty programs."
      >
        <ExportRefreshActions />
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((metric) => (
          <StatCard
            key={metric.id}
            metric={metric}
            icon={STAT_ICONS[metric.id] ?? DollarSign}
          />
        ))}
      </section>

      <RewardsTable rewards={data} total={total} />
    </div>
  );
}
