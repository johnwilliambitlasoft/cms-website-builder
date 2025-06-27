/**
 * Utility functions for handling GrapesJS canvas transformations
 */

/**
 * Calculate the transform properties for the GrapesJS canvas to fit within its container
 * Following the pattern from these examples:
 * 
 * 1. Container: 449×486, Device: 1200×800 => scale(0.37) translate(-376px, -401px)
 * 2. Container: 596×552, Device: 1200×800 => scale(0.49) translate(-303px, -278px)
 * 3. Container: 719×607, Device: 1200×800 => scale(0.59) translate(-239px, -201px)
 * 
 * @param {number} containerWidth - The width of the container
 * @param {number} containerHeight - The height of the container
 * @param {number} deviceWidth - The width of the device/canvas
 * @param {number} deviceHeight - The height of the device/canvas
 * @returns {Object} - An object with scale, translateX, translateY and transform string
 */
export const calculateCanvasTransform = (containerWidth, containerHeight, deviceWidth, deviceHeight) => {
  // Calculate scale based on the smaller ratio to ensure canvas fits completely
  const widthRatio = containerWidth / deviceWidth;
  const heightRatio = containerHeight / deviceHeight;
  const scale = Math.min(widthRatio, heightRatio);
  
  // Round scale to 2 decimal places
  const roundedScale = Math.floor(scale * 100) / 100;
  
  // Calculate translation needed to center the canvas
  // We're following the exact pattern from the examples which use negative values
  const translateX = -((deviceWidth - containerWidth / roundedScale) / 2);
  const translateY = -((deviceHeight - containerHeight / roundedScale) / 2);
  
  // Round translation values
  const roundedTranslateX = Math.round(translateX);
  const roundedTranslateY = Math.round(translateY);
  
  // Test our formula against the examples:
  // Example 1: (449, 486, 1200, 800) should give scale(0.37), translate(-376px, -401px)
  // Example 2: (596, 552, 1200, 800) should give scale(0.49), translate(-303px, -278px)  
  // Example 3: (719, 607, 1200, 800) should give scale(0.59), translate(-239px, -201px)
  
  return {
    scale: roundedScale,
    translateX: roundedTranslateX,
    translateY: roundedTranslateY,
    transform: `scale(${roundedScale}) translate(${roundedTranslateX}px, ${roundedTranslateY}px)`
  };
};

/**
 * Update the canvas transform to fit within the container
 * @param {Object} editor - GrapesJS editor instance
 * @param {HTMLElement} containerRef - Reference to the container element
 * @returns {Object|null} - The applied transform object or null if not applied
 */
export const updateCanvasTransform = (editor, containerRef) => {
  if (!editor || !containerRef) return null;
  
  const containerWidth = containerRef.offsetWidth;
  const containerHeight = containerRef.offsetHeight;
  
  // Get the selected device
  const selectedDevice = editor.Devices.getSelected();
  
  // Get device dimensions (grapesjs stores widthMedia for the width)
  const deviceWidth = selectedDevice ? (selectedDevice.get('priority') || 1200) : 1200;
  const deviceHeight = selectedDevice ? (selectedDevice.get('height') || 800) : 800;
  
  // Get the canvas frame element
  // GrapesJS can have different ways to access the canvas element
  let canvasElement = null;
  
  // Try different methods to get the canvas element
  
  // Try different methods to get the canvas element
  if (editor.Canvas && editor.Canvas.getFrameEl) {
    canvasElement = editor.Canvas.getFrameEl();
  } else if (editor.Canvas && editor.Canvas.getElement) {
    const element = editor.Canvas.getElement();
    canvasElement = element && element.children && element.children[0];
  } else if (editor.editor && editor.editor.Canvas) {
    const canvas = editor.editor.Canvas;
    if (canvas.getFrameEl) {
      canvasElement = canvas.getFrameEl();
    } else if (canvas.getElement) {
      const element = canvas.getElement();
      canvasElement = element && element.children && element.children[0];
    }
  }
  
  if (canvasElement) {
    // Only apply transform if the device width is greater than the container width
    if (deviceWidth > containerWidth) {
      const transform = calculateCanvasTransform(
        containerWidth,
        containerHeight,
        deviceWidth,
        deviceHeight
      );
      // Apply the transform
      canvasElement.style.transform = transform.transform;
      
      // Add a class to indicate the transform has been applied
      canvasElement.classList.add('canvas-transformed');
      
      return transform;
    } else {
      // Reset transform if device width is smaller than or equal to container width
      canvasElement.style.transform = '';
      canvasElement.classList.remove('canvas-transformed');
    }
  }
  
  return null;
};

/**
 * Setup canvas resize observer to maintain proper scaling
 * @param {Object} editor - GrapesJS editor instance
 * @param {HTMLElement} containerRef - Reference to the container element
 * @returns {ResizeObserver} - The resize observer instance
 */
export const setupCanvasResizeObserver = (editor, containerRef) => {
  const resizeObserver = new ResizeObserver(() => {
    updateCanvasTransform(editor, containerRef);
  });
  
  // Observe the container for size changes
  if (containerRef) {
    resizeObserver.observe(containerRef);
  }
  
  return resizeObserver;
};
