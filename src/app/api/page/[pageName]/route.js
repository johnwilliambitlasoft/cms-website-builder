import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';
import { normalizeFileName } from "@/lib/publish-utils";

/**
 * Helper function to ensure the build directories exist
 * @returns {Object} An object containing paths to the directories
 */
function ensureBuildDirs() {
  const buildDir = path.join(process.cwd(), "public", "build");
  const stylesDir = path.join(buildDir, "styles");
  
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }
  
  if (!fs.existsSync(stylesDir)) {
    fs.mkdirSync(stylesDir, { recursive: true });
  }
  
  return { buildDir, stylesDir };
}

/**
 * API route to get HTML and CSS content for a specific page
 * GET /api/page/[pageName] - Returns HTML and CSS content
 * POST /api/page/[pageName] - Saves HTML and CSS content
 * 
 * @param {Request} request - The incoming request
 * @param {Object} context - Contains route params
 * @returns {Response} JSON response
 */
export async function GET(request, { params }) {
  try {
    const pageName = params.pageName;
    
    // Validate page name to prevent directory traversal
    if (!pageName || /[\/\\]/.test(pageName)) {
      return NextResponse.json({ 
        error: "Invalid page name" 
      }, { status: 400 });
    }
    
    // Normalize filename for safety
    const safePageName = normalizeFileName(pageName, pageName);
    
    const { buildDir } = ensureBuildDirs();
    const htmlFile = path.join(buildDir, `${safePageName}.html`);
    const cssFile = path.join(buildDir, "styles", `${safePageName}.css`);
    
    // Check if page exists
    if (!fs.existsSync(htmlFile)) {
      return NextResponse.json({ 
        error: "Page not found" 
      }, { status: 404 });
    }
    
    // Read HTML content
    let htmlContent = "";
    if (fs.existsSync(htmlFile)) {
      htmlContent = fs.readFileSync(htmlFile, 'utf-8');
      
      // Extract only the body content
      const bodyContentMatch = htmlContent.match(/<body>([\s\S]*)<\/body>/i);
      if (bodyContentMatch && bodyContentMatch[1]) {
        htmlContent = bodyContentMatch[1].trim();
      }
    }
    
    // Read CSS content
    let cssContent = "";
    if (fs.existsSync(cssFile)) {
      cssContent = fs.readFileSync(cssFile, 'utf-8');
    }
    
    return NextResponse.json({
      pageName: safePageName,
      html: htmlContent,
      css: cssContent
    });
    
  } catch (error) {
    console.error("Error fetching page content:", error);
    return NextResponse.json({ 
      error: "Failed to retrieve page content" 
    }, { status: 500 });
  }
}

/**
 * Handles POST requests to save page content
 */
export async function POST(request, { params }) {
  try {
    // Get the page name from the URL
    const pageName = params.pageName;
    
    // Validate page name
    if (!pageName || /[\/\\]/.test(pageName)) {
      return NextResponse.json({ 
        error: "Invalid page name" 
      }, { status: 400 });
    }
    
    // Parse the request body
    const { html, css, title } = await request.json();
    
    // Validate required fields
    if (!html && !css) {
      return NextResponse.json({
        error: "HTML or CSS content is required"
      }, { status: 400 });
    }
    
    // Normalize filename
    const safePageName = normalizeFileName(pageName, pageName);
    
    // Ensure build directories exist
    const { buildDir, stylesDir } = ensureBuildDirs();
    
    // Create file paths
    const htmlFile = path.join(buildDir, `${safePageName}.html`);
    const cssFile = path.join(buildDir, "styles", `${safePageName}.css`);
    
    // Create full HTML document if only body content was provided
    let fullHtml = html;
    if (html && !html.includes('<!DOCTYPE html>')) {
      fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || safePageName}</title>
  <link rel="stylesheet" href="styles/${safePageName}.css">
  <script src="scripts/bundle.js"></script>
</head>
<body>
  ${html}
</body>
</html>`;
    }
    
    // Write the files
    if (fullHtml) {
      fs.writeFileSync(htmlFile, fullHtml);
    }
    
    if (css) {
      fs.writeFileSync(cssFile, css);
    }
    
    return NextResponse.json({
      success: true,
      pageName: safePageName,
      files: {
        html: `/build/${safePageName}.html`,
        css: `/build/styles/${safePageName}.css`,
      },
      message: `Successfully saved page '${safePageName}'`
    });
    
  } catch (error) {
    console.error("Error saving page content:", error);
    return NextResponse.json({ 
      error: "Failed to save page content" 
    }, { status: 500 });
  }
}
