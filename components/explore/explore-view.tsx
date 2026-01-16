"use client";

import { useState } from "react";
import { ComponentGrid } from "@/components/dashboard/component-grid";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getExploreComponents } from "@/actions/explore";

interface ExploreViewProps {
  initialItems: any[];
}

export function ExploreView({ initialItems }: ExploreViewProps) {
  const [items, setItems] = useState<any[]>(initialItems);
  const [offset, setOffset] = useState(initialItems.length);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const limit = 20;
      const newItems = await getExploreComponents({ offset, limit });

      if (newItems.length < limit) {
        setHasMore(false);
      }

      if (newItems.length > 0) {
        setItems((prev) => [...prev, ...newItems]);
        setOffset((prev) => prev + newItems.length);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to load more items:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      <ComponentGrid items={items} />

      {hasMore && (
        <div className="flex justify-center pt-4 pb-8">
          <Button
            variant="outline"
            size="lg"
            onClick={handleLoadMore}
            disabled={loading}
            className="min-w-[200px]"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
