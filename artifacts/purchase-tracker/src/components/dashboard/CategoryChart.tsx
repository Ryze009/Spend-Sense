import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCategories } from "@/hooks/useCategories";
import { usePurchases } from "@/hooks/usePurchases";
import { startOfMonth, endOfMonth, isWithinInterval, parseISO } from "date-fns";
import { formatCurrency } from "@/lib/formatters";
import { useSettings } from "@/hooks/useSettings";

export function CategoryChart() {
  const { purchases } = usePurchases();
  const { categories } = useCategories();
  const { settings } = useSettings();

  const currentMonthPurchases = purchases.filter(p => {
    const d = parseISO(p.date);
    const now = new Date();
    return isWithinInterval(d, { start: startOfMonth(now), end: endOfMonth(now) });
  });

  const categorySpend = currentMonthPurchases.reduce((acc, p) => {
    acc[p.categoryId] = (acc[p.categoryId] || 0) + p.total;
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(categorySpend)
    .map(([catId, amount]) => {
      const cat = categories.find(c => c.id === catId);
      return {
        name: cat?.name || "Unknown",
        value: amount,
        color: cat?.color || "#cbd5e1"
      };
    })
    .filter(d => d.value > 0)
    .sort((a, b) => b.value - a.value);

  return (
    <Card className="h-full min-h-[350px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-base">This Month by Category</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 pb-2">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip 
                formatter={(value: number) => formatCurrency(value, settings)}
                contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', background: 'hsl(var(--popover))', color: 'hsl(var(--popover-foreground))' }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground text-sm">
            No purchases this month.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
