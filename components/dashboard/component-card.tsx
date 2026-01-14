"use client";

import { getGradient } from "@/utils/get-gradient";
import { cn } from "@/utils/cn";
import { Avatar } from "@/components/ui/avatar";
import { Component } from "lucide-react";

interface ComponentCardProps {
  item: {
    id: number;
    name: string;
    description?: string;
    thumbnail_url?: string;
    original_app?: string;
    [key: string]: any;
  };
  className?: string;
  onClick?: () => void;
}

export function ComponentCard({
  item,
  className,
  onClick,
}: ComponentCardProps) {
  // Dummy avatar data

  return (
    <div
      className={cn("group cursor-pointer flex flex-col gap-3", className)}
      onClick={onClick}
    >
      {/* Header: Avatar + Meta */}
      <div className="flex items-center gap-3 px-1">
        <Avatar className="h-8 w-8 border border-border">
          <div
            className="h-full w-full flex items-center justify-center text-white text-[10px] font-bold"
            style={{ backgroundImage: getGradient(item.name || "Component") }}
          >
            {(item.name?.[0] || "C").toUpperCase()}
          </div>
        </Avatar>
        <div className="flex flex-col overflow-hidden min-w-0">
          <span className="text-xs font-medium text-foreground truncate w-full">
            {item.name}
          </span>
          <span className="text-[10px] text-muted-foreground truncate w-full flex items-center gap-1">
            {item.original_app || "Pro Concept"}{" "}
            <span className="text-muted-foreground/40">•</span> Default
          </span>
        </div>
      </div>

      {/* Thumbnail Card */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border bg-muted">
        {item.thumbnail_url ? (
          item.thumbnail_url.endsWith(".mp4") ? (
            <video
              src={item.thumbnail_url}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <img
              src={item.thumbnail_url}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary/20">
            <Component className="h-10 w-10 text-muted-foreground/30" />
          </div>
        )}

        {/* Overlay (Optional) */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
      </div>
    </div>
  );
}
