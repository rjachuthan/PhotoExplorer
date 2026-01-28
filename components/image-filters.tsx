"use client";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import type { PeriodOption, SortOption, NsfwOption } from "@/lib/types";

interface ImageFiltersProps {
  period: PeriodOption;
  sort: SortOption;
  nsfw: NsfwOption;
  onPeriodChange: (value: PeriodOption) => void;
  onSortChange: (value: SortOption) => void;
  onNsfwChange: (value: NsfwOption) => void;
}

const periodOptions: { value: PeriodOption; label: string }[] = [
  { value: "Day", label: "Day" },
  { value: "Week", label: "Week" },
  { value: "Month", label: "Month" },
  { value: "Year", label: "Year" },
  { value: "AllTime", label: "All Time" },
];

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "Most Reactions", label: "Most Reactions" },
  { value: "Most Comments", label: "Most Comments" },
  { value: "Newest", label: "Newest" },
];

const nsfwOptions: { value: NsfwOption; label: string }[] = [
  { value: "None", label: "None" },
  { value: "Soft", label: "Soft" },
  { value: "Mature", label: "Mature" },
  { value: "X", label: "X" },
];

export function ImageFilters({
  period,
  sort,
  nsfw,
  onPeriodChange,
  onSortChange,
  onNsfwChange,
}: ImageFiltersProps) {
  return (
    <div className="grid gap-4 py-4 lg:grid-cols-3 md:grid-cols-1">
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">Period</span>
        <ToggleGroup
          type="single"
          value={period}
          onValueChange={(value) => value && onPeriodChange(value as PeriodOption)}
          className="justify-start flex-wrap"
        >
          {periodOptions.map((option) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              aria-label={option.label}
              className="px-3"
            >
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">Sort By</span>
        <ToggleGroup
          type="single"
          value={sort}
          onValueChange={(value) => value && onSortChange(value as SortOption)}
          className="justify-start flex-wrap"
        >
          {sortOptions.map((option) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              aria-label={option.label}
              className="px-3"
            >
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium text-muted-foreground">Content</span>
        <ToggleGroup
          type="single"
          value={nsfw}
          onValueChange={(value) => value && onNsfwChange(value as NsfwOption)}
          className="justify-start flex-wrap"
        >
          {nsfwOptions.map((option) => (
            <ToggleGroupItem
              key={option.value}
              value={option.value}
              aria-label={option.label}
              className="px-3"
            >
              {option.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  );
}
