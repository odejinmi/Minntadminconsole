type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export function SectionHeader({
  title,
  subtitle,
  children,
}: Readonly<SectionHeaderProps>): React.ReactElement {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="space-y-1">
        <h2 className="font-display text-lg font-semibold tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {children && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {children}
        </div>
      )}
    </div>
  );
}
