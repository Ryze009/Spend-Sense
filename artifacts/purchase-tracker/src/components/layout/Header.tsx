import React from "react";
import { useLocation } from "wouter";

export function Header() {
  const [location] = useLocation();
  
  const getTitle = () => {
    switch (location) {
      case "/": return "Dashboard";
      case "/purchases": return "Purchases";
      case "/analytics": return "Analytics";
      case "/budgets": return "Budgets";
      case "/categories": return "Categories";
      case "/receipts": return "Receipts";
      case "/settings": return "Settings";
      default: return "Tracker";
    }
  };

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 md:px-8 bg-background/80 backdrop-blur-md sticky top-0 z-40">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{getTitle()}</h1>
      </div>
    </header>
  );
}
