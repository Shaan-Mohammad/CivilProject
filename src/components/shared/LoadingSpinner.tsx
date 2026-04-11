import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
  text?: string;
  centered?: boolean;
}

export function LoadingSpinner({ 
  className, 
  size = 24, 
  text = "Loading...", 
  centered = true 
}: LoadingSpinnerProps = {}) {
  
  const content = (
    <div className={cn("flex flex-col items-center justify-center gap-3 text-muted-foreground", className)}>
      <Loader2 size={size} className="animate-spin text-primary" />
      {text && <span className="text-sm font-medium animate-pulse">{text}</span>}
    </div>
  );

  if (centered) {
    return (
      <div className="w-full h-full min-h-[50vh] flex items-center justify-center p-8">
        {content}
      </div>
    );
  }

  return content;
}
