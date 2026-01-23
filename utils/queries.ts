import { createClient } from "@/utils/supabase/server";
import { cache } from "react";

export const getPublicComponents = cache(async (limit = 10) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("components")
    .select("*, sources(name, slug)")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching components:", error);
    return [];
  }
  return data;
});

export const getPublicSource = cache(async (slug: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sources")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) return null;
  return data;
});

export const getPublicSourceComponents = cache(async (sourceId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("components")
    .select("*, sources!inner(*)")
    .eq("source_id", sourceId)
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching source components:", error);
    return [];
  }
  return data;
});

export const getPublicComponent = cache(async (id: string | number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("components")
    .select("*, sources (name, slug, icon_url)")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data;
});

export const getPublicComponentMetadata = cache(async (id: string | number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("components")
    .select("name, description, og_image_url, thumbnail_url, sources(name)")
    .eq("id", id)
    .eq("status", "published")
    .single();

  if (error) return null;
  return data;
});

export const getComponentVariants = cache(async (componentId: string | number) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("component_variants")
    .select("*")
    .eq("component_id", componentId)
    .order("is_default", { ascending: false })
    .order("created_at", { ascending: true });
    
  if (error) return [];
  return data;
});

export const getPublicComponentsByCategory = cache(async (categorySlug: string) => {
  const supabase = await createClient();
  
  // 1. Fetch category details (for title)
  const { data: category } = await supabase
    .from("filter_definitions")
    .select("name")
    .eq("slug", categorySlug)
    .single();

  if (!category) return null;

  // 2. Fetch published components for this category
  const { data: components, error } = await supabase
    .from("components")
    .select("*, sources (name, slug), component_filters!inner(filter_definitions!inner(slug))")
    .eq("status", "published")
    .eq("component_filters.filter_definitions.slug", categorySlug)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching category components:", error);
    return { title: category.name, components: [] };
  }

  return { title: category.name, components: components || [] };
});
