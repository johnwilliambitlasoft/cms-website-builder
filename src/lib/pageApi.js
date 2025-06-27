/**
 * Utility functions for working with the page API
 */

/**
 * Normalizes a page name for use in API calls
 * @param {string} pageName - The raw page name
 * @returns {string} - The normalized page name
 */
export const normalizeName = (pageName) => {
  if (!pageName) return "";
  return pageName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
};

/**
 * Fetches the HTML and CSS content for a specific page
 * @param {string} pageName - The name of the page to fetch
 * @returns {Promise<Object>} - The page content with html and css properties
 */
export const fetchPageContent = async (pageName) => {
  try {
    if (!pageName) {
      throw new Error("Page name is required");
    }
    
    // Normalize page name for the API call
    const normalizedPageName = normalizeName(pageName);
    
    const response = await fetch(`/api/page/${normalizedPageName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to fetch page '${pageName}'`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching page content:", error);
    throw error;
  }
};

/**
 * Fetches just the body content of a published page (simpler API)
 * @param {string} pageName - The name of the page to fetch
 * @returns {Promise<Object>} - Object with html and css properties
 */
export const fetchPageBodyContent = async (pageName) => {
  try {
    if (!pageName) {
      throw new Error("Page name is required");
    }
    
    // Normalize page name for the API call
    const normalizedPageName = normalizeName(pageName);
    
    const response = await fetch(`/api/${normalizedPageName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to fetch page '${pageName}'`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching page body content:", error);
    throw error;
  }
};

/**
 * Fetches a list of all published pages
 * @returns {Promise<Object>} - Object with pages array
 */
export const fetchAllPages = async () => {
  try {
    const response = await fetch(`/api/pages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to fetch pages list");
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error fetching pages list:", error);
    throw error;
  }
};

/**
 * Saves HTML and CSS content for a specific page
 * @param {string} pageName - The name of the page
 * @param {Object} content - The page content
 * @param {string} content.html - The HTML content
 * @param {string} content.css - The CSS content
 * @param {string} [content.title] - Optional page title
 * @returns {Promise<Object>} - Response data
 */
export const savePageContent = async (pageName, { html, css, title }) => {
  try {
    if (!pageName) {
      throw new Error("Page name is required");
    }
    
    if (!html && !css) {
      throw new Error("HTML or CSS content is required");
    }
    
    // Normalize page name for the API call
    const normalizedPageName = normalizeName(pageName);
    
    const response = await fetch(`/api/page/${normalizedPageName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        html,
        css,
        title: title || pageName
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to save page '${pageName}'`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error saving page content:", error);
    throw error;
  }
};
