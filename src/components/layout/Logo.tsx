import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Hide the wordmark, showing only the mark. */
  markOnly?: boolean;
};

/**
 * minnt wordmark. The mark is an approximation of the Figma logo —
 * swap in the official SVG asset when available.
 */
export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--forest)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M3 6l5 6-5 6" />
        <path d="M10 6l5 6-5 6" />
        <path d="M17 6l5 6-5 6" />
      </svg>
      {!markOnly && (
        <span className="text-lg font-semibold tracking-tight text-foreground">
          minnt
        </span>
      )}
    </span>
  );
}
