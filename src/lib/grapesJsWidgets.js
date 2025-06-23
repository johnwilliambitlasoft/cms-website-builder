/**
 * GrapesJS widget integration helpers
 */
import {
  getAvailableWidgets,
  getWidgetDefaultData,
  loadPublicWidget,
} from "./utils";
import { renderTemplate } from "./templateEngine";

/**
 * Registers widget blocks in GrapesJS
 *
 * @param {Object} editor - GrapesJS editor instance
 */
export const registerWidgetBlocks = async (editor) => {
  try {
    const blockManager = editor.BlockManager;
    const widgetCategories = await getAvailableWidgets();

    for (const category of widgetCategories) {
      for (const widget of category.items) {
        const { id, folder, templateId, name, thumbnail } = widget;

        // Get default data for this widget
        const defaultData = await getWidgetDefaultData(folder, templateId);

        // Register the block
        blockManager.add(`widget-${id}`, {
          label: name,
          category: category.category,
          attributes: { class: "gjs-block-section" },
          content: {
            type: "widget",
            widgetId: id,
            folder,
            templateId,
            data: defaultData,
            droppable: true,
            style: { padding: "10px" },
          },
          media:
            thumbnail ||
            `<svg viewBox="0 0 24 24"><path d="M22 9L12 5 2 9 12 13 22 9zM12 3L1 8l11 5 11-5-11-5z"></path><path d="M2 11v8l10 5 10-5v-8"></path></svg>`,
        });
      }
    }
  } catch (error) {
    console.error("Error registering widget blocks:", error);
  }
};

/**
 * Registers widget component type in GrapesJS
 *
 * @param {Object} editor - GrapesJS editor instance
 */
export const registerWidgetComponent = (editor) => {
  const domComponents = editor.DomComponents;

  // Define the widget component type
  domComponents.addType("widget", {
    isComponent: (el) => el.hasAttribute && el.hasAttribute("data-widget-id"),

    model: {
      defaults: {
        droppable: true,
        attributes: {
          "data-gjs-type": "widget",
        },
        traits: [
          { name: "widgetId", type: "text" },
          { name: "folder", type: "text" },
          { name: "templateId", type: "text" },
        ],
      },

      init() {
        this.on("change:attributes:data-widget-data", this.onDataUpdate);
      },

      onDataUpdate() {
        // Re-render the widget when data changes
        this.render();
      },

      async render() {
        try {
          const attributes = this.getAttributes();
          const folder = this.get("folder") || attributes["data-widget-type"];
          const templateId =
            this.get("templateId") || attributes["data-widget-template"];
          const widgetId =
            this.get("widgetId") ||
            attributes["data-widget-id"] ||
            `${folder}_${templateId}`;

          // Get widget data
          let data = this.get("data") || {};
          const dataAttr = attributes["data-widget-data"];
          if (dataAttr) {
            try {
              data = JSON.parse(decodeURIComponent(dataAttr));
            } catch (e) {
              console.warn("Failed to parse widget data:", e);
            }
          }

          if (!folder || !templateId) {
            console.warn("Widget missing folder or templateId:", this);
            return;
          }

          // Load the widget definition
          const widgetDef = await loadPublicWidget(folder, templateId);

          // Render the HTML with data
          const html = renderTemplate(widgetDef.html, data);

          // Set the rendered HTML as content
          this.components(html);

          // Set the widget attributes for later extraction
          this.setAttributes({
            "data-widget-id": widgetId,
            "data-widget-type": folder,
            "data-widget-template": templateId,
            "data-widget-data": encodeURIComponent(JSON.stringify(data)),
          });
        } catch (error) {
          console.error("Error rendering widget component:", error);
          this.components(
            `<div class="widget-error">Error rendering widget: ${error.message}</div>`,
          );
        }
      },
    },

    view: {
      init() {
        this.listenTo(this.model, "change:data", this.render);
      },

      onRender() {
        // Add widget overlay for better editing experience
        setTimeout(() => {
          const widgetOverlay = document.createElement("div");
          widgetOverlay.className = "widget-overlay";
          widgetOverlay.innerHTML = `
            <div class="widget-overlay-label">
              ${this.model.get("folder")}/${this.model.get("templateId")} 
              <button class="widget-edit-btn">Edit Data</button>
            </div>
          `;

          const el = this.el;
          if (el && !el.querySelector(".widget-overlay")) {
            el.appendChild(widgetOverlay);

            // Add edit button click handler
            const editBtn = widgetOverlay.querySelector(".widget-edit-btn");
            if (editBtn) {
              editBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                // Open widget data editor
                const widgetDataEditor = document.createElement("div");
                widgetDataEditor.className = "widget-data-editor";
                // You would implement your data editor UI here
                console.log("Edit widget data:", this.model.get("data"));
              });
            }
          }
        }, 100);
      },
    },
  });
};
