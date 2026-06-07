"use client";

import { CalendarDays, ListFilter } from "lucide-react";
import { Button } from "@/components/ui/button";

/** The recurring "Filters" + "Date Range" outline button pair. */
export function FilterDateActions(): React.ReactElement {
  return (
    <>
      <Button variant="outline" size="sm" className="gap-2">
        <ListFilter className="size-4" />
        Filters
      </Button>
      <Button variant="outline" size="sm" className="gap-2">
        <CalendarDays className="size-4" />
        Date Range
      </Button>
    </>
  );
}
