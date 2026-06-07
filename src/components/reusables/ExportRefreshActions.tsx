"use client";

import { Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

/** The recurring "Export" + green "Refresh" header action pair. */
export function ExportRefreshActions(): React.ReactElement {
  return (
    <>
      <Button variant="outline" className="gap-2">
        <Download className="size-4" />
        Export
      </Button>
      <Button className="gap-2">
        <RefreshCw className="size-4" />
        Refresh
      </Button>
    </>
  );
}
