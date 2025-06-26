// This file contains utility functions for publishing pages
import fs from "fs";
import path from "path";
import { createReadStream, createWriteStream } from "fs";

/**
 * Creates the necessary build directories if they don't exist
 * This should be used for individual file operations, not for the initial setup
 */
export function createBuildDirectories() {
  // Define paths
  const publicDir = path.join(process.cwd(), "public");
  const buildDir = path.join(publicDir, "build");
  const stylesDir = path.join(buildDir, "styles");

  // Create directories if they don't exist (no cleaning)
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  if (!fs.existsSync(stylesDir)) {
    fs.mkdirSync(stylesDir, { recursive: true });
  }

  // Return paths for reference
  return { buildDir, stylesDir };
}

/**
 * Generates the HTML template for a published page
 */
export function generateHtmlTemplate(title, content, cssFileName) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || "Untitled Page"}</title>
  <link rel="stylesheet" href="styles/${cssFileName}.css">
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
  const { buildDir, stylesDir } = createBuildDirectories(); // Uses non-cleaning version

  // Create file paths
  const htmlPath = path.join(buildDir, `${fileName}.html`);
  const cssPath = path.join(stylesDir, `${fileName}.css`);

  // Write the files
  fs.writeFileSync(htmlPath, html);
  fs.writeFileSync(cssPath, css);

  return {
    htmlPath: `/build/${fileName}.html`,
    cssPath: `/build/styles/${fileName}.css`,
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

  fs.mkdirSync(buildDir, { recursive: true });
  fs.mkdirSync(stylesDir, { recursive: true });

  return { buildDir, stylesDir };
}
