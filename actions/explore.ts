"use server";

import { createClient } from "@/utils/supabase/server";

export async function getExploreComponents({
  offset = 0,
  limit = 20,
}: {
  offset?: number;
  limit?: number;
}) {
  const supabase = await createClient();

  // Fetch components ordered by created_at descending
  // We include sources because ComponentCard might expect it, though usually it's just flattened or used in specific ways.
  // Based on app/page.tsx, it selects "*, sources(name, slug)".
  const { data, error } = await supabase
    .from("components")
    .select("*, sources(name, slug)")
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) {
    console.error("Error fetching explore components:", error);
    return [];
  }

  return data || [];
}
