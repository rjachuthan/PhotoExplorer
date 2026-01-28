import { NextRequest, NextResponse } from "next/server";
import { fetchImages } from "@/lib/civitai";
import type { PeriodOption, SortOption, NsfwOption } from "@/lib/types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const period = (searchParams.get("period") as PeriodOption) || "Day";
  const sort = (searchParams.get("sort") as SortOption) || "Newest";
  const nsfw = (searchParams.get("nsfw") as NsfwOption) || "None";

  try {
    const data = await fetchImages(period, sort, nsfw);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching images:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
