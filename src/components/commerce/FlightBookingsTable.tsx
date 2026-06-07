"use client";

import { ArrowRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { FlightBooking } from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { StatusPill } from "@/components/reusables/StatusPill";
import { SectionHeader } from "@/components/reusables/SectionHeader";
import { FilterDateActions } from "@/components/reusables/FilterDateActions";
import { TablePagination } from "@/components/customers/TablePagination";

const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

type FlightBookingsTableProps = {
  bookings: FlightBooking[];
  total: number;
};

export function FlightBookingsTable({
  bookings,
  total,
}: Readonly<FlightBookingsTableProps>): React.ReactElement {
  const pagination = usePagination(bookings, total);

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Recent flight bookings"
        subtitle="Latest records · auto-refresh"
      >
        <FilterDateActions />
      </SectionHeader>

      <div className="rounded-xl border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={`px-4 ${HEAD_CLASS}`}>Ref</TableHead>
              <TableHead className={HEAD_CLASS}>Customer</TableHead>
              <TableHead className={HEAD_CLASS}>Route</TableHead>
              <TableHead className={HEAD_CLASS}>Airline</TableHead>
              <TableHead className={HEAD_CLASS}>Amount</TableHead>
              <TableHead className={`px-4 ${HEAD_CLASS}`}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagination.pageRows.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="px-4 py-3 text-sm font-medium">
                  {booking.id}
                </TableCell>
                <TableCell className="text-sm">{booking.customer}</TableCell>
                <TableCell className="text-sm">
                  <span className="inline-flex items-center gap-1.5">
                    {booking.from}
                    <ArrowRight className="size-3.5 text-muted-foreground" />
                    {booking.to}
                  </span>
                </TableCell>
                <TableCell className="text-sm">{booking.airline}</TableCell>
                <TableCell className="text-sm">{booking.amountLabel}</TableCell>
                <TableCell className="px-4">
                  <StatusPill status={booking.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <TablePagination pagination={pagination} total={total} />
      </div>
    </div>
  );
}
