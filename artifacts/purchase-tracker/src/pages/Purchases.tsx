import React, { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { usePurchases } from "@/hooks/usePurchases";
import { useCategories } from "@/hooks/useCategories";
import { useSettings } from "@/hooks/useSettings";
import { formatCurrency, formatDate } from "@/lib/formatters";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Star, StarOff, Image as ImageIcon } from "lucide-react";
import * as Icons from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PurchaseForm } from "@/components/purchases/PurchaseForm";
import { Purchase } from "@/types";

export default function Purchases() {
  const { purchases, addPurchase, updatePurchase, deletePurchase } = usePurchases();
  const { categories } = useCategories();
  const { settings } = useSettings();
  
  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingPurchase, setEditingPurchase] = useState<Purchase | null>(null);

  // Read ?new=true from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("new") === "true") {
      setIsFormOpen(true);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const handleFormSubmit = (data: Omit<Purchase, "id" | "isFavorite" | "receiptIds">) => {
    if (editingPurchase) {
      updatePurchase(editingPurchase.id, data);
      toast.success("Purchase updated");
    } else {
      addPurchase({
        ...data,
        isFavorite: false,
        receiptIds: [],
      });
      toast.success("Purchase added");
    }
    setEditingPurchase(null);
  };

  const handleEdit = (p: Purchase) => {
    setEditingPurchase(p);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this purchase?")) {
      deletePurchase(id);
      toast.success("Purchase deleted");
    }
  };
  
  const filteredPurchases = purchases
    .filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.merchant.toLowerCase().includes(search.toLowerCase()) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(search.toLowerCase())))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input 
              placeholder="Search purchases, merchants, tags..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none h-10">
              <Filter size={16} className="mr-2" /> Filter
            </Button>
            <Button className="flex-1 sm:flex-none h-10" onClick={() => { setEditingPurchase(null); setIsFormOpen(true); }}>
              <Plus size={16} className="mr-2" /> Add Purchase
            </Button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 font-medium">Purchase</th>
                  <th className="px-6 py-4 font-medium">Category</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Amount</th>
                  <th className="px-6 py-4 font-medium w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredPurchases.length > 0 ? (
                  filteredPurchases.map(p => {
                    const category = categories.find(c => c.id === p.categoryId);
                    const IconComponent = category && (Icons as any)[category.icon] ? (Icons as any)[category.icon] : Icons.Tag;
                    
                    return (
                      <tr key={p.id} className="hover:bg-muted/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3 min-w-[200px]">
                            <button 
                              onClick={() => updatePurchase(p.id, { isFavorite: !p.isFavorite })}
                              className="text-muted-foreground hover:text-amber-400 transition-colors shrink-0"
                            >
                              {p.isFavorite ? <Star size={16} className="fill-amber-400 text-amber-400" /> : <StarOff size={16} className="opacity-0 group-hover:opacity-100" />}
                            </button>
                            <div className="truncate">
                              <div className="font-medium text-card-foreground flex items-center gap-2 truncate">
                                {p.name}
                                {p.receiptIds?.length > 0 && (
                                  <ImageIcon size={12} className="text-muted-foreground shrink-0" />
                                )}
                                {p.isRecurring && (
                                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">Recurring</Badge>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground mt-0.5 truncate">{p.merchant}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="gap-1.5 py-1 font-normal bg-card shrink-0 whitespace-nowrap">
                            <span 
                              className="w-2 h-2 rounded-full shrink-0" 
                              style={{ backgroundColor: category?.color || '#cbd5e1' }}
                            />
                            {category?.name || "Unknown"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-muted-foreground">
                          {formatDate(p.date, settings)}
                        </td>
                        <td className="px-6 py-4 text-right font-semibold">
                          {formatCurrency(p.total, settings)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreHorizontal size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem className="cursor-pointer" onClick={() => handleEdit(p)}>
                                <Edit size={14} className="mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                className="cursor-pointer text-destructive focus:text-destructive"
                                onClick={() => handleDelete(p.id)}
                              >
                                <Trash2 size={14} className="mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                      No purchases found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <PurchaseForm 
        open={isFormOpen} 
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingPurchase(null);
        }}
        purchase={editingPurchase}
        onSubmit={handleFormSubmit}
      />
      
      <button 
        onClick={() => { setEditingPurchase(null); setIsFormOpen(true); }}
        className="md:hidden fixed bottom-20 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-50"
      >
        <Plus size={24} />
      </button>
    </Layout>
  );
}
