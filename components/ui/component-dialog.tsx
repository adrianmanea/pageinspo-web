"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  X,
  RotateCw,
  ExternalLink,
  Code,
  User,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { useState } from "react";

interface ComponentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  component: any;
}

export function ComponentDialog({
  isOpen,
  onClose,
  component,
}: ComponentDialogProps) {
  if (!component) return null;

  console.log("ComponentDialog Open:", isOpen, "Component ID:", component?.id);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={onClose}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content className="fixed left-[50%] top-[50%] z-50 max-h-[calc(100%-2rem)] w-[90vw] h-[90vh] max-w-[1200px] translate-x-[-50%] translate-y-[-50%] border-none bg-zinc-950 p-0 shadow-2xl duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-[20px] ring-1 ring-zinc-800 overflow-hidden flex flex-col gap-0">
          {/* Header */}
          <div className="flex h-14 items-center justify-between border-b border-zinc-800 px-4 bg-zinc-950 flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400">
                <User className="h-4 w-4" />
              </div>
              <div className="flex flex-col min-w-0">
                <DialogPrimitive.Title className="text-sm font-medium text-zinc-100 truncate">
                  {component.name}
                </DialogPrimitive.Title>
                <span className="text-xs text-zinc-500 truncate">
                  {component.original_app || "Unknown Source"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href={`/component/${component.id}`}
                target="_blank"
                className="inline-flex items-center justify-center h-8 w-8 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
                title="Open in new tab"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>

              <div className="h-4 w-[1px] bg-zinc-800 mx-1" />

              <button
                onClick={onClose}
                className="inline-flex items-center justify-center h-8 w-8 rounded-full text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content (Iframe) */}
          <div className="flex-1 bg-zinc-950 relative overflow-hidden">
            {/* Using an iframe to simulate isolation, or we could render the code directly if unsafe-eval is okay. 
                 For now, let's assume we want to render it via the preview route. 
                 Since /preview.html is migrated, we can use the /component/[id]/preview route if we make one, 
                 or for now just an iframe to the public preview URL if available.
                 
                 However, the user wants to see the component content. 
                 If we store code_string, we might need a sandbox.
                 
                 Let's point to the component page route for now in an iframe, 
                 BUT stripped of layout?
                 
                 Ideally we need a specialized preview component.
                 Let's use a placeholder iframe or the actual component content if we can render it safely.
                 
                 Given the user request showed an iframe src="...", 
                 let's assume we point to a route that renders pure component.
                 We don't have that route yet, so I point to /component/[id].
             */}
            <iframe
              src={`/component/${component.id}/preview`}
              className="w-full h-full border-none bg-zinc-950"
              title="Component Preview"
            />

            {/* Interactive Overlay for "Open" button on hover? The user provided snippet has buttons ON TOP of content? No, it's separate. */}
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
