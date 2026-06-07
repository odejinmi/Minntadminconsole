import {
  Clock,
  DollarSign,
  Globe,
  PlaneTakeoff,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/reusables/PageHeader";
import { ExportRefreshActions } from "@/components/reusables/ExportRefreshActions";
import { StatCard } from "@/components/dashboard/StatCard";
import { FlightBookingsTable } from "@/components/commerce/FlightBookingsTable";
import { getFlightStats, getFlightBookings } from "@/lib/data/flights";

const STAT_ICONS: Record<string, LucideIcon> = {
  flightsBooked: PlaneTakeoff,
  international: Globe,
  avgLeadTime: Clock,
  revenue: DollarSign,
};

export default async function FlightPage(): Promise<React.ReactElement> {
  const [stats, { data, total }] = await Promise.all([
    getFlightStats(),
    getFlightBookings(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <PageHeader
        title="Flight Bookings"
        subtitle="All flight tickets purchased through the Minnt app."
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

      <FlightBookingsTable bookings={data} total={total} />
    </div>
  );
}
