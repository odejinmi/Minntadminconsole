import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  /** Show only the icon mark (e.g. the collapsed sidebar rail). */
  markOnly?: boolean;
};

/** minnt brand logo, sourced from the SVG assets in /public. */
export function Logo({ className, markOnly = false }: LogoProps) {
  if (markOnly) {
    return (
      <Image
        src="/logo_icon.svg"
        alt="minnt"
        width={25}
        height={25}
        priority
        className={cn("h-6 w-auto", className)}
      />
    );
  }

  return (
    <Image
      src="/logo.svg"
      alt="minnt"
      width={88}
      height={25}
      priority
      className={cn("h-6 w-auto", className)}
    />
  );
}
