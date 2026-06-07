import {
  FeeStatus,
  FeeType,
  type Fee,
  type Metric,
  type Paginated,
} from "./types";

const COMPARISON_WEEK = "vs last week";
const SUBMITTED = "2024-03-12";

function delay<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

export function getFeeStats(): Promise<Metric[]> {
  return delay([
    {
      id: "feesNgn",
      label: "Fees collected (NGN)",
      value: "₦2,700",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "feesUsd",
      label: "Fees collected (USD)",
      value: "$70.90",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "feeEvents",
      label: "Fee events (24h)",
      value: "12",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "avgFee",
      label: "Avg fee / txn",
      value: "₦318",
      delta: 12.4,
      trend: "down",
      comparison: COMPARISON_WEEK,
    },
  ]);
}

const fee = (
  type: FeeType,
  amountLabel: string,
  status: FeeStatus,
): Fee => ({ id: "FEE-90209", type, amountLabel, submittedAt: SUBMITTED, status });

const fees: Fee[] = [
  fee(FeeType.BankTransfer, "₦250", FeeStatus.Settled),
  fee(FeeType.CurrencySwap, "$18.40", FeeStatus.Settled),
  fee(FeeType.VirtualCard, "$3.50", FeeStatus.Settled),
  fee(FeeType.BillPayment, "₦250", FeeStatus.Pending),
  fee(FeeType.BankTransfer, "₦250", FeeStatus.Reversed),
  fee(FeeType.Withdrawal, "₦400", FeeStatus.Settled),
  fee(FeeType.CurrencySwap, "$9.10", FeeStatus.Pending),
];

export function getFees(): Promise<Paginated<Fee>> {
  return delay({ data: fees, total: 97 });
}
