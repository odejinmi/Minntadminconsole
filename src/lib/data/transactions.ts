import {
  PaymentType,
  TransactionStatus,
  type HourlyVolume,
  type Metric,
  type MoneyTransaction,
  type Paginated,
  type TransactionDetail,
} from "./types";

const COMPARISON_WEEK = "vs last week";
const TXN_DATE = "Mar 8, 2026 2:34 PM";

function delay<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

export function getTransactionStats(): Promise<Metric[]> {
  return delay([
    {
      id: "totalVolume",
      label: "Total Volume (24h)",
      value: "₦1.84B",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "successful",
      label: "Successful",
      value: "98.1%",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "failed",
      label: "Failed",
      value: "218",
      delta: 12.4,
      trend: "down",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "pending",
      label: "Pending",
      value: "218",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
  ]);
}

const VOLUME = [
  900, 940, 1010, 1080, 1040, 1060, 1120, 1160, 1140, 980, 900, 820, 700, 660,
  690, 640, 620, 660, 700, 820, 980, 1080, 1120, 1140,
];

export function getHourlyVolume(): Promise<HourlyVolume[]> {
  return delay(
    VOLUME.map((value, hour) => ({ hour: `${hour}:00`, value })),
  );
}

const tx = (
  amountLabel: string,
  paymentType: PaymentType,
  status: TransactionStatus,
): MoneyTransaction => ({
  id: "txn_8f3a9d2c4b1e",
  userName: "Esther Uzo",
  userEmail: "estheruzo@gmail.com",
  amountLabel,
  paymentType,
  status,
  date: TXN_DATE,
});

const transactions: MoneyTransaction[] = [
  tx("₦1,250,000.00", PaymentType.BankTransfer, TransactionStatus.Success),
  tx("₦89,400.00", PaymentType.BankTransfer, TransactionStatus.Success),
  tx("₦12,500.00", PaymentType.Momo, TransactionStatus.Success),
  tx("₦10,250.00", PaymentType.Momo, TransactionStatus.Success),
  tx("$250.00", PaymentType.CurrencySwap, TransactionStatus.Success),
  tx("₦10,250.00", PaymentType.Airtime, TransactionStatus.Success),
  tx("$50.00", PaymentType.Airtime, TransactionStatus.Pending),
  tx("₦10,250.00", PaymentType.Airtime, TransactionStatus.Failed),
  tx("$250.00", PaymentType.CurrencySwap, TransactionStatus.Success),
  tx("4,800 USDC", PaymentType.Stablecoin, TransactionStatus.Success),
  tx("₦10,250.00", PaymentType.P2P, TransactionStatus.Success),
  tx("₦10,250.00", PaymentType.P2P, TransactionStatus.Success),
];

export function getMoneyTransactions(): Promise<Paginated<MoneyTransaction>> {
  return delay({ data: transactions, total: 97 });
}

const ERROR_BODY =
  '<!DOCTYPE html>\\n<html lang="en">\\n  <head>\\n    <meta charset="utf-8">\\n    <meta name="viewport" content="width=device-width, initial-scale=1">\\n    <title>Server Error</title>\\n  </head>\\n  <body>\\n    Internal Server Error\\n  </body>\\n</html>';

export function getTransactionDetail(): Promise<TransactionDetail> {
  return delay({
    status: TransactionStatus.Success,
    amount: "NGN 500,000.00",
    fee: "NGN 200.00",
    netAmount: "NGN 499,800.00",
    reference: "4161452822350875",
    trxId: "012302026041614502282350875",
    sender: {
      name: "ODEJINMI SAMUEL",
      account: "8156995030",
      bank: "OPAY",
    },
    receiver: {
      channel: "VIRTUAL ACCOUNT",
      method: "BANK TRANSFER",
      paymentType: "WALLET FUNDING",
      gateway: "WEMA BANK",
    },
    session: {
      sessionId: "100033260410145003010015485528",
      batchId: "6e5517a11055a",
      settledAt: "Jun 06, 2025 3:30 PM",
      createdAt: "Jun 05, 2025 3:30 PM",
    },
    webhooks: [
      {
        attempt: 1,
        timestamp: "10 Apr 2025, 3:30 PM",
        statusCode: 500,
        body: ERROR_BODY,
      },
      {
        attempt: 2,
        timestamp: "10 Apr 2025, 3:30 PM",
        statusCode: 200,
        body: ERROR_BODY,
      },
    ],
  });
}
