"use client";

import { Search, PanelLeft, User, LogOut } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-zinc-800 bg-zinc-950/80 px-4 backdrop-blur-xl">
      <button className="lg:hidden text-zinc-400 hover:text-zinc-100 transition-colors">
        <PanelLeft className="h-5 w-5" />
      </button>

      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500" />
          <input
            type="search"
            placeholder="Search components..."
            className="h-9 w-full rounded-full border border-zinc-800 bg-zinc-900/50 pl-9 pr-4 text-[13px] text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-all hover:bg-zinc-900"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 hidden sm:inline-block">
              {user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-[13px] font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100 transition-all"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-amber-500/20 to-purple-500/20 ring-1 ring-zinc-800 flex items-center justify-center text-xs font-medium text-zinc-300">
              {user.email?.[0].toUpperCase()}
            </div>
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5 text-[13px] font-medium text-zinc-950 hover:bg-zinc-300 transition-colors"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Log In</span>
          </Link>
        )}
      </div>
    </header>
  );
}
