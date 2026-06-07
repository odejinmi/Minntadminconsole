import {
  Calendar,
  DollarSign,
  Tag,
  Ticket,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/reusables/PageHeader";
import { ExportRefreshActions } from "@/components/reusables/ExportRefreshActions";
import { StatCard } from "@/components/dashboard/StatCard";
import { EventTicketsTable } from "@/components/commerce/EventTicketsTable";
import { getEventStats, getEventTickets } from "@/lib/data/events";

const STAT_ICONS: Record<string, LucideIcon> = {
  ticketsSold: Ticket,
  activeEvents: Calendar,
  topCategory: Tag,
  revenue: DollarSign,
};

export default async function EventPage(): Promise<React.ReactElement> {
  const [stats, { data, total }] = await Promise.all([
    getEventStats(),
    getEventTickets(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <PageHeader
        title="Event Tickets"
        subtitle="Concerts, festivals and live events sold via Minnt."
      >
        <ExportRefreshActions />
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((metric) => (
          <StatCard
            key={metric.id}
            metric={metric}
            icon={STAT_ICONS[metric.id] ?? DollarSign}
          />
        ))}
      </section>

      <EventTicketsTable tickets={data} total={total} />
    </div>
  );
}
