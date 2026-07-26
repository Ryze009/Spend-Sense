import React from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: number; label: string };
  className?: string;
}

export function StatCard({ title, value, subtitle, icon, trend, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden hover-elevate transition-all", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <h3 className="tracking-tight text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="text-muted-foreground bg-muted/50 p-2 rounded-full">{icon}</div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold">{value}</div>
          {(subtitle || trend) && (
            <div className="flex items-center text-xs">
              {trend && (
                <span
                  className={cn(
                    "mr-2 font-medium flex items-center",
                    trend.value > 0 ? "text-destructive" : trend.value < 0 ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {trend.value > 0 ? "+" : ""}{trend.value}%
                </span>
              )}
              <span className="text-muted-foreground">{subtitle || trend?.label}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
