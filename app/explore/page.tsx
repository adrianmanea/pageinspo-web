import { Suspense } from "react";
import { getExploreComponents } from "@/actions/explore";
import { ExploreView } from "@/components/explore/explore-view";
import { Sidebar } from "@/components/ui/sidebar";
import { Header } from "@/components/ui/header";
import { DisclaimerFooter } from "@/components/ui/disclaimer-footer";

export const metadata = {
  title: "Explore Components | PageInspo",
  description: "Browse the newest UI components, screens, and flows.",
};

export default async function ExplorePage() {
  const initialItems = await getExploreComponents({ limit: 20 });
  const breadcrumbs = [{ title: "Explore", href: "/explore" }];

  return (
    <div className="flex h-screen w-full bg-sidebar font-sans antialiased overflow-hidden">
      <Sidebar className="w-[260px] shrink-0 border-r-0" />

      <div className="flex-1 flex flex-col h-full py-2 pr-2 pl-0">
        <div className="flex-1 flex flex-col rounded-3xl border border-border bg-card overflow-hidden relative">
          <Header
            className="bg-transparent border-b border-border/50 backdrop-blur-none"
            breadcrumbs={breadcrumbs}
          />
          <main className="flex-1 overflow-y-auto p-8 scrollbar-thin flex flex-col">
            <div className="mb-8">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-4">
                Explore
              </h1>
              <p className="text-muted-foreground text-lg">
                Discover the latest UI components and inspiration.
              </p>
            </div>

            <Suspense
              fallback={
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="aspect-[4/3] rounded-xl bg-muted/40 animate-pulse"
                    />
                  ))}
                </div>
              }
            >
              <ExploreView initialItems={initialItems} />
            </Suspense>

            <DisclaimerFooter className="mt-auto" />
          </main>
        </div>
      </div>
    </div>
  );
}
