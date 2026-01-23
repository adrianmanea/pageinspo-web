"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface OgImageUploadProps {
  currentOgImageUrl?: string;
  ogImageFile: File | null;
  setOgImageFile: (file: File | null) => void;
}

export function OgImageUpload({
  currentOgImageUrl,
  ogImageFile,
  setOgImageFile,
}: OgImageUploadProps) {
  return (
    <div className="grid gap-2">
      <Label>OG Image (Social Share)</Label>
      <div className="flex items-center gap-4">
        <div className="flex-1 space-y-2">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => setOgImageFile(e.target.files?.[0] || null)}
            className="bg-background border-input text-xs cursor-pointer"
          />
          <p className="text-[10px] text-muted-foreground">
            Auto-generated for videos. Upload to override.
          </p>
        </div>
        {(ogImageFile || currentOgImageUrl) && (
          <div className="relative h-10 w-16 flex-shrink-0 overflow-hidden rounded border border-border">
            <img
              src={
                ogImageFile
                  ? URL.createObjectURL(ogImageFile)
                  : currentOgImageUrl
              }
              alt="OG Preview"
              className="h-full w-full object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
