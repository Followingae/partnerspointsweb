import { Card as ShadcnCard, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
    <ShadcnCard className={cn(
      "transition will-change-transform",
      hover ? "hover:-translate-y-0.5 hover:shadow-lg" : "",
      className
    )}>
      {title && (
        <CardHeader>
          <CardTitle className="h3">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={title ? "" : "pt-6"}>
        {children}
      </CardContent>
    </ShadcnCard>
  );
}