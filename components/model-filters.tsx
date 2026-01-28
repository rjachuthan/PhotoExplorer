"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import type { ModelType, ModelSort } from "@/lib/types";

interface ModelFiltersProps {
  modelType: ModelType;
  sort: ModelSort;
  nsfw: boolean;
  onModelTypeChange: (value: ModelType) => void;
  onSortChange: (value: ModelSort) => void;
  onNsfwChange: (value: boolean) => void;
}

const modelTypeOptions: { value: ModelType; label: string }[] = [
  { value: "Type", label: "All Types" },
  { value: "Checkpoint", label: "Checkpoint" },
  { value: "LORA", label: "LORA" },
  { value: "Controlnet", label: "ControlNet" },
  { value: "Poses", label: "Poses" },
  { value: "TextualInversion", label: "Textual Inversion" },
  { value: "Hypernetwork", label: "Hypernetwork" },
  { value: "AestheticGradient", label: "Aesthetic Gradient" },
];

const sortOptions: { value: ModelSort; label: string }[] = [
  { value: "No Sort", label: "No Sort" },
  { value: "Highest Rated", label: "Highest Rated" },
  { value: "Most Downloaded", label: "Most Downloaded" },
  { value: "Newest", label: "Newest" },
];

export function ModelFilters({
  modelType,
  sort,
  nsfw,
  onModelTypeChange,
  onSortChange,
  onNsfwChange,
}: ModelFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-4">
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium text-muted-foreground">Type</Label>
        <Select value={modelType} onValueChange={(value) => onModelTypeChange(value as ModelType)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            {modelTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium text-muted-foreground">Sort</Label>
        <Select value={sort} onValueChange={(value) => onSortChange(value as ModelSort)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Select sort" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label className="text-sm font-medium text-muted-foreground">NSFW</Label>
        <div className="flex items-center gap-2 h-9">
          <Switch
            id="nsfw-toggle"
            checked={nsfw}
            onCheckedChange={onNsfwChange}
          />
          <Label htmlFor="nsfw-toggle" className="text-sm">
            {nsfw ? "On" : "Off"}
          </Label>
        </div>
      </div>
    </div>
  );
}
