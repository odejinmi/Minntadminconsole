import {
  CircleCheck,
  Download,
  Snowflake,
  Users as UsersIcon,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { UsersTable } from "@/components/customers/UsersTable";
import { getUsers, getUserStats } from "@/lib/data/users";

const STAT_ICONS: Record<string, LucideIcon> = {
  totalUsers: UsersIcon,
  verified: CircleCheck,
  frozen: Snowflake,
  walletBalance: Wallet,
};

export default async function UsersPage(): Promise<React.ReactElement> {
  const [{ data: users, total }, stats] = await Promise.all([
    getUsers(),
    getUserStats(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <header className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-display text-2xl font-semibold tracking-tight">
            Users
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage customer accounts, wallets, KYC levels and account actions.
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
            icon={STAT_ICONS[metric.id] ?? UsersIcon}
          />
        ))}
      </section>

      <UsersTable users={users} total={total} />
    </div>
  );
}
