import { scriptFiles } from '../../../lib/constants.js'; // Adjust the import path as necessary
/**
 * Utility functions for publishing pages
 */

/**
 * Creates the build directories for publishing
 * @returns {Promise<Object>} Response data from the API
 */
export const createBuildDirectories = async () => {
  try {
    // Use fetch to call our API route that will create the build folders
    // We explicitly set cleanFirst to true to remove any previous build
    const response = await fetch("/api/publish/create-dirs", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to create build directories");
    }

    return await response.json();
  } catch (error) {
    console.error("Error creating build directories:", error);
    throw error;
  }
};

/**
 * Saves HTML and CSS files for a page
 * @param {string} fileName - The filename (without extension)
 * @param {string} html - The HTML content
 * @param {string} css - The CSS content
 * @returns {Promise<Object>} Response data
 */
export const savePageFiles = async (fileName, html, css) => {
  const response = await fetch("/api/publish/save-files", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileName,
      html,
      css,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to save files for page "${fileName}"`);
  }

  return await response.json();
};

/**
 * Creates a clean filename from a page title
 * @param {string} title - The page title
 * @param {string|number} id - The page ID (fallback)
 * @returns {string} A URL-friendly filename
 */
export const normalizeFileName = (title, id) => {
  if (!title) return `page-${id}`;

  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

/**
 * Generates an HTML template for a page
 * @param {string} title - The page title
 * @param {string} content - The page content
 * @param {string} cssFileName - The CSS filename
 * @returns {string} The HTML document
 */
export const generateHtmlTemplate = (title, content, cssFileName) => {
  // Use a single bundled script instead of multiple script tags
  let scriptTag = '';
  scriptFiles.forEach(script => {
    if (!script.src) return;
    // add the next script in new line
    scriptTag += `<script src="scripts/${script.dest}"></script> \n`;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title || 'Untitled Page'}</title>
  <link rel="stylesheet" href="styles/${cssFileName}.css">
  ${scriptTag}
</head>
<body>
  ${content}
</body>
</html>`;
};

/**
 * Copies library files from public/lib to build/lib
 * @returns {Promise<Object>} Response data from the API
 */
export const copyLibraryFiles = async () => {
  try {
    const response = await fetch("/api/publish/copy-lib", {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Failed to copy library files");
    }

    return await response.json();
  } catch (error) {
    console.error("Error copying library files:", error);
    throw error;
  }
};
