"use client";

import { useEffect } from "react";
import { ShieldAlert, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log to an external service like Sentry
    console.error("Global UI Exception Handled:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
         <ShieldAlert size={40} className="text-red-500" />
      </div>
      <h2 className="text-3xl font-heading font-bold mb-3">System Anomaly Detected</h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
        We encountered an unexpected technical rendering issue. Don&apos;t worry, this has been safely logged for our engineers.
      </p>
      <Button onClick={() => reset()} size="lg" className="gap-2">
        <RefreshCcw size={18} /> Recover Interface
      </Button>
    </div>
  );
}
