import { cn } from "@/lib/utils";

export function DetailRow({
  label,
  value,
  wide = false,
}: Readonly<{
  label: string;
  value: React.ReactNode;
  wide?: boolean;
}>): React.ReactElement {
  return (
    <div
      className={cn(
        "grid gap-4 py-2.5 text-sm",
        wide ? "grid-cols-[160px_1fr]" : "grid-cols-[130px_1fr]",
      )}
    >
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value || "—"}</dd>
    </div>
  );
}

export function DetailSection({
  title,
  children,
  divided = true,
}: Readonly<{
  title: string;
  children: React.ReactNode;
  divided?: boolean;
}>): React.ReactElement {
  return (
    <div className="space-y-1">
      <h3 className="font-display text-base font-semibold tracking-tight">
        {title}
      </h3>
      <dl className={cn(divided && "divide-y divide-border/60")}>{children}</dl>
    </div>
  );
}
