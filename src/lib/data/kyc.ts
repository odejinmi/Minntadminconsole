import {
  KycCategory,
  KycReviewStatus,
  type KycRecord,
  type Metric,
} from "./types";

const COMPARISON_WEEK = "vs last week";
const FLAG = "🇳🇬";
const SUBMITTED = "2024-03-12";

function delay<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

export function getKycStats(): Promise<Metric[]> {
  return delay([
    { id: "pendingReview", label: "Pending Review", value: "62" },
    {
      id: "approvedToday",
      label: "Approved (today)",
      value: "902",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "rejectedToday",
      label: "Rejected (today)",
      value: "142",
      delta: 12.4,
      trend: "down",
      comparison: COMPARISON_WEEK,
    },
    { id: "verifiedIndividuals", label: "Verified Individuals", value: "5.8k" },
    { id: "verifiedBusinesses", label: "Verified Businesses", value: "1.1k" },
    {
      id: "verifiedAddresses",
      label: "Verified Addresses",
      value: "142",
      delta: 12.4,
      trend: "down",
      comparison: COMPARISON_WEEK,
    },
  ]);
}

const NAMES = [
  "Esther Uzo",
  "Aisha Bello",
  "Tunde Okafor",
  "Chioma Eze",
  "Emeka Nwosu",
];

function build(
  category: KycCategory,
  typeLabel: string,
  detail: string,
  status: KycReviewStatus,
  count: number,
): KycRecord[] {
  return Array.from({ length: count }, (_, index) => ({
    id: `${category}-${index}`,
    userName: NAMES[index % NAMES.length],
    detail,
    typeLabel,
    country: "NG",
    countryFlag: FLAG,
    status,
    submittedAt: SUBMITTED,
  }));
}

const records: Record<KycCategory, KycRecord[]> = {
  [KycCategory.AddressInView]: build(
    KycCategory.AddressInView,
    "Address",
    "estheruzo@gmail.com",
    KycReviewStatus.Pending,
    5,
  ),
  [KycCategory.Email]: build(
    KycCategory.Email,
    "Email",
    "estheruzo@gmail.com",
    KycReviewStatus.Success,
    5,
  ),
  [KycCategory.Phone]: build(
    KycCategory.Phone,
    "Phone",
    "+234912345678909",
    KycReviewStatus.Success,
    2,
  ),
  [KycCategory.NIN]: build(
    KycCategory.NIN,
    "NIN",
    "897654323145",
    KycReviewStatus.Success,
    2,
  ),
  [KycCategory.BVN]: build(
    KycCategory.BVN,
    "BVN",
    "897654323145",
    KycReviewStatus.Success,
    2,
  ),
  [KycCategory.Address]: build(
    KycCategory.Address,
    "Address",
    "No 4, obaakran ikeja, lagos...",
    KycReviewStatus.Success,
    2,
  ),
  [KycCategory.Business]: build(
    KycCategory.Business,
    "Business",
    "BN09876543212",
    KycReviewStatus.Success,
    2,
  ),
};

export function getKycRecords(): Promise<{
  records: Record<KycCategory, KycRecord[]>;
  total: number;
}> {
  return delay({ records, total: 97 });
}
