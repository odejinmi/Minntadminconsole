"use client";

import { useMemo, useState } from "react";
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
import {
  AuditSeverity,
  TeamSegment,
  type AuditLogEntry,
} from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { Segmented } from "@/components/reusables/Segmented";
import { SearchInput } from "@/components/reusables/SearchInput";
import { StatusPill } from "@/components/reusables/StatusPill";
import { TablePagination } from "@/components/customers/TablePagination";
import { useUrlTab } from "@/hooks/useUrlTab";

const ALL = "all";
const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";
const SEGMENTS = [TeamSegment.Members, TeamSegment.Roles] as const;
const SEGMENT_OPTIONS = [
  { label: TeamSegment.Members, value: TeamSegment.Members },
  { label: TeamSegment.Roles, value: TeamSegment.Roles },
];
const SEVERITIES = [
  AuditSeverity.Info,
  AuditSeverity.Warning,
  AuditSeverity.Critical,
];

type AuditLogsViewProps = {
  logs: AuditLogEntry[];
  total: number;
};

export function AuditLogsView({
  logs,
  total,
}: Readonly<AuditLogsViewProps>): React.ReactElement {
  const { active, setActive } = useUrlTab(SEGMENTS, TeamSegment.Members);
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState<string>(ALL);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return logs.filter((log) => {
      const matchesQuery =
        log.actorName.toLowerCase().includes(query) ||
        log.action.toLowerCase().includes(query);
      const matchesSeverity = severity === ALL || log.severity === severity;
      const matchesSegment = log.category === active;
      return matchesQuery && matchesSeverity && matchesSegment;
    });
  }, [logs, search, severity, active]);

  const isFiltered = search.trim() !== "" || severity !== ALL;
  const effectiveTotal = isFiltered ? filtered.length : total;
  const pagination = usePagination(filtered, effectiveTotal);
  const { reset } = pagination;

  const onSearch = (value: string): void => {
    setSearch(value);
    reset();
  };
  const onSeverity = (value: string): void => {
    setSeverity(value);
    reset();
  };
  const onSegment = (value: TeamSegment): void => {
    setActive(value);
    reset();
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Segmented options={SEGMENT_OPTIONS} value={active} onChange={onSegment} />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchInput value={search} onChange={onSearch} className="sm:w-72" />
          <Select value={severity} onValueChange={onSeverity}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All severities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL}>All severities</SelectItem>
              {SEVERITIES.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`px-4 ${HEAD_CLASS}`}>ID</TableHead>
              <TableHead className={HEAD_CLASS}>Actor</TableHead>
              <TableHead className={HEAD_CLASS}>Action</TableHead>
              <TableHead className={HEAD_CLASS}>Target</TableHead>
              <TableHead className={HEAD_CLASS}>IP</TableHead>
              <TableHead className={HEAD_CLASS}>Time</TableHead>
              <TableHead className={`px-4 ${HEAD_CLASS}`}>Severity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagination.pageRows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No activity found.
                </TableCell>
              </TableRow>
            ) : (
              pagination.pageRows.map((log, index) => (
                <TableRow key={`${log.id}-${index}`}>
                  <TableCell className="px-4 py-3 text-sm font-medium">
                    {log.id}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{log.actorName}</p>
                    <p className="text-xs text-muted-foreground">
                      {log.actorEmail}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm">{log.action}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {log.target}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {log.ip}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {log.time}
                  </TableCell>
                  <TableCell className="px-4">
                    <StatusPill status={log.severity} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination pagination={pagination} total={effectiveTotal} />
      </div>
    </div>
  );
}
