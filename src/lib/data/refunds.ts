import {
  DisputeStatus,
  type DisputeRecord,
  type Metric,
  type Paginated,
} from "./types";

function delay<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

export function getRefundStats(): Promise<Metric[]> {
  return delay([
    { id: "openDisputes", label: "Open disputes", value: "1" },
    {
      id: "resolved30d",
      label: "Resolved (30d)",
      value: "84%",
      delta: 12.4,
      trend: "up",
      comparison: "vs last week",
    },
    { id: "totalDisputes", label: "Total disputes", value: "222" },
  ]);
}

const REASONS = [
  "Duplicate charge",
  "Service mismatch",
  "Unauthorized transaction",
  "Item not received",
  "Incorrect amount",
];

const disputes: DisputeRecord[] = Array.from({ length: 12 }, (_, index) => ({
  id: `DSP-${441 - index}`,
  txn: "TXN-89417",
  reason: REASONS[index % REASONS.length],
  amount: 18_500,
  submittedAt: "2024-03-12",
  status: index % 2 === 0 ? DisputeStatus.Pending : DisputeStatus.Resolved,
}));

export function getDisputes(): Promise<Paginated<DisputeRecord>> {
  return delay({ data: disputes, total: 97 });
}
