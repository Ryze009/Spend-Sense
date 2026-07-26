import React, { ReactNode } from "react";
import { Sidebar, MobileNav } from "./Sidebar";
import { Header } from "./Header";
import { seedDemoData } from "@/lib/seed";

export function Layout({ children }: { children: ReactNode }) {
  React.useEffect(() => {
    seedDemoData();
  }, []);

  return (
    <div className="h-[100dvh] w-full flex overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          <div className="max-w-6xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
