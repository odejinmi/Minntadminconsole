export function KeyValueRow({
  label,
  value,
}: Readonly<{ label: string; value: string }>): React.ReactElement {
  return (
    <div className="flex items-start justify-between gap-6 py-2 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium text-foreground">{value}</span>
    </div>
  );
}
