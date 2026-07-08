import { Check } from "lucide-react";

interface TrustBadgeProps {
  text: string;
}

export default function TrustBadge({ text }: TrustBadgeProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-gold">
        <Check className="h-3.5 w-3.5 text-dark-navy" strokeWidth={3} aria-hidden="true" />
      </span>
      <span className="text-[15px] font-medium text-dark-navy">{text}</span>
    </div>
  );
}
