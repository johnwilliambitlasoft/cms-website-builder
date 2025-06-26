"use client";

import { useEffect, useState } from "react";
import { getWidgetTemplate } from "@/lib/utils";
import { renderTemplate } from "@/lib/templateEngine";
import { Loader } from "@/components";
import styles from "./WidgetPreview.module.css";

const WidgetPreview = ({ folder = "", templateId = "" }) => {
  const [widget, setWidget] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showInfoBar, setShowInfoBar] = useState(true);

  useEffect(() => {
    async function loadWidget() {
      try {
        // Get the widget template
        const widgetTemplate = getWidgetTemplate(folder, templateId);

        if (!widgetTemplate) {
          throw new Error(`Widget template ${folder}/${templateId} not found`);
        }

        // Get default data - first try the specific template's default data
        // then fall back to the folder's default data
        const defaultDataKey = `${folder}_default_data`;
        let defaultData = getWidgetTemplate(folder, defaultDataKey) || {};

        // Ensure styles object exists in default data
        if (!defaultData.styles) {
          // Try getting styles from the template itself
          if (widgetTemplate.styles) {
            defaultData.styles = widgetTemplate.styles;
          } else if (typeof widgetTemplate === "object") {
            // Look for styles in the template object
            defaultData.styles = defaultData.styles || {};
          }
        }

        // Get the HTML and CSS
        const html = widgetTemplate.html || "";
        const css = widgetTemplate.css || "";

        // Render the template with default data
        console.log(
          `Rendering widget ${folder}/${templateId} with data:`,
          defaultData,
        );
        const renderedHtml = renderTemplate(html, defaultData);
        const renderedStyles = renderTemplate(css, defaultData);

        // Get schema
        const schemaKey = `${folder}_schema`;
        const schema = getWidgetTemplate(folder, schemaKey) || null;

        setWidget({
          html: renderedHtml,
          css: renderedStyles,
          title: widgetTemplate.title || `${folder}/${templateId}`,
          data: defaultData, // Store the data used for reference
          schema: schema,
        });
      } catch (err) {
        console.error("Error loading widget:", err);
        setError(err.message || "Failed to load widget");
      } finally {
        setLoading(false);
      }
    }

    loadWidget();
  }, [folder, templateId]);

  // If loading, show minimal loading indicator
  if (loading) {
    return <Loader />;
  }

  // If error, show error message
  if (error) {
    return <div className={styles.errorMessage}>Error: {error}</div>;
  }

  // If no widget, show not found message
  if (!widget) {
    return <div className={styles.notFoundMessage}>Widget not found</div>;
  }

  return (
    <div className={styles.previewPage}>
      {/* Info bar */}
      {showInfoBar && (
        <div className={styles.infoBar} id="infoBar">
          <div>
            Widget:{" "}
            <strong>
              {folder}/{templateId}
            </strong>
          </div>
          <div className={styles.infoButtons}>
            <a
              href="#"
              className={styles.infoLink}
              onClick={(e) => {
                e.preventDefault();
                const dataPanel = document.getElementById("dataPanel");
                if (dataPanel) {
                  dataPanel.classList.toggle(styles.dataPanelVisible);
                }
              }}
            >
              Show Data
            </a>
            <a
              href="#"
              className={styles.infoLink}
              onClick={(e) => {
                e.preventDefault();
                setShowInfoBar(false);
                setTimeout(() => {
                  const toggleBtn = document.getElementById("toggleBtn");
                  if (toggleBtn) {
                    toggleBtn.classList.add(styles.infoToggleVisible);
                  }
                }, 300);
              }}
            >
              Hide Bar
            </a>
          </div>
        </div>
      )}

      {/* Toggle button for showing info bar (only visible when info bar is hidden) */}
      {!showInfoBar && (
        <div
          className={styles.infoToggle}
          id="toggleBtn"
          onClick={() => {
            setShowInfoBar(true);
            const toggleBtn = document.getElementById("toggleBtn");
            if (toggleBtn) {
              toggleBtn.classList.remove(styles.infoToggleVisible);
            }
          }}
        >
          Show Info
        </div>
      )}

      {/* Data panel for viewing widget data and schema */}
      <div className={styles.dataPanel} id="dataPanel">
        <div className={styles.dataPanelHeader}>
          <h2>Widget Data & Schema</h2>
          <button
            className={styles.closeButton}
            onClick={() => {
              const dataPanel = document.getElementById("dataPanel");
              if (dataPanel) {
                dataPanel.classList.remove(styles.dataPanelVisible);
              }
            }}
          >
            Close
          </button>
        </div>
        <h3>Widget Data</h3>
        <pre className={styles.dataPanelContent}>
          {JSON.stringify(widget.data, null, 2)}
        </pre>
        {widget.schema && (
          <>
            <h3>Widget Schema</h3>
            <pre className={styles.dataPanelContent}>
              {JSON.stringify(widget.schema, null, 2)}
            </pre>
          </>
        )}
      </div>

      {/* Widget content */}
      <div className={styles.previewContainer}>
        {/* Inject the widget's CSS */}
        <style dangerouslySetInnerHTML={{ __html: widget.css }} />
        <div dangerouslySetInnerHTML={{ __html: widget.html }} />
      </div>
    </div>
  );
};

export default WidgetPreview;
