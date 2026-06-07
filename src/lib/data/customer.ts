import {
  CardType,
  PaymentType,
  TransactionMethod,
  TransactionStatus,
  UserStatus,
  type CardRecord,
  type CustomerAccount,
  type FreezeStatement,
  type Paginated,
  type TransactionRecord,
  type User,
} from "./types";

function delay<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

export function getCustomerAccount(user: User): Promise<CustomerAccount> {
  return delay({
    details: {
      currency: "NGN",
      id: `${user.id}-97f6-069c68e0e376`,
      accountName: `Minnt-${user.fullName}`,
      accountNumber: "0987654321",
      provider: "Wema Bank",
      createdAt: "2025-11-03T17:25:00",
    },
    balances: [
      { label: "Naira Balance", amount: 300_050, currency: "₦" },
      { label: "Reward Balance", amount: 22_000, currency: "₦" },
      { label: "Card Balance", amount: 0, currency: "$" },
      { label: "USD Balance", amount: 950, currency: "$" },
    ],
    lifetimeRevenue: 5_000_000,
    transactionsCount: 202,
  });
}

export function getFreezeStatement(): FreezeStatement {
  return {
    message:
      "All balance of this account is currently frozen due to legal actions taken against the account holder in relations to fraud and cybercrime.",
    loggedBy: {
      name: "Darasimi Olawale",
      role: "Customer Relations Officer",
      email: "darasimi.o@minnt.com",
    },
  };
}

const cards: CardRecord[] = [
  {
    id: "8f3a9d2c4b1e",
    balance: 3_350,
    currency: "USD",
    type: CardType.Virtual,
    status: UserStatus.Active,
    expiry: "12/2030",
  },
  {
    id: "f3a9d2c4b1e2",
    balance: 10_250,
    currency: "USD",
    type: CardType.Virtual,
    status: UserStatus.Frozen,
    expiry: "12/2027",
  },
  {
    id: "9c2b7e4a1d6f",
    balance: 3_000,
    currency: "USD",
    type: CardType.Virtual,
    status: UserStatus.Active,
    expiry: "12/2028",
  },
  {
    id: "1a4d7f2c9b3e",
    balance: 8_900,
    currency: "USD",
    type: CardType.Physical,
    status: UserStatus.Active,
    expiry: "06/2029",
  },
  {
    id: "6e2c9a4f7b1d",
    balance: 540,
    currency: "USD",
    type: CardType.Virtual,
    status: UserStatus.Frozen,
    expiry: "03/2026",
  },
];

export function getUserCards(): Promise<Paginated<CardRecord>> {
  return delay({ data: cards, total: 97 });
}

const TXN_DATE = "Mar 8, 2026 2:34 PM";
const TXN_AMOUNT = 10_250;

const txn = (
  method: TransactionMethod,
  paymentType: PaymentType,
  status: TransactionStatus,
): TransactionRecord => ({
  reference: "txn_8f3a9d2c4b1e",
  amount: TXN_AMOUNT,
  method,
  paymentType,
  status,
  date: TXN_DATE,
});

const transactions: TransactionRecord[] = [
  txn(TransactionMethod.NgnWallet, PaymentType.BankTransfer, TransactionStatus.Success),
  txn(TransactionMethod.WalletFunding, PaymentType.BankTransfer, TransactionStatus.Success),
  txn(TransactionMethod.WalletFunding, PaymentType.Momo, TransactionStatus.Success),
  txn(TransactionMethod.NgnWallet, PaymentType.Momo, TransactionStatus.Success),
  txn(TransactionMethod.NgnWallet, PaymentType.CurrencySwap, TransactionStatus.Success),
  txn(TransactionMethod.RewardWallet, PaymentType.Airtime, TransactionStatus.Success),
  txn(TransactionMethod.UsdWallet, PaymentType.Airtime, TransactionStatus.Pending),
  txn(TransactionMethod.NgnWallet, PaymentType.Airtime, TransactionStatus.Failed),
  txn(TransactionMethod.UsdWallet, PaymentType.CurrencySwap, TransactionStatus.Success),
  txn(TransactionMethod.WalletFunding, PaymentType.Stablecoin, TransactionStatus.Success),
  txn(TransactionMethod.RewardWallet, PaymentType.P2P, TransactionStatus.Success),
  txn(TransactionMethod.RewardWallet, PaymentType.P2P, TransactionStatus.Success),
];

export function getUserTransactions(): Promise<Paginated<TransactionRecord>> {
  return delay({ data: transactions, total: 97 });
}
