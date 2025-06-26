import { NextResponse } from "next/server";
import { savePageFiles } from "@/lib/publish-utils";

/**
 * API route to save HTML and CSS files for each page
 */
export async function POST(request) {
  try {
    // Parse request body
    const { fileName, html, css } = await request.json();

    if (!fileName || !html || !css) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields: fileName, html, or css",
        },
        { status: 400 },
      );
    }

    // Use utility function to save files
    const { htmlPath, cssPath } = await savePageFiles(fileName, html, css);

    return NextResponse.json({
      success: true,
      files: {
        html: htmlPath,
        css: cssPath,
      },
      message: `Successfully saved files for ${fileName}`,
    });
  } catch (error) {
    console.error("Error saving files:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to save files",
      },
      { status: 500 },
    );
  }
}
