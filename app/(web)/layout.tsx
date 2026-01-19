import { Suspense } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Header } from "@/components/ui/header";
import { DisclaimerFooter } from "@/components/ui/disclaimer-footer";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-sidebar font-sans antialiased overflow-hidden">
      <Suspense fallback={<div className="w-[260px] shrink-0" />}>
        <Sidebar className="w-[260px] shrink-0 border-r-0" />
      </Suspense>

      <div className="flex-1 flex flex-col h-full py-2 pr-2 pl-0">
        <div className="flex-1 flex flex-col rounded-3xl border border-border bg-card overflow-hidden relative">
          <Suspense fallback={null}>
            <Header className="bg-transparent border-b border-border/50 backdrop-blur-none" />
          </Suspense>
          <main className="flex-1 overflow-y-auto p-8 scrollbar-thin flex flex-col">
            {children}
          </main>
          <DisclaimerFooter className="mt-auto" />
        </div>
      </div>
    </div>
  );
}
