import { cn } from "@/lib/utils";

interface AdSlotProps {
  size?: "leaderboard" | "rectangle" | "skyscraper" | "mobile";
  label?: string;
  className?: string;
}

const sizeClass: Record<NonNullable<AdSlotProps["size"]>, string> = {
  leaderboard: "h-24 md:h-28",
  rectangle: "h-64",
  skyscraper: "h-[500px]",
  mobile: "h-24 md:hidden",
};

/**
 * Neutral, non-intrusive placeholder for a display ad slot.
 * Replace inner markup with your ad network snippet (AdSense, GAM, etc.).
 */
const AdSlot = ({ size = "rectangle", label = "Advertisement", className }: AdSlotProps) => {
  return (
    <aside
      aria-label={label}
      role="complementary"
      className={cn(
        "flex items-center justify-center w-full rounded-sm border border-dashed border-news-border bg-muted/40 text-[10px] uppercase tracking-widest text-news-subtext font-sans",
        sizeClass[size],
        className,
      )}
    >
      {label}
    </aside>
  );
};

export default AdSlot;
