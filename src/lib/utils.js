import { renderTemplate } from "./templateEngine";

/**
 * Loads a widget from public/widgets folder
 *
 * @param {string} folder - Widget folder name (e.g., 'header_navigation')
 * @param {string} templateId - Widget template ID (e.g., 'header_navigation_1')
 * @returns {Promise<Object>} Widget object with html, css, and metadata
 */
export const loadPublicWidget = async (folder, templateId) => {
  try {
    const jsonPath = `/widgets/${folder}/${templateId}.json`;
    const response = await fetch(jsonPath);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch JSON: ${response.status} ${response.statusText}`,
      );
    }

    return await response.json();
  } catch (jsonError) {
    console.error(
      `Failed to load widget (${folder}/${templateId}):`,
      jsonError,
    );
    throw new Error(`Widget ${folder}/${templateId} not found in any format`);
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
        const widgetDefinition = await loadPublicWidget(folder, templateId);

        if (!widgetDefinition || !widgetDefinition.html) {
          console.warn(`Widget ${folder}/${templateId} has invalid format`);
          continue;
        }

        // Render the HTML template with provided data
        const renderedHtml = renderTemplate(widgetDefinition.html, data);

        // Add data-widget attributes for editor identification
        const widgetWrapper = `
          <!-- Widget: ${folder}/${templateId} -->
          <div data-widget-id="${id || `${folder}_${templateId}`}" 
               data-widget-type="${folder}" 
               data-widget-template="${templateId}">
            ${renderedHtml}
          </div>
          <!-- End Widget: ${folder}/${templateId} -->
        `;

        component += widgetWrapper;
        styles += widgetDefinition.css || "";

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
