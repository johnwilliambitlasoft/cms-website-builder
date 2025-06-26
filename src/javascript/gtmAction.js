/**
 * GTM (Google Tag Manager) Action Utilities
 * Handles all GTM event tracking and data layer interactions
 * 
 * IMPORTANT: Only use ES5 features in this file for browser compatibility
 */

// GTM Actions namespace
var GTMAction = {
  /**
   * Initialize Google Tag Manager
   */
  initializeGTM: function() {
    try {
      // Initialize data layer
      window.dataLayer = window.dataLayer || [];
      
      // Check if we should load GTM based on environment
      if (window.APP_CONFIG && window.APP_CONFIG.ENV === 'production') {
        console.log('Initializing Google Tag Manager');
        this.loadGTMScript('GTM-XXXXXXX'); // Replace with your GTM container ID
      } else {
        console.log('GTM disabled in development environment');
      }
    } catch (error) {
      console.error('Error initializing GTM:', error);
    }
  },
  
  /**
   * Load the GTM script
   * @param {string} containerId - The GTM container ID
   */
  loadGTMScript: function(containerId) {
    // GTM snippet (modified to avoid ES6 features)
    (function(w,d,s,l,i){
      w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),
          dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer',containerId);
  },
  
  /**
   * Track a custom event in GTM
   * @param {string} category - Event category
   * @param {string} action - Event action
   * @param {string} label - Event label
   * @param {number} value - Event value (optional)
   */
  trackEvent: function(category, action, label, value) {
    if (!window.dataLayer) {
      console.warn('dataLayer not initialized');
      return;
    }
    
    var eventData = {
      'event': 'custom_event',
      'event_category': category,
      'event_action': action,
      'event_label': label
    };
    
    if (value !== undefined) {
      eventData.event_value = value;
    }
    
    window.dataLayer.push(eventData);
    console.log('Event tracked:', category, action, label);
  }
};

// Make GTMAction globally available
window.GTMAction = GTMAction;
