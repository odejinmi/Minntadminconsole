"use client";

import { useMemo, useState } from "react";
import { ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { UserStatus, type VirtualCard } from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { StatusPill } from "@/components/reusables/StatusPill";
import { TableToolbar } from "@/components/customers/TableToolbar";
import { TablePagination } from "@/components/customers/TablePagination";
import { DetailDialog } from "./DetailDialog";

const ALL = "all";
const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

type VirtualCardsTableProps = {
  cards: VirtualCard[];
  total: number;
};

export function VirtualCardsTable({
  cards,
  total,
}: Readonly<VirtualCardsTableProps>): React.ReactElement {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>(ALL);

  const isFiltered = search.trim() !== "" || status !== ALL;
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return cards.filter((card) => {
      const matchesQuery =
        query === "" ||
        card.holder.toLowerCase().includes(query) ||
        card.last4.includes(query) ||
        card.brand.toLowerCase().includes(query);
      const matchesStatus = status === ALL || card.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [cards, search, status]);

  const effectiveTotal = isFiltered ? filtered.length : total;
  const pagination = usePagination(filtered, effectiveTotal);
  const { reset } = pagination;

  const onSearch = (value: string): void => {
    setSearch(value);
    reset();
  };
  const onStatus = (value: string): void => {
    setStatus(value);
    reset();
  };

  return (
    <div className="space-y-4">
      <TableToolbar value={search} onValueChange={onSearch}>
        <Button variant="outline" size="sm" className="gap-2">
          <ListFilter className="size-4" />
          Filters
        </Button>
        <Select defaultValue={ALL}>
          <SelectTrigger size="sm" className="w-[110px]">
            <SelectValue placeholder="Tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All tiers</SelectItem>
            <SelectItem value="tier-1">Tier 1</SelectItem>
            <SelectItem value="tier-2">Tier 2</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={onStatus}>
          <SelectTrigger size="sm" className="w-[120px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All statuses</SelectItem>
            <SelectItem value={UserStatus.Active}>Active</SelectItem>
            <SelectItem value={UserStatus.Frozen}>Frozen</SelectItem>
          </SelectContent>
        </Select>
      </TableToolbar>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`px-4 ${HEAD_CLASS}`}>Card</TableHead>
              <TableHead className={HEAD_CLASS}>Holder</TableHead>
              <TableHead className={HEAD_CLASS}>Currency</TableHead>
              <TableHead className={HEAD_CLASS}>Balance</TableHead>
              <TableHead className={HEAD_CLASS}>Spend (30d)</TableHead>
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
                  No cards found.
                </TableCell>
              </TableRow>
            ) : (
              pagination.pageRows.map((card) => (
                <TableRow key={card.id}>
                  <TableCell className="px-4 py-3 text-sm font-medium">
                    {card.brand} •••• {card.last4}
                  </TableCell>
                  <TableCell className="text-sm">{card.holder}</TableCell>
                  <TableCell className="text-sm">{card.currency}</TableCell>
                  <TableCell className="text-sm">{card.balanceLabel}</TableCell>
                  <TableCell className="text-sm">{card.spendLabel}</TableCell>
                  <TableCell>
                    <StatusPill status={card.status} />
                  </TableCell>
                  <TableCell className="px-4 text-right">
                    <DetailDialog
                      title="Card details"
                      status={card.status}
                      rows={[
                        { label: "Card", value: `${card.brand} •••• ${card.last4}` },
                        { label: "Holder", value: card.holder },
                        { label: "Currency", value: card.currency },
                        { label: "Balance", value: card.balanceLabel },
                        { label: "Spend (30d)", value: card.spendLabel },
                        { label: "Status", value: card.status },
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
