"use client";

import { useState } from "react";
import Link from "next/link";
import { LayoutGrid, ArrowRight, Component } from "lucide-react";
import { cn } from "@/utils/cn";
import { ComponentDialog } from "@/components/ui/component-dialog";

interface ComponentGridProps {
  flows: any[];
  components: any[];
}

export function ComponentGrid({ flows, components }: ComponentGridProps) {
  const [selectedComponent, setSelectedComponent] = useState<any>(null);

  return (
    <>
      <ComponentDialog
        isOpen={!!selectedComponent}
        onClose={() => setSelectedComponent(null)}
        component={selectedComponent}
      />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-zinc-100 tracking-tight">
            Flows
          </h2>
        </div>

        {flows.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {flows.map((flow) => (
              <Link
                key={flow.id}
                href={`/flow/${flow.id}`}
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-[18px] border border-zinc-800 bg-[#292929]/60 p-5 transition-all text-left",
                  "hover:border-zinc-700 hover:bg-[#292929]/80",
                  "shadow-[inset_0_12px_24px_rgba(255,255,255,0.03),inset_0_0.5px_0.5px_rgba(255,255,255,0.06),inset_0_0.25px_0.25px_rgba(255,255,255,0.12),0_48px_72px_-12px_rgba(0,0,0,0.24),0_32px_44px_-12px_rgba(0,0,0,0.32)]"
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/50 text-zinc-400 group-hover:text-amber-500 group-hover:bg-amber-500/10 transition-colors delay-75">
                    <LayoutGrid className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <span className="text-[10px] font-medium text-zinc-500 group-hover:text-zinc-400">
                    {flow.flow_steps?.[0]?.count || 0} steps
                  </span>
                </div>
                <div className="mt-4 space-y-1">
                  <h3 className="font-medium text-zinc-200 group-hover:text-zinc-50 tracking-tight">
                    {flow.name}
                  </h3>
                  <p className="text-[13px] text-zinc-500 line-clamp-2 leading-relaxed h-10">
                    {flow.description || "A multi-step user journey flow."}
                  </p>
                </div>
                <div className="mt-4 flex items-center text-[11px] font-medium text-amber-500 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span>View Flow</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-zinc-800 p-12 text-center text-zinc-500">
            No flows found. create one to get started.
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-zinc-100 tracking-tight">
            Components
          </h2>
        </div>

        {components.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {components.map((comp) => (
              <button
                key={comp.id}
                onClick={() => setSelectedComponent(comp)}
                className={cn(
                  "group relative flex flex-col justify-between overflow-hidden rounded-[18px] border border-zinc-800 bg-[#292929]/60 p-5 transition-all text-left w-full",
                  "hover:border-zinc-700 hover:bg-[#292929]/80",
                  "shadow-[inset_0_12px_24px_rgba(255,255,255,0.03),inset_0_0.5px_0.5px_rgba(255,255,255,0.06),inset_0_0.25px_0.25px_rgba(255,255,255,0.12),0_48px_72px_-12px_rgba(0,0,0,0.24),0_32px_44px_-12px_rgba(0,0,0,0.32)]"
                )}
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900/50 text-zinc-400 group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-colors delay-75">
                    <Component className="h-5 w-5 stroke-[1.5]" />
                  </div>
                  <span className="text-[10px] font-medium text-zinc-500 group-hover:text-zinc-400">
                    Atomic
                  </span>
                </div>
                <div className="mt-4 space-y-1 w-full">
                  <h3 className="font-medium text-zinc-200 group-hover:text-zinc-50 tracking-tight">
                    {comp.name}
                  </h3>
                  <p className="text-[13px] text-zinc-500 line-clamp-2 leading-relaxed h-10">
                    Reusable UI component for your projects.
                  </p>
                </div>
                <div className="mt-4 flex items-center text-[11px] font-medium text-blue-500 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <span>View Component</span>
                  <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-zinc-800 p-12 text-center text-zinc-500">
            No components found.
          </div>
        )}
      </section>
    </>
  );
}
