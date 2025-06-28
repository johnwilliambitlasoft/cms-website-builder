import { NextResponse } from "next/server";
import { copyLibDirectory } from "@/lib/publish-utils";

/**
 * API route to copy the public/lib directory to build/lib
 * This ensures all library files (like Splide.js) are available in the published site
 */
export async function POST() {
  try {
    const result = copyLibDirectory();

    return NextResponse.json({
      success: true,
      message: "Library files copied successfully",
      copiedFiles: result.copiedFiles,
      destinationPath: result.destinationPath,
    });
  } catch (error) {
    console.error("Error copying library files:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to copy library files",
      },
      { status: 500 },
    );
  }
}
