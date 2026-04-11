import { LoadingSpinner } from "@/components/shared/LoadingSpinner";

// Global loading boundary for the App Router
export default function GlobalLoading() {
  return <LoadingSpinner text="Connecting to CivilDraft Server..." />;
}
