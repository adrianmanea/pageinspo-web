import { createClient } from "@/utils/supabase/server";
import { ComponentGrid } from "@/components/web/component-grid";
import { notFound } from "next/navigation";

// Force dynamic rendering to prevent stale cache
export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // 1. Fetch Filter Definition AND related Components in one robust query
  const { data: filterDef } = await supabase
    .from("filter_definitions")
    .select("*, component_filters(components(*, sources(*)))")
    .eq("slug", slug)
    .single();

  if (!filterDef) {
    return notFound();
  }

  // 2. Extract and sort components
  // The nested structure is: filter -> component_filters[] -> components (object)
  // We need to flatten this structure into a list of components
  const components =
    filterDef.component_filters
      ?.map((cf: any) => cf.components)
      .filter((c: any) => c !== null) // Filter out any nulls if join failed
      .sort(
        (a: any, b: any) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      ) || [];

  // Generate Title
  const title = filterDef.name;

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
