"use client";

import { Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar(): React.ReactElement {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b border-border bg-background px-6">
      <div className="relative max-w-md flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Search"
          aria-label="Search"
          className="h-9 w-full rounded-lg border border-border bg-muted/40 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      </div>

      <Button
        variant="ghost"
        size="icon"
        aria-label="Notifications"
        className="ml-auto text-muted-foreground"
      >
        <Bell className="size-5" />
      </Button>
    </header>
  );
}
