"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
  CardRecord,
  CustomerAccount,
  FreezeStatement,
  TransactionRecord,
  User,
} from "@/lib/data/types";
import { OverviewTab } from "./tabs/OverviewTab";
import { AccountTab } from "./tabs/AccountTab";
import { CardsTab } from "./tabs/CardsTab";
import { TransactionsTab } from "./tabs/TransactionsTab";

const TABS = ["overview", "account", "card", "transactions"] as const;
type TabKey = (typeof TABS)[number];

const TRIGGER_CLASS =
  "h-[31px] rounded-[10px] px-2.5 py-2 data-[state=active]:bg-brand data-[state=active]:text-brand-foreground group-data-[variant=default]/tabs-list:data-[state=active]:shadow-[0px_1px_4px_rgba(0,0,0,0.1)]";

function isTabKey(value: string | null): value is TabKey {
  return value !== null && (TABS as readonly string[]).includes(value);
}

type UserProfileTabsProps = {
  user: User;
  account: CustomerAccount;
  freeze: FreezeStatement;
  cards: CardRecord[];
  cardsTotal: number;
  transactions: TransactionRecord[];
  transactionsTotal: number;
};

export function UserProfileTabs({
  user,
  account,
  freeze,
  cards,
  cardsTotal,
  transactions,
  transactionsTotal,
}: Readonly<UserProfileTabsProps>): React.ReactElement {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const tabParam = searchParams.get("tab");
  const activeTab: TabKey = isTabKey(tabParam) ? tabParam : "overview";

  const handleTabChange = (value: string): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="gap-6">
      <TabsList className="h-10 gap-[3px] rounded-[14px] border border-[#F3F4F6] bg-[#FCFCFC] p-[5px] group-data-[orientation=horizontal]/tabs:h-10">

        <TabsTrigger value="overview" className={TRIGGER_CLASS}>
          Overview
        </TabsTrigger>
        <TabsTrigger value="account" className={TRIGGER_CLASS}>
          Account
        </TabsTrigger>
        <TabsTrigger value="card" className={TRIGGER_CLASS}>
          Card
        </TabsTrigger>
        <TabsTrigger value="transactions" className={TRIGGER_CLASS}>
          Transactions
        </TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <OverviewTab user={user} freeze={freeze} />
      </TabsContent>
      <TabsContent value="account">
        <AccountTab account={account} user={user} />
      </TabsContent>
      <TabsContent value="card">
        <CardsTab cards={cards} total={cardsTotal} userName={user.fullName} />
      </TabsContent>
      <TabsContent value="transactions">
        <TransactionsTab
          transactions={transactions}
          total={transactionsTotal}
        />
      </TabsContent>
    </Tabs>
  );
}
