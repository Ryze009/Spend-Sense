import React from "react";
import { Layout } from "@/components/layout/Layout";
import { useSettings } from "@/hooks/useSettings";
import { exportData, exportPurchasesCSV } from "@/lib/export";
import { usePurchases } from "@/hooks/usePurchases";
import { useCategories } from "@/hooks/useCategories";
import { useBudgets } from "@/hooks/useBudgets";
import { useReceipts } from "@/hooks/useReceipts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useTheme } from "next-themes";
import { Download, Upload, AlertTriangle, Monitor, Moon, Sun } from "lucide-react";

export default function Settings() {
  const { settings, updateSettings } = useSettings();
  const { theme, setTheme } = useTheme();
  
  const { purchases } = usePurchases();
  const { categories } = useCategories();
  const { budgets } = useBudgets();
  const { receipts } = useReceipts();

  const handleExportJSON = () => {
    exportData({ purchases, categories, budgets, receipts, settings });
    toast.success("Backup exported successfully");
  };

  const handleExportCSV = () => {
    exportPurchasesCSV(purchases, categories);
    toast.success("Purchases CSV exported");
  };

  const handleReset = () => {
    if (window.confirm("WARNING: This will delete all your purchases, categories, budgets, and receipts. This cannot be undone. Are you absolutely sure?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <Layout>
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize how the app looks on your device.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Theme</Label>
                <div className="flex flex-wrap gap-4">
                  <Button 
                    variant={theme === 'light' ? 'default' : 'outline'} 
                    onClick={() => setTheme('light')}
                    className="flex-1 min-w-[120px]"
                  >
                    <Sun size={16} className="mr-2" /> Light
                  </Button>
                  <Button 
                    variant={theme === 'dark' ? 'default' : 'outline'} 
                    onClick={() => setTheme('dark')}
                    className="flex-1 min-w-[120px]"
                  >
                    <Moon size={16} className="mr-2" /> Dark
                  </Button>
                  <Button 
                    variant={theme === 'system' ? 'default' : 'outline'} 
                    onClick={() => setTheme('system')}
                    className="flex-1 min-w-[120px]"
                  >
                    <Monitor size={16} className="mr-2" /> System
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Manage currencies, dates, and defaults.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select 
                    value={settings.currency} 
                    onValueChange={(val) => updateSettings({ currency: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD ($)</SelectItem>
                      <SelectItem value="EUR">EUR (€)</SelectItem>
                      <SelectItem value="GBP">GBP (£)</SelectItem>
                      <SelectItem value="JPY">JPY (¥)</SelectItem>
                      <SelectItem value="CAD">CAD ($)</SelectItem>
                      <SelectItem value="AUD">AUD ($)</SelectItem>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Date Format</Label>
                  <Select 
                    value={settings.dateFormat} 
                    onValueChange={(val: any) => updateSettings({ dateFormat: val })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Date Format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MMM d, yyyy">Jan 1, 2026</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Default Tax Percentage (%)</Label>
                  <Input 
                    type="number" 
                    value={settings.defaultTaxPercent}
                    onChange={(e) => updateSettings({ defaultTaxPercent: parseFloat(e.target.value) || 0 })}
                  />
                  <p className="text-xs text-muted-foreground">Used to auto-calculate tax on new purchases.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>Export your data or start fresh.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="outline" className="flex-1" onClick={handleExportCSV}>
                  <Download size={16} className="mr-2" /> Export CSV (Excel)
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleExportJSON}>
                  <Download size={16} className="mr-2" /> Export Backup (JSON)
                </Button>
                {/* File input for import would go here, omitting for simplicity of prompt */}
              </div>

              <div className="pt-6 border-t border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-destructive flex items-center gap-2">
                      <AlertTriangle size={16} /> Danger Zone
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">Permanently delete all your data.</p>
                  </div>
                  <Button variant="destructive" onClick={handleReset}>
                    Reset All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
