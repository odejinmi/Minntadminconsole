"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, PanelLeft } from "lucide-react";
import { nav, type NavGroup } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { UserMenu } from "./UserMenu";

function isGroupActive(group: NavGroup, pathname: string): boolean {
  if (group.href && pathname.startsWith(group.href)) return true;
  return !!group.items?.some((item) => pathname.startsWith(item.href));
}

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(nav.map((g) => [g.label, isGroupActive(g, pathname)])),
  );

  const toggleGroup = (label: string) =>
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <aside
      className={cn(
        "flex h-dvh flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div
        className={cn(
          "flex h-16 items-center gap-2 px-4",
          collapsed && "justify-center px-0",
        )}
      >
        {collapsed ? (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            aria-label="Expand sidebar"
            className="group relative grid size-9 place-items-center rounded-md transition-colors hover:bg-sidebar-accent"
          >
            <Logo markOnly className="group-hover:opacity-0" />
            <PanelLeft className="absolute size-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </button>
        ) : (
          <>
            <Logo />
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              aria-label="Collapse sidebar"
              className="ml-auto grid size-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground"
            >
              <PanelLeft className="size-4" />
            </button>
          </>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-2">
        <ul className="space-y-1">
          {nav.map((group) => {
            const Icon = group.icon;
            const active = isGroupActive(group, pathname);
            const open = openGroups[group.label];

            // Leaf group (e.g. Overview)
            if (group.href && !group.items) {
              const leafActive = pathname.startsWith(group.href);
              return (
                <li key={group.label}>
                  <Link
                    href={group.href}
                    title={collapsed ? group.label : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      collapsed && "justify-center px-0",
                      leafActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent",
                    )}
                  >
                    <Icon
                      className={cn(
                        "size-4 shrink-0",
                        leafActive && "text-green-700",
                      )}
                    />
                    {!collapsed && group.label}
                  </Link>
                </li>
              );
            }

            // Expandable group
            return (
              <li key={group.label}>
                <button
                  type="button"
                  onClick={() => toggleGroup(group.label)}
                  title={collapsed ? group.label : undefined}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    collapsed && "justify-center px-0",
                    active
                      ? "text-sidebar-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent",
                  )}
                >
                  <Icon
                    className={cn(
                      "size-4 shrink-0",
                      active && "text-green-700",
                    )}
                  />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-left">{group.label}</span>
                      <ChevronDown
                        className={cn(
                          "size-4 shrink-0 text-muted-foreground transition-transform",
                          open && "rotate-180",
                        )}
                      />
                    </>
                  )}
                </button>

                {!collapsed && group.items && (
                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] duration-200 ease-in-out",
                      open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div
                      className="overflow-hidden"
                      {...(!open && { inert: true })}
                    >
                      <ul className="relative mt-1 ml-5 space-y-0.5 border-l border-sidebar-border pl-4">
                        {group.items.map((item) => {
                          const itemActive = pathname.startsWith(item.href);
                          return (
                            <li key={item.href}>
                              <Link
                                href={item.href}
                                className={cn(
                                  "relative flex items-center rounded-md py-2 pl-3 text-sm transition-colors",
                                  itemActive
                                    ? "font-medium text-green-700 before:absolute before:-left-4 before:top-1 before:bottom-1 before:w-0.5 before:rounded-full before:bg-green-600"
                                    : "text-muted-foreground hover:text-sidebar-foreground",
                                )}
                              >
                                {item.label}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border p-3">
        <UserMenu
          name="Akanji Joseph"
          role="Super Admin"
          accountName="Acme"
          email="acme@email.com"
          collapsed={collapsed}
        />
      </div>
    </aside>
  );
}
