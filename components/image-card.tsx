"use client";

import Image from "next/image";
import { ThumbsUp, Heart, ThumbsDown, Laugh, Frown, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/civitai";
import type { ImageStats } from "@/lib/types";

interface ImageCardProps {
  url: string;
  stats: ImageStats;
}

export function ImageCard({ url, stats }: ImageCardProps) {
  const statItems = [
    { icon: ThumbsUp, count: stats.likeCount, label: "Likes" },
    { icon: Heart, count: stats.heartCount, label: "Hearts" },
    { icon: ThumbsDown, count: stats.dislikeCount, label: "Dislikes" },
    { icon: Laugh, count: stats.laughCount, label: "Laughs" },
    { icon: Frown, count: stats.cryCount, label: "Cries" },
    { icon: MessageCircle, count: stats.commentCount, label: "Comments" },
  ];

  return (
    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:bg-accent/50">
      <div className="p-4">
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={url}
            alt="CivitAI Image"
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            unoptimized
          />
        </div>

        <div className="mt-3 flex flex-wrap justify-center gap-1">
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
