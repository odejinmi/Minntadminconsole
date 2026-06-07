import {
  CircleCheck,
  Download,
  ShieldAlert,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { DisputesTable } from "@/components/customers/DisputesTable";
import { getDisputes, getRefundStats } from "@/lib/data/refunds";

const STAT_ICONS: Record<string, LucideIcon> = {
  openDisputes: ShieldAlert,
  resolved30d: CircleCheck,
  totalDisputes: ShieldCheck,
};

export default async function RefundsPage(): Promise<React.ReactElement> {
  const [stats, { data, total }] = await Promise.all([
    getRefundStats(),
    getDisputes(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Refunds &amp; Disputes
          </h1>
          <p className="text-sm text-muted-foreground">
            Track customer disputes, evidence and resolution SLAs.
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
            icon={STAT_ICONS[metric.id] ?? ShieldCheck}
          />
        ))}
      </section>

      <DisputesTable disputes={data} total={total} />
    </div>
  );
}
