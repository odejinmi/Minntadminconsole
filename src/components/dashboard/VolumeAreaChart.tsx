"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { HourlyVolume } from "@/lib/data/types";

type VolumeAreaChartProps = {
  data: HourlyVolume[];
};

const AXIS_HOURS = ["0:00", "4:00", "8:00", "12:00", "16:00", "20:00"];

export function VolumeAreaChart({
  data,
}: Readonly<VolumeAreaChartProps>): React.ReactElement {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="font-display text-lg font-semibold tracking-tight">
        Volume · last 24h
      </h2>
      <p className="text-sm text-muted-foreground">Rolling hourly volume</p>

      <div className="mt-4 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="volumeFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--brand)" stopOpacity={0.45} />
                <stop offset="100%" stopColor="var(--brand)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="4 4" stroke="var(--border)" />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              ticks={AXIS_HOURS}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={40}
              domain={[0, 1200]}
              ticks={[300, 600, 900, 1200]}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ stroke: "var(--border)" }}
              contentStyle={{
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                fontSize: 12,
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--brand)"
              strokeWidth={2}
              fill="url(#volumeFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
