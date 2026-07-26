import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Purchase, PaymentMethod } from "@/types";
import { useCategories } from "@/hooks/useCategories";
import { useSettings } from "@/hooks/useSettings";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { format } from "date-fns";

const purchaseSchema = z.object({
  name: z.string().min(1, "Name is required"),
  merchant: z.string().min(1, "Merchant is required"),
  categoryId: z.string().min(1, "Category is required"),
  price: z.coerce.number().min(0.01, "Price must be greater than 0"),
  tax: z.coerce.number().min(0, "Tax must be 0 or greater"),
  total: z.coerce.number().min(0.01, "Total must be greater than 0"),
  date: z.string().min(1, "Date is required"),
  paymentMethod: z.string().min(1, "Payment method is required"),
  notes: z.string().optional(),
  tags: z.string().optional(), // Will split by comma
  isRecurring: z.boolean().default(false),
});

type PurchaseFormValues = z.infer<typeof purchaseSchema>;

interface PurchaseFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purchase?: Purchase | null;
  onSubmit: (data: Omit<Purchase, "id" | "isFavorite" | "receiptIds">) => void;
}

export function PurchaseForm({ open, onOpenChange, purchase, onSubmit }: PurchaseFormProps) {
  const { categories } = useCategories();
  const { settings } = useSettings();

  const form = useForm<PurchaseFormValues>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: {
      name: "",
      merchant: "",
      categoryId: categories[0]?.id || "",
      price: 0,
      tax: 0,
      total: 0,
      date: format(new Date(), "yyyy-MM-dd"),
      paymentMethod: "credit_card",
      notes: "",
      tags: "",
      isRecurring: false,
    },
  });

  useEffect(() => {
    if (purchase && open) {
      form.reset({
        name: purchase.name,
        merchant: purchase.merchant,
        categoryId: purchase.categoryId,
        price: purchase.price,
        tax: purchase.tax,
        total: purchase.total,
        date: purchase.date,
        paymentMethod: purchase.paymentMethod,
        notes: purchase.notes || "",
        tags: purchase.tags?.join(", ") || "",
        isRecurring: purchase.isRecurring,
      });
    } else if (!purchase && open) {
      form.reset({
        name: "",
        merchant: "",
        categoryId: categories[0]?.id || "",
        price: 0,
        tax: 0,
        total: 0,
        date: format(new Date(), "yyyy-MM-dd"),
        paymentMethod: "credit_card",
        notes: "",
        tags: "",
        isRecurring: false,
      });
    }
  }, [purchase, open, form, categories]);

  // Auto-calculate total when price or tax changes
  const price = form.watch("price");
  const tax = form.watch("tax");

  useEffect(() => {
    if (document.activeElement?.getAttribute("name") === "price" || 
        document.activeElement?.getAttribute("name") === "tax") {
      const calculatedTax = tax || (price * (settings.defaultTaxPercent / 100));
      if (document.activeElement?.getAttribute("name") === "price") {
        form.setValue("tax", Number(calculatedTax.toFixed(2)));
      }
      form.setValue("total", Number((Number(price) + Number(form.getValues("tax"))).toFixed(2)));
    }
  }, [price, tax, form, settings.defaultTaxPercent]);

  const handleSubmit = (values: PurchaseFormValues) => {
    const tags = values.tags ? values.tags.split(",").map(t => t.trim()).filter(Boolean) : [];
    onSubmit({
      ...values,
      paymentMethod: values.paymentMethod as PaymentMethod,
      tags,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{purchase ? "Edit Purchase" : "Add Purchase"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g. Weekly Groceries" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="merchant"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Merchant</FormLabel>
                    <FormControl>
                      <Input placeholder="E.g. Whole Foods" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (Pre-tax)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="total"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((c) => (
                          <SelectItem key={c.id} value={c.id}>
                            <div className="flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                              {c.name}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Method</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="credit_card">Credit Card</SelectItem>
                        <SelectItem value="debit_card">Debit Card</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                        <SelectItem value="digital_wallet">Digital Wallet</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags (comma separated)</FormLabel>
                  <FormControl>
                    <Input placeholder="food, weekend, gift" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Input placeholder="Optional notes about this purchase..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isRecurring"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Recurring Purchase</FormLabel>
                    <div className="text-sm text-muted-foreground">
                      Is this a subscription or recurring bill?
                    </div>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {purchase ? "Save Changes" : "Add Purchase"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
