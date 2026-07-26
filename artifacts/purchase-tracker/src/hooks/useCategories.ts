import { Category } from "../types";
import { useLocalStorage } from "./useLocalStorage";
import { generateId } from "../lib/utils";

const DEFAULT_CATEGORIES: Category[] = [
  { id: "cat-groceries", name: "Groceries", color: "#10b981", icon: "ShoppingCart" }, // green
  { id: "cat-dining", name: "Dining", color: "#f97316", icon: "Utensils" }, // orange
  { id: "cat-shopping", name: "Shopping", color: "#a855f7", icon: "ShoppingBag" }, // purple
  { id: "cat-electronics", name: "Electronics", color: "#3b82f6", icon: "Laptop" }, // blue
  { id: "cat-entertainment", name: "Entertainment", color: "#ec4899", icon: "Film" }, // pink
  { id: "cat-transportation", name: "Transportation", color: "#64748b", icon: "Car" }, // slate
  { id: "cat-health", name: "Health", color: "#ef4444", icon: "Heart" }, // red
  { id: "cat-home", name: "Home", color: "#f59e0b", icon: "Home" }, // amber
  { id: "cat-travel", name: "Travel", color: "#06b6d4", icon: "Plane" }, // cyan
  { id: "cat-education", name: "Education", color: "#6366f1", icon: "Book" }, // indigo
  { id: "cat-bills", name: "Bills", color: "#9ca3af", icon: "FileText" }, // gray
  { id: "cat-other", name: "Other", color: "#737373", icon: "Package" } // neutral
];

export function useCategories() {
  const [categories, setCategories] = useLocalStorage<Category[]>("pt_categories", DEFAULT_CATEGORIES);

  const addCategory = (category: Omit<Category, "id">) => {
    const newCategory = { ...category, id: generateId() };
    setCategories((prev) => [...prev, newCategory]);
    return newCategory;
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const getCategory = (id: string) => categories.find((c) => c.id === id);

  return { categories, addCategory, updateCategory, deleteCategory, getCategory };
}
