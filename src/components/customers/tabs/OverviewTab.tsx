import { formatDate } from "@/lib/format";
import { UserStatus, type FreezeStatement, type User } from "@/lib/data/types";
import { DetailRow, DetailSection } from "../DetailList";

type OverviewTabProps = {
  user: User;
  freeze: FreezeStatement;
};

function FrozenStatement({
  freeze,
}: Readonly<{ freeze: FreezeStatement }>): React.ReactElement {
  return (
    <div className="space-y-3">
      <h3 className="font-display text-base font-semibold tracking-tight">
        Statement
      </h3>
      <p className="rounded-xl border bg-muted/30 p-4 text-sm leading-relaxed text-muted-foreground">
        {freeze.message}
      </p>
      <div className="space-y-0.5">
        <p className="text-sm text-muted-foreground">Logged by</p>
        <p className="text-sm font-medium text-foreground">
          {freeze.loggedBy.name} - {freeze.loggedBy.role}
        </p>
        <p className="text-sm text-muted-foreground">{freeze.loggedBy.email}</p>
      </div>
    </div>
  );
}

export function OverviewTab({
  user,
  freeze,
}: Readonly<OverviewTabProps>): React.ReactElement {
  const isFrozen = user.status === UserStatus.Frozen;

  return (
    <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
      <div className="space-y-8">
        <DetailSection title="Status">
          <DetailRow label="KYC" value={user.tier} />
          <DetailRow label="Account Type" value={user.type} />
          <DetailRow label="Account Status" value={user.status} />
          <DetailRow label="Created At" value={formatDate(user.joinedAt)} />
        </DetailSection>

        <DetailSection title="Customer Details">
          <DetailRow label="ID" value={user.id} />
          <DetailRow label="Full name" value={user.fullName} />
          <DetailRow label="Other name" value={user.otherName} />
          <DetailRow label="User name" value={user.username} />
          <DetailRow label="DOB" value={formatDate(user.dob)} />
          <DetailRow label="Email" value={user.email} />
          <DetailRow label="Country" value={user.country} />
        </DetailSection>
      </div>

      <div className="space-y-10">
        <DetailSection title="Billing Address">
          <DetailRow label="Address Line" value={user.billing.addressLine} />
          <DetailRow label="City" value={user.billing.city} />
          <DetailRow label="State" value={user.billing.state} />
          <DetailRow label="Postal Code" value={user.billing.postalCode} />
        </DetailSection>

        {isFrozen && <FrozenStatement freeze={freeze} />}
      </div>
    </div>
  );
}
