/**
 * Configuration file for the application
 * This file contains global settings and constants
 * 
 * IMPORTANT: Only use ES5 features in this file for browser compatibility
 */

// Configuration object - global, accessible through window.APP_CONFIG
var APP_CONFIG = {
  // API endpoints
  API_BASE_URL: 'https://api.example.com',
  
  // Feature flags
  FEATURES: {
    ENABLE_BOOKING: true,
    ENABLE_PAYMENTS: true,
    ENABLE_NOTIFICATIONS: true
  },
  
  // Platform detection
  IS_MOBILE: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
  
  // Constants
  MAX_BOOKING_DAYS: 30,
  TAX_RATE: 0.07,
  CURRENCY: 'USD',
  
  // Environment detection (default to production)
  ENV: window.location.hostname === 'localhost' ? 'development' : 'production'
};

// Make config globally available
window.APP_CONFIG = APP_CONFIG;
