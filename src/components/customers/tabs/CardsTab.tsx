"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ListFilter, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import type { CardRecord } from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { CardStatusBadge } from "../UserBadges";
import { TableToolbar } from "../TableToolbar";
import { TablePagination } from "../TablePagination";

const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

type CardsTabProps = {
  cards: CardRecord[];
  total: number;
  userName: string;
};

export function CardsTab({
  cards,
  total,
  userName,
}: Readonly<CardsTabProps>): React.ReactElement {
  const [search, setSearch] = useState("");
  const isFiltered = search.trim() !== "";

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return cards.filter((card) => card.id.toLowerCase().includes(query));
  }, [cards, search]);

  const effectiveTotal = isFiltered ? filtered.length : total;
  const pagination = usePagination(filtered, effectiveTotal);
  const { reset } = pagination;

  const onSearch = (value: string): void => {
    setSearch(value);
    reset();
  };

  return (
    <div className="space-y-4">
      <TableToolbar value={search} onValueChange={onSearch} placeholder="Search...">
        <Button variant="outline" size="sm" className="gap-2">
          <ListFilter className="size-4" />
          Filters
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <CalendarDays className="size-4" />
          Date Range
        </Button>
      </TableToolbar>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`px-4 ${HEAD_CLASS}`}>Card ID</TableHead>
              <TableHead className={HEAD_CLASS}>User</TableHead>
              <TableHead className={HEAD_CLASS}>Balance</TableHead>
              <TableHead className={HEAD_CLASS}>Currency</TableHead>
              <TableHead className={HEAD_CLASS}>Type</TableHead>
              <TableHead className={HEAD_CLASS}>Status</TableHead>
              <TableHead className={HEAD_CLASS}>Expiry date</TableHead>
              <TableHead className="px-4" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagination.pageRows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={8}
                  className="h-24 text-center text-sm text-muted-foreground"
                >
                  No cards found.
                </TableCell>
              </TableRow>
            ) : (
              pagination.pageRows.map((card, index) => (
                <TableRow key={`${card.id}-${index}`}>
                  <TableCell className="px-4 py-3 text-sm">{card.id}</TableCell>
                  <TableCell className="text-sm">{userName}</TableCell>
                  <TableCell className="text-sm">
                    {formatCurrency(card.balance, "")}
                  </TableCell>
                  <TableCell className="text-sm">{card.currency}</TableCell>
                  <TableCell className="text-sm">{card.type}</TableCell>
                  <TableCell>
                    <CardStatusBadge status={card.status} />
                  </TableCell>
                  <TableCell className="text-sm">{card.expiry}</TableCell>
                  <TableCell className="px-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          aria-label="Card actions"
                        >
                          <MoreVertical className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40">
                        <DropdownMenuItem>View card</DropdownMenuItem>
                        <DropdownMenuItem>View transactions</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive">
                          Freeze card
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
