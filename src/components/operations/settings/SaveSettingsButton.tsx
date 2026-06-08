"use client";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function SaveSettingsButton(): React.ReactElement {
  return (
    <Button onClick={() => toast.success("Changes saved")}>Save changes</Button>
  );
}
