import { Purchase } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import { generateId } from "../lib/utils";

export function usePurchases() {
  const [purchases, setPurchases] = useLocalStorage<Purchase[]>("pt_purchases", []);

  const addPurchase = (purchase: Omit<Purchase, "id">) => {
    const newPurchase = { ...purchase, id: generateId() };
    setPurchases((prev) => [...prev, newPurchase]);
    return newPurchase;
  };

  const updatePurchase = (id: string, updates: Partial<Purchase>) => {
    setPurchases((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deletePurchase = (id: string) => {
    setPurchases((prev) => prev.filter((p) => p.id !== id));
  };

  const getPurchase = (id: string) => purchases.find((p) => p.id === id);

  return { purchases, addPurchase, updatePurchase, deletePurchase, getPurchase };
}
