import type { CurrencyRate, Metric, Paginated } from "./types";

const COMPARISON_WEEK = "vs last week";
const UPDATED = "2024-03-12";

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

export function getSwapStats(): Promise<Metric[]> {
  return delay([
    up("swapVolume", "Swap volume 24h", "$842K"),
    up("currencySwaps", "Currency Swaps", "12,408"),
    up("avgMargin", "Avg margin", "0.42%"),
  ]);
}

const rates: CurrencyRate[] = [
  {
    id: "ngn-usd",
    fromCountry: "Nigeria",
    fromCurrency: "NGN",
    toCountry: "United States",
    toCurrency: "USD",
    rate: "0.001300",
    buyRate: "1612.4",
    sellRate: "1618.9",
    updatedAt: UPDATED,
  },
  {
    id: "usd-ngn",
    fromCountry: "United States",
    fromCurrency: "USD",
    toCountry: "Nigeria",
    toCurrency: "NGN",
    rate: "770.500000",
    buyRate: "0.0006",
    sellRate: "0.0006",
    updatedAt: UPDATED,
  },
];

export function getCurrencyRates(): Promise<Paginated<CurrencyRate>> {
  return delay({ data: rates, total: 97 });
}
