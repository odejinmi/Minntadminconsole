import { Suspense } from "react";
import { PageHeader } from "@/components/reusables/PageHeader";
import { AuditLogsView } from "@/components/operations/audit/AuditLogsView";
import { getAuditLogs } from "@/lib/data/team";

export default async function AuditLogsPage(): Promise<React.ReactElement> {
  const logs = await getAuditLogs();

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <PageHeader
        title="Audit Logs"
        subtitle="Platform access and admin activity history."
      />

      <Suspense fallback={null}>
        <AuditLogsView logs={logs.data} total={logs.total} />
      </Suspense>
    </div>
  );
}
