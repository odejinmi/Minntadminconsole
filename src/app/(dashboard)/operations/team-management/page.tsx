import { Suspense } from "react";
import {
  Clock,
  ShieldCheck,
  UserCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/reusables/PageHeader";
import { StatCard } from "@/components/dashboard/StatCard";
import { AddTeamMemberButton } from "@/components/operations/team/AddTeamMemberButton";
import { TeamManagementView } from "@/components/operations/team/TeamManagementView";
import { getRoles, getTeamMembers, getTeamStats } from "@/lib/data/team";

const STAT_ICONS: Record<string, LucideIcon> = {
  totalMembers: Users,
  activeMembers: UserCheck,
  roles: ShieldCheck,
  pendingInvites: Clock,
};

export default async function TeamManagementPage(): Promise<React.ReactElement> {
  const [stats, members, roles] = await Promise.all([
    getTeamStats(),
    getTeamMembers(),
    getRoles(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <PageHeader
        title="Team Management"
        subtitle="Manage team members and permissions"
      >
        <AddTeamMemberButton roleNames={roles.map((role) => role.name)} />
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((metric) => (
          <StatCard
            key={metric.id}
            metric={metric}
            icon={STAT_ICONS[metric.id] ?? Users}
          />
        ))}
      </section>

      <Suspense fallback={null}>
        <TeamManagementView
          members={members.data}
          membersTotal={members.total}
          roles={roles}
        />
      </Suspense>
    </div>
  );
}
