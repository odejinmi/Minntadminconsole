import { Clock, DollarSign, ReceiptText, type LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/reusables/PageHeader";
import { ExportRefreshActions } from "@/components/reusables/ExportRefreshActions";
import { StatCard } from "@/components/dashboard/StatCard";
import { InvoicesTable } from "@/components/commerce/InvoicesTable";
import { getInvoiceStats, getInvoices } from "@/lib/data/invoices";

const STAT_ICONS: Record<string, LucideIcon> = {
  totalIssued: ReceiptText,
  pending: Clock,
  paid: DollarSign,
};

export default async function InvoicePage(): Promise<React.ReactElement> {
  const [stats, { data, total }] = await Promise.all([
    getInvoiceStats(),
    getInvoices(),
  ]);

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <PageHeader
        title="Invoice"
        subtitle="Track invoices issued by merchants"
      >
        <ExportRefreshActions />
      </PageHeader>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((metric) => (
          <StatCard
            key={metric.id}
            metric={metric}
            icon={STAT_ICONS[metric.id] ?? DollarSign}
          />
        ))}
      </section>

      <InvoicesTable invoices={data} total={total} />
    </div>
  );
}
