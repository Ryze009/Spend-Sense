import React from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, Receipt, BarChart3, Target, Tags, FileText, Settings, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/purchases", label: "Purchases", icon: Receipt },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/budgets", label: "Budgets", icon: Target },
  { href: "/categories", label: "Categories", icon: Tags },
  { href: "/receipts", label: "Receipts", icon: FileText },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <div className="w-64 border-r border-border bg-sidebar h-full flex flex-col pt-6 hidden md:flex">
      <div className="px-6 mb-8 flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
        <div className="bg-primary text-primary-foreground p-1.5 rounded-md">
          <Receipt size={20} />
        </div>
        Purchase Tracker
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors cursor-pointer text-sm font-medium",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                )}
              >
                <Icon size={18} className={isActive ? "text-primary" : "text-muted-foreground"} />
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <Link href="/purchases?new=true">
          <div className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 rounded-md hover:brightness-110 transition-all shadow-sm cursor-pointer font-medium text-sm">
            <Plus size={16} />
            Add Purchase
          </div>
        </Link>
      </div>
    </div>
  );
}

export function MobileNav() {
  const [location] = useLocation();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border flex items-center justify-around py-3 px-2 z-50 pb-safe">
      {NAV_ITEMS.slice(0, 5).map((item) => {
        const isActive = location === item.href;
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href}>
            <div
              className={cn(
                "flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-colors cursor-pointer",
                isActive ? "text-primary" : "text-muted-foreground"
              )}
            >
              <Icon size={20} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
