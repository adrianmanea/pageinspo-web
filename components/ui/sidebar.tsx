"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Layout,
  Image as ImageIcon,
  Link as LinkIcon,
  Map as MapIcon,
  Sun,
} from "lucide-react";
import { cn } from "@/utils/cn";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "hidden w-[240px] flex-col border-r border-zinc-800 bg-zinc-950 text-zinc-400 lg:flex",
        className
      )}
      {...props}
    >
      <div className="flex h-12 items-center px-4 py-2">
        <button className="flex items-center gap-2 rounded-full px-2 py-1 hover:bg-zinc-900 transition-colors text-zinc-100">
          <div className="flex h-5 w-6 items-center justify-center rounded-sm bg-zinc-100 text-zinc-950 font-bold text-[10px]">
            USR
          </div>
          <span className="text-sm font-medium">Userflows</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-2">
        <div className="px-3 py-2">
          <div className="space-y-0.5">
            <NavItem
              href="/"
              icon={Home}
              label="Main"
              active={pathname === "/"}
            />
          </div>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-2 px-2 text-xs font-medium text-zinc-500">
            Components
          </h2>
          <div className="space-y-0.5">
            <NavItem
              href="/dashboard/components"
              icon={Layout}
              label="Components"
              active={pathname?.startsWith("/dashboard/components")}
            />
            <div className="ml-4 space-y-0.5 border-l border-zinc-800 pl-4 mt-1">
              <NavItem
                href="/dashboard/user-settings"
                label="User Settings"
                active={pathname === "/dashboard/user-settings"}
                compact
              />
              <NavItem
                href="/dashboard/onboarding"
                label="Onboarding"
                active={pathname === "/dashboard/onboarding"}
                compact
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-900 p-4">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 rounded-full bg-zinc-900/50 px-3 py-1.5 text-xs font-medium text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors">
            Log in
          </button>
          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-900/50 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors">
            <Sun className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

interface NavItemProps {
  href: string;
  icon?: React.ElementType;
  label: string;
  active?: boolean;
  count?: number;
  badge?: string;
  badgeColor?: "blue" | "green";
  compact?: boolean;
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  count,
  badge,
  badgeColor,
  compact,
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group flex w-full items-center justify-between rounded-md px-2 py-1.5 text-[13px] font-medium transition-colors hover:bg-zinc-900 hover:text-zinc-200",
        active ? "bg-zinc-900 text-zinc-100" : "text-zinc-400",
        compact && "py-1 text-[13px]"
      )}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-4 w-4 stroke-[1.5]" />}
        <span>{label}</span>
        {badge && (
          <span
            className={cn(
              "ml-2 rounded-full px-1.5 py-0.5 text-[10px] font-medium leading-none",
              badgeColor === "blue" && "bg-blue-500/10 text-blue-500",
              badgeColor === "green" && "bg-green-500/10 text-green-500",
              !badgeColor && "bg-zinc-800 text-zinc-400"
            )}
          >
            {badge}
          </span>
        )}
      </div>
      {count !== undefined && (
        <span className="text-[10px] text-zinc-600 group-hover:text-zinc-500">
          {count}
        </span>
      )}
    </Link>
  );
}
