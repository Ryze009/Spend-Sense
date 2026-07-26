import React from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "./pages/Dashboard";
import Purchases from "./pages/Purchases";
import Analytics from "./pages/Analytics";
import Budgets from "./pages/Budgets";
import Categories from "./pages/Categories";
import Receipts from "./pages/Receipts";
import Settings from "./pages/Settings";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/purchases" component={Purchases} />
      <Route path="/analytics" component={Analytics} />
      <Route path="/budgets" component={Budgets} />
      <Route path="/categories" component={Categories} />
      <Route path="/receipts" component={Receipts} />
      <Route path="/settings" component={Settings} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
            <Router />
          </WouterRouter>
          <Toaster position="bottom-right" richColors />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
