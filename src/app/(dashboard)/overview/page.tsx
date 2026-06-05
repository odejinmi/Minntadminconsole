import { BalanceCard } from "@/components/dashboard/BalanceCard";

export default function OverviewPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-6 py-8">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, Akanji. Here is your account summary.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">Balances</h2>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <BalanceCard label="Naira Balance" amount={300050} currency="₦" highlighted />
          <BalanceCard label="Reward Balance" amount={22000} currency="₦" />
          <BalanceCard label="Card Balance" amount={0} currency="$" />
          <BalanceCard label="USD Balance" amount={950} currency="$" />
        </div>
      </section>
    </div>
  );
}
