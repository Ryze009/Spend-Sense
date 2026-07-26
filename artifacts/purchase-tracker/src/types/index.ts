export type PaymentMethod = 'cash' | 'credit_card' | 'debit_card' | 'bank_transfer' | 'digital_wallet' | 'other';

export interface Purchase {
  id: string;
  name: string;
  merchant: string;
  categoryId: string;
  price: number;
  tax: number;
  total: number;
  date: string;
  paymentMethod: PaymentMethod;
  notes?: string;
  warrantyExpiration?: string;
  receiptIds: string[];
  tags: string[];
  isRecurring: boolean;
  recurringInterval?: 'weekly' | 'monthly' | 'yearly';
  isFavorite: boolean;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  budget?: number;
}

export interface Budget {
  month: string;
  total: number;
  categoryBudgets: Record<string, number>;
}

export interface Receipt {
  id: string;
  purchaseId?: string;
  fileName: string;
  dataUrl: string;
  uploadedAt: string;
}

export interface Settings {
  theme: 'light' | 'dark' | 'system';
  currency: string;
  currencySymbol: string;
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  defaultTaxPercent: number;
}
