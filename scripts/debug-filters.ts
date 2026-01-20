
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const envPath = path.resolve(process.cwd(), ".env.local");
const envContent = fs.readFileSync(envPath, "utf-8");
const envVars: Record<string, string> = {};
envContent.split("\n").forEach(line => {
  const [key, val] = line.split("=");
  if (key && val) envVars[key.trim()] = val.trim();
});

const supabaseUrl = envVars["NEXT_PUBLIC_SUPABASE_URL"];
const supabaseKey = envVars["NEXT_PUBLIC_SUPABASE_ANON_KEY"];
console.log("URL:", supabaseUrl);

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspectAll() {
  console.log("--- Inspecting ALL Filters ---");
  
  // 1. Get all filters
  const { data: filters, error: fErr } = await supabase
    .from("filter_definitions")
    .select("id, name, slug");
    
  if (fErr) { console.error(fErr); return; }
  
  if (!filters) return;

  for (const filter of filters) {
      // 2. Count components
      const { count, error: cErr } = await supabase
        .from("component_filters")
        .select("*", { count: "exact", head: true })
        .eq("filter_id", filter.id);
        
      // 3. Get first few component IDs
      const { data: relations } = await supabase
        .from("component_filters")
        .select("component_id")
        .eq("filter_id", filter.id)
        .limit(3);
        
      const ids = relations?.map(r => r.component_id).join(", ");
        
      console.log(`[${filter.slug.padEnd(20)}] ${filter.name.padEnd(20)} -> Count: ${count}, IDs: [${ids}]`);
  }
}

async function main() {
    await inspectAll();
}

main();
