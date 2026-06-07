"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ProfitLossPoint } from "@/lib/data/types";

const REVENUE_COLOR = "#A8E27F";
const COST_COLOR = "#F2B33D";
const PROFIT_COLOR = "#4FAE5A";

function LegendDot({
  color,
  label,
}: Readonly<{ color: string; label: string }>): React.ReactElement {
  return (
    <span className="flex items-center gap-1.5 text-sm text-foreground">
      <span className="size-2.5 rounded-sm" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

export function ProfitLossChart({
  data,
}: Readonly<{ data: ProfitLossPoint[] }>): React.ReactElement {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="font-display text-lg font-semibold tracking-tight">
            Profit &amp; Loss · 6 months
          </h2>
          <p className="text-sm text-muted-foreground">All values in ₦M</p>
        </div>
        <div className="flex items-center gap-4">
          <LegendDot color={REVENUE_COLOR} label="Revenue" />
          <LegendDot color={COST_COLOR} label="Cost" />
          <LegendDot color={PROFIT_COLOR} label="Profit" />
        </div>
      </div>

      <div className="mt-6 h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="22%" barGap={4}>
            <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="var(--border)" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={36}
              domain={[0, 360]}
              ticks={[0, 90, 180, 270, 360]}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "var(--muted)" }}
              contentStyle={{
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                fontSize: 12,
              }}
            />
            <Bar dataKey="revenue" fill={REVENUE_COLOR} radius={[4, 4, 0, 0]} maxBarSize={26} />
            <Bar dataKey="cost" fill={COST_COLOR} radius={[4, 4, 0, 0]} maxBarSize={26} />
            <Bar dataKey="profit" fill={PROFIT_COLOR} radius={[4, 4, 0, 0]} maxBarSize={26} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
