import type { Metric, RevenuePayoutPoint, TrendPoint } from "./types";

const COMPARISON_WEEK = "vs last week";

function delay<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

export function getOverviewMetrics(): Promise<Metric[]> {
  return delay([
    {
      id: "totalRevenue",
      label: "Total Revenue",
      value: "₦248.4M",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "totalTransactions",
      label: "Total Transactions",
      value: "184,209",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "totalUsers",
      label: "Total Users",
      value: "62,184",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "fxSwapVolume",
      label: "FX Swap Volume",
      value: "$4.82M",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "activeCards",
      label: "Active Cards",
      value: "13,660",
      delta: 12.4,
      trend: "down",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "billPaymentVolume",
      label: "Bill Payment Volume",
      value: "₦276,660.00",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
  ]);
}

export function getRevenuePayouts(): Promise<RevenuePayoutPoint[]> {
  return delay([
    { date: "2024-02-24", revenue: 18, payouts: 22 },
    { date: "2024-02-25", revenue: 30, payouts: 38 },
    { date: "2024-02-26", revenue: 24, payouts: 26 },
    { date: "2024-02-27", revenue: 16, payouts: 22 },
    { date: "2024-02-28", revenue: 14, payouts: 20 },
    { date: "2024-03-01", revenue: 28, payouts: 30 },
    { date: "2024-03-02", revenue: 18, payouts: 26 },
    { date: "2024-03-03", revenue: 24, payouts: 28 },
    { date: "2024-03-04", revenue: 26, payouts: 30 },
    { date: "2024-03-05", revenue: 22, payouts: 26 },
  ]);
}

const flatSeries = (): TrendPoint[] => [
  { date: "2024-02-26", value: 0 },
  { date: "2024-02-28", value: 0 },
  { date: "2024-03-03", value: 0 },
  { date: "2024-03-05", value: 0 },
  { date: "2024-03-06", value: 0 },
];

export function getUserGrowth(): Promise<TrendPoint[]> {
  return delay(flatSeries());
}

export function getRewards(): Promise<TrendPoint[]> {
  return delay(flatSeries());
}

export function getDisputes(): Promise<TrendPoint[]> {
  return delay(flatSeries());
}
