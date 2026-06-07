"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { EventTicket } from "@/lib/data/types";
import { usePagination } from "@/hooks/usePagination";
import { StatusPill } from "@/components/reusables/StatusPill";
import { SectionHeader } from "@/components/reusables/SectionHeader";
import { FilterDateActions } from "@/components/reusables/FilterDateActions";
import { TablePagination } from "@/components/customers/TablePagination";

const HEAD_CLASS = "text-xs font-medium text-muted-foreground uppercase";

type EventTicketsTableProps = {
  tickets: EventTicket[];
  total: number;
};

export function EventTicketsTable({
  tickets,
  total,
}: Readonly<EventTicketsTableProps>): React.ReactElement {
  const pagination = usePagination(tickets, total);

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Recent ticket sales"
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
              <TableHead className={HEAD_CLASS}>Event</TableHead>
              <TableHead className={HEAD_CLASS}>Qty</TableHead>
              <TableHead className={HEAD_CLASS}>Amount</TableHead>
              <TableHead className={`px-4 ${HEAD_CLASS}`}>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pagination.pageRows.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell className="px-4 py-3 text-sm font-medium">
                  {ticket.id}
                </TableCell>
                <TableCell className="text-sm">{ticket.customer}</TableCell>
                <TableCell className="text-sm">{ticket.event}</TableCell>
                <TableCell className="text-sm">{ticket.qty}</TableCell>
                <TableCell className="text-sm">{ticket.amountLabel}</TableCell>
                <TableCell className="px-4">
                  <StatusPill status={ticket.status} />
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
