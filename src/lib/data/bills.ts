import {
  TransactionStatus,
  type BillPayment,
  type Metric,
  type Paginated,
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

export function getBillStats(): Promise<Metric[]> {
  return delay([
    up("totalVolume", "Total Volume (24h)", "₦182.4M"),
    up("airtime", "Airtime", "12,408"),
    {
      id: "internetData",
      label: "Internet Data",
      value: "21,898",
      delta: 12.4,
      trend: "down",
      comparison: COMPARISON_WEEK,
    },
    up("electricity", "Electricity", "6,210"),
    up("cableTv", "Cable TV", "3,820"),
    up("betting", "Betting", "17,949"),
  ]);
}

const bill = (
  id: string,
  customer: string,
  biller: string,
  amountLabel: string,
  status: TransactionStatus,
): BillPayment => ({ id, customer, biller, amountLabel, status, submittedAt: SUBMITTED });

const bills: BillPayment[] = [
  bill("BIL-22481", "Adaeze N.", "EKEDC · Prepaid", "₦12,500", TransactionStatus.Success),
  bill("BIL-22480", "James O.", "DSTV · Compact+", "₦19,800", TransactionStatus.Success),
  bill("BIL-22480", "Susan E.", "MTN · 50GB", "₦18,000", TransactionStatus.Pending),
  bill("BIL-22480", "Lara F.", "Glo · 10GB", "₦25,000", TransactionStatus.Failed),
  bill("BIL-22479", "Tunde A.", "IKEDC · Postpaid", "₦9,400", TransactionStatus.Success),
  bill("BIL-22478", "Ngozi K.", "GOtv · Max", "₦8,500", TransactionStatus.Success),
  bill("BIL-22477", "Bola I.", "Airtel · 25GB", "₦6,200", TransactionStatus.Success),
  bill("BIL-22476", "Femi O.", "Bet9ja · Wallet", "₦15,000", TransactionStatus.Pending),
];

export function getBillPayments(): Promise<Paginated<BillPayment>> {
  return delay({ data: bills, total: 97 });
}
