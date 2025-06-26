import { NextResponse } from "next/server";
import { prepareBuildDirectory } from "@/lib/publish-utils";

/**
 * API route to prepare the build directory structure
 * This cleans any existing build and creates fresh directories
 */
export async function POST() {
  try {
    // Prepare build directories (clean and recreate)
    const { buildDir, stylesDir } = prepareBuildDirectory();

    return NextResponse.json({
      success: true,
      buildDir: "/public/build",
      stylesDir: "/public/build/styles",
      cleaned: true,
      message:
        "Previous build removed and new build directories created successfully",
    });
  } catch (error) {
    console.error("Error preparing build directories:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to prepare build directories",
      },
      { status: 500 },
    );
  }
}
