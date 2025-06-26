import { NextResponse } from "next/server";
import {
  createBuildDirectories,
  generateHtmlTemplate,
  savePageFiles,
  normalizeFileName,
} from "@/lib/publish-utils";

/**
 * API route to generate the entire site from pages data
 * Handles the complete publishing process in one endpoint
 */
export async function POST(request) {
  try {
    // Parse request body - expects an array of pages
    const { pages } = await request.json();

    if (!pages || !Array.isArray(pages)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request: missing or invalid pages array",
        },
        { status: 400 },
      );
    }

    // Create build directories first
    const dirInfo = createBuildDirectories();

    // Process each page
    const publishedPages = [];

    for (const page of pages) {
      try {
        // Normalize file name
        const fileName = normalizeFileName(page.title, page.id);

        // Generate HTML content from the page data
        const htmlContent = generateHtmlTemplate(
          page.title,
          page.content,
          fileName,
        );

        // Save HTML and CSS files
        const { htmlPath, cssPath } = await savePageFiles(
          fileName,
          htmlContent,
          page.css,
        );

        publishedPages.push({
          id: page.id,
          title: page.title,
          fileName,
          paths: {
            html: htmlPath,
            css: cssPath,
          },
        });
      } catch (error) {
        console.error(`Error publishing page ${page.title || page.id}:`, error);
        // Continue with other pages even if one fails
      }
    }

    return NextResponse.json({
      success: true,
      publishedPages,
      message: `Successfully published ${publishedPages.length} pages to the build folder`,
    });
  } catch (error) {
    console.error("Error publishing site:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Failed to publish site",
      },
      { status: 500 },
    );
  }
}
