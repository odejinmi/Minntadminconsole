import { cn } from "@/lib/utils";
import { UserStatus } from "@/lib/data/types";

type BalanceCardProps = {
  label: string;
  /** Numeric amount, e.g. 300050 */
  amount: number;
  /** Currency symbol, e.g. "₦" or "$" */
  currency?: string;
  status?: UserStatus;
  /** Render with the brand-green highlight border (selected/primary balance). */
  highlighted?: boolean;
  className?: string;
};

const STATUS_PILL: Record<UserStatus, string> = {
  [UserStatus.Active]: "bg-success-muted text-success",
  [UserStatus.Inactive]: "bg-muted text-muted-foreground",
  [UserStatus.Frozen]: "bg-danger-muted text-danger",
};

function formatAmount(amount: number): { whole: string; fraction: string } {
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
  status = UserStatus.Active,
  highlighted = false,
  className,
}: Readonly<BalanceCardProps>): React.ReactElement {
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
      <span
        className={cn(
          "shrink-0 rounded-full px-3 py-1 text-xs font-medium",
          STATUS_PILL[status],
        )}
      >
        {status}
      </span>
    </div>
  );
}
