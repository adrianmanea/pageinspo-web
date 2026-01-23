"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";

export interface Variant {
  id: string;
  name: string;
  type: "code" | "url";
  content: string; // URL or Code string
  file: File | null;
}

interface VariantManagerProps {
  variants: Variant[];
  setVariants: (variants: Variant[]) => void;
}

export function VariantManager({ variants, setVariants }: VariantManagerProps) {
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        id: crypto.randomUUID(),
        name: "",
        type: "code",
        content: "",
        file: null,
      },
    ]);
  };

  const removeVariant = (id: string) => {
    setVariants(variants.filter((v) => v.id !== id));
  };

  const updateVariant = (id: string, field: keyof Variant, value: any) => {
    setVariants(
      variants.map((v) => (v.id === id ? { ...v, [field]: value } : v)),
    );
  };

  return (
    <div className="space-y-4 pt-4 border-t border-border">
      <div className="flex items-center justify-between">
        <Label>
          Additional Variants{" "}
          <span className="text-muted-foreground/70 font-normal">
            (Optional)
          </span>
        </Label>
        <Button
          onClick={addVariant}
          variant="secondary"
          size="sm"
          className="h-7 text-xs"
        >
          + Add Variant
        </Button>
      </div>

      <div className="space-y-4">
        {variants.length === 0 && (
          <p className="text-xs text-muted-foreground italic">
            No additional variants added.
          </p>
        )}
        {variants.map((variant) => (
          <div
            key={variant.id}
            className="bg-muted/30 border border-border rounded-xl p-4 space-y-4 relative group"
          >
            <Button
              onClick={() => removeVariant(variant.id)}
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 text-muted-foreground/50 hover:text-red-500 hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Variant Name
                </label>
                <input
                  type="text"
                  value={variant.name}
                  onChange={(e) =>
                    updateVariant(variant.id, "name", e.target.value)
                  }
                  className="w-full h-9 px-3 bg-background border border-border rounded-md text-sm"
                  placeholder="e.g. React Code"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Type
                </label>
                <select
                  value={variant.type}
                  onChange={(e) =>
                    updateVariant(variant.id, "type", e.target.value)
                  }
                  className="w-full h-9 px-3 bg-background border border-border rounded-md text-sm"
                >
                  <option value="code">HTML File</option>
                  <option value="url">External URL</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Content Source
                </label>
                {variant.type === "url" ? (
                  <input
                    type="text"
                    value={variant.content || ""}
                    onChange={(e) =>
                      updateVariant(variant.id, "content", e.target.value)
                    }
                    className="w-full h-9 px-3 bg-background border border-border rounded-md text-sm font-mono"
                    placeholder="https://..."
                  />
                ) : (
                  <div className="space-y-1">
                    <input
                      type="file"
                      accept=".html"
                      onChange={(e) =>
                        updateVariant(
                          variant.id,
                          "file",
                          e.target.files?.[0] || null,
                        )
                      }
                      className="w-full text-xs text-muted-foreground file:mr-2 file:py-1 file:px-2 file:rounded-sm file:border-0 file:text-xs file:font-semibold file:bg-secondary file:text-secondary-foreground"
                    />
                    {!variant.file && variant.content && (
                      <div className="text-[10px] text-muted-foreground truncate max-w-[200px]">
                        Current: {variant.content.split("/").pop()}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
