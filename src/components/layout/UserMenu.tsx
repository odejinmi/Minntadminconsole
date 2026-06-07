"use client";

import { ChevronRight, Plus, Settings, LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn, getInitials } from "@/lib/utils";

type UserMenuProps = {
  name: string;
  role: string;
  email: string;
  accountName: string;
  collapsed?: boolean;
  onLogout?: () => void;
};

export function UserMenu({
  name,
  role,
  email,
  accountName,
  collapsed = false,
  onLogout,
}: Readonly<UserMenuProps>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "flex w-full items-center gap-3 rounded-lg p-2 text-left outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-2 focus-visible:ring-ring",
          collapsed && "justify-center",
        )}
      >
        <Avatar className="size-8 rounded-lg">
          <AvatarFallback className="rounded-lg bg-foreground text-xs font-medium text-background">
            {getInitials(name)}
          </AvatarFallback>
        </Avatar>
        {!collapsed && (
          <>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-sidebar-foreground">
                {name}
              </span>
              <span className="block truncate text-xs text-muted-foreground">
                {role}
              </span>
            </span>
            <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
          </>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="top" className="w-64">
        <DropdownMenuLabel className="flex items-center gap-3 p-2">
          <Avatar className="size-9 rounded-lg">
            <AvatarFallback className="rounded-lg bg-foreground text-sm font-medium text-background">
              {getInitials(accountName)}
            </AvatarFallback>
          </Avatar>
          <span className="min-w-0">
            <span className="block truncate text-sm font-medium">
              {accountName}
            </span>
            <span className="block truncate text-xs font-normal text-muted-foreground">
              {email}
            </span>
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Plus className="size-4" />
          Add Account
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="size-4" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" onClick={onLogout}>
          <LogOut className="size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
