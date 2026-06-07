import {
  UserStatus,
  type Metric,
  type Paginated,
  type VirtualCard,
} from "./types";

const COMPARISON_WEEK = "vs last week";

function delay<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

export function getVirtualCardStats(): Promise<Metric[]> {
  return delay([
    {
      id: "spend",
      label: "Spend (24h)",
      value: "$182K",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "frozen",
      label: "Frozen",
      value: "184",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "activeCards",
      label: "Active Cards",
      value: "14,820",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "declineRate",
      label: "Decline rate",
      value: "2.4%",
      delta: 12.4,
      trend: "down",
      comparison: COMPARISON_WEEK,
    },
  ]);
}

const card = (
  brand: string,
  last4: string,
  holder: string,
  balanceLabel: string,
  spendLabel: string,
  status: UserStatus,
): VirtualCard => ({
  id: `${brand}-${last4}`,
  brand,
  last4,
  holder,
  currency: "USD",
  balanceLabel,
  spendLabel,
  status,
});

const cards: VirtualCard[] = [
  card("Visa", "4429", "Chinedu Eze", "2,840 USD", "1,240 USD", UserStatus.Active),
  card("Visa", "9920", "Grace Williams", "4,120 USD", "0 USD", UserStatus.Frozen),
  card("Mastercard", "1108", "Aisha Bello", "540 USD", "320 USD", UserStatus.Active),
  card("Mastercard", "7745", "Fatima Yusuf", "1,280 USD", "890 USD", UserStatus.Frozen),
  card("Visa", "3361", "Emeka Nwosu", "3,900 USD", "2,150 USD", UserStatus.Active),
  card("Mastercard", "2204", "Ngozi Okeke", "760 USD", "410 USD", UserStatus.Active),
];

export function getVirtualCards(): Promise<Paginated<VirtualCard>> {
  return delay({ data: cards, total: 97 });
}
