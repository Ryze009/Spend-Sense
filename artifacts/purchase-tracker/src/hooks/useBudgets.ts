import { Budget } from "../types";
import { useLocalStorage } from "./useLocalStorage";

export function useBudgets() {
  const [budgets, setBudgets] = useLocalStorage<Budget[]>("pt_budgets", []);

  const getBudgetForMonth = (month: string) => {
    return budgets.find((b) => b.month === month) || { month, total: 0, categoryBudgets: {} };
  };

  const updateBudget = (month: string, updates: Partial<Budget>) => {
    setBudgets((prev) => {
      const exists = prev.find((b) => b.month === month);
      if (exists) {
        return prev.map((b) => (b.month === month ? { ...b, ...updates } : b));
      }
      return [...prev, { month, total: updates.total || 0, categoryBudgets: updates.categoryBudgets || {} } as Budget];
    });
  };

  return { budgets, getBudgetForMonth, updateBudget };
}
