/**
 * Utils helper functions
 * Common utility functions used across the application
 * 
 * IMPORTANT: Only use ES5 features in this file for browser compatibility
 */

// Create a namespace for our utility functions
var Utils = {
  /**
   * Formats a currency value according to the user's locale
   * @param {number} value - The value to format
   * @return {string} Formatted currency string
   */
  formatCurrency: function(value) {
    return value.toLocaleString(undefined, {
      style: 'currency',
      currency: window.APP_CONFIG ? window.APP_CONFIG.CURRENCY : 'USD'
    });
  },
  
  /**
   * Adds days to a date
   * @param {Date} date - The starting date
   * @param {number} days - Number of days to add
   * @return {Date} The resulting date
   */
  addDays: function(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  },
  
  /**
   * Formats a date to YYYY-MM-DD format
   * @param {Date} date - The date to format
   * @return {string} Formatted date string
   */
  formatDate: function(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  },
  
  /**
   * Gets URL query parameters
   * @return {Object} Key-value pairs of query parameters
   */
  getQueryParams: function() {
    var params = {};
    var query = window.location.search.substring(1);
    var pairs = query.split('&');
    
    for (var i = 0; i < pairs.length; i++) {
      var pair = pairs[i].split('=');
      params[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    
    return params;
  },
  
  /**
   * Debounces a function call
   * @param {Function} func - The function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @return {Function} Debounced function
   */
  debounce: function(func, wait) {
    var timeout;
    return function() {
      var context = this;
      var args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(function() {
        func.apply(context, args);
      }, wait);
    };
  }
};

// Make utils globally available
window.Utils = Utils;
