"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Loader2 } from "lucide-react";
import { ImageCard } from "@/components/image-card";
import { ImageFilters } from "@/components/image-filters";
import type { PeriodOption, SortOption, NsfwOption, CivitaiImagesResponse } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ImagesPage() {
  const [period, setPeriod] = useState<PeriodOption>("Day");
  const [sort, setSort] = useState<SortOption>("Newest");
  const [nsfw, setNsfw] = useState<NsfwOption>("None");

  const { data, error, isLoading, mutate } = useSWR<CivitaiImagesResponse>(
    `/api/images?period=${period}&sort=${sort}&nsfw=${nsfw}`,
    fetcher
  );

  useEffect(() => {
    mutate();
  }, [period, sort, nsfw, mutate]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-2">CivitAI Images</h1>
      <p className="text-muted-foreground mb-6">
        Browse AI-generated images from the CivitAI community
      </p>

      <ImageFilters
        period={period}
        sort={sort}
        nsfw={nsfw}
        onPeriodChange={setPeriod}
        onSortChange={setSort}
        onNsfwChange={setNsfw}
      />

      {isLoading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && (
        <div className="flex items-center justify-center py-20">
          <p className="text-destructive">Failed to load images. Please try again.</p>
        </div>
      )}

      {data && data.items && (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {data.items.map((image) => (
            <ImageCard key={image.id} url={image.url} stats={image.stats} />
          ))}
        </div>
      )}

      {data && (!data.items || data.items.length === 0) && !isLoading && (
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">No images found with the current filters.</p>
        </div>
      )}
    </div>
  );
}
