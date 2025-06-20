/**
 * A collection of utility functions used throughout the application
 */

/**
 * Format a date string
 * @param {string|Date} date - The date to format
 * @returns {string} - The formatted date
 */
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  });
};

/**
 * Truncate a string if it exceeds the max length
 * @param {string} str - The string to truncate
 * @param {number} maxLength - Maximum length before truncating
 * @returns {string} - Truncated string with ellipsis if needed
 */
export const truncateString = (str, maxLength = 100) => {
  if (!str || str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
};

/**
 * Debounce function to limit how often a function can be called
 * @param {Function} func - The function to debounce
 * @param {number} wait - The time to wait in milliseconds
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
