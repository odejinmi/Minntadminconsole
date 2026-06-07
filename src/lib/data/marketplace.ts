import {
  UserStatus,
  type Metric,
  type Paginated,
  type Vendor,
} from "./types";

const COMPARISON_WEEK = "vs last week";

function delay<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

export function getMarketplaceStats(): Promise<Metric[]> {
  return delay([
    {
      id: "activeVendors",
      label: "Active vendors",
      value: "1,284",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "productsListed",
      label: "Products listed",
      value: "18,402",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "orders",
      label: "Orders 24h",
      value: "2,184",
      delta: 12.4,
      trend: "down",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "commission",
      label: "Commission 24h",
      value: "₦4.8M",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
  ]);
}

const vendor = (name: string, category: string): Vendor => ({
  id: name,
  name,
  category,
  orders: "482",
  gmvLabel: "₦12.4M",
  commissionLabel: "₦620K",
  status: UserStatus.Active,
});

const vendors: Vendor[] = [
  vendor("GlowSkin", "Beauty"),
  vendor("Lagos Foods", "Groceries"),
  vendor("TechHub NG", "Electronics"),
  vendor("Naija Wears", "Fashion"),
  vendor("BookNook", "Books"),
  vendor("HomeBase", "Home"),
];

export function getVendors(): Promise<Paginated<Vendor>> {
  return delay({ data: vendors, total: 97 });
}
