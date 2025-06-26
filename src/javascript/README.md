# JavaScript Bundling in CMS Website Builder

This document explains how JavaScript files are organized and bundled in the CMS Website Builder.

## Overview

Instead of including multiple separate JavaScript files in the HTML header (which would require multiple HTTP requests), the system bundles all JavaScript files into a single file (`bundle.js`). This approach:

1. **Reduces HTTP requests** - Only one script file is loaded
2. **Improves page load performance** - Fewer network requests = faster page load
3. **Maintains modularity** - Code still organized in separate files during development
4. **Preserves dependency order** - Files are bundled in the correct loading order

## How It Works

When you publish a page:

1. The `bundleJavaScriptFiles()` function in `publish-utils.js` reads all JavaScript source files
2. It concatenates them in the correct order into a single `bundle.js` file
3. HTML templates include only this single bundled file with `<script src="scripts/bundle.js"></script>`

## JavaScript File Organization

JavaScript files are organized in the `/src/javascript/` directory:

```
src/javascript/
├── utils.js          # Basic utility functions
├── config.js         # Configuration settings
├── api.js            # API communication
├── reducer.js        # State management
├── localStorage.js   # Local storage utilities
├── init.js           # Initialization functions
├── gtmAction.js      # Google Tag Manager integration
├── serviceDetails.js # Service-specific logic
├── user.js           # User management
├── searchResult.js   # Search functionality
└── mainApplication.js # Main entry point
```

## Sharing Code Between Files

Since we're not using a module system like CommonJS or ES Modules in the browser, files share code through the global `window` object:

1. Each file creates a namespace object: `window.Utils`, `window.GTMAction`, etc.
2. Other files can then access functionality through these global objects
3. Files are bundled in order so dependencies are available when needed

## Example: File Structure Pattern

Here's how each file should be structured:

```javascript
/**
 * Name of the module
 * Brief description of functionality
 */

// Create a namespace for this module
var ModuleName = {
  init: function() {
    // Initialize code
  },
  
  someFunction: function() {
    // Module functionality
  }
};

// Make it globally available
window.ModuleName = ModuleName;
```

## Example: Accessing Functionality From Other Files

In your main application code:

```javascript
document.addEventListener("DOMContentLoaded", function() {
  // Access code from other modules
  if (window.Utils) {
    var formattedDate = window.Utils.formatDate(new Date());
  }
  
  if (window.GTMAction) {
    window.GTMAction.trackEvent('App', 'Init');
  }
});
```

## Adding a New JavaScript File

1. Create your file in `/src/javascript/`
2. Add it to the `files` array in the `bundleJavaScriptFiles()` function in the correct order
3. Export functionality through a global namespace

That's it! The next time you publish, your file will be included in the bundle.

## Development vs. Production

For debugging purposes, individual files are also copied to the build directory, but HTML only includes the bundled version.

## Important Notes

1. Only use ES5 features for maximum browser compatibility
2. Check for the existence of dependencies before using them: `if (window.ModuleName)`
3. Maintain the correct order of files in the bundle configuration
