/**
 * Template engine for widget rendering
 */

/**
 * Renders a template with data using a simple handlebars-like syntax
 * Supports:
 * - {{variable}} - Simple variable replacement
 * - {{#each array}} content {{/each}} - Loop through arrays
 * - {{#if condition}} content {{else}} alternative {{/if}} - Conditional rendering
 *
 * @param {string} template - The HTML template string
 * @param {object} data - The data to inject into the template
 * @returns {string} - The rendered HTML
 */
export function renderTemplate(template, data) {
  if (!data || !template) return template || "";

  let result = template;

  // Process conditionals first
  result = processConditionals(result, data);

  // Process loops
  result = processLoops(result, data);

  // Process simple variables
  result = processVariables(result, data);

  return result;
}

/**
 * Process {{#if condition}} content {{else}} alternative {{/if}} blocks
 */
function processConditionals(template, data) {
  const ifRegex =
    /\{\{#if\s+(\w+)\}\}([\s\S]*?)(?:\{\{else\}\}([\s\S]*?))?\{\{\/if\}\}/g;

  return template.replace(
    ifRegex,
    (_, condition, trueBranch, falseBranch = "") => {
      const value = data[condition];
      return value ? trueBranch : falseBranch;
    },
  );
}

/**
 * Process {{#each items}} content {{/each}} blocks
 */
function processLoops(template, data) {
  const eachRegex = /\{\{#each\s+(\w+)\}\}([\s\S]*?)\{\{\/each\}\}/g;

  return template.replace(eachRegex, (_, arrayKey, itemTemplate) => {
    const array = data[arrayKey];
    if (!Array.isArray(array)) return "";

    return array
      .map((item) => {
        // Process nested variables within the loop
        return processVariables(itemTemplate, item);
      })
      .join("");
  });
}

/**
 * Process {{variable}} replacements, including nested paths like {{styles.color}}
 */
function processVariables(template, data) {
  return template.replace(/\{\{([\w\.]+)\}\}/g, (_, path) => {
    if (path.includes('.')) {
      // Handle nested paths (e.g., styles.backgroundColor)
      const parts = path.split('.');
      let value = data;
      
      // Navigate the object using the path parts
      for (const part of parts) {
        if (value === undefined || value === null) return "";
        value = value[part];
      }
      
      return value !== undefined ? value : "";
    } else {
      // Simple variable
      return data[path] !== undefined ? data[path] : "";
    }
  });
}

/**
 * Parses widget definitions to extract common properties
 *
 * @param {Object} widgetModule - The imported widget module
 * @returns {Object} - The normalized widget properties
 */
export function normalizeWidgetModule(widgetModule) {
  // Handle various export formats
  if (widgetModule.default) {
    // If using export default { html, css, ... }
    return widgetModule.default;
  } else if (widgetModule.html) {
    // If using named exports: export const html, export const css
    return {
      html: widgetModule.html,
      css: widgetModule.css || "",
      metadata: widgetModule.metadata || {
        id: widgetModule.id || "unknown",
        name: widgetModule.name || "Unnamed Widget",
        thumbnail: widgetModule.thumbnail || "/assets/svg/default_widget.svg",
      },
    };
  } else {
    throw new Error("Invalid widget module format");
  }
}
