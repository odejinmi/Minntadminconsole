import {
  LayoutGrid,
  Users,
  ArrowRightLeft,
  ReceiptText,
  Store,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href: string;
};

export type NavGroup = {
  label: string;
  icon: LucideIcon;
  href?: string;
  items?: NavItem[];
};

export const nav: NavGroup[] = [
  { label: "Overview", icon: LayoutGrid, href: "/overview" },
  {
    label: "Customers",
    icon: Users,
    items: [
      { label: "Users", href: "/customers/users" },
      { label: "KYC & Compliance", href: "/customers/kyc" },
      { label: "Disputes", href: "/customers/disputes" },
      { label: "Refunds", href: "/customers/refunds" },
    ],
  },
  {
    label: "Money Movement",
    icon: ArrowRightLeft,
    items: [
      { label: "Transactions", href: "/money-movement/transactions" },
      { label: "Bill Payments", href: "/money-movement/bill-payments" },
      { label: "Currency Swap", href: "/money-movement/currency-swap" },
      { label: "Cards", href: "/money-movement/cards" },
      { label: "Payments", href: "/money-movement/payments" },
      { label: "Fees", href: "/money-movement/fees" },
    ],
  },
  {
    label: "Manage Fees",
    icon: ReceiptText,
    items: [
      { label: "Bill payment", href: "/manage-fees/bill-payment" },
      { label: "Other Fees", href: "/manage-fees/other-fees" },
    ],
  },
  {
    label: "Commerce",
    icon: Store,
    items: [
      { label: "Rewards", href: "/commerce/rewards" },
      { label: "Invoice", href: "/commerce/invoice" },
      { label: "Marketplace", href: "/commerce/marketplace" },
      { label: "Flight", href: "/commerce/flight" },
      { label: "Event", href: "/commerce/event" },
    ],
  },
  {
    label: "Operations",
    icon: Briefcase,
    items: [
      { label: "Command Center", href: "/operations/command-center" },
      { label: "Finance", href: "/operations/finance" },
      { label: "Marketing", href: "/operations/marketing" },
      { label: "APIs", href: "/operations/apis" },
      { label: "Maintenance", href: "/operations/maintenance" },
    ],
  },
];
