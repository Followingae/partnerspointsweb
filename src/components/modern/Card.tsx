import { UnifiedCard } from "@/components/ui/unified-card";
import { cn } from "@/lib/utils";

export function Card({ 
  title, 
  children, 
  className = "",
  hover = true 
}: { 
  title?: string; 
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <UnifiedCard className={cn(
      hover ? "hover:-translate-y-1 transition-transform duration-300" : "",
      className
    )}>
      {title && (
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
      )}
      {children}
    </UnifiedCard>
  );
}