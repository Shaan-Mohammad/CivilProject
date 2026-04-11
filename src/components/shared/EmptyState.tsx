import { FolderKanban } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ 
  title = "No results found", 
  description = "There is no data matching your current perspective.",
  icon = <FolderKanban size={48} className="opacity-20" />
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center border rounded-xl border-dashed bg-secondary/10">
      <div className="mb-4 text-muted-foreground">
         {icon}
      </div>
      <h3 className="text-lg font-heading font-bold text-foreground mb-1">{title}</h3>
      <p className="text-muted-foreground text-sm max-w-[300px]">{description}</p>
    </div>
  );
}
