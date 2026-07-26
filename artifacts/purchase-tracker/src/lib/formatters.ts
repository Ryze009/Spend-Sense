import { format, parseISO } from "date-fns";
import { Settings } from "../types";

export function formatCurrency(amount: number, settings: Settings) {
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: settings.currency,
  }).format(amount);
}

export function formatDate(dateString: string, settings: Settings) {
  try {
    const date = parseISO(dateString);
    let formatStr = "MMM d, yyyy";
    if (settings.dateFormat === "MM/DD/YYYY") formatStr = "MM/dd/yyyy";
    if (settings.dateFormat === "DD/MM/YYYY") formatStr = "dd/MM/yyyy";
    if (settings.dateFormat === "YYYY-MM-DD") formatStr = "yyyy-MM-dd";
    return format(date, formatStr);
  } catch (e) {
    return dateString;
  }
}
