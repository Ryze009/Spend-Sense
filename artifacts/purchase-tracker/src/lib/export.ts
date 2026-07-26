import { Purchase, Category, Budget, Receipt, Settings } from "../types";

export function exportData(data: { purchases: Purchase[], categories: Category[], budgets: Budget[], receipts: Receipt[], settings: Settings }) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `purchase_tracker_backup_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportPurchasesCSV(purchases: Purchase[], categories: Category[]) {
  const headers = ["Date", "Name", "Merchant", "Category", "Price", "Tax", "Total", "Payment Method", "Notes"];
  
  const rows = purchases.map(p => {
    const category = categories.find(c => c.id === p.categoryId)?.name || "Unknown";
    return [
      p.date,
      `"${p.name.replace(/"/g, '""')}"`,
      `"${p.merchant.replace(/"/g, '""')}"`,
      `"${category}"`,
      p.price,
      p.tax,
      p.total,
      p.paymentMethod,
      `"${p.notes?.replace(/"/g, '""') || ""}"`
    ].join(",");
  });

  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `purchases_${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
