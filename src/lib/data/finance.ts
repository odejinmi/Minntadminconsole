import type { Metric, ProfitLossPoint } from "./types";

const COMPARISON_WEEK = "vs last week";

function delay<T>(value: T): Promise<T> {
  return Promise.resolve(value);
}

export function getFinanceStats(): Promise<Metric[]> {
  return delay([
    {
      id: "revenueMtd",
      label: "Revenue MTD",
      value: "₦248M",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "costsMtd",
      label: "Costs MTD",
      value: "₦118M",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "netProfit",
      label: "Net profit",
      value: "₦130M",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
    {
      id: "treasuryBalance",
      label: "Treasury balance",
      value: "₦4.8B",
      delta: 12.4,
      trend: "up",
      comparison: COMPARISON_WEEK,
    },
  ]);
}

const profitLoss: ProfitLossPoint[] = [
  { month: "Jan", revenue: 320, cost: 235, profit: 170 },
  { month: "Feb", revenue: 320, cost: 235, profit: 265 },
  { month: "Mar", revenue: 360, cost: 150, profit: 240 },
  { month: "Apr", revenue: 190, cost: 235, profit: 240 },
  { month: "May", revenue: 245, cost: 170, profit: 170 },
  { month: "Jun", revenue: 320, cost: 300, profit: 170 },
  { month: "Jul", revenue: 320, cost: 95, profit: 285 },
];

export function getProfitLoss(): Promise<ProfitLossPoint[]> {
  return delay(profitLoss);
}
