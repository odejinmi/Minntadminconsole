import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  AccountType,
  DisputeStatus,
  KycReviewStatus,
  KycStatus,
  TransactionStatus,
  UserStatus,
} from "@/lib/data/types";

const STATUS_STYLES: Record<UserStatus, string> = {
  [UserStatus.Active]: "bg-success-muted text-success",
  [UserStatus.Inactive]: "bg-muted text-muted-foreground",
  [UserStatus.Frozen]: "bg-danger-muted text-danger",
};

const KYC_STYLES: Record<KycStatus, string> = {
  [KycStatus.Verified]: "bg-success-muted text-success",
  [KycStatus.Pending]: "bg-warning-muted text-warning",
  [KycStatus.Rejected]: "bg-danger-muted text-danger",
};

export function StatusBadge({
  status,
}: Readonly<{ status: UserStatus }>): React.ReactElement {
  return (
    <Badge className={cn("border-transparent", STATUS_STYLES[status])}>
      {status}
    </Badge>
  );
}

export function KycBadge({
  kyc,
}: Readonly<{ kyc: KycStatus }>): React.ReactElement {
  return (
    <Badge className={cn("border-transparent", KYC_STYLES[kyc])}>{kyc}</Badge>
  );
}

export function TypeBadge({
  type,
}: Readonly<{ type: AccountType }>): React.ReactElement {
  return <Badge variant="outline">{type}</Badge>;
}

const OUTLINE_STATUS_STYLES: Record<UserStatus, string> = {
  [UserStatus.Active]: "border-success/50 text-success",
  [UserStatus.Inactive]: "border-border text-muted-foreground",
  [UserStatus.Frozen]: "border-danger/50 text-danger",
};

const TRANSACTION_STYLES: Record<TransactionStatus, string> = {
  [TransactionStatus.Success]: "border-success/50 text-success",
  [TransactionStatus.Pending]: "border-warning/60 text-warning",
  [TransactionStatus.Failed]: "border-danger/50 text-danger",
};

export function CardStatusBadge({
  status,
}: Readonly<{ status: UserStatus }>): React.ReactElement {
  return (
    <Badge className={cn("bg-transparent", OUTLINE_STATUS_STYLES[status])}>
      {status}
    </Badge>
  );
}

export function TransactionStatusBadge({
  status,
}: Readonly<{ status: TransactionStatus }>): React.ReactElement {
  return (
    <Badge className={cn("bg-transparent", TRANSACTION_STYLES[status])}>
      {status}
    </Badge>
  );
}

const KYC_REVIEW_STYLES: Record<KycReviewStatus, string> = {
  [KycReviewStatus.Pending]: "border-warning/60 text-warning",
  [KycReviewStatus.Success]: "border-success/50 text-success",
  [KycReviewStatus.Rejected]: "border-danger/50 text-danger",
};

const DISPUTE_STYLES: Record<DisputeStatus, string> = {
  [DisputeStatus.Pending]: "border-warning/60 text-warning",
  [DisputeStatus.Resolved]: "border-success/50 text-success",
};

export function KycTypeBadge({
  label,
}: Readonly<{ label: string }>): React.ReactElement {
  return (
    <Badge className="border-success/50 bg-transparent text-success">
      {label}
    </Badge>
  );
}

export function KycReviewStatusBadge({
  status,
}: Readonly<{ status: KycReviewStatus }>): React.ReactElement {
  return (
    <Badge className={cn("bg-transparent", KYC_REVIEW_STYLES[status])}>
      {status}
    </Badge>
  );
}

export function DisputeStatusBadge({
  status,
}: Readonly<{ status: DisputeStatus }>): React.ReactElement {
  return (
    <Badge className={cn("bg-transparent", DISPUTE_STYLES[status])}>
      {status}
    </Badge>
  );
}
