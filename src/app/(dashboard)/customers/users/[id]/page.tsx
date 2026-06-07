import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, ChevronDown, ChevronLeft } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/customers/UserBadges";
import { UserProfileTabs } from "@/components/customers/UserProfileTabs";
import { getInitials } from "@/lib/utils";
import { KycStatus } from "@/lib/data/types";
import { getUserById } from "@/lib/data/users";
import {
  getCustomerAccount,
  getFreezeStatement,
  getUserCards,
  getUserTransactions,
} from "@/lib/data/customer";

export default async function UserDetailPage({
  params,
}: Readonly<{ params: Promise<{ id: string }> }>): Promise<React.ReactElement> {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    notFound();
  }

  const [account, cards, transactions] = await Promise.all([
    getCustomerAccount(user),
    getUserCards(),
    getUserTransactions(),
  ]);
  const freeze = getFreezeStatement();

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-6 py-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm" className="-ml-2 gap-1.5">
          <Link href="/customers/users">
            <ChevronLeft className="size-4" />
            Back
          </Link>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-1.5">
              More
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            <DropdownMenuItem>Edit details</DropdownMenuItem>
            <DropdownMenuItem>Reset password</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">
              Freeze account
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-xl border bg-card p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="size-16">
              <AvatarImage src={user.avatarUrl} alt={user.fullName} />
              <AvatarFallback className="text-lg">
                {getInitials(user.fullName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-display text-xl font-semibold tracking-tight">
                  {user.fullName}
                </h1>
                {user.kyc === KycStatus.Verified && (
                  <BadgeCheck className="size-5 text-success" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </div>
          <StatusBadge status={user.status} />
        </div>

        <div className="mt-6 border-t border-border pt-6">
          <Suspense fallback={null}>
            <UserProfileTabs
              user={user}
              account={account}
              freeze={freeze}
              cards={cards.data}
              cardsTotal={cards.total}
              transactions={transactions.data}
              transactionsTotal={transactions.total}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
