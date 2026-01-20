"use strict";

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Monitor, Smartphone, Tablet, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar } from "@/components/ui/avatar";
import { getGradient } from "@/utils/get-gradient";
import { cn } from "@/utils/cn";
import { PreviewFrame } from "@/components/renderer/preview-frame";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PreviewClientProps {
  component: any;
  variants: any[];
}

export function PreviewClient({ component, variants }: PreviewClientProps) {
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">(
    "desktop",
  );

  const [selectedVariant, setSelectedVariant] = useState(
    variants[0] || component,
  );

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col h-screen w-full bg-background overflow-hidden" />
    );
  }

  // Fallback for code/url
  const currentCode = selectedVariant?.code_string || component.code_string;
  const currentUrl = selectedVariant?.preview_url || component.preview_url;

  return (
    <div className="flex flex-col h-screen w-full bg-background overflow-hidden">
      {/* Header */}
      <header className="flex-none h-14 border-b border-border supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4 z-10">
        <div className="flex items-center gap-4 min-w-0">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>

          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar Section */}
            {component.sources ? (
              <Link
                href={`/source/${component.sources.slug}`}
                className="shrink-0"
                title={`View all patterns from ${component.sources.name}`}
              >
                <Avatar className="h-8 w-8 hover:opacity-80 transition-opacity cursor-pointer">
                  <div
                    className="h-full w-full flex items-center justify-center text-white text-[10px] font-bold"
                    style={{
                      backgroundImage: getGradient(
                        component.sources.name || component.name,
                      ),
                    }}
                  >
                    {component.sources.name[0]?.toUpperCase()}
                  </div>
                </Avatar>
              </Link>
            ) : (
              <Avatar className="h-8 w-8 hover:opacity-80 transition-opacity cursor-pointer">
                <div
                  className="h-full w-full flex items-center justify-center text-white text-[10px] font-bold"
                  style={{
                    backgroundImage: getGradient(component.name),
                  }}
                >
                  {component.name[0]?.toUpperCase()}
                </div>
              </Avatar>
            )}

            {/* Text Section */}
            <div className="flex flex-col min-w-0">
              <h1 className="text-sm font-medium text-foreground truncate">
                {component.name}
              </h1>
              {component.sources ? (
                <Link
                  href={`/source/${component.sources.slug}`}
                  className="text-xs text-muted-foreground truncate hover:text-foreground hover:underline transition-colors w-fit cursor-pointer"
                >
                  {component.sources.name}
                </Link>
              ) : (
                <span className="text-xs text-muted-foreground truncate">
                  Preview Mode
                </span>
              )}
            </div>

            {/* Variant Selector */}
            {variants.length > 1 && (
              <div className="ml-4">
                <Select
                  value={selectedVariant.id}
                  onValueChange={(val) => {
                    const found = variants.find((v) => v.id === val);
                    if (found) setSelectedVariant(found);
                  }}
                >
                  <SelectTrigger className="h-7 w-[130px] text-xs px-2 border-border/60 bg-muted/20 cursor-pointer">
                    <SelectValue placeholder="Select variant" />
                  </SelectTrigger>
                  <SelectContent>
                    {variants.map((v) => (
                      <SelectItem key={v.id} value={v.id} className="text-xs">
                        {v.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Device Toggles */}
          <div className="flex items-center bg-muted/50 p-1 rounded-lg border border-border/50">
            <button
              onClick={() => setDevice("desktop")}
              className={cn(
                "p-1.5 rounded-md transition-all cursor-pointer",
                device === "desktop"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
              title="Desktop"
            >
              <Monitor className="h-4 w-4" />
            </button>
            <button
              onClick={() => setDevice("tablet")}
              className={cn(
                "p-1.5 rounded-md transition-all cursor-pointer",
                device === "tablet"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
              title="Tablet (768px)"
            >
              <Tablet className="h-4 w-4" />
            </button>
            <button
              onClick={() => setDevice("mobile")}
              className={cn(
                "p-1.5 rounded-md transition-all cursor-pointer",
                device === "mobile"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
              title="Mobile (375px)"
            >
              <Smartphone className="h-4 w-4" />
            </button>
          </div>

          {/* About/Disclaimer */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <Info className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>About PageInspo</DialogTitle>
              </DialogHeader>
              <div className="text-sm text-muted-foreground space-y-4">
                <p>
                  PageInspo is an educational library of UI patterns. All
                  trademarks and brand names are the property of their
                  respective owners and used here for descriptive purposes only.
                </p>
                <p>
                  The code provided is a clean-room reconstruction for
                  educational and transformative use.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Spacer removed as we have right-side content now */}
      </header>

      {/* Main Preview Area */}
      <main className="flex-1 w-full relative bg-muted/20 flex items-center justify-center overflow-hidden p-4">
        <div
          className={cn(
            "relative transition-all duration-300 ease-in-out bg-background overflow-hidden",
            device === "desktop"
              ? "w-full h-full rounded-none border-0"
              : "shadow-2xl border border-border",
            device === "tablet" && "w-[768px] h-[90%]",
            device === "mobile" && "w-[375px] h-[85%] rounded-[2rem]",
          )}
        >
          <PreviewFrame
            code={currentCode}
            previewUrl={
              currentUrl
                ? `/api/preview-proxy?url=${encodeURIComponent(currentUrl)}`
                : null
            }
            theme="light"
            componentId={component.id}
          />
        </div>
      </main>
    </div>
  );
}
