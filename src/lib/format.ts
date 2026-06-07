/** Shared display formatters. Pure, no locale config needed for the mock data. */

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Group a whole number with thousands separators, e.g. 184209 -> "184,209". */
export function formatNumber(value: number): string {
  return Math.round(value)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Money with a currency symbol and two decimals, e.g. 2847200 -> "₦2,847,200.00". */
export function formatCurrency(value: number, currency = "₦"): string {
  const [whole, fraction = "00"] = value.toFixed(2).split(".");
  return `${currency}${whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}.${fraction}`;
}

/** Money without decimals, e.g. 2847200 -> "₦2,847,200". */
export function formatMoney(value: number, currency = "₦"): string {
  return `${currency}${formatNumber(value)}`;
}

/** Compact money for headline stats, e.g. 248_400_000 -> "₦248.4M". */
export function formatCompactMoney(value: number, currency = "₦"): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${currency}${trim(value / 1_000_000_000)}B`;
  if (abs >= 1_000_000) return `${currency}${trim(value / 1_000_000)}M`;
  if (abs >= 1_000) return `${currency}${trim(value / 1_000)}K`;
  return `${currency}${formatNumber(value)}`;
}

function trim(value: number): string {
  return value.toFixed(1).replace(/\.0$/, "");
}

/** ISO date -> "Mar 12, 2024". */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/** ISO date -> short axis label, "Mar 12" or "Mar 01". */
export function formatShortDate(iso: string): string {
  const date = new Date(iso);
  const day = date.getDate().toString().padStart(2, "0");
  return `${MONTHS[date.getMonth()]} ${day}`;
}

/** ISO datetime -> "Nov 03, 2025 17:25" (padded day, 24-hour clock). */
export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${MONTHS[date.getMonth()]} ${day}, ${date.getFullYear()} ${hours}:${minutes}`;
}
