import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  trend?: string;
}

export const StatCard = ({ title, value, icon: Icon, iconColor, trend }: StatCardProps) => {
  return (
    <Card className="p-6 bg-gradient-card border-border hover:shadow-hover transition-all duration-300 rounded-2xl">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-foreground mb-2">{value}</p>
          {trend && (
            <p className="text-xs text-accent font-medium">{trend}</p>
          )}
        </div>
        <div
          className={cn(
            "w-12 h-12 rounded-xl flex items-center justify-center",
            iconColor || "bg-primary/10"
          )}
        >
          <Icon className={cn("w-6 h-6", iconColor ? "" : "text-primary")} />
        </div>
      </div>
    </Card>
  );
};
