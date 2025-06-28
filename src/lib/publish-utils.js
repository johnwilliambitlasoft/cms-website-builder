// This file contains utility functions for publishing pages
import fs from "fs";
import path from "path";
import { createReadStream, createWriteStream } from "fs";
import {scriptFiles} from "./constants.js"; // Adjust the import path as necessary

/**
 * Creates the necessary build directories if they don't exist
 * This should be used for individual file operations, not for the initial setup
 */
export function createBuildDirectories() {
  // Define paths
  const publicDir = path.join(process.cwd(), "public");
  const buildDir = path.join(publicDir, "build");
  const stylesDir = path.join(buildDir, "styles");
  const scriptsDir = path.join(buildDir, "scripts");

  // Create directories if they don't exist (no cleaning)
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  if (!fs.existsSync(stylesDir)) {
    fs.mkdirSync(stylesDir, { recursive: true });
  }
  
  if (!fs.existsSync(scriptsDir)) {
    fs.mkdirSync(scriptsDir, { recursive: true });
  }

  // Return paths for reference
  return { buildDir, stylesDir, scriptsDir };
}

/**
 * Copies all JavaScript files to the build/scripts directory
 * @returns {Array<string>} Paths to the copied script files
 */
export function copyJavaScriptFiles() {
  const { scriptsDir } = createBuildDirectories();
  const copiedFiles = [];
  
  scriptFiles.forEach(script => {
    const srcPath = path.join(process.cwd(), script.src);
    const destPath = path.join(scriptsDir, script.dest);
    
    try {
      if (fs.existsSync(srcPath)) {
        // Create readable and writable streams
        const source = fs.createReadStream(srcPath);
        const dest = fs.createWriteStream(destPath);
        
        // Pipe the source to destination
        source.pipe(dest);
        
        copiedFiles.push(`/build/scripts/${script.dest}`);
        console.log(`Script copied: ${script.src} → ${script.dest}`);
      } else {
        console.log(`Warning: Script file not found: ${srcPath} (skipping)`);
      }
    } catch (error) {
      console.error(`Error copying script ${script.src}: ${error.message}`);
    }
  });
  
  return copiedFiles;
}

/**
 * Bundle multiple JavaScript files into a single file
 * This combines all JS files in the correct order into one file to reduce HTTP requests
 * @returns {string} Path to the bundled script file
 */
export function bundleJavaScriptFiles() {
  const { scriptsDir } = createBuildDirectories();
  const bundleDestPath = path.join(scriptsDir, "bundle.js");
  let bundleContent = "";
  
  // File load order matters for dependencies
  const files = [
    // Base utilities first
    { src: "src/javascript/utils.js" },
    { src: "src/javascript/config.js" },
    { src: "src/javascript/reducer.js" },
    { src: "src/javascript/localStorage.js" },
    { src: "src/javascript/init.js" },
    
    // Business logic
    { src: "src/javascript/bookingCalculation.js" },
    { src: "src/javascript/gtmAction.js" },
    { src: "src/javascript/serviceDetails.js" },
    { src: "src/javascript/searchResult.js" },
    { src: "src/javascript/user.js" },
    { src: "src/javascript/api.js" },
    
    // Main application last
    { src: "src/javascript/mainApplication.js" }
  ];
  
  // Add a header to the bundle
  bundleContent += "/**\n";
  bundleContent += " * Bundled JavaScript - Generated on " + new Date().toISOString() + "\n";
  bundleContent += " * This file contains all JavaScript modules concatenated together\n";
  bundleContent += " */\n\n";
  
  let fileCount = 0;
  
  // Concatenate all files
  files.forEach(file => {
    const srcPath = path.join(process.cwd(), file.src);
    
    if (fs.existsSync(srcPath)) {
      // Add a section header for each file
      bundleContent += "\n/**\n";
      bundleContent += ` * File: ${file.src}\n`;
      bundleContent += " */\n";
      
      // Read and append content
      const content = fs.readFileSync(srcPath, 'utf8');
      bundleContent += content;
      bundleContent += "\n\n";
      fileCount++;
    } else {
      console.log(`Warning: Script file not found: ${srcPath} (skipping)`);
    }
  });
  
  // Write the bundle file
  fs.writeFileSync(bundleDestPath, bundleContent);
  console.log(`Successfully bundled ${fileCount} JavaScript files into bundle.js`);
  
  return "/build/scripts/bundle.js";
}

/**
 * Generates the HTML template for a published page
 */
/**
 * Generates the HTML template for a published page with all required scripts
 */
export function generateHtmlTemplate(title, content, cssFileName) {
  // Use a single bundled script instead of multiple script tags
  const scriptTag = '<script src="scripts/bundle.js"></script>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || "Untitled Page"}</title>
  <link rel="stylesheet" href="styles/${cssFileName}.css">
  ${scriptTags}
</head>
<body>
  ${content}
</body>
</html>`;
}

/**
 * Saves the generated files for a page
 */
export async function savePageFiles(fileName, html, css) {
  const { buildDir, stylesDir, scriptsDir } = createBuildDirectories(); // Uses non-cleaning version

  // Create file paths
  const htmlPath = path.join(buildDir, `${fileName}.html`);
  const cssPath = path.join(stylesDir, `${fileName}.css`);
  
  // Check if scripts directory exists and main.js is present
  const mainScriptPath = path.join(scriptsDir, "main.js");
  if (!fs.existsSync(mainScriptPath)) {
    // Copy all JavaScript files if they don't exist yet
    copyJavaScriptFiles();
  }

  // Write the files
  fs.writeFileSync(htmlPath, html);
  fs.writeFileSync(cssPath, css);

  return {
    htmlPath: `/build/${fileName}.html`,
    cssPath: `/build/styles/${fileName}.css`,
    scriptPaths: scriptFiles.map(script => `/build/scripts/${script.dest}`),
  };
}

/**
 * Utility to normalize a page title into a valid filename
 */
export function normalizeFileName(title, id) {
  if (!title) return `page-${id}`;

  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Removes the existing build directory if it exists
 */
export function cleanBuildDirectory() {
  // Define paths
  const publicDir = path.join(process.cwd(), "public");
  const buildDir = path.join(publicDir, "build");

  // Check if build directory exists
  if (fs.existsSync(buildDir)) {
    console.log("Found existing build directory. Cleaning...");
    // Delete the entire build directory recursively
    fs.rmSync(buildDir, { recursive: true, force: true });
    console.log("Existing build directory removed successfully");
  }

  return true;
}

/**
 * Prepares the build directory for publishing (cleans and recreates)
 * This should be called once at the beginning of the publishing process
 */
export function prepareBuildDirectory() {
  // Clean existing build directory
  cleanBuildDirectory();

  // Create fresh directories
  const publicDir = path.join(process.cwd(), "public");
  const buildDir = path.join(publicDir, "build");
  const stylesDir = path.join(buildDir, "styles");
  const scriptsDir = path.join(buildDir, "scripts");

  fs.mkdirSync(buildDir, { recursive: true });
  fs.mkdirSync(stylesDir, { recursive: true });
  fs.mkdirSync(scriptsDir, { recursive: true });
  
  // Option 1: Bundle all JavaScript files into a single file
  bundleJavaScriptFiles();
  
  // Option 2: Also copy individual files for debugging purposes
  // This is optional and can be removed if you only want the bundle
  copyJavaScriptFiles();
  
  // Copy library files (like Splide.js) to build directory
  copyLibDirectory();

  return { buildDir, stylesDir, scriptsDir }
}

/**
 * Copies the entire public/lib directory to build/lib
 * This ensures all library files (like Splide.js) are available in the published site
 */
export function copyLibDirectory() {
  const { buildDir } = createBuildDirectories();
  const publicLibDir = path.join(process.cwd(), "public", "lib");
  const buildLibDir = path.join(buildDir, "lib");
  const copiedFiles = [];

  // Check if public/lib directory exists
  if (!fs.existsSync(publicLibDir)) {
    console.log("Warning: public/lib directory not found, skipping library copy");
    return { copiedFiles: [], destinationPath: buildLibDir };
  }

  // Recursively copy directory and track files
  function copyRecursive(srcDir, destDir) {
    // Create destination directory if it doesn't exist
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Read all items in source directory
    const items = fs.readdirSync(srcDir);

    items.forEach(item => {
      const srcPath = path.join(srcDir, item);
      const destPath = path.join(destDir, item);
      const stat = fs.statSync(srcPath);

      if (stat.isDirectory()) {
        // Recursively copy subdirectories
        copyRecursive(srcPath, destPath);
      } else {
        // Copy file
        fs.copyFileSync(srcPath, destPath);
        // Track relative path from build directory
        const relativePath = path.relative(buildDir, destPath);
        copiedFiles.push(relativePath);
        console.log(`Library file copied: ${relativePath}`);
      }
    });
  }

  try {
    copyRecursive(publicLibDir, buildLibDir);
    console.log(`Successfully copied library directory to ${buildLibDir}`);
    console.log(`Total files copied: ${copiedFiles.length}`);
  } catch (error) {
    console.error(`Error copying library directory: ${error.message}`);
    throw error;
  }

  return {
    copiedFiles,
    destinationPath: buildLibDir
  };
}
