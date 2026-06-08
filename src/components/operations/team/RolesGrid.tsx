"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/reusables/SectionHeader";
import { type Role } from "@/lib/data/types";
import { RoleCard } from "./RoleCard";
import { CreateRoleModal } from "./CreateRoleModal";
import { RoleDetailModal } from "./RoleDetailModal";

type RolesGridProps = {
  roles: Role[];
};

export function RolesGrid({ roles }: Readonly<RolesGridProps>): React.ReactElement {
  const [createOpen, setCreateOpen] = useState(false);
  const [active, setActive] = useState<Role | null>(null);

  return (
    <div className="rounded-xl border bg-card p-5">
      <SectionHeader
        title="Roles & permissions"
        subtitle="Define what each role can do across the platform"
      >
        <Button
          variant="outline"
          className="gap-1.5"
          onClick={() => setCreateOpen(true)}
        >
          <Plus className="size-4" />
          New role
        </Button>
      </SectionHeader>

      <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {roles.map((role) => (
          <RoleCard key={role.id} role={role} onOpen={setActive} />
        ))}
      </div>

      <CreateRoleModal open={createOpen} onOpenChange={setCreateOpen} />
      <RoleDetailModal
        role={active}
        onOpenChange={(open) => {
          if (!open) setActive(null);
        }}
      />
    </div>
  );
}
