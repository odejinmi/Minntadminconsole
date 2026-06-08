import {
  AuditSeverity,
  TeamMemberStatus,
  TeamSegment,
  type AuditLogEntry,
  type Metric,
  type Paginated,
  type Role,
  type TeamMember,
} from "./types";

const RECENT = "2 mins ago";
const DASH = "-";
const AUDIT_IP = "102.89.45.12";
const AUDIT_TIME = "2026-05-26 14:32";

function delay<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

/** Every permission a role can grant, in display order. */
export const ALL_PERMISSIONS: string[] = [
  "users.manage",
  "users.read",
  "kyc.review",
  "disputes.manage",
  "finance.write",
  "payouts.approve",
  "ledger.read",
  "reports.read",
  "secrets.manage",
  "roles.manage",
  "apis.manage",
  "apis.read",
  "logs.read",
  "metrics.read",
  "tickets.manage",
  "transactions.read",
  "campaigns.manage",
  "rewards.manage",
];

const plain = (id: string, label: string, value: string): Metric => ({
  id,
  label,
  value,
});

export function getTeamStats(): Promise<Metric[]> {
  return delay([
    plain("totalMembers", "Total Members", "62"),
    plain("activeMembers", "Active Members", "62"),
    plain("roles", "Roles", "10"),
    plain("pendingInvites", "Pending Invites", "3"),
  ]);
}

const member = (
  id: string,
  name: string,
  email: string,
  role: string,
  status: TeamMemberStatus,
  twoFactor = true,
): TeamMember => ({
  id,
  name,
  email,
  role,
  lastActive: status === TeamMemberStatus.Invited ? DASH : RECENT,
  status,
  twoFactor,
});

const members: TeamMember[] = [
  member("TM-001", "John Doe", "john@minnt.com", "Super Admin", TeamMemberStatus.Active),
  member("TM-002", "Adaeze Okafor", "mike@minnt.com", "Support", TeamMemberStatus.Active),
  member("TM-003", "Sarah Alabi", "sarah@minnt.com", "Analyst", TeamMemberStatus.Active),
  member("TM-004", "Wale Cole", "wale@minnt.com", "Sales", TeamMemberStatus.Inactive, false),
  member("TM-005", "Wale Cole", "wale@minnt.com", "Sales", TeamMemberStatus.Invited, false),
  member("TM-006", "Tunde Ojo", "tunde@minnt.com", "Finance Lead", TeamMemberStatus.Active),
  member("TM-007", "Ada Eze", "ada@minnt.com", "Compliance", TeamMemberStatus.Active),
  member("TM-008", "Bola Smith", "bola@minnt.com", "Marketing", TeamMemberStatus.Active),
  member("TM-009", "Chidi Okeke", "chidi@minnt.com", "Engineer", TeamMemberStatus.Active),
  member("TM-010", "Ngozi Ali", "ngozi@minnt.com", "Support", TeamMemberStatus.Inactive, false),
];

export function getTeamMembers(): Promise<Paginated<TeamMember>> {
  return delay({ data: members, total: 97 });
}

const role = (
  id: string,
  name: string,
  description: string,
  memberCount: number,
  permissions: string[],
): Role => ({ id, name, description, memberCount, permissions });

const roles: Role[] = [
  role("super-admin", "Super Admin", "Full system access · billing & secrets", 2, [
    "users.manage",
    "finance.write",
    "secrets.manage",
    "kyc.review",
    "roles.manage",
    "apis.manage",
  ]),
  role("finance-lead", "Finance Lead", "Treasury, payouts & settlement", 4, [
    "finance.write",
    "payouts.approve",
    "reports.read",
    "ledger.read",
  ]),
  role("compliance", "Compliance", "KYC, AML & dispute oversight", 6, [
    "kyc.review",
    "disputes.manage",
    "users.read",
    "reports.read",
  ]),
  role("support", "Support", "User assistance & ticket triage", 12, [
    "users.read",
    "tickets.manage",
    "transactions.read",
  ]),
  role("marketing", "Marketing", "Campaigns, rewards & content", 5, [
    "campaigns.manage",
    "rewards.manage",
    "users.read",
  ]),
  role("engineer", "Engineer", "Read-only platform + APIs sandbox", 8, [
    "apis.read",
    "logs.read",
    "metrics.read",
  ]),
];

export function getRoles(): Promise<Role[]> {
  return delay(roles);
}

const log = (
  actorName: string,
  actorEmail: string,
  action: string,
  severity: AuditSeverity,
  category: TeamSegment,
): AuditLogEntry => ({
  id: "TM-001",
  actorName,
  actorEmail,
  action,
  target: DASH,
  ip: AUDIT_IP,
  time: AUDIT_TIME,
  severity,
  category,
});

const auditLogs: AuditLogEntry[] = [
  log("Adaeze Okafor", "adaeze@minnt.com", "Role permissions updated", AuditSeverity.Info, TeamSegment.Roles),
  log("Tunde Ojo", "tunde@minnt.com", "Password reset sent", AuditSeverity.Warning, TeamSegment.Members),
  log("Tunde Ojo", "tunde@minnt.com", "Member removed", AuditSeverity.Critical, TeamSegment.Members),
  log("Adaeze Okafor", "adaeze@minnt.com", "New role created", AuditSeverity.Info, TeamSegment.Roles),
  log("Adaeze Okafor", "adaeze@minnt.com", "KYC batch approved", AuditSeverity.Info, TeamSegment.Members),
  log("John Doe", "john@minnt.com", "Member invited", AuditSeverity.Info, TeamSegment.Members),
  log("Sarah Alabi", "sarah@minnt.com", "Permission revoked", AuditSeverity.Warning, TeamSegment.Roles),
  log("Bola Smith", "bola@minnt.com", "Failed login attempt", AuditSeverity.Critical, TeamSegment.Members),
];

export function getAuditLogs(): Promise<Paginated<AuditLogEntry>> {
  return delay({ data: auditLogs, total: 97 });
}
