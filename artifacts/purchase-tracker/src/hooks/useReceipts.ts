import { Receipt } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import { generateId } from "../lib/utils";

export function useReceipts() {
  const [receipts, setReceipts] = useLocalStorage<Receipt[]>("pt_receipts", []);

  const addReceipt = (receipt: Omit<Receipt, "id" | "uploadedAt">) => {
    const newReceipt: Receipt = {
      ...receipt,
      id: generateId(),
      uploadedAt: new Date().toISOString(),
    };
    setReceipts((prev) => [...prev, newReceipt]);
    return newReceipt;
  };

  const deleteReceipt = (id: string) => {
    setReceipts((prev) => prev.filter((r) => r.id !== id));
  };

  const updateReceipt = (id: string, updates: Partial<Receipt>) => {
    setReceipts((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  return { receipts, addReceipt, deleteReceipt, updateReceipt };
}
