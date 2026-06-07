"use client";

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatShortDate } from "@/lib/format";
import type { RevenuePayoutPoint } from "@/lib/data/types";

const REVENUE_COLOR = "#7BC74D";
const PAYOUTS_COLOR = "#C9EFB0";

type RevenuePayoutsChartProps = {
  data: RevenuePayoutPoint[];
};

function LegendDot({
  color,
  label,
}: Readonly<{ color: string; label: string }>): React.ReactElement {
  return (
    <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
      <span
        className="size-2.5 rounded-sm"
        style={{ backgroundColor: color }}
      />
      {label}
    </span>
  );
}

export function RevenuePayoutsChart({
  data,
}: Readonly<RevenuePayoutsChartProps>): React.ReactElement {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Revenue &amp; Payouts
          </h2>
          <Select defaultValue="7d">
            <SelectTrigger size="sm" className="mt-1 h-7 border-none px-0 text-sm text-muted-foreground shadow-none">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-4">
          <LegendDot color={REVENUE_COLOR} label="Revenue" />
          <LegendDot color={PAYOUTS_COLOR} label="Payouts" />
        </div>
      </div>

      <p className="mt-4 font-display text-xl font-semibold tracking-tight">
        ₦0
      </p>

      <div className="mt-2 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="28%">
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tickFormatter={formatShortDate}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "var(--muted)" }}
              labelFormatter={(label) =>
                typeof label === "string" ? formatShortDate(label) : ""
              }
              contentStyle={{
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                fontSize: 12,
              }}
            />
            <Bar
              dataKey="payouts"
              stackId="rp"
              fill={PAYOUTS_COLOR}
              maxBarSize={48}
            />
            <Bar
              dataKey="revenue"
              stackId="rp"
              fill={REVENUE_COLOR}
              radius={[6, 6, 0, 0]}
              maxBarSize={48}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
