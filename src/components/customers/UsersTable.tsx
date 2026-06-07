"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ListFilter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { getInitials } from "@/lib/utils";
import { formatDate, formatMoney } from "@/lib/format";
import { KycTier, UserStatus, type User } from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { KycBadge, StatusBadge, TypeBadge } from "./UserBadges";
import { TableToolbar } from "./TableToolbar";
import { TablePagination } from "./TablePagination";

const ALL = "all";
const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

type UsersTableProps = {
  users: User[];
  total: number;
};

export function UsersTable({
  users,
  total,
}: Readonly<UsersTableProps>): React.ReactElement {
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState<string>(ALL);
  const [status, setStatus] = useState<string>(ALL);

  const isFiltered = search.trim() !== "" || tier !== ALL || status !== ALL;

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return users.filter((user) => {
      const matchesQuery =
        query === "" ||
        user.fullName.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query);
      const matchesTier = tier === ALL || user.tier === tier;
      const matchesStatus = status === ALL || user.status === status;
      return matchesQuery && matchesTier && matchesStatus;
    });
  }, [users, search, tier, status]);

  const effectiveTotal = isFiltered ? filtered.length : total;
  const pagination = usePagination(filtered, effectiveTotal);
  const { reset } = pagination;

  const onSearch = (value: string): void => {
    setSearch(value);
    reset();
  };
  const onTier = (value: string): void => {
    setTier(value);
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
        <Select value={tier} onValueChange={onTier}>
          <SelectTrigger size="sm" className="w-[120px]">
            <SelectValue placeholder="Tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All tiers</SelectItem>
            <SelectItem value={KycTier.Tier1}>Tier 1</SelectItem>
            <SelectItem value={KycTier.Tier2}>Tier 2</SelectItem>
            <SelectItem value={KycTier.Tier3}>Tier 3</SelectItem>
          </SelectContent>
        </Select>
        <Select value={status} onValueChange={onStatus}>
          <SelectTrigger size="sm" className="w-[130px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All statuses</SelectItem>
            <SelectItem value={UserStatus.Active}>Active</SelectItem>
            <SelectItem value={UserStatus.Inactive}>Inactive</SelectItem>
            <SelectItem value={UserStatus.Frozen}>Frozen</SelectItem>
          </SelectContent>
        </Select>
      </TableToolbar>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`px-4 ${HEAD_CLASS}`}>User</TableHead>
              <TableHead className={HEAD_CLASS}>Type</TableHead>
              <TableHead className={HEAD_CLASS}>KYC</TableHead>
              <TableHead className={HEAD_CLASS}>Wallet</TableHead>
              <TableHead className={HEAD_CLASS}>Status</TableHead>
              <TableHead className={HEAD_CLASS}>Joined</TableHead>
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
                  No users match your filters.
                </TableCell>
              </TableRow>
            ) : (
              pagination.pageRows.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-9">
                        <AvatarImage src={user.avatarUrl} alt={user.fullName} />
                        <AvatarFallback className="text-xs">
                          {getInitials(user.fullName)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {user.fullName}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <TypeBadge type={user.type} />
                  </TableCell>
                  <TableCell>
                    <KycBadge kyc={user.kyc} />
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatMoney(user.walletBalance)}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={user.status} />
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(user.joinedAt)}
                  </TableCell>
                  <TableCell className="px-4 text-right">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/customers/users/${user.id}`}>View</Link>
                    </Button>
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
