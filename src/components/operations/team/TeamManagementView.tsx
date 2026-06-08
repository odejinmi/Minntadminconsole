"use client";

import { TeamSegment, type Role, type TeamMember } from "@/lib/data/types";
import { Segmented } from "@/components/reusables/Segmented";
import { useUrlTab } from "@/hooks/useUrlTab";
import { TeamMembersTable } from "./TeamMembersTable";
import { RolesGrid } from "./RolesGrid";

const SEGMENTS = [TeamSegment.Members, TeamSegment.Roles] as const;

const OPTIONS = [
  { label: TeamSegment.Members, value: TeamSegment.Members },
  { label: TeamSegment.Roles, value: TeamSegment.Roles },
];

type TeamManagementViewProps = {
  members: TeamMember[];
  membersTotal: number;
  roles: Role[];
};

export function TeamManagementView({
  members,
  membersTotal,
  roles,
}: Readonly<TeamManagementViewProps>): React.ReactElement {
  const { active, setActive } = useUrlTab(SEGMENTS, TeamSegment.Members);
  const roleNames = roles.map((role) => role.name);

  return (
    <div className="space-y-5">
      <Segmented options={OPTIONS} value={active} onChange={setActive} />

      {active === TeamSegment.Members ? (
        <TeamMembersTable
          members={members}
          total={membersTotal}
          roleNames={roleNames}
        />
      ) : (
        <RolesGrid roles={roles} />
      )}
    </div>
  );
}
