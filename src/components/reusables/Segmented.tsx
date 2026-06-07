"use client";

import { cn } from "@/lib/utils";

type SegmentedOption<T extends string> = {
  label: string;
  value: T;
};

type SegmentedProps<T extends string> = {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  tone?: "brand" | "muted";
  className?: string;
};

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  tone = "brand",
  className,
}: Readonly<SegmentedProps<T>>): React.ReactElement {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-[3px] rounded-[14px] border p-[5px]",
        tone === "brand"
          ? "border-[#F3F4F6] bg-[#FCFCFC]"
          : "border-border bg-muted",
        className,
      )}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "rounded-[10px] px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors",
              active && tone === "brand" &&
                "bg-brand text-brand-foreground shadow-[0px_1px_4px_rgba(0,0,0,0.1)]",
              active && tone === "muted" &&
                "bg-background text-foreground shadow-sm",
              !active && "text-muted-foreground hover:text-foreground",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
