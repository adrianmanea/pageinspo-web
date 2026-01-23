"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ThumbnailUploadProps {
  currentThumbnailUrl?: string;
  thumbnailFile: File | null;
  setThumbnailFile: (file: File | null) => void;
}

export function ThumbnailUpload({
  currentThumbnailUrl,
  thumbnailFile,
  setThumbnailFile,
}: ThumbnailUploadProps) {
  return (
    <div className="grid gap-2">
      <Label>Thumbnail</Label>
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*,video/mp4"
          onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
          className="bg-background border-input text-xs cursor-pointer"
        />
        {(thumbnailFile || currentThumbnailUrl) && (
          <div className="relative h-10 w-16 flex-shrink-0 overflow-hidden rounded border border-border">
            {thumbnailFile ? (
              thumbnailFile.type.startsWith("video/") ? (
                <video
                  src={URL.createObjectURL(thumbnailFile)}
                  className="h-full w-full object-cover"
                  itemProp="video"
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={URL.createObjectURL(thumbnailFile)}
                  alt="New thumbnail"
                  className="h-full w-full object-cover"
                />
              )
            ) : currentThumbnailUrl?.match(/\.(mp4|webm)$/i) ? (
              <video
                src={currentThumbnailUrl}
                className="h-full w-full object-cover"
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={currentThumbnailUrl}
                alt="Current thumbnail"
                className="h-full w-full object-cover"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
