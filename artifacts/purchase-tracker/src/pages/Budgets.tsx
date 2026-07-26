import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useBudgets } from "@/hooks/useBudgets";
import { useCategories } from "@/hooks/useCategories";
import { useSettings } from "@/hooks/useSettings";
import { usePurchases } from "@/hooks/usePurchases";
import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { format, startOfMonth, endOfMonth, isWithinInterval, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Edit2, Check, X, Target } from "lucide-react";

export default function Budgets() {
  const { budgets, updateBudget, getBudgetForMonth } = useBudgets();
  const { categories } = useCategories();
  const { purchases } = usePurchases();
  const { settings } = useSettings();

  const now = new Date();
  const currentMonth = format(now, "yyyy-MM");
  const budget = getBudgetForMonth(currentMonth);

  const [isEditingTotal, setIsEditingTotal] = useState(false);
  const [totalBudgetInput, setTotalBudgetInput] = useState(budget.total.toString());
  
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [categoryBudgetInput, setCategoryBudgetInput] = useState("");

  const currentMonthPurchases = purchases.filter(p => 
    isWithinInterval(parseISO(p.date), { start: startOfMonth(now), end: endOfMonth(now) })
  );

  const totalSpent = currentMonthPurchases.reduce((sum, p) => sum + p.total, 0);
  const totalPercent = budget.total > 0 ? (totalSpent / budget.total) * 100 : 0;

  const saveTotalBudget = () => {
    const val = parseFloat(totalBudgetInput);
    if (!isNaN(val) && val >= 0) {
      updateBudget(currentMonth, { total: val });
      setIsEditingTotal(false);
      toast.success("Total budget updated");
    } else {
      toast.error("Invalid amount");
    }
  };

  const saveCategoryBudget = (categoryId: string) => {
    const val = parseFloat(categoryBudgetInput);
    if (!isNaN(val) && val >= 0) {
      updateBudget(currentMonth, { 
        categoryBudgets: { ...budget.categoryBudgets, [categoryId]: val } 
      });
      setEditingCategory(null);
      toast.success("Category budget updated");
    } else {
      toast.error("Invalid amount");
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Target className="text-primary" /> Budgets
          </h2>
          <div className="text-sm font-medium text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {format(now, "MMMM yyyy")}
          </div>
        </div>

        {/* Overall Budget */}
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Monthly Budget</h3>
                <div className="flex items-end gap-3">
                  <div className="text-4xl font-bold tracking-tight">
                    {formatCurrency(totalSpent, settings)}
                  </div>
                  <div className="text-muted-foreground mb-1 flex items-center gap-2">
                    / 
                    {isEditingTotal ? (
                      <div className="flex items-center gap-1">
                        <Input 
                          className="w-24 h-8 text-sm" 
                          value={totalBudgetInput} 
                          onChange={(e) => setTotalBudgetInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && saveTotalBudget()}
                          autoFocus
                        />
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-green-500" onClick={saveTotalBudget}>
                          <Check size={14} />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => setIsEditingTotal(false)}>
                          <X size={14} />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 group cursor-pointer" onClick={() => { setTotalBudgetInput(budget.total.toString()); setIsEditingTotal(true); }}>
                        <span className={budget.total === 0 ? "italic opacity-50" : ""}>
                          {budget.total > 0 ? formatCurrency(budget.total, settings) : "Not set"}
                        </span>
                        <Edit2 size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-muted-foreground mb-1">Remaining</div>
                <div className={`text-xl font-bold ${totalSpent > budget.total && budget.total > 0 ? 'text-destructive' : 'text-primary'}`}>
                  {budget.total > 0 ? formatCurrency(Math.max(0, budget.total - totalSpent), settings) : "∞"}
                </div>
              </div>
            </div>

            {budget.total > 0 && (
              <div className="space-y-2">
                <Progress 
                  value={Math.min(totalPercent, 100)} 
                  className="h-3"
                  indicatorClassName={totalPercent > 90 ? "bg-destructive" : totalPercent > 75 ? "bg-amber-500" : "bg-primary"}
                />
                <div className="flex justify-between text-xs text-muted-foreground font-medium">
                  <span>{totalPercent.toFixed(1)}% spent</span>
                  {totalPercent >= 100 && <span className="text-destructive font-bold">Budget exceeded</span>}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Category Budgets */}
        <h3 className="text-lg font-semibold mt-8 mb-4">Category Budgets</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map(category => {
            const spent = currentMonthPurchases.filter(p => p.categoryId === category.id).reduce((sum, p) => sum + p.total, 0);
            const catBudget = budget.categoryBudgets[category.id] || 0;
            const percent = catBudget > 0 ? (spent / catBudget) * 100 : 0;
            const isEditing = editingCategory === category.id;

            // Only show categories that have a budget set OR have spending this month
            if (catBudget === 0 && spent === 0 && !isEditing) return null;

            return (
              <Card key={category.id}>
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <div className="flex items-center gap-1">
                          <Input 
                            className="w-20 h-7 text-xs" 
                            value={categoryBudgetInput} 
                            onChange={(e) => setCategoryBudgetInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && saveCategoryBudget(category.id)}
                            autoFocus
                          />
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-green-500" onClick={() => saveCategoryBudget(category.id)}>
                            <Check size={12} />
                          </Button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 group cursor-pointer text-sm" onClick={() => { setCategoryBudgetInput(catBudget.toString()); setEditingCategory(category.id); }}>
                          <span className="font-semibold">{formatCurrency(spent, settings)}</span>
                          <span className="text-muted-foreground">/ {catBudget > 0 ? formatCurrency(catBudget, settings) : "Set"}</span>
                          <Edit2 size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                        </div>
                      )}
                    </div>
                  </div>
                  {catBudget > 0 && (
                    <Progress 
                      value={Math.min(percent, 100)} 
                      className="h-2"
                      indicatorClassName={percent > 90 ? "bg-destructive" : percent > 75 ? "bg-amber-500" : "bg-primary"}
                    />
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
