import { ConfigureFeesTable } from "@/components/manage-fees/ConfigureFeesTable";
import { getFeeConfigs } from "@/lib/data/manage-fees";

export default async function ConfigureFeesPage(): Promise<React.ReactElement> {
  const { records, total } = await getFeeConfigs();

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <header className="space-y-1">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Configure system fees
        </h1>
        <p className="text-sm text-muted-foreground">
          Adjust fees, discounts and toggle availability per service.
        </p>
      </header>

      <ConfigureFeesTable records={records} total={total} />
    </div>
  );
}
