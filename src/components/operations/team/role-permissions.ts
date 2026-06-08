/** Role name -> granted permissions, for the member badges in the manage modal. */
const ROLE_PERMISSIONS: Record<string, string[]> = {
  "Super Admin": [
    "users.manage",
    "finance.write",
    "secrets.manage",
    "roles.manage",
    "kyc.review",
    "apis.manage",
  ],
  "Finance Lead": [
    "finance.write",
    "payouts.approve",
    "reports.read",
    "ledger.read",
  ],
  Compliance: ["kyc.review", "disputes.manage", "users.read", "reports.read"],
  Support: ["users.read", "tickets.manage", "transactions.read"],
  Marketing: ["campaigns.manage", "rewards.manage", "users.read"],
  Engineer: ["apis.read", "logs.read", "metrics.read"],
};

export function getRolePermissions(roleName: string): string[] {
  return ROLE_PERMISSIONS[roleName] ?? [];
}
