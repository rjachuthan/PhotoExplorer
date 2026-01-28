"use client";

import Image from "next/image";
import { Download, Heart, MessageCircle, Star, User } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatNumber } from "@/lib/civitai";
import type { ExtractedModel } from "@/lib/types";

interface ModelCardProps {
  model: ExtractedModel;
}

export function ModelCard({ model }: ModelCardProps) {
  const statItems = [
    { icon: Download, count: model.stats.downloadCount, label: "Downloads" },
    { icon: Heart, count: model.stats.favoriteCount, label: "Favorites" },
    { icon: MessageCircle, count: model.stats.commentCount, label: "Comments" },
  ];

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:bg-accent/50">
      <div className="p-4">
        {/* Image with badge */}
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={model.image}
            alt={model.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized
          />
          <Badge className="absolute bottom-2 left-1/2 -translate-x-1/2">
            {model.type}
          </Badge>
        </div>

        {/* Creator info */}
        <div className="mt-3 flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
            {model.creatorImage ? (
              <Image
                src={model.creatorImage}
                alt={model.creator}
                width={40}
                height={40}
                className="rounded-xl object-cover"
                unoptimized
              />
            ) : (
              <User className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-semibold">{model.name}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span className="truncate">{model.creator}</span>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{model.stats.rating.toFixed(1)}</span>
              <span className="text-xs">({formatNumber(model.stats.ratingCount)})</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-3 flex justify-center gap-2">
          {statItems.map((stat) => (
            <span
              key={stat.label}
              className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-muted-foreground"
              title={stat.label}
            >
              <stat.icon className="h-3 w-3" />
              {formatNumber(stat.count)}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
