import { usePurchases } from "./usePurchases";
import { parseISO, startOfMonth, endOfMonth, isWithinInterval, subMonths, isSameMonth } from "date-fns";

export function useAnalytics() {
  const { purchases } = usePurchases();

  // Computations can be heavy, but for localStorage it's generally fine. 
  // In a real app we'd useMemo, but keeping it simple for now.

  const getTotalSpend = () => purchases.reduce((sum, p) => sum + p.total, 0);

  const getPurchasesInDateRange = (start: Date, end: Date) => {
    return purchases.filter(p => {
      const d = parseISO(p.date);
      return isWithinInterval(d, { start, end });
    });
  };

  const getMonthlySpend = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return getPurchasesInDateRange(start, end).reduce((sum, p) => sum + p.total, 0);
  };

  const getCategorySpend = (categoryId: string, month?: Date) => {
    let filtered = purchases.filter(p => p.categoryId === categoryId);
    if (month) {
      filtered = filtered.filter(p => isSameMonth(parseISO(p.date), month));
    }
    return filtered.reduce((sum, p) => sum + p.total, 0);
  };

  return {
    purchases,
    getTotalSpend,
    getPurchasesInDateRange,
    getMonthlySpend,
    getCategorySpend,
  };
}
