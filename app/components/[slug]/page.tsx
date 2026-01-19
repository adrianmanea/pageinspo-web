import { createClient } from "@/utils/supabase/server";
import { Header } from "@/components/ui/header";
import { ComponentGrid } from "@/components/web/component-grid";
import { Sidebar } from "@/components/ui/sidebar";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // 1. Fetch Filter Definition
  const { data: filterDef } = await supabase
    .from("filter_definitions")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!filterDef) {
    return notFound();
  }

  // 2. Fetch Components for this Filter
  // Join component_filters -> components
  const { data: relations } = await supabase
    .from("component_filters")
    .select("component_id")
    .eq("filter_id", filterDef.id);

  const componentIds = relations?.map((r) => r.component_id) || [];

  let components: any[] = [];
  if (componentIds.length > 0) {
    const { data } = await supabase
      .from("components")
      .select("*")
      .in("id", componentIds)
      .order("created_at", { ascending: false });

    if (data) components = data;
  }

  // Generate Title
  const title = filterDef.name;

  return (
    <div className="flex h-screen w-full bg-sidebar font-sans antialiased overflow-hidden">
      <Sidebar className="w-[260px] shrink-0 border-r-0" />

      <div className="flex-1 flex flex-col h-full py-2 pr-2 pl-0">
        <div className="flex-1 flex flex-col rounded-3xl border border-border bg-card overflow-hidden relative">
          <Header
            className="bg-transparent border-b border-border/50 backdrop-blur-none"
            breadcrumbs={[{ label: title }]}
          />
          <main className="flex-1 overflow-y-auto p-8 scrollbar-thin">
            <ComponentGrid
              items={components}
              title={title}
              description={filterDef.definition}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
