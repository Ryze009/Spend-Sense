import { Purchase, Category } from "../types";

export interface DashboardStats {
  totalSpend: number;
  thisMonthSpend: number;
  monthTrend: number;
  purchaseCount: number;
  avgPurchase: number;
}
