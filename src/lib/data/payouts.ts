import {
  PayoutStatus,
  TransactionStatus,
  type Metric,
  type Paginated,
  type Payout,
} from "./types";

const COMPARISON_WEEK = "vs last week";
const SUBMITTED = "2024-03-12";

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

export function getPayoutStats(): Promise<Metric[]> {
  return delay([
    up("inflow", "Inflow 24h", "₦984M"),
    up("outflow", "Outflow 24h", "₦612M"),
    { id: "pendingPayouts", label: "Pending payouts", value: "62" },
    up("netPosition", "Net position", "₦372M"),
  ]);
}

const payout = (
  id: string,
  beneficiary: string,
  bank: string,
  amountLabel: string,
  status: PayoutStatus,
): Payout => ({ id, beneficiary, bank, amountLabel, status, submittedAt: SUBMITTED });

const payouts: Payout[] = [
  payout("PAY-7821", "Bukola Aremu", "GTBank · 0234**", "₦1,250,000", PayoutStatus.Success),
  payout("PAY-7820", "Acme Logistics", "Stanbic · 0922**", "₦8,400,000", PayoutStatus.Success),
  payout("PAY-7820", "M. Ekene", "UBA · 1100**", "₦450,000", PayoutStatus.Pending),
  payout("PAY-7820", "Bukola Aremu", "UBA · 1100**", "₦125,000", PayoutStatus.Reversed),
  payout("PAY-7819", "Zenith Traders", "Access · 7781**", "₦2,300,000", PayoutStatus.Success),
  payout("PAY-7818", "J. Okonkwo", "Kuda · 4410**", "₦98,000", PayoutStatus.Pending),
];

export function getPayouts(): Promise<Paginated<Payout>> {
  return delay({ data: payouts, total: 97 });
}

export function getPaymentReceipt(): Promise<{
  channel: "bank";
  status: TransactionStatus;
  rows: { label: string; value: string }[];
  recipientRows: { label: string; value: string }[];
  payoutAmount: string;
  totalDeducted: string;
}> {
  return delay({
    channel: "bank",
    status: TransactionStatus.Success,
    rows: [
      { label: "Transaction ID", value: "23441546707512345011" },
      { label: "Session ID", value: "012302026041614528223508 75" },
      { label: "Amount", value: "NGN 500.00" },
      { label: "Fee", value: "NGN 25.00" },
      { label: "Payment Time", value: "Jun 06, 2025 3:30 PM" },
    ],
    recipientRows: [
      { label: "Recipient Name", value: "AFESHIMIME AKANJI" },
      { label: "Recipient Account", value: "2028660408" },
      { label: "Bank Name", value: "OPAY" },
      { label: "Bank Code", value: "100004" },
      { label: "Narration", value: "Transfer to solomon" },
    ],
    payoutAmount: "NGN 500.00",
    totalDeducted: "NGN 525.00",
  });
}
