import React from "react";
import { Link } from "wouter";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/dashboard/StatCard";
import { CategoryChart } from "@/components/dashboard/CategoryChart";
import { MonthlyChart } from "@/components/dashboard/MonthlyChart";
import { usePurchases } from "@/hooks/usePurchases";
import { useCategories } from "@/hooks/useCategories";
import { useSettings } from "@/hooks/useSettings";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { Plus, Wallet, TrendingDown, ReceiptText, ArrowRight } from "lucide-react";
import { startOfMonth, endOfMonth, isWithinInterval, parseISO, subMonths } from "date-fns";
import * as Icons from "lucide-react";

export default function Dashboard() {
  const { purchases } = usePurchases();
  const { categories } = useCategories();
  const { settings } = useSettings();

  const now = new Date();
  
  // Total Spend All Time
  const totalSpend = purchases.reduce((sum, p) => sum + p.total, 0);
  
  // This Month
  const currentMonthPurchases = purchases.filter(p => isWithinInterval(parseISO(p.date), { start: startOfMonth(now), end: endOfMonth(now) }));
  const thisMonthSpend = currentMonthPurchases.reduce((sum, p) => sum + p.total, 0);

  // Last Month (for trend)
  const lastMonthStart = startOfMonth(subMonths(now, 1));
  const lastMonthEnd = endOfMonth(subMonths(now, 1));
  const lastMonthSpend = purchases
    .filter(p => isWithinInterval(parseISO(p.date), { start: lastMonthStart, end: lastMonthEnd }))
    .reduce((sum, p) => sum + p.total, 0);

  const monthTrend = lastMonthSpend ? Math.round(((thisMonthSpend - lastMonthSpend) / lastMonthSpend) * 100) : 0;

  // Average Purchase
  const avgPurchase = purchases.length ? totalSpend / purchases.length : 0;

  // Recent Purchases
  const recentPurchases = [...purchases].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Spend"
            value={formatCurrency(totalSpend, settings)}
            subtitle="All time"
            icon={<Wallet size={20} />}
          />
          <StatCard
            title="This Month"
            value={formatCurrency(thisMonthSpend, settings)}
            trend={{ value: monthTrend, label: "vs last month" }}
            icon={<TrendingDown size={20} />}
            className="border-primary/20 bg-primary/5"
          />
          <StatCard
            title="Purchases"
            value={purchases.length.toString()}
            subtitle="Total transactions"
            icon={<ReceiptText size={20} />}
          />
          <StatCard
            title="Avg. Purchase"
            value={formatCurrency(avgPurchase, settings)}
            subtitle="Across all items"
            icon={<TrendingDown size={20} />}
          />
        </div>

        {/* Charts & Recent */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MonthlyChart />
            
            {/* Recent Purchases List inside Main Content */}
            <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-border flex items-center justify-between">
                <h3 className="font-semibold">Recent Purchases</h3>
                <Link href="/purchases" className="text-sm text-primary hover:underline flex items-center gap-1">
                  View all <ArrowRight size={14} />
                </Link>
              </div>
              <div className="divide-y divide-border">
                {recentPurchases.length > 0 ? (
                  recentPurchases.map(p => {
                    const category = categories.find(c => c.id === p.categoryId);
                    const IconComponent = category && (Icons as any)[category.icon] ? (Icons as any)[category.icon] : Icons.Tag;
                    
                    return (
                      <div key={p.id} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white shadow-sm"
                            style={{ backgroundColor: category?.color || '#cbd5e1' }}
                          >
                            <IconComponent size={18} />
                          </div>
                          <div>
                            <p className="font-medium text-sm text-card-foreground leading-tight">{p.name}</p>
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                              <span>{p.merchant}</span>
                              <span className="w-1 h-1 rounded-full bg-border"></span>
                              <span>{formatDate(p.date, settings)}</span>
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm">{formatCurrency(p.total, settings)}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-8 text-center text-muted-foreground text-sm">
                    No purchases yet. Start tracking!
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <CategoryChart />
          </div>
        </div>
      </div>
      
      {/* Floating Action Button */}
      <Link href="/purchases?new=true">
        <button className="md:hidden fixed bottom-20 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50">
          <Plus size={24} />
        </button>
      </Link>
    </Layout>
  );
}
