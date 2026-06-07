type PageHeaderProps = {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export function PageHeader({
  title,
  subtitle,
  children,
}: Readonly<PageHeaderProps>): React.ReactElement {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </header>
  );
}
