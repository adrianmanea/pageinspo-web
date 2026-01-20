import { createClient } from "@/utils/supabase/server";
import { Suspense } from "react";
import { HeroHeader } from "@/components/web/hero-header";
import { ComponentGrid } from "@/components/web/component-grid";

export default async function Home() {
  const supabase = await createClient();

  // Fetch components (ordered by created_at)
  let components: any[] = [];
  try {
    const { data } = await supabase
      .from("components")
      .select("*, sources(name, slug)")
      .order("created_at", { ascending: false });

    if (data) components = data;
  } catch (e) {
    console.error("Error fetching components:", e);
  }

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
