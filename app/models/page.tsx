"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import { Loader2 } from "lucide-react";
import { ModelCard } from "@/components/model-card";
import { ModelFilters } from "@/components/model-filters";
import type { ModelType, ModelSort, ExtractedModel } from "@/lib/types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ModelsPage() {
  const [modelType, setModelType] = useState<ModelType>("Type");
  const [sort, setSort] = useState<ModelSort>("No Sort");
  const [nsfw, setNsfw] = useState(false);

  const { data, error, isLoading, mutate } = useSWR<ExtractedModel[]>(
    `/api/models?modelType=${modelType}&sort=${sort}&nsfw=${nsfw}`,
    fetcher
  );

  useEffect(() => {
    mutate();
  }, [modelType, sort, nsfw, mutate]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-2">CivitAI Models</h1>
      <p className="text-muted-foreground mb-6">
        Explore AI models including Checkpoints, LORAs, ControlNets, and more
      </p>

      <ModelFilters
        modelType={modelType}
        sort={sort}
        nsfw={nsfw}
        onModelTypeChange={setModelType}
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
          <p className="text-destructive">Failed to load models. Please try again.</p>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {data.map((model, index) => (
            <ModelCard key={`${model.name}-${index}`} model={model} />
          ))}
        </div>
      )}

      {data && data.length === 0 && !isLoading && (
        <div className="flex items-center justify-center py-20">
          <p className="text-muted-foreground">No models found with the current filters.</p>
        </div>
      )}
    </div>
  );
}
