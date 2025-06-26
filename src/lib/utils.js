import { renderTemplate } from "./templateEngine";
import { widgetsTemplates } from "@/widgets/index.js";

/**
 * Get widget templates from src/widgets directory
 *
 * @returns {Object} Object containing all widget templates organized by widget type
 */
export const getWidgetsTemplates = () => {
  return widgetsTemplates;
};

/**
 * Get a specific widget template from src/widgets by widget type and template ID
 *
 * @param {string} widgetType - Widget type (folder name like 'header_navigation')
 * @param {string} templateId - Template identifier (optional, defaults to the widget type)
 * @returns {Object|null} Widget template data or null if not found
 */
export const getWidgetTemplate = (widgetType, templateId = widgetType) => {
  try {
    // Check if the widget type exists in our imported templates
    if (widgetsTemplates[widgetType]) {
      const widgetModule = widgetsTemplates[widgetType];

      // First, try to get the specific template
      if (templateId && widgetModule[`${templateId}`]) {
        return widgetModule[`${templateId}`];
      }

      // If not found, try widget_template format
      if (templateId && widgetModule[`${widgetType}_${templateId}`]) {
        return widgetModule[`${widgetType}_${templateId}`];
      }

      // If still not found, look for default data
      const defaultDataKey = `${widgetType}_default_data`;
      if (widgetModule[defaultDataKey]) {
        return widgetModule[defaultDataKey];
      }

      // Last resort: try to find any template in the module
      const templateKeys = Object.keys(widgetModule).filter(
        (key) => key.includes(widgetType) && !key.includes("default_data_type"),
      );

      if (templateKeys.length > 0) {
        console.log(
          `Using fallback template ${templateKeys[0]} for ${widgetType}/${templateId}`,
        );
        return widgetModule[templateKeys[0]];
      }
    }

    console.warn(`Widget template not found for ${widgetType}/${templateId}`);
    return null;
  } catch (error) {
    console.error(
      `Error getting widget template for ${widgetType}/${templateId}:`,
      error,
    );
    return null;
  }
};

/**
 * Loads a widget from src/widgets directory
 *
 * @param {string} folder - Widget folder name (e.g., 'header_navigation')
 * @param {string} templateId - Widget template ID (e.g., 'header_navigation_1')
 * @returns {Promise<Object>} Widget object with html, css, and metadata
 */
export const loadWidget = async (folder, templateId) => {
  try {
    // Get the widget from our imported templates
    const srcTemplate = getWidgetTemplate(folder, templateId);
    if (srcTemplate) {
      console.log(
        `Loaded widget template from src/widgets: ${folder}/${templateId}`,
      );
      return srcTemplate;
    }

    // If we couldn't find the template, throw an error
    throw new Error(
      `Widget template ${folder}/${templateId} not found in src/widgets`,
    );
  } catch (error) {
    console.error(`Failed to load widget (${folder}/${templateId}):`, error);
    throw error;
  }
};

/**
 * Constructs GrapesJS page content from widget configurations
 *
 * @param {Array} widgets - Array of widget configurations
 * @returns {Object} - Object containing component HTML and CSS styles
 */
export const constructPageContent = async (widgets) => {
  console.log("Constructing page content from widgets:", widgets);

  if (!Array.isArray(widgets) || widgets.length === 0) {
    console.warn("No widgets provided or invalid widget array");
    return { component: "", styles: "" };
  }

  let component = "";
  let styles = "";

  try {
    // Process each widget in sequence

    for (const widget of widgets) {
      try {
        const { id, folder, templateId, data } = widget;

        if (!folder || !templateId) {
          console.warn(
            "Invalid widget configuration, missing folder or templateId:",
            widget,
          );
          continue;
        }

        console.log(`Loading widget: ${folder}/${templateId}`);

        // Load the widget definition
        const widgetDefinition = await loadWidget(folder, templateId);

        if (!widgetDefinition || !widgetDefinition.html) {
          console.warn(`Widget ${folder}/${templateId} has invalid format`);
          continue;
        }

        // Render the HTML template with provided data
        const renderedHtml = renderTemplate(widgetDefinition.html, data);
        const renderedStyles = renderTemplate(widgetDefinition.css, data);

        // Add data-widget attributes for editor identification
        const widgetWrapper = `
          <!-- Widget: ${folder}/${templateId} -->
          <div data-widget-id="${id || `${folder}_${templateId}`}" 
               data-widget-type="${folder}" 
               data-widget-template="${templateId}"
               data-widget-title="${widget.title || widgetDefinition.title || folder}">
            ${renderedHtml}
          </div>
          <!-- End Widget: ${folder}/${templateId} -->
        `;

        component += widgetWrapper;
        styles += renderedStyles || "";

        console.log(`Successfully rendered widget: ${folder}/${templateId}`);
      } catch (widgetError) {
        console.error("Error rendering widget:", widget, widgetError);

        // Add placeholder for failed widget
        component += `
          <!-- Error rendering widget: ${widget.folder}/${widget.templateId} -->
          <div class="widget-error" style="padding: 20px; border: 1px dashed #ff6b6b; color: #ff6b6b; text-align: center;">
            <h3>Widget Error</h3>
            <p>Failed to load widget: ${widget.folder}/${widget.templateId}</p>
          </div>
        `;
      }
    }
  } catch (error) {
    console.error("Error in constructPageContent:", error);
  }

  return {
    component,
    styles,
  };
};

/**
 * Gets available widgets for the GrapesJS editor
 *
 * @returns {Promise<Array>} Array of widget categories and items
 */
export const getAvailableWidgets = async () => {
  try {
    // Try to fetch the widget index from public/widgets/index.json
    const response = await fetch("/widgets/index.json");

    if (response.ok) {
      return await response.json();
    }

    // Fallback to hardcoded widget list if index.json doesn't exist
    return [
      {
        category: "Navigation",
        items: [
          {
            id: "header_navigation_1",
            folder: "header_navigation",
            templateId: "header_navigation_1",
            name: "Header Navigation",
            thumbnail: "/assets/svg/header_nav.svg",
          },
        ],
      },
      {
        category: "Layout",
        items: [
          {
            id: "hero_banner_1",
            folder: "hero_banner",
            templateId: "hero_banner_1",
            name: "Hero Banner",
            thumbnail: "/assets/svg/hero_banner.svg",
          },
          {
            id: "footer_1",
            folder: "footer",
            templateId: "footer_1",
            name: "Standard Footer",
            thumbnail: "/assets/svg/footer.svg",
          },
        ],
      },
      {
        category: "Content",
        items: [
          {
            id: "features_1",
            folder: "features",
            templateId: "features_1",
            name: "Feature Cards",
            thumbnail: "/assets/svg/features.svg",
          },
        ],
      },
    ];
  } catch (error) {
    console.error("Error fetching available widgets:", error);
    return [];
  }
};

/**
 * Gets default data template for a specific widget
 *
 * @param {string} folder Widget folder name
 * @param {string} templateId Widget template ID
 * @returns {Promise<Object>} Default data for the widget
 */
export const getWidgetDefaultData = async (folder, templateId) => {
  try {
    const response = await fetch(`/widgets/${folder}/${folder}.data.json`);

    if (response.ok) {
      return await response.json();
    }

    // Return empty object if no default data file exists
    return {};
  } catch (error) {
    console.warn(
      `No default data found for widget ${folder}/${templateId}:`,
      error,
    );
    return {};
  }
};

/**
 * Extracts widgets from GrapesJS content
 *
 * @param {string} html GrapesJS HTML content
 * @returns {Array} Array of widget configurations
 */
export const extractWidgetsFromContent = (html) => {
  if (!html) return [];

  const widgets = [];
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  // Find all elements with data-widget attributes
  const widgetElements = tempDiv.querySelectorAll("[data-widget-id]");

  widgetElements.forEach((element) => {
    const id = element.getAttribute("data-widget-id");
    const folder = element.getAttribute("data-widget-type");
    const templateId = element.getAttribute("data-widget-template");

    // Extract serialized data attributes if they exist
    let data = {};
    try {
      const serializedData = element.getAttribute("data-widget-data");
      if (serializedData) {
        data = JSON.parse(decodeURIComponent(serializedData));
      }
    } catch (error) {
      console.error(`Error parsing widget data for ${id}:`, error);
    }

    widgets.push({
      id,
      folder,
      templateId,
      data,
    });
  });

  return widgets;
};

/**
 * Debug function to log available widget templates
 * Useful for development to understand the structure of available widgets
 */
export const logAvailableWidgets = () => {
  console.log("Available Widget Templates:");

  try {
    Object.keys(widgetsTemplates).forEach((widgetType) => {
      console.log(`Widget Type: ${widgetType}`);
      const widgetModule = widgetsTemplates[widgetType];

      // Log all exported keys from the widget module
      const exportedKeys = Object.keys(widgetModule);
      console.log(`  Exported keys: ${exportedKeys.join(", ")}`);

      // Log available templates specifically
      const templateKeys = exportedKeys.filter(
        (key) =>
          !key.includes("default_data_type") && !key.includes("default_data"),
      );

      if (templateKeys.length > 0) {
        console.log(`  Available templates: ${templateKeys.join(", ")}`);
      } else {
        console.log("  No templates available");
      }
    });
  } catch (error) {
    console.error("Error logging widget templates:", error);
  }
};

/**
 * Check if a widget module is properly defined
 *
 * @param {string} widgetType - The widget type to check
 * @returns {boolean} True if the widget is properly defined, false otherwise
 */
export const isWidgetDefined = (widgetType) => {
  if (!widgetsTemplates[widgetType]) {
    return false;
  }

  const widgetModule = widgetsTemplates[widgetType];
  const keys = Object.keys(widgetModule);

  // Check if widget has any exports
  if (keys.length === 0) {
    return false;
  }

  // Check if it has at least one template
  const hasTemplate = keys.some(
    (key) => !key.includes("default_data_type") && key.includes(widgetType),
  );

  return hasTemplate;
};

/**
 * Generate a customization form for a widget based on its schema
 *
 * @param {Object} widget - Widget definition with schema
 * @param {Object} currentData - Current widget data for default values
 * @returns {Object} Form configuration for the widget
 */
export const generateWidgetForm = (widget, currentData = {}) => {
  // Get the schema from the widget
  const schema = widget.metadata?.editorSchema
    ? widgetsTemplates[widget.folder][widget.metadata.editorSchema]
    : null;

  if (!schema) {
    console.warn(
      `No schema found for widget ${widget.folder}/${widget.templateId}`,
    );
    return { sections: [] };
  }

  // Get customization sections from metadata or create default
  const customizableSections = widget.metadata?.customizableSections || [
    { id: "content", title: "Content", fields: Object.keys(schema) },
  ];

  // Build form sections
  const formSections = customizableSections.map((section) => {
    return {
      id: section.id,
      title: section.title,
      fields: generateFieldsFromSchema(schema, section.fields, currentData),
    };
  });

  return {
    sections: formSections,
  };
};

/**
 * Generate form fields based on schema and current data
 *
 * @param {Object} schema - The widget schema
 * @param {Array} fieldPaths - Field paths to include
 * @param {Object} currentData - Current widget data
 * @returns {Array} Array of field configurations
 */
export const generateFieldsFromSchema = (schema, fieldPaths, currentData) => {
  const fields = [];

  fieldPaths.forEach((path) => {
    // Handle nested paths (e.g., "styles.backgroundColor")
    const pathParts = path.split(".");
    const fieldName = pathParts[0];

    // Get field schema
    const fieldSchema = schema[fieldName];
    if (!fieldSchema) return;

    // Get current value
    let currentValue = currentData[fieldName];
    if (pathParts.length > 1 && currentValue) {
      for (let i = 1; i < pathParts.length; i++) {
        if (currentValue) {
          currentValue = currentValue[pathParts[i]];
        }
      }
    }

    // Generate field based on type
    if (fieldSchema.type === "array") {
      // Array fields (repeatable)
      fields.push({
        id: path,
        type: "array",
        label: fieldSchema.label || path,
        description: fieldSchema.description,
        minItems: fieldSchema.minItems || 0,
        maxItems: fieldSchema.maxItems,
        currentItems: Array.isArray(currentValue) ? currentValue : [],
        addItemLabel: fieldSchema.addItemLabel || "Add Item",
        itemLabel: fieldSchema.itemLabel || "Item",
        itemFields: fieldSchema.item
          ? Object.keys(fieldSchema.item).map((itemField) => {
              const itemSchema = fieldSchema.item[itemField];
              return {
                id: itemField,
                type: itemSchema.type || "text",
                label: itemSchema.label || itemField,
                placeholder: itemSchema.placeholder || "",
                required: itemSchema.validation?.required || false,
                maxLength: itemSchema.validation?.maxLength,
              };
            })
          : [],
      });
    } else if (pathParts.length > 1) {
      // Handle nested properties (usually style properties)
      const nestedType = guessFieldTypeFromValue(currentValue);
      fields.push({
        id: path,
        type: nestedType,
        label: pathParts.slice(1).join(" "), // Convert camelCase to space-separated
        value: currentValue,
        placeholder: `Enter ${pathParts.slice(1).join(" ")}`,
      });
    } else {
      // Regular fields
      fields.push({
        id: path,
        type: fieldSchema.type || "text",
        label: fieldSchema.label || path,
        description: fieldSchema.description,
        placeholder: fieldSchema.placeholder || "",
        required: fieldSchema.validation?.required || false,
        maxLength: fieldSchema.validation?.maxLength,
        value: currentValue,
      });
    }
  });

  return fields;
};

/**
 * Guess the field type based on its value
 *
 * @param {any} value - The field value
 * @returns {string} Guessed field type
 */
export const guessFieldTypeFromValue = (value) => {
  if (value === null || value === undefined) {
    return "text";
  }

  // Check if it's a color
  if (
    typeof value === "string" &&
    (value.startsWith("#") ||
      value.startsWith("rgb") ||
      value.startsWith("hsl"))
  ) {
    return "color";
  }

  // Check if it's a URL
  if (
    typeof value === "string" &&
    (value.startsWith("http") ||
      value.startsWith("/") ||
      value.includes(".com"))
  ) {
    return "url";
  }

  // Check if it's a long text
  if (typeof value === "string" && value.length > 100) {
    return "textarea";
  }

  // Boolean values
  if (typeof value === "boolean") {
    return "checkbox";
  }

  // Numbers
  if (typeof value === "number") {
    return "number";
  }

  // Default to text
  return "text";
};
