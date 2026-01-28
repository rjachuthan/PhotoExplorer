import { NextRequest, NextResponse } from "next/server";
import { fetchModels } from "@/lib/civitai";
import type { ModelType, ModelSort } from "@/lib/types";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  const modelType = (searchParams.get("modelType") as ModelType) || "Type";
  const sort = (searchParams.get("sort") as ModelSort) || "No Sort";
  const nsfw = searchParams.get("nsfw") === "true";

  try {
    const data = await fetchModels(modelType, sort, nsfw);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching models:", error);
    return NextResponse.json(
      { error: "Failed to fetch models" },
      { status: 500 }
    );
  }
}
