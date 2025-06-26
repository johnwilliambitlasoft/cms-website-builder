"use client";

// This function disables zoom functionality using keyboard shortcuts
export function disableZoom() {
  // Prevent keyboard shortcuts for zooming (Ctrl/Cmd +/-)
  const preventZoom = (e) => {
    if (
      (e.ctrlKey || e.metaKey) && // Check for Ctrl or Command key
      (e.key === "+" || e.key === "-" || e.key === "=" || e.wheelDelta > 0 || e.wheelDelta < 0)
    ) {
      e.preventDefault();
      return false;
    }
  };
  
  // Apply event listeners when the component mounts
  if (typeof window !== 'undefined') {
    // Prevent zoom on keyboard shortcuts
    window.addEventListener('keydown', preventZoom);
    
    // Prevent zoom on mouse wheel with Ctrl/Cmd
    window.addEventListener('wheel', (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
      }
    }, { passive: false });
    
    // Set CSS to prevent zooming on touch devices
    document.documentElement.style.touchAction = 'pan-x pan-y';
  }
  
  // No need to return anything for layout.js integration
}
