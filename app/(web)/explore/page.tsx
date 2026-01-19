import { Suspense } from "react";
import { getExploreComponents } from "@/actions/explore";
import { ExploreView } from "@/components/explore/explore-view";

export const metadata = {
  title: "Explore Components | PageInspo",
  description: "Browse the newest UI components, screens, and flows.",
};

export default async function ExplorePage() {
  const initialItems = await getExploreComponents({ limit: 20 });

  return (
    <>
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
    </>
  );
}
