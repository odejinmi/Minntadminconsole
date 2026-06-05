import { cn } from "@/lib/utils";

type BalanceCardProps = {
  label: string;
  /** Numeric amount, e.g. 300050 */
  amount: number;
  /** Currency symbol, e.g. "₦" or "$" */
  currency?: string;
  status?: string;
  /** Render with the brand-green highlight border (selected/primary balance). */
  highlighted?: boolean;
  className?: string;
};

function formatAmount(amount: number) {
  const [whole, fraction = "00"] = amount.toFixed(2).split(".");
  return {
    whole: whole.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
    fraction,
  };
}

export function BalanceCard({
  label,
  amount,
  currency = "₦",
  status = "Active",
  highlighted = false,
  className,
}: BalanceCardProps) {
  const { whole, fraction } = formatAmount(amount);

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-xl border bg-card px-5 py-4 transition-colors",
        highlighted ? "border-primary ring-1 ring-primary" : "border-border",
        className,
      )}
    >
      <div className="min-w-0">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="mt-1 font-display text-2xl font-semibold tracking-tight text-foreground">
          <span className="align-top text-base font-medium text-muted-foreground">
            {currency}
          </span>
          {whole}
          <span className="text-base font-medium text-muted-foreground">
            .{fraction}
          </span>
        </p>
      </div>
      <span className="shrink-0 rounded-full bg-success-muted px-3 py-1 text-xs font-medium text-success">
        {status}
      </span>
    </div>
  );
}
