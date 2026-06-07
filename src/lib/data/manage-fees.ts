import {
  FeeConfigStatus,
  FeeServiceCategory,
  type FeeConfigRecord,
} from "./types";

const MODIFIED = "2024-03-12";
const { Active, Paused } = FeeConfigStatus;

function delay<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

let counter = 0;
const nextId = (): string => `fee-${(counter += 1)}`;

const network = (
  category: FeeServiceCategory,
  name: string,
  price: string,
  unit: string,
  feeInput: string,
  status: FeeConfigStatus,
): FeeConfigRecord => ({
  id: nextId(),
  category,
  network: name,
  price,
  status,
  modifiedAt: MODIFIED,
  unit,
  feeInput,
  enabled: status === Active,
});

const company = (
  category: FeeServiceCategory,
  name: string,
  price: string,
  status: FeeConfigStatus,
): FeeConfigRecord => ({
  id: nextId(),
  category,
  company: name,
  price,
  status,
  modifiedAt: MODIFIED,
  unit: "%",
  feeInput: "1.5%",
  enabled: status === Active,
});

const product = (
  category: FeeServiceCategory,
  owner: { network?: string; company?: string },
  productName: string,
  providerPrice: string,
  price: string,
  unit: string,
  feeInput: string,
  status: FeeConfigStatus,
): FeeConfigRecord => ({
  id: nextId(),
  category,
  ...owner,
  productName,
  providerPrice,
  price,
  status,
  modifiedAt: MODIFIED,
  unit,
  feeInput,
  enabled: status === Active,
});

const listing = (
  category: FeeServiceCategory,
  seq: number,
  productName: string,
  price: string,
  unit: string,
  feeInput: string,
  status: FeeConfigStatus,
): FeeConfigRecord => ({
  id: nextId(),
  category,
  seq,
  productName,
  price,
  status,
  modifiedAt: MODIFIED,
  unit,
  feeInput,
  enabled: status === Active,
});

const records: Record<FeeServiceCategory, FeeConfigRecord[]> = {
  [FeeServiceCategory.Airtime]: [
    network(FeeServiceCategory.Airtime, "MTN", "1.5%", "%", "2", Active),
    network(FeeServiceCategory.Airtime, "GLO", "1.5%", "%", "1.5", Active),
    network(FeeServiceCategory.Airtime, "AIRTEL", "1.5%", "%", "1.5", Active),
    network(FeeServiceCategory.Airtime, "9MOBILE", "1.5%", "%", "1.5", Paused),
  ],
  [FeeServiceCategory.InternetData]: [
    product(FeeServiceCategory.InternetData, { network: "MTN" }, "110MB Daily Plan - N100", "₦100", "₦130", "₦", "130", Active),
    product(FeeServiceCategory.InternetData, { network: "MTN" }, "230MB Daily Plan - N200", "₦200", "₦200", "₦", "200", Active),
    product(FeeServiceCategory.InternetData, { network: "MTN" }, "230MB Daily Plan - N200", "₦200", "₦200", "₦", "200", Paused),
    product(FeeServiceCategory.InternetData, { network: "GLO" }, "1.5GB Weekly Plan - N500", "₦500", "₦560", "₦", "560", Active),
  ],
  [FeeServiceCategory.Electricity]: [
    company(FeeServiceCategory.Electricity, "IKEDC", "1.5%", Active),
    company(FeeServiceCategory.Electricity, "IKEDC", "1.5%", Active),
    company(FeeServiceCategory.Electricity, "EKEDC", "1.5%", Active),
    company(FeeServiceCategory.Electricity, "AEDC", "1.5%", Paused),
  ],
  [FeeServiceCategory.Betting]: [
    company(FeeServiceCategory.Betting, "1XBET", "1.5%", Active),
    company(FeeServiceCategory.Betting, "Bet9ja", "1.5%", Active),
    company(FeeServiceCategory.Betting, "SportyBet", "1.5%", Active),
    company(FeeServiceCategory.Betting, "BetKing", "1.5%", Paused),
  ],
  [FeeServiceCategory.CableTV]: [
    product(FeeServiceCategory.CableTV, { company: "Dstv" }, "DStv Padi N3,600", "₦100", "2%", "%", "1.5", Active),
    product(FeeServiceCategory.CableTV, { company: "Dstv" }, "DStv Yanga N6,000", "₦200", "2%", "%", "1.5", Active),
    product(FeeServiceCategory.CableTV, { company: "GOtv" }, "GOtv Max N7,200", "₦200", "2%", "%", "1.5", Paused),
    product(FeeServiceCategory.CableTV, { company: "Startimes" }, "Nova Bouquet N1,900", "₦200", "2%", "%", "1.5", Active),
  ],
  [FeeServiceCategory.Transfer]: [
    listing(FeeServiceCategory.Transfer, 1, "NIP Outbound (NGN)", "₦100", "₦", "100", Active),
    listing(FeeServiceCategory.Transfer, 2, "Minnt P2P Transfer", "0", "-", "0", Active),
    listing(FeeServiceCategory.Transfer, 3, "Momo Transfer", "2%", "%", "2", Paused),
  ],
  [FeeServiceCategory.Deposit]: [
    listing(FeeServiceCategory.Deposit, 1, "NIP Inbound (NGN)", "0", "-", "0", Paused),
    listing(FeeServiceCategory.Deposit, 2, "Minnt P2P Transfer", "0", "-", "0", Paused),
    listing(FeeServiceCategory.Deposit, 3, "Momo Transfer", "0", "-", "0", Paused),
  ],
  [FeeServiceCategory.Card]: [
    listing(FeeServiceCategory.Card, 1, "Card issuance (Virtual USD)", "$5", "$", "5", Active),
    listing(FeeServiceCategory.Card, 2, "Card issuance (Physical NGN)", "0", "-", "0", Paused),
    listing(FeeServiceCategory.Card, 3, "ATM withdrawal", "0", "-", "0", Paused),
  ],
};

export function getFeeConfigs(): Promise<{
  records: Record<FeeServiceCategory, FeeConfigRecord[]>;
  total: number;
}> {
  return delay({ records, total: 97 });
}
