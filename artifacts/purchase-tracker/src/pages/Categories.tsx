import React, { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useCategories } from "@/hooks/useCategories";
import { usePurchases } from "@/hooks/usePurchases";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import * as Icons from "lucide-react";
import { Category } from "@/types";

const COLORS = [
  "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e", "#10b981", "#14b8a6",
  "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#ec4899",
  "#f43f5e", "#64748b", "#78716c", "#737373"
];

const ICONS = [
  "ShoppingCart", "Utensils", "ShoppingBag", "Laptop", "Film", "Car", "Heart", "Home", 
  "Plane", "Book", "FileText", "Package", "Coffee", "Gift", "Briefcase", "Music", 
  "Zap", "Dumbbell", "PenTool", "Smartphone"
];

export default function Categories() {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const { purchases } = usePurchases();
  
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    color: COLORS[0],
    icon: ICONS[0]
  });

  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, color: category.color, icon: category.icon });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", color: COLORS[0], icon: ICONS[0] });
    }
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }
    
    if (editingCategory) {
      updateCategory(editingCategory.id, formData);
      toast.success("Category updated");
    } else {
      addCategory(formData);
      toast.success("Category added");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string, name: string) => {
    const isInUse = purchases.some(p => p.categoryId === id);
    if (isInUse) {
      toast.error(`Cannot delete ${name} because it is used by existing purchases.`);
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteCategory(id);
      toast.success("Category deleted");
    }
  };

  const filteredCategories = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
            <Input 
              placeholder="Search categories..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-card"
            />
          </div>
          <Button onClick={() => openModal()} className="w-full sm:w-auto">
            <Plus size={16} className="mr-2" /> Add Category
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCategories.map(cat => {
            const IconComponent = (Icons as any)[cat.icon] || Icons.Tag;
            const usageCount = purchases.filter(p => p.categoryId === cat.id).length;
            
            return (
              <Card key={cat.id} className="hover-elevate transition-all group overflow-hidden border-border">
                <CardContent className="p-0">
                  <div className="p-5 flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-sm"
                        style={{ backgroundColor: cat.color }}
                      >
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{cat.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {usageCount} {usageCount === 1 ? 'purchase' : 'purchases'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground" onClick={() => openModal(cat)}>
                        <Edit2 size={14} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive" 
                        onClick={() => handleDelete(cat.id, cat.name)}
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingCategory ? "Edit Category" : "Add Category"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder="E.g. Coffee"
                autoFocus
              />
            </div>
            
            <div className="space-y-2">
              <Label>Color</Label>
              <div className="flex flex-wrap gap-2">
                {COLORS.map(color => (
                  <div 
                    key={color}
                    className={`w-8 h-8 rounded-full cursor-pointer transition-transform hover:scale-110 flex items-center justify-center ${formData.color === color ? 'ring-2 ring-offset-2 ring-primary' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setFormData({...formData, color})}
                  />
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Icon</Label>
              <div className="grid grid-cols-5 gap-2 max-h-48 overflow-y-auto p-1">
                {ICONS.map(iconName => {
                  const Icon = (Icons as any)[iconName];
                  if (!Icon) return null;
                  return (
                    <div 
                      key={iconName}
                      className={`h-12 border rounded-md cursor-pointer flex items-center justify-center hover:bg-muted transition-colors ${formData.icon === iconName ? 'border-primary bg-primary/10 text-primary' : 'border-border text-muted-foreground'}`}
                      onClick={() => setFormData({...formData, icon: iconName})}
                    >
                      <Icon size={20} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
