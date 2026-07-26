import { Settings } from "../types";
import { useLocalStorage } from "./useLocalStorage";

const DEFAULT_SETTINGS: Settings = {
  theme: "system",
  currency: "USD",
  currencySymbol: "$",
  dateFormat: "MMM d, yyyy" as any, // internal standard
  defaultTaxPercent: 8,
};

export function useSettings() {
  const [settings, setSettings] = useLocalStorage<Settings>("pt_settings", DEFAULT_SETTINGS);

  const updateSettings = (updates: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  return { settings, updateSettings };
}
