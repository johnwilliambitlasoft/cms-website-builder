import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

/**
 * API route to get HTML and CSS content for a specific page
 * Route: /api/[pageName]
 * 
 * @param {Request} request - The incoming request
 * @param {Object} context - Contains route params
 * @returns {Response} JSON response with HTML and CSS content
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
    
    const buildDir = path.join(process.cwd(), "public", "build");
    const htmlFile = path.join(buildDir, `${pageName}.html`);
    const cssFile = path.join(buildDir, "styles", `${pageName}.css`);
    
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
