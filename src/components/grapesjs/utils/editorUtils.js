/**
 * Utility functions for the GrapesJS editor
 */

/**
 * Adds a panel to the GrapesJS editor
 * @param {Object} editor - The GrapesJS editor instance
 * @param {Object} config - Panel configuration
 */
export const addPanel = (editor, config) => {
  if (editor.Panels.getPanel(config.id)) {
    editor.Panels.removePanel(config.id);
  }
  
  // Add the panel with the provided configuration
  if (!config.id) {
    console.error("Panel configuration must include an id");
    return;
  }
  if (!config.el) {
    console.error("Panel configuration must include an element selector (el)");
    return;
  }
  
  editor.Panels.addPanel(config);
};

/**
 * Set the active device in the UI
 * @param {Object} deviceModel - The device model
 */
export const setDeviceActive = (deviceModel) => {
  if (deviceModel) {
    const deviceId = deviceModel ? deviceModel.get("id") : "desktop";
    const deviceBtns = {
      desktop: document.getElementById("device-desktop"),
      mobile: document.getElementById("device-mobile"),
    };
    Object.keys(deviceBtns).forEach((key) => {
      if (deviceBtns[key]) {
        if (key === deviceId) {
          deviceBtns[key].classList.add("gjs-pn-active");
        } else {
          deviceBtns[key].classList.remove("gjs-pn-active");
        }
      }
    });
  }
};

/**
 * Calculate canvas transform for proper scaling
 */
export const calculateCanvasTransform = (containerWidth, containerHeight, deviceWidth, deviceHeight) => {
  // Calculate scale to fit both width and height, preserving aspect ratio
  const scaleW = containerWidth / deviceWidth;
  const scaleH = containerHeight / deviceHeight;
  const scale = Math.min(scaleW, scaleH);

  const scaledW = deviceWidth * scale;
  const scaledH = deviceHeight * scale;

  // Center the canvas in the container
  const translateX = (containerWidth - scaledW) / (2 * scale);
  const translateY = (containerHeight - scaledH) / (2 * scale);
  
  return {
    scale: parseFloat(scale.toFixed(2)),
    translateX: Math.round(translateX),
    translateY: Math.round(translateY),
    transform: `scale(${scale.toFixed(2)}) translate(${translateX}px, ${translateY}px)`
  };
};

/**
 * Configure editor for component selection
 */
export const setupComponentSelection = (editor, dispatch, setCurrentWidget) => {
  // Configure selection constraints to only allow primary layer selection
  editor.on("component:selected", (component) => {
    if (!component) return;
    
    const parent = component.parent();
    const wrapper = editor.getWrapper();

    // If component is not a direct child of the wrapper/body
    if (parent && parent !== wrapper && wrapper.find("#" + parent.getId()).length > 0) {
      // Find the top-level parent (direct child of wrapper)
      let topLevelParent = component;
      let currentParent = component;

      while (currentParent.parent() && currentParent.parent() !== wrapper) {
        topLevelParent = currentParent.parent();
        currentParent = currentParent.parent();
      }

      // Select the top-level parent instead
      dispatch(setCurrentWidget(topLevelParent?.attributes?.attributes["data-widget-type"]));
      editor.select(topLevelParent);
    }
  });

  // Disable selection of child elements in canvas
  editor.on("component:mousedown", (component, event) => {
    if (!component || component.parent() === editor.getWrapper()) return;
    
    // Find the top-level parent (direct child of wrapper)
    let topLevelParent = component;
    let currentParent = component;

    while (currentParent.parent() && currentParent.parent() !== editor.getWrapper()) {
      topLevelParent = currentParent.parent();
      currentParent = currentParent.parent();
    }

    // Prevent the default event handling
    event.stopPropagation();

    // Select the top-level parent instead
    setTimeout(() => {
      dispatch(setCurrentWidget(topLevelParent?.attributes?.attributes["data-widget-type"]));
      editor.select(topLevelParent);
    }, 0);
  });

  // Ensure layer manager selections follow the same rules
  editor.on("layer:select", (component) => {
    if (!component) return;
    
    const wrapper = editor.getWrapper();

    // If the component is not a direct child of the wrapper
    if (component.parent() !== wrapper) {
      // Find the top-level parent
      let topLevelParent = component;
      let currentParent = component;

      while (currentParent.parent() && currentParent.parent() !== wrapper) {
        topLevelParent = currentParent.parent();
        currentParent = currentParent.parent();
      }

      // Select the top-level parent instead
      setTimeout(() => {
        dispatch(setCurrentWidget(topLevelParent?.attributes?.attributes["data-widget-type"]));
        editor.select(topLevelParent);
      }, 0);
    }
  });
};

/**
 * Add custom toolbar buttons to component
 */
export const setupComponentToolbar = (editor, MoveUp, MoveDown) => {
  // Get the default component type
  const defaultType = editor.DomComponents.getType("default");
  
  // Get the existing toolbar configuration
  const existingToolbar =
    (defaultType &&
      defaultType.model &&
      defaultType.model.prototype &&
      defaultType.model.prototype.defaults &&
      defaultType.model.prototype.defaults.toolbar) ||
    [];

  // Create a new default toolbar with our custom buttons added
  editor.DomComponents.addType("default", {
    model: {
      defaults: {
        toolbar: [
          // Add existing toolbar items if available
          ...(Array.isArray(existingToolbar) ? existingToolbar : []),
          // Add our custom move buttons
          {
            id: "move-up",
            command: "component-move-up",
            attributes: { title: "Move Up" },
            label: `${MoveUp}`,
          },
          {
            id: "move-down",
            command: "component-move-down",
            attributes: { title: "Move Down" },
            label: `${MoveDown}`,
          },
        ],
      },
    },
  });
};

/**
 * Initialize move commands for the editor
 */
export const setupMoveCommands = (editor) => {
  // Add custom commands for moving components up
  editor.Commands.add("component-move-up", {
    run: (editor) => {
      const selectedComponent = editor.getSelected();
      if (selectedComponent) {
        const parent = selectedComponent.parent();
        const collection = parent.components();
        const index = collection.indexOf(selectedComponent);

        // Only move if it's not already at the top
        if (index > 0) {
          collection.remove(selectedComponent);
          collection.add(selectedComponent, { at: index - 1 });
          editor.select(selectedComponent);
          return true;
        }
      }
      return false;
    },
  });

  // Add custom commands for moving components down
  editor.Commands.add("component-move-down", {
    run: (editor) => {
      const selectedComponent = editor.getSelected();
      if (selectedComponent) {
        const parent = selectedComponent.parent();
        const collection = parent.components();
        const index = collection.indexOf(selectedComponent);

        // Only move if it's not already at the bottom
        if (index < collection.length - 1) {
          collection.remove(selectedComponent);
          collection.add(selectedComponent, { at: index + 1 });
          editor.select(selectedComponent);
          return true;
        }
      }
      return false;
    },
  });
};

/**
 * Initialize device commands for the editor
 */
export const setupDeviceCommands = (editor) => {
  editor.Commands.add("set-device-desktop", {
    run: (editor) => editor.setDevice("desktop"),
  });

  editor.Commands.add("set-device-mobile", {
    run: (editor) => editor.setDevice("mobile"),
  });
};

/**
 * Setup editor configurations and settings
 */
export const getEditorConfig = () => {
  return {
    storageManager: {
      type: "local",
      autosave: true,
      autoload: true,
      stepsBeforeSave: 1,
    },
    deviceManager: {
      devices: [
        {
          id: "desktop",
          name: "Desktop",
          width: "1200px", 
          widthMedia: "1200px",
        },
        {
          id: "mobile",
          name: "Mobile",
          width: "320px",
          widthMedia: "480px",
        },
      ],
    },
    layerManager: {
      appendTo: `.layer-container`,
      scrollLayers: true,
      showWrapper: false,
      custom: true,
      // Only show primary layers (direct children of the wrapper)
      setupLayers: (layers, component) => {
        const wrapper = component.getWrapper();
        const children = wrapper.components();

        // Only include direct children of the wrapper/body
        if (component === wrapper) {
          return children.models;
        }

        // Return empty array for non-primary layers to prevent them from showing children
        return [];
      },
    },
    height: "100vh",
    width: "auto",
    fromElement: false,
    storageManager: false,
    panels: { defaults: [] },
    // Configure selection behavior
    selectorManager: {
      componentFirst: true,
    },
  };
};
