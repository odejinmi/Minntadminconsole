"use client";

import { useRef, useState } from "react";

const LENGTH = 4;
const SLOTS = Array.from({ length: LENGTH }, (_, index) => index);

export function OtpInput(): React.ReactElement {
  const [values, setValues] = useState<string[]>(() => SLOTS.map(() => ""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, raw: string): void => {
    const digit = raw.replace(/\D/g, "").slice(-1);
    setValues((prev) => {
      const next = [...prev];
      next[index] = digit;
      return next;
    });
    if (digit && index < LENGTH - 1) refs.current[index + 1]?.focus();
  };

  const handleKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ): void => {
    if (event.key === "Backspace" && !values[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex gap-3">
      {SLOTS.map((index) => (
        <input
          key={index}
          ref={(node) => {
            refs.current[index] = node;
          }}
          inputMode="numeric"
          maxLength={1}
          value={values[index]}
          onChange={(event) => handleChange(index, event.target.value)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          aria-label={`Digit ${index + 1}`}
          className="size-14 rounded-xl border border-border bg-card text-center text-lg outline-none transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      ))}
    </div>
  );
}
