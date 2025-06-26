/**
 * Main Application JavaScript
 * This is the entry point for the front-end application logic
 * IMPORTANT: Only use ES5 features in this file for browser compatibility
 * 
 * NOTE: We don't need require() statements anymore since:
 * 1. All JS files are bundled together in the correct order
 * 2. Each file exposes its functionality via global window objects
 */

document.addEventListener("DOMContentLoaded", function() {
  console.log("Application initialized");
  
  // Access features from other modules using their global objects
  if (window.Utils) {
    console.log("Current date:", window.Utils.formatDate(new Date()));
  }
  
  if (window.GTMAction) {
    window.GTMAction.trackEvent('App', 'Init', 'Application started');
  }
  
  // Initialize specific features as needed
  setupEventListeners();
});

/**
 * Set up page event listeners
 */
function setupEventListeners() {
  var heroBanner = document.querySelector(".hero-banner");
  if (heroBanner) {
    heroBanner.addEventListener("click", function() {
      if (window.GTMAction) {
        window.GTMAction.trackEvent('Banner', 'Click', 'Hero Banner');
      }
      alert("Hero Banner clicked!");
    });
  }
}