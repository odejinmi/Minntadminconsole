"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const GROUPS: { label: string; items: string[] }[] = [
  { label: "All Users", items: ["All Data set", "Phone numbers", "Emails"] },
  {
    label: "Individuals Only",
    items: ["All Data set", "Phone numbers", "Emails"],
  },
  {
    label: "Merchants Only",
    items: ["All Data set", "Phone numbers", "Emails"],
  },
  {
    label: "Campaign Metrics",
    items: ["All Data set", "Emails", "In-apps", "SMS"],
  },
];

export function MarketingExportMenu(): React.ReactElement {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="size-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {GROUPS.map((group) => (
          <DropdownMenuSub key={group.label}>
            <DropdownMenuSubTrigger>{group.label}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {group.items.map((item) => (
                <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
