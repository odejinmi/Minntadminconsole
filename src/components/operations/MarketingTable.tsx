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
import type { Campaign } from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { StatusPill } from "@/components/reusables/StatusPill";
import { SearchInput } from "@/components/reusables/SearchInput";
import { SectionHeader } from "@/components/reusables/SectionHeader";
import { TablePagination } from "@/components/customers/TablePagination";
import { DetailDialog } from "@/components/money/DetailDialog";

const ALL = "all";
const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

type MarketingTableProps = {
  campaigns: Campaign[];
  total: number;
};

export function MarketingTable({
  campaigns,
  total,
}: Readonly<MarketingTableProps>): React.ReactElement {
  const [search, setSearch] = useState("");
  const [channel, setChannel] = useState<string>(ALL);

  const channels = useMemo(
    () => Array.from(new Set(campaigns.map((item) => item.channel))),
    [campaigns],
  );

  const isFiltered = search.trim() !== "" || channel !== ALL;
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return campaigns.filter((campaign) => {
      const matchesQuery =
        campaign.name.toLowerCase().includes(query) ||
        campaign.audience.toLowerCase().includes(query);
      const matchesChannel = channel === ALL || campaign.channel === channel;
      return matchesQuery && matchesChannel;
    });
  }, [campaigns, search, channel]);

  const effectiveTotal = isFiltered ? filtered.length : total;
  const pagination = usePagination(filtered, effectiveTotal);
  const { reset } = pagination;

  const onSearch = (value: string): void => {
    setSearch(value);
    reset();
  };
  const onChannel = (value: string): void => {
    setChannel(value);
    reset();
  };

  return (
    <div className="space-y-4">
      <SectionHeader title="Active campaigns">
        <SearchInput value={search} onChange={onSearch} className="sm:w-72" />
        <Select value={channel} onValueChange={onChannel}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Types</SelectItem>
            {channels.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </SectionHeader>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`px-4 ${HEAD_CLASS}`}>Name</TableHead>
              <TableHead className={HEAD_CLASS}>Channel</TableHead>
              <TableHead className={HEAD_CLASS}>Audience</TableHead>
              <TableHead className={HEAD_CLASS}>Frequency</TableHead>
              <TableHead className={HEAD_CLASS}>Status</TableHead>
              <TableHead className={HEAD_CLASS}>Date</TableHead>
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
                  No campaigns found.
                </TableCell>
              </TableRow>
            ) : (
              pagination.pageRows.map((campaign, index) => (
                <TableRow key={`${campaign.id}-${index}`}>
                  <TableCell className="px-4 py-3 text-sm font-medium">
                    {campaign.name}
                  </TableCell>
                  <TableCell className="text-sm">{campaign.channel}</TableCell>
                  <TableCell className="text-sm">{campaign.audience}</TableCell>
                  <TableCell className="text-sm">{campaign.frequency}</TableCell>
                  <TableCell>
                    <StatusPill status={campaign.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {campaign.date}
                  </TableCell>
                  <TableCell className="px-4 text-right">
                    <DetailDialog
                      title="Campaign details"
                      status={campaign.status}
                      rows={[
                        { label: "Name", value: campaign.name },
                        { label: "Channel", value: campaign.channel },
                        { label: "Audience", value: campaign.audience },
                        { label: "Frequency", value: campaign.frequency },
                        { label: "Status", value: campaign.status },
                        { label: "Date", value: campaign.date },
                      ]}
                    />
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
