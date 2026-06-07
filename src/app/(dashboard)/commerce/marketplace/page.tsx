import {
  ClipboardList,
  DollarSign,
  Package,
  Store,
  type LucideIcon,
} from "lucide-react";
import { PageHeader } from "@/components/reusables/PageHeader";
import { ExportRefreshActions } from "@/components/reusables/ExportRefreshActions";
import { StatCard } from "@/components/dashboard/StatCard";
import { VendorsTable } from "@/components/commerce/VendorsTable";
import { getMarketplaceStats, getVendors } from "@/lib/data/marketplace";

const STAT_ICONS: Record<string, LucideIcon> = {
  activeVendors: Store,
  productsListed: Package,
  orders: ClipboardList,
  commission: DollarSign,
};

export default async function MarketplacePage(): Promise<React.ReactElement> {
  const [stats, { data, total }] = await Promise.all([
    getMarketplaceStats(),
    getVendors(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <PageHeader
        title="Marketplace"
        subtitle="Vendors, products, orders and commission tracking."
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

      <VendorsTable vendors={data} total={total} />
    </div>
  );
}
