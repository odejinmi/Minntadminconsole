"use client";

import { useMemo, useState } from "react";
import { CalendarDays, ListFilter } from "lucide-react";
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
import {
  PaymentType,
  TransactionStatus,
  type MoneyTransaction,
  type TransactionDetail,
} from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { StatusPill } from "@/components/reusables/StatusPill";
import { TableToolbar } from "@/components/customers/TableToolbar";
import { TablePagination } from "@/components/customers/TablePagination";
import { TransactionDetailsModal } from "./TransactionDetailsModal";

const ALL = "all";
const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

type TransactionsTableProps = {
  transactions: MoneyTransaction[];
  total: number;
  detail: TransactionDetail;
};

export function TransactionsTable({
  transactions,
  total,
  detail,
}: Readonly<TransactionsTableProps>): React.ReactElement {
  const [search, setSearch] = useState("");
  const [type, setType] = useState<string>(ALL);
  const [status, setStatus] = useState<string>(ALL);

  const isFiltered = search.trim() !== "" || type !== ALL || status !== ALL;
  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return transactions.filter((item) => {
      const matchesQuery =
        query === "" ||
        item.id.toLowerCase().includes(query) ||
        item.userName.toLowerCase().includes(query) ||
        item.userEmail.toLowerCase().includes(query);
      const matchesType = type === ALL || item.paymentType === type;
      const matchesStatus = status === ALL || item.status === status;
      return matchesQuery && matchesType && matchesStatus;
    });
  }, [transactions, search, type, status]);

  const effectiveTotal = isFiltered ? filtered.length : total;
  const pagination = usePagination(filtered, effectiveTotal);
  const { reset } = pagination;

  const onSearch = (value: string): void => {
    setSearch(value);
    reset();
  };
  const onType = (value: string): void => {
    setType(value);
    reset();
  };
  const onStatus = (value: string): void => {
    setStatus(value);
    reset();
  };

  return (
    <div className="space-y-4">
      <TableToolbar value={search} onValueChange={onSearch} placeholder="Search...">
        <Select value={type} onValueChange={onType}>
          <SelectTrigger size="sm" className="w-[120px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All types</SelectItem>
            {Object.values(PaymentType).map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={onStatus}>
          <SelectTrigger size="sm" className="w-[120px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All statuses</SelectItem>
            {Object.values(TransactionStatus).map((value) => (
              <SelectItem key={value} value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
              <TableHead className={`px-4 ${HEAD_CLASS}`}>Reference ID</TableHead>
              <TableHead className={HEAD_CLASS}>User</TableHead>
              <TableHead className={HEAD_CLASS}>Amount</TableHead>
              <TableHead className={HEAD_CLASS}>Payment Type</TableHead>
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
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              pagination.pageRows.map((item, index) => (
                <TableRow key={`${item.id}-${index}`}>
                  <TableCell className="px-4 py-3 text-sm">{item.id}</TableCell>
                  <TableCell>
                    <p className="text-sm font-medium">{item.userName}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.userEmail}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm">{item.amountLabel}</TableCell>
                  <TableCell className="text-sm">{item.paymentType}</TableCell>
                  <TableCell>
                    <StatusPill status={item.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {item.date}
                  </TableCell>
                  <TableCell className="px-4 text-right">
                    <TransactionDetailsModal detail={detail} />
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
