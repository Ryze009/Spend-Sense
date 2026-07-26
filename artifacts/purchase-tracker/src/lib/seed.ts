import { Purchase, Category, Budget } from "../types";
import { format, subMonths, subDays } from "date-fns";

export function seedDemoData() {
  if (localStorage.getItem("pt_seeded")) return;

  const now = new Date();
  
  const purchases: Purchase[] = [
    {
      id: "p1",
      name: "Weekly Groceries",
      merchant: "Whole Foods",
      categoryId: "cat-groceries",
      price: 145.50,
      tax: 0,
      total: 145.50,
      date: format(now, "yyyy-MM-dd"),
      paymentMethod: "credit_card",
      receiptIds: [],
      tags: ["food", "weekly"],
      isRecurring: false,
      isFavorite: false
    },
    {
      id: "p2",
      name: "MacBook Pro M3",
      merchant: "Apple Store",
      categoryId: "cat-electronics",
      price: 1999.00,
      tax: 159.92,
      total: 2158.92,
      date: format(subDays(now, 5), "yyyy-MM-dd"),
      paymentMethod: "credit_card",
      receiptIds: [],
      tags: ["work", "laptop"],
      isRecurring: false,
      isFavorite: true,
      warrantyExpiration: format(subDays(new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()), 5), "yyyy-MM-dd")
    },
    {
      id: "p3",
      name: "Dinner Date",
      merchant: "Osteria Mozza",
      categoryId: "cat-dining",
      price: 120.00,
      tax: 11.40,
      total: 131.40,
      date: format(subDays(now, 2), "yyyy-MM-dd"),
      paymentMethod: "credit_card",
      receiptIds: [],
      tags: ["date", "italian"],
      isRecurring: false,
      isFavorite: true
    },
    {
      id: "p4",
      name: "Monthly Gym",
      merchant: "Equinox",
      categoryId: "cat-health",
      price: 250.00,
      tax: 0,
      total: 250.00,
      date: format(subDays(now, 10), "yyyy-MM-dd"),
      paymentMethod: "credit_card",
      receiptIds: [],
      tags: ["fitness"],
      isRecurring: true,
      recurringInterval: "monthly",
      isFavorite: false
    },
    {
      id: "p5",
      name: "Flight to NYC",
      merchant: "Delta",
      categoryId: "cat-travel",
      price: 450.00,
      tax: 30.50,
      total: 480.50,
      date: format(subMonths(now, 1), "yyyy-MM-dd"),
      paymentMethod: "credit_card",
      receiptIds: [],
      tags: ["vacation"],
      isRecurring: false,
      isFavorite: false
    },
    {
      id: "p6",
      name: "Spotify Premium",
      merchant: "Spotify",
      categoryId: "cat-entertainment",
      price: 10.99,
      tax: 0.88,
      total: 11.87,
      date: format(subDays(now, 15), "yyyy-MM-dd"),
      paymentMethod: "credit_card",
      receiptIds: [],
      tags: ["music", "subscription"],
      isRecurring: true,
      recurringInterval: "monthly",
      isFavorite: false
    },
    {
      id: "p7",
      name: "Uber to Airport",
      merchant: "Uber",
      categoryId: "cat-transportation",
      price: 65.00,
      tax: 0,
      total: 65.00,
      date: format(subMonths(now, 1), "yyyy-MM-dd"),
      paymentMethod: "credit_card",
      receiptIds: [],
      tags: ["travel"],
      isRecurring: false,
      isFavorite: false
    },
    {
      id: "p8",
      name: "Winter Coat",
      merchant: "Patagonia",
      categoryId: "cat-shopping",
      price: 299.00,
      tax: 23.92,
      total: 322.92,
      date: format(subMonths(now, 2), "yyyy-MM-dd"),
      paymentMethod: "credit_card",
      receiptIds: [],
      tags: ["clothes"],
      isRecurring: false,
      isFavorite: false
    }
  ];

  const budgets: Budget[] = [
    {
      month: format(now, "yyyy-MM"),
      total: 4000,
      categoryBudgets: {
        "cat-dining": 400,
        "cat-groceries": 600,
        "cat-shopping": 300,
        "cat-entertainment": 150
      }
    }
  ];

  localStorage.setItem("pt_purchases", JSON.stringify(purchases));
  localStorage.setItem("pt_budgets", JSON.stringify(budgets));
  localStorage.setItem("pt_seeded", "true");
}
