"use client";

import { Search } from "lucide-react";

type TableToolbarProps = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  children?: React.ReactNode;
};

export function TableToolbar({
  value,
  onValueChange,
  placeholder = "Search",
  children,
}: Readonly<TableToolbarProps>): React.ReactElement {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          placeholder={placeholder}
          aria-label={placeholder}
          className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
