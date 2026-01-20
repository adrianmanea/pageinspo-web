import { createClient } from "@/utils/supabase/server";
import { ComponentGrid } from "@/components/web/component-grid";
import { getPublicComponentsByCategory } from "@/utils/queries";
import { notFound } from "next/navigation";

// Force dynamic rendering to prevent stale cache
export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getPublicComponentsByCategory(slug);

  if (!data) {
    return notFound();
  }

  const { title, components } = data;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {title}
        </h1>
      </div>
      <ComponentGrid
        items={components}
        title="All Components"
        viewAllLink={`/components/${slug}`}
      />
    </div>
  );
}
