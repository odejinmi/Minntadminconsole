/** Domain enums and shared shapes for the admin console mock data layer. */

export enum AccountType {
  Individual = "Individual",
  Business = "Business",
}

export enum KycStatus {
  Verified = "Verified",
  Pending = "Pending",
  Rejected = "Rejected",
}

export enum KycTier {
  Tier1 = "Tier 1",
  Tier2 = "Tier 2",
  Tier3 = "Tier 3",
}

export enum UserStatus {
  Active = "Active",
  Inactive = "Inactive",
  Frozen = "Frozen",
}

export type BillingAddress = {
  addressLine: string;
  city: string;
  state: string;
  postalCode: string;
};

export type User = {
  id: string;
  fullName: string;
  otherName: string;
  username: string;
  email: string;
  avatarUrl?: string;
  country: string;
  dob: string;
  type: AccountType;
  kyc: KycStatus;
  tier: KycTier;
  status: UserStatus;
  walletBalance: number;
  joinedAt: string;
  billing: BillingAddress;
};

export type Trend = "up" | "down";

/**
 * A headline metric card: preformatted value, optionally with a
 * period-over-period delta. Omit `delta` to render the value alone.
 */
export type Metric = {
  id: string;
  label: string;
  value: string;
  delta?: number;
  trend?: Trend;
  comparison?: string;
};

export type RevenuePayoutPoint = {
  date: string;
  revenue: number;
  payouts: number;
};

export type TrendPoint = {
  date: string;
  value: number;
};

export type Paginated<T> = {
  data: T[];
  total: number;
};

export enum CardType {
  Virtual = "Virtual",
  Physical = "Physical",
}

export enum TransactionStatus {
  Success = "Success",
  Pending = "Pending",
  Failed = "Failed",
}

export enum TransactionMethod {
  NgnWallet = "NGN Wallet",
  UsdWallet = "USD Wallet",
  RewardWallet = "Reward Wallet",
  WalletFunding = "Wallet funding",
  Momo = "Momo",
}

export enum PaymentType {
  BankTransfer = "Bank Transfer",
  Momo = "Momo",
  CurrencySwap = "Currency Swap",
  Airtime = "Airtime",
  Stablecoin = "Stablecoin",
  P2P = "P2P",
}

export type AccountDetails = {
  currency: string;
  id: string;
  accountName: string;
  accountNumber: string;
  provider: string;
  createdAt: string;
};

export type Balance = {
  label: string;
  amount: number;
  currency: string;
};

export type CustomerAccount = {
  details: AccountDetails;
  balances: Balance[];
  lifetimeRevenue: number;
  transactionsCount: number;
};

export type FreezeStatement = {
  message: string;
  loggedBy: {
    name: string;
    role: string;
    email: string;
  };
};

export type CardRecord = {
  id: string;
  balance: number;
  currency: string;
  type: CardType;
  status: UserStatus;
  expiry: string;
};

export type TransactionRecord = {
  reference: string;
  amount: number;
  method: TransactionMethod;
  paymentType: PaymentType;
  status: TransactionStatus;
  date: string;
};

export enum KycCategory {
  AddressInView = "Address In-view",
  Email = "Email",
  Phone = "Phone",
  NIN = "NIN",
  BVN = "BVN",
  Address = "Address",
  Business = "Business",
}

export enum KycReviewStatus {
  Pending = "Pending",
  Success = "Success",
  Rejected = "Rejected",
}

export type KycRecord = {
  id: string;
  userName: string;
  detail: string;
  typeLabel: string;
  country: string;
  countryFlag: string;
  status: KycReviewStatus;
  submittedAt: string;
};

export enum DisputeStatus {
  Pending = "Pending",
  Resolved = "Resolved",
}

export type DisputeRecord = {
  id: string;
  txn: string;
  reason: string;
  amount: number;
  submittedAt: string;
  status: DisputeStatus;
};

/* ---- Money Movement ---- */

export enum PayoutStatus {
  Success = "Success",
  Pending = "Pending",
  Reversed = "Reversed",
}

export enum FeeStatus {
  Settled = "Settled",
  Pending = "Pending",
  Reversed = "Reversed",
}

export enum FeeType {
  BankTransfer = "Bank Transfer",
  CurrencySwap = "Currency Swap",
  VirtualCard = "Virtual Card",
  BillPayment = "Bill Payment",
  Withdrawal = "Withdrawal",
}

export type MoneyTransaction = {
  id: string;
  userName: string;
  userEmail: string;
  amountLabel: string;
  paymentType: PaymentType;
  status: TransactionStatus;
  date: string;
};

export type HourlyVolume = {
  hour: string;
  value: number;
};

export type BillPayment = {
  id: string;
  customer: string;
  biller: string;
  amountLabel: string;
  status: TransactionStatus;
  submittedAt: string;
};

export type CurrencyRate = {
  id: string;
  fromCountry: string;
  fromCurrency: string;
  toCountry: string;
  toCurrency: string;
  rate: string;
  buyRate: string;
  sellRate: string;
  updatedAt: string;
};

export type VirtualCard = {
  id: string;
  brand: string;
  last4: string;
  holder: string;
  currency: string;
  balanceLabel: string;
  spendLabel: string;
  status: UserStatus;
};

export type Payout = {
  id: string;
  beneficiary: string;
  bank: string;
  amountLabel: string;
  status: PayoutStatus;
  submittedAt: string;
};

export type Fee = {
  id: string;
  type: FeeType;
  amountLabel: string;
  submittedAt: string;
  status: FeeStatus;
};

export type WebhookAttempt = {
  attempt: number;
  timestamp: string;
  statusCode: number;
  body: string;
};

export type TransactionDetail = {
  status: TransactionStatus;
  amount: string;
  fee: string;
  netAmount: string;
  reference: string;
  trxId: string;
  sender: { name: string; account: string; bank: string };
  receiver: {
    channel: string;
    method: string;
    paymentType: string;
    gateway: string;
  };
  session: {
    sessionId: string;
    batchId: string;
    settledAt: string;
    createdAt: string;
  };
  webhooks: WebhookAttempt[];
};

/* ---- Manage Fees ---- */

export enum FeeServiceCategory {
  Airtime = "Airtime",
  InternetData = "Internet Data",
  Electricity = "Electricity",
  Betting = "Betting",
  CableTV = "Cable TV",
  Transfer = "Transfer",
  Deposit = "Deposit",
  Card = "Card",
}

export enum FeeConfigStatus {
  Active = "Active",
  Paused = "Paused",
}

export type FeeConfigRecord = {
  id: string;
  category: FeeServiceCategory;
  seq?: number;
  network?: string;
  company?: string;
  productName?: string;
  providerPrice?: string;
  price: string;
  status: FeeConfigStatus;
  modifiedAt: string;
  unit: string;
  feeInput: string;
  enabled: boolean;
};

/* ---- Commerce ---- */

export enum BookingStatus {
  Confirmed = "Confirmed",
  Pending = "Pending",
  Canceled = "Canceled",
}

export enum EventStatus {
  Confirmed = "Confirmed",
  Pending = "Pending",
  Failed = "Failed",
}

export type RewardRecord = {
  id: string;
  userName: string;
  userEmail: string;
  amountLabel: string;
  paymentType: string;
  status: TransactionStatus;
  date: string;
};

export type InvoiceRecord = {
  id: string;
  userName: string;
  userEmail: string;
  amountLabel: string;
  status: TransactionStatus;
  date: string;
};

export type Vendor = {
  id: string;
  name: string;
  category: string;
  orders: string;
  gmvLabel: string;
  commissionLabel: string;
  status: UserStatus;
};

export type FlightBooking = {
  id: string;
  customer: string;
  from: string;
  to: string;
  airline: string;
  amountLabel: string;
  status: BookingStatus;
};

export type EventTicket = {
  id: string;
  customer: string;
  event: string;
  qty: number;
  amountLabel: string;
  status: EventStatus;
};

/* ---- Operations ---- */

export type ProfitLossPoint = {
  month: string;
  revenue: number;
  cost: number;
  profit: number;
};

export enum CampaignStatus {
  Delivered = "Delivered",
  Running = "Running",
  Draft = "Draft",
}

export type Campaign = {
  id: string;
  name: string;
  channel: string;
  audience: string;
  frequency: string;
  status: CampaignStatus;
  date: string;
};

/* ---- Operations: Team, Roles & Audit ---- */

export enum TeamSegment {
  Members = "Team Members",
  Roles = "Roles & Permission",
}

export enum TeamMemberStatus {
  Active = "Active",
  Inactive = "Inactive",
  Invited = "Invited",
}

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: string;
  lastActive: string;
  status: TeamMemberStatus;
  twoFactor: boolean;
};

export type Role = {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  permissions: string[];
};

export enum AuditSeverity {
  Info = "Info",
  Warning = "Warning",
  Critical = "Critical",
}

export type AuditLogEntry = {
  id: string;
  actorName: string;
  actorEmail: string;
  action: string;
  target: string;
  ip: string;
  time: string;
  severity: AuditSeverity;
  category: TeamSegment;
};
