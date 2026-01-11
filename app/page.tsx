import Link from "next/link";
import {
  LayoutGrid,
  Play,
  Component,
  AlignJustify,
  ArrowRight,
} from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/ui/sidebar";
import { Header } from "@/components/ui/header";
import { cn } from "@/utils/cn";
import { ComponentGrid } from "@/components/dashboard/component-grid";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";
    const supabase = await createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  // Fetch flows
  let flows: any[] = [];
  try {
    const { data } = await supabase
      .from("flows")
      .select("*, flow_steps(count)")
      .order("created_at", { ascending: false });
    if (data) flows = data;
  } catch (e) {
    console.error("Error fetching flows:", e);
  }

  // Fetch components
  let components: any[] = [];
  try {
    const { data } = await supabase
      .from("components")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) components = data;
  } catch (e) {
    console.error("Error fetching components:", e);
  }

  return (
    <div className="flex min-h-screen items-start bg-zinc-950 text-zinc-100 font-sans antialiased">
      <Sidebar className="sticky top-0 h-screen" />
      <div className="flex flex-1 flex-col min-w-0">
        <Header />
        <main className="flex-1 p-6 space-y-10">
          <ComponentGrid flows={flows} components={components} />
        </main>
      </div>
    </div>
  );
}
