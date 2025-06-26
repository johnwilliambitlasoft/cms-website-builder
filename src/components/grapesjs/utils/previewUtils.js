/**
 * Utility functions for the preview server
 */

/**
 * Stops the preview server
 * @returns {Promise<Object>} Response data
 */
export const stopPreviewServer = async () => {
  try {
    const response = await fetch("/api/publish/preview", {
      method: "DELETE",
    });
    
    return await response.json();
  } catch (error) {
    console.error("Error stopping preview server:", error);
    throw error;
  }
};

/**
 * Gets the stored preview server URL from localStorage
 * @returns {string|null} The preview server URL or null
 */
export const getPreviewServerUrl = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("previewServerUrl");
  }
  return null;
};

/**
 * Starts or connects to an existing preview server
 * @returns {Promise<Object>} Preview server data
 */
export const startPreviewServer = async () => {
  const response = await fetch("/api/publish/preview", {
    method: "GET",
  });
  
  if (!response.ok) {
    throw new Error("Failed to start preview server");
  }
  
  return await response.json();
};

/**
 * Checks if the preview server is already running
 * @returns {Promise<boolean>} Whether the server is running
 */
export const checkPreviewServerStatus = async () => {
  try {
    const response = await fetch("/api/publish/preview", {
      method: "GET",
    });

    if (response.ok) {
      const data = await response.json();
      return data.success;
    }
    return false;
  } catch (error) {
    console.error("Error checking preview server status:", error);
    return false;
  }
};

/**
 * Opens a preview URL in a new tab
 * @param {string} url - The URL to open
 * @param {string} [pageFileName] - Optional specific page filename to append
 */
export const openPreviewInBrowser = (url, pageFileName) => {
  const finalUrl = pageFileName ? `${url}/${pageFileName}.html` : url;
  window.open(finalUrl, "_blank");
};

/**
 * Stores the preview URL in localStorage
 * @param {string} url - The URL to store
 */
export const storePreviewUrl = (url) => {
  if (typeof window !== "undefined" && url) {
    localStorage.setItem("previewServerUrl", url);
  }
};
