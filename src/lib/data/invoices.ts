import {
  TransactionStatus,
  type InvoiceRecord,
  type Metric,
  type Paginated,
} from "./types";

const COMPARISON_WEEK = "vs last week";
const INVOICE_DATE = "Mar 8, 2026 2:34 PM";

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

export function getInvoiceStats(): Promise<Metric[]> {
  return delay([
    up("totalIssued", "Total Invoice Issued", "8,432"),
    up("pending", "Pending Invoices", "422"),
    up("paid", "Invoices paid", "₦18.4M"),
  ]);
}

const invoice = (status: TransactionStatus): InvoiceRecord => ({
  id: "INV_8f3a9d2c4b1e",
  userName: "Kofifoods",
  userEmail: "kofifoods@gmail.com",
  amountLabel: "₦500.00",
  status,
  date: INVOICE_DATE,
});

const invoices: InvoiceRecord[] = [
  invoice(TransactionStatus.Success),
  invoice(TransactionStatus.Pending),
  invoice(TransactionStatus.Pending),
  invoice(TransactionStatus.Success),
  invoice(TransactionStatus.Success),
  invoice(TransactionStatus.Pending),
  invoice(TransactionStatus.Success),
];

export function getInvoices(): Promise<Paginated<InvoiceRecord>> {
  return delay({ data: invoices, total: 97 });
}
