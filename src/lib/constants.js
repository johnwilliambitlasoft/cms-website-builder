/**
 * List of JavaScript files to copy to build directory
 * Add new files here to be included in the build
 */
export const scriptFiles = [
  // Main application script (will be renamed to main.js)
  { src: "src/javascript/mainApplication.js", dest: "main.js" },
  
  // Utility scripts to include
  { src: "src/javascript/reducer.js", dest: "reducer.js" },
  { src: "src/javascript/bookingCalculation.js", dest: "bookingCalculation.js" },
  { src: "src/javascript/gtmAction.js", dest: "gtmAction.js" },
  { src: "src/javascript/localStorage.js", dest: "localStorage.js" },
  { src: "src/javascript/serviceDetails.js", dest: "serviceDetails.js" },
  { src: "src/javascript/config.js", dest: "config.js" },
  { src: "src/javascript/init.js", dest: "init.js" },
  { src: "src/javascript/searchResult.js", dest: "searchResult.js" },
  { src: "src/javascript/user.js", dest: "user.js" },
  { src: "src/javascript/utils.js", dest: "utils.js" },
  { src: "src/javascript/api.js", dest: "api.js" },
];