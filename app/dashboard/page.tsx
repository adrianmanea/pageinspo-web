import Link from "next/link";
import {
  Megaphone,
  Image as ImageIcon,
  Square,
  MousePointerClick,
  Users,
  ArrowRightLeft,
  Dock,
  PanelBottom,
  TvMinimal,
  Link as LinkIcon,
  Map as MapIcon,
  Menu,
  CreditCard,
  ScrollText,
  Sparkles,
  MessageSquareQuote,
  AlignJustify,
} from "lucide-react";
import { cn } from "@/utils/cn";

const blocks = [
  {
    name: "Announcements",
    count: 10,
    icon: Megaphone,
    href: "/dashboard/announcements",
  },
  {
    name: "Backgrounds",
    count: 33,
    icon: ImageIcon,
    href: "/dashboard/backgrounds",
  },
  { name: "Borders", count: 12, icon: Square, href: "/dashboard/borders" },
  {
    name: "Calls to Action",
    count: 34,
    icon: MousePointerClick,
    href: "/dashboard/cta",
  },
  { name: "Clients", count: 16, icon: Users, href: "/dashboard/clients" },
  {
    name: "Comparisons",
    count: 6,
    icon: ArrowRightLeft,
    href: "/dashboard/comparisons",
  },
  { name: "Docks", count: 6, icon: Dock, href: "/dashboard/docks" },
  { name: "Footers", count: 14, icon: PanelBottom, href: "/dashboard/footers" },
  { name: "Heroes", count: 73, icon: TvMinimal, href: "/dashboard/heroes" },
  { name: "Hooks", count: 31, icon: LinkIcon, href: "/dashboard/hooks" },
  { name: "Images", count: 26, icon: ImageIcon, href: "/dashboard/images" },
  { name: "Maps", count: 2, icon: MapIcon, href: "/dashboard/maps" },
  {
    name: "Navigation Menus",
    count: 11,
    icon: Menu,
    href: "/dashboard/navigation",
  },
  {
    name: "Pricing Sections",
    count: 17,
    icon: CreditCard,
    href: "/dashboard/pricing",
  },
  {
    name: "Scroll Areas",
    count: 24,
    icon: ScrollText,
    href: "/dashboard/scroll",
  },
  { name: "Shaders", count: 15, icon: Sparkles, href: "/dashboard/shaders" },
  {
    name: "Testimonials",
    count: 17,
    icon: MessageSquareQuote,
    href: "/dashboard/testimonials",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between px-1">
        <h1 className="text-2xl font-semibold text-zinc-100">Components</h1>
        <div className="flex items-center gap-2 text-sm text-zinc-500">
          <span>Sort by:</span>
          <button className="flex items-center gap-1 text-zinc-300 hover:text-zinc-100">
            Default
            <AlignJustify className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {blocks.map((block) => (
          <Link
            key={block.name}
            href={block.href}
            className={cn(
              "group relative flex flex-col justify-between overflow-hidden rounded-[18px] border border-zinc-800 bg-[#292929]/60 p-5 transition-all",
              "hover:border-zinc-700 hover:bg-[#292929]/80",
              "shadow-[inset_0_12px_24px_rgba(255,255,255,0.03),inset_0_0.5px_0.5px_rgba(255,255,255,0.06),inset_0_0.25px_0.25px_rgba(255,255,255,0.12),0_48px_72px_-12px_rgba(0,0,0,0.24),0_32px_44px_-12px_rgba(0,0,0,0.32)]"
            )}
          >
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/50 text-zinc-400 group-hover:text-zinc-100 group-hover:bg-zinc-900 transition-colors">
                <block.icon className="h-5 w-5 stroke-[1.5]" />
              </div>
              <span className="text-[10px] font-medium text-zinc-500 group-hover:text-zinc-400">
                {block.count} items
              </span>
            </div>
            <div className="mt-4">
              <h3 className="font-medium text-zinc-200 group-hover:text-zinc-50">
                {block.name}
              </h3>
              <p className="text-[13px] text-zinc-500 mt-1 line-clamp-2 leading-relaxed">
                Beautiful {block.name.toLowerCase()} for your next project. Copy
                & paste ready.
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
