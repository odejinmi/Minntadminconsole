"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { TeamMemberStatus, type TeamMember } from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { StatusPill } from "@/components/reusables/StatusPill";
import { SearchInput } from "@/components/reusables/SearchInput";
import { TablePagination } from "@/components/customers/TablePagination";
import { ManageMemberModal } from "./ManageMemberModal";

const ALL = "all";
const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

type TeamMembersTableProps = {
  members: TeamMember[];
  total: number;
  roleNames: string[];
};

export function TeamMembersTable({
  members,
  total,
  roleNames,
}: Readonly<TeamMembersTableProps>): React.ReactElement {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string>(ALL);
  const [managed, setManaged] = useState<TeamMember | null>(null);

  const isFiltered = search.trim() !== "" || role !== ALL;
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return members.filter((member) => {
      const matchesQuery =
        member.name.toLowerCase().includes(query) ||
        member.email.toLowerCase().includes(query);
      const matchesRole = role === ALL || member.role === role;
      return matchesQuery && matchesRole;
    });
  }, [members, search, role]);

  const effectiveTotal = isFiltered ? filtered.length : total;
  const pagination = usePagination(filtered, effectiveTotal);
  const { reset } = pagination;

  const onSearch = (value: string): void => {
    setSearch(value);
    reset();
  };
  const onRole = (value: string): void => {
    setRole(value);
    reset();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <SearchInput value={search} onChange={onSearch} className="sm:w-72" />
        <Select value={role} onValueChange={onRole}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Types</SelectItem>
            {roleNames.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`px-4 ${HEAD_CLASS}`}>ID</TableHead>
              <TableHead className={HEAD_CLASS}>Name</TableHead>
              <TableHead className={HEAD_CLASS}>Email</TableHead>
              <TableHead className={HEAD_CLASS}>Role</TableHead>
              <TableHead className={HEAD_CLASS}>Last active</TableHead>
              <TableHead className={HEAD_CLASS}>Status</TableHead>
              <TableHead className={`px-4 text-right ${HEAD_CLASS}`}>
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagination.pageRows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No team members found.
                </TableCell>
              </TableRow>
            ) : (
              pagination.pageRows.map((member, index) => {
                const invited = member.status === TeamMemberStatus.Invited;
                return (
                  <TableRow key={`${member.id}-${index}`}>
                    <TableCell className="px-4 py-3 text-sm font-medium">
                      {member.id}
                    </TableCell>
                    <TableCell className="text-sm">{member.name}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {member.email}
                    </TableCell>
                    <TableCell className="text-sm">{member.role}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {member.lastActive}
                    </TableCell>
                    <TableCell>
                      <StatusPill status={member.status} />
                    </TableCell>
                    <TableCell className="px-4 text-right">
                      {invited ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            toast.success(`Invite resent to ${member.email}`)
                          }
                        >
                          Resend
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setManaged(member)}
                        >
                          Manage
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>

        <TablePagination pagination={pagination} total={effectiveTotal} />
      </div>

      <ManageMemberModal
        member={managed}
        roleNames={roleNames}
        onOpenChange={(open) => {
          if (!open) setManaged(null);
        }}
      />
    </div>
  );
}
