"use client";

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { formatShortDate } from "@/lib/format";
import type { TrendPoint } from "@/lib/data/types";

type MiniTrendCardProps = {
  title: string;
  value: string;
  period: string;
  data: TrendPoint[];
};

export function MiniTrendCard({
  title,
  value,
  period,
  data,
}: Readonly<MiniTrendCardProps>): React.ReactElement {
  return (
    <div className="rounded-xl border bg-card p-6">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <span className="text-sm text-muted-foreground">{period}</span>
      </div>

      <p className="mt-3 font-display text-3xl font-semibold tracking-tight">
        {value}
      </p>

      <div className="mt-6 h-40 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 4, bottom: 0, left: 4 }}>
            <YAxis hide domain={[0, "dataMax + 1"]} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatShortDate}
              tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
              interval="preserveStartEnd"
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--brand)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
