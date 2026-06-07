import {
  BadgeCheck,
  ChevronRight,
  MapPin,
  Store,
  Users as UsersIcon,
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { KycReviewTable } from "@/components/customers/KycReviewTable";
import { getKycRecords, getKycStats } from "@/lib/data/kyc";

const STAT_ICONS: Record<string, LucideIcon> = {
  pendingReview: UsersIcon,
  approvedToday: BadgeCheck,
  rejectedToday: X,
  verifiedIndividuals: UsersIcon,
  verifiedBusinesses: Store,
  verifiedAddresses: MapPin,
};

export default async function KycPage(): Promise<React.ReactElement> {
  const [stats, { records, total }] = await Promise.all([
    getKycStats(),
    getKycRecords(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            KYC &amp; Compliance
          </h1>
          <p className="text-sm text-muted-foreground">
            Approve verifications and manage blacklists.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1.5">
            Blacklist
            <ChevronRight className="size-4" />
          </Button>
          <Button variant="outline">Limits</Button>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((metric) => (
          <StatCard
            key={metric.id}
            metric={metric}
            icon={STAT_ICONS[metric.id] ?? UsersIcon}
          />
        ))}
      </section>

      <KycReviewTable records={records} total={total} />
    </div>
  );
}
