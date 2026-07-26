import React, { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { usePurchases } from "@/hooks/usePurchases";
import { useSettings } from "@/hooks/useSettings";
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval, parseISO } from "date-fns";
import { formatCurrency } from "@/lib/formatters";

export function MonthlyChart() {
  const { purchases } = usePurchases();
  const { settings } = useSettings();

  const data = useMemo(() => {
    const months = Array.from({ length: 6 }).map((_, i) => {
      const d = subMonths(new Date(), 5 - i);
      return {
        month: format(d, "MMM"),
        start: startOfMonth(d),
        end: endOfMonth(d)
      };
    });

    return months.map(m => {
      const spend = purchases
        .filter(p => isWithinInterval(parseISO(p.date), { start: m.start, end: m.end }))
        .reduce((sum, p) => sum + p.total, 0);
      return { name: m.month, total: spend };
    });
  }, [purchases]);

  return (
    <Card className="h-full min-h-[350px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-base">Last 6 Months</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 pl-0">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
              tickFormatter={(value) => `$${value}`}
              width={60}
            />
            <Tooltip 
              cursor={{ fill: 'hsl(var(--muted)/0.5)' }}
              formatter={(value: number) => [formatCurrency(value, settings), "Spent"]}
              contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', background: 'hsl(var(--popover))', color: 'hsl(var(--popover-foreground))' }}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
