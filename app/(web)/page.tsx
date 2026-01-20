import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";
import { HeroHeader } from "@/components/web/hero-header";
import { ComponentGrid } from "@/components/web/component-grid";
import { getPublicComponents } from "@/utils/queries";

export default async function Home() {
  const supabase = await createClient();

  // Fetch components (ordered by created_at)
  const components = await getPublicComponents(10);

  return (
    <div className="w-full px-8 space-y-24">
      {/* Hero Section */}
      <HeroHeader />

      {/* Grid Section */}
      <Suspense
        fallback={
          <div className="h-64 w-full bg-muted/10 rounded-xl animate-pulse" />
        }
      >
        <ComponentGrid items={components.slice(0, 10)} viewAllLink="/explore" />
      </Suspense>
    </div>
  );
}
