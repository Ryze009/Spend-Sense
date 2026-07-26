import React, { useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { usePurchases } from "@/hooks/usePurchases";
import { useCategories } from "@/hooks/useCategories";
import { useSettings } from "@/hooks/useSettings";
import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, Cell } from "recharts";
import { startOfMonth, subMonths, format, parseISO, isWithinInterval } from "date-fns";

export default function Analytics() {
  const { purchases } = usePurchases();
  const { categories } = useCategories();
  const { settings } = useSettings();

  // Last 12 months spending trend
  const trendData = useMemo(() => {
    const months = Array.from({ length: 12 }).map((_, i) => {
      const d = subMonths(new Date(), 11 - i);
      return {
        monthRaw: d,
        month: format(d, "MMM yy"),
        total: 0
      };
    });

    purchases.forEach(p => {
      const pDate = parseISO(p.date);
      const m = months.find(m => 
        m.monthRaw.getMonth() === pDate.getMonth() && 
        m.monthRaw.getFullYear() === pDate.getFullYear()
      );
      if (m) m.total += p.total;
    });

    return months;
  }, [purchases]);

  // Top Merchants
  const topMerchants = useMemo(() => {
    const merchantTotals: Record<string, number> = {};
    purchases.forEach(p => {
      merchantTotals[p.merchant] = (merchantTotals[p.merchant] || 0) + p.total;
    });
    return Object.entries(merchantTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, total]) => ({ name, total }));
  }, [purchases]);

  // Category Breakdown
  const categoryBreakdown = useMemo(() => {
    const catTotals: Record<string, number> = {};
    let total = 0;
    purchases.forEach(p => {
      catTotals[p.categoryId] = (catTotals[p.categoryId] || 0) + p.total;
      total += p.total;
    });
    return Object.entries(catTotals)
      .sort((a, b) => b[1] - a[1])
      .map(([id, amount]) => {
        const cat = categories.find(c => c.id === id);
        return {
          name: cat?.name || "Unknown",
          color: cat?.color || "#cbd5e1",
          amount,
          percent: total > 0 ? (amount / total) * 100 : 0
        };
      });
  }, [purchases, categories]);

  // Largest Purchases
  const largestPurchases = useMemo(() => {
    return [...purchases].sort((a, b) => b.total - a.total).slice(0, 5);
  }, [purchases]);

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trend Chart */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Spending Trend (12 Months)</CardTitle>
            </CardHeader>
            <CardContent className="pl-0 h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="month" 
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
                  <RechartsTooltip 
                    formatter={(value: number) => [formatCurrency(value, settings), "Spent"]}
                    contentStyle={{ borderRadius: '8px', border: '1px solid var(--border)', background: 'hsl(var(--popover))', color: 'hsl(var(--popover-foreground))' }}
                  />
                  <Area type="monotone" dataKey="total" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Merchants */}
          <Card>
            <CardHeader>
              <CardTitle>Top Merchants</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topMerchants.map((m, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs font-medium text-muted-foreground">
                        {i + 1}
                      </div>
                      <span className="font-medium text-sm">{m.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{formatCurrency(m.total, settings)}</span>
                  </div>
                ))}
                {topMerchants.length === 0 && (
                  <div className="text-sm text-muted-foreground text-center py-4">No data available</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Top Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Top Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryBreakdown.slice(0, 5).map((c, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                        <span>{c.name}</span>
                      </div>
                      <span className="font-semibold">{formatCurrency(c.amount, settings)}</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all" 
                        style={{ width: `${c.percent}%`, backgroundColor: c.color }}
                      />
                    </div>
                  </div>
                ))}
                {categoryBreakdown.length === 0 && (
                  <div className="text-sm text-muted-foreground text-center py-4">No data available</div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Largest Purchases */}
          <Card>
            <CardHeader>
              <CardTitle>Largest Purchases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {largestPurchases.map((p, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="truncate pr-4">
                      <div className="font-medium truncate">{p.name}</div>
                      <div className="text-xs text-muted-foreground truncate">{p.merchant}</div>
                    </div>
                    <span className="font-semibold shrink-0">{formatCurrency(p.total, settings)}</span>
                  </div>
                ))}
                {largestPurchases.length === 0 && (
                  <div className="text-sm text-muted-foreground text-center py-4">No data available</div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
