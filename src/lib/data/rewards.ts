import {
  TransactionStatus,
  type Metric,
  type Paginated,
  type RewardRecord,
} from "./types";

const COMPARISON_WEEK = "vs last week";
const REWARD_DATE = "Mar 8, 2026 2:34 PM";

function delay<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

const up = (id: string, label: string, value: string): Metric => ({
  id,
  label,
  value,
  delta: 12.4,
  trend: "up",
  comparison: COMPARISON_WEEK,
});

export function getRewardStats(): Promise<Metric[]> {
  return delay([
    up("activeMembers", "Active Members", "42,108"),
    up("rewardsIssued", "Total Rewards Issued", "8.2M"),
    up("cashbackPaid", "Cashback paid", "₦18.4M"),
  ]);
}

const reward = (status: TransactionStatus): RewardRecord => ({
  id: "txn_8f3a9d2c4b1e",
  userName: "Esther Uzo",
  userEmail: "estheruzo@gmail.com",
  amountLabel: "₦500.00",
  paymentType: "Reward",
  status,
  date: REWARD_DATE,
});

const rewards: RewardRecord[] = Array.from({ length: 12 }, () =>
  reward(TransactionStatus.Success),
);

export function getRewards(): Promise<Paginated<RewardRecord>> {
  return delay({ data: rewards, total: 97 });
}
