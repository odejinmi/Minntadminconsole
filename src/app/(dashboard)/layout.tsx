import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-dvh overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-muted/30">{children}</main>
    </div>
  );
}
