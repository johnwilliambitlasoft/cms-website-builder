import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

/**
 * API route to get a list of all published pages
 * GET /api/pages - Returns list of available pages
 */
export async function GET(request) {
  try {
    const buildDir = path.join(process.cwd(), "public", "build");
    
    // Check if build directory exists
    if (!fs.existsSync(buildDir)) {
      return NextResponse.json({
        pages: []
      });
    }
    
    // Get all HTML files in the build directory
    const files = fs.readdirSync(buildDir).filter(file => 
      file.endsWith(".html") && 
      fs.statSync(path.join(buildDir, file)).isFile()
    );
    
    // Extract page info
    const pages = files.map(file => {
      const pageName = file.replace(/\.html$/, "");
      const htmlPath = `/build/${file}`;
      const cssPath = `/build/styles/${pageName}.css`;
      
      // Try to extract the title from the HTML file
      let title = pageName;
      try {
        const htmlContent = fs.readFileSync(path.join(buildDir, file), "utf-8");
        const titleMatch = htmlContent.match(/<title>(.*?)<\/title>/i);
        if (titleMatch && titleMatch[1]) {
          title = titleMatch[1];
        }
      } catch (err) {
        console.log(`Could not extract title for ${pageName}`);
      }
      
      return {
        name: pageName,
        title: title,
        paths: {
          html: htmlPath,
          css: cssPath
        }
      };
    });
    
    return NextResponse.json({
      pages: pages
    });
    
  } catch (error) {
    console.error("Error listing pages:", error);
    return NextResponse.json({
      error: "Failed to list pages"
    }, { status: 500 });
  }
}
