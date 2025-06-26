"use client";
import { useSelector, useDispatch } from "react-redux";
import { useMessage } from "@/lib/provider/MessageProvider";
import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import "./grapesjs.css";
import RightSidePanel from "./rightSidePanel";
import LeftSidePanel from "./leftSidePanel";
import { Loader } from "@/components";
import {
  DesktopIcon,
  MobileIcon,
  UndoIcon,
  RedoIcon,
  PlayIcon,
  MoveUp,
  MoveDown,
} from "./EditorSvg";
import {
  setCurrentPage,
  setPageData,
  addPage,
  updateWidgetOrder,
  setCurrentWidget,
} from "@/lib/redux/init/init.slice";
import { constructPageContent, extractWidgetsFromContent } from "@/lib/utils";
import {
  registerWidgetBlocks,
  registerWidgetComponent,
} from "@/lib/grapesJsWidgets";
const Grapesjs = () => {
  const dispatch = useDispatch();
  const messageApi = useMessage();
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const currentPage = useSelector((state) => state.init.currentPage);
  const pages = useSelector((state) => state.init.pages);
  const [loading, setLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(50);
  const [previewActive, setPreviewActive] = useState(false);

  const changePage = async (pageId) => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const page = pages.find((p) => p.id === pageId);
      if (page) {
        try {
          const pageContent = await constructPageContent(page.widgets);

          editor.setComponents(pageContent.component);
          editor.setStyle(pageContent.styles);
          dispatch(setCurrentPage(pageId));
        } catch (error) {
          console.error("Error loading page content from widgets:", error);
          messageApi.error("Failed to load page content");
        }
      }
    }
  };

  const setDeviceActive = (deviceModel) => {
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

  const addPanel = (editor, config) => {
    if (editor.Panels.getPanel(config.id)) {
      editor.Panels.removePanel(config.id);
    }
    // Add the panel with the provided configuration
    if (!config.id) {
      console.error("Panel configuration must include an id");
      return;
    }
    if (!config.el) {
      console.error(
        "Panel configuration must include an element selector (el)",
      );
      return;
    }
    editor.Panels.addPanel(config);
  };

  const contentRender = async (widget) => {
    try {
      const widgetContent = await constructPageContent(widget);
      if (editorRef.current) {
        editorRef.current.setComponents(widgetContent.component);
        editorRef.current.setStyle(widgetContent.styles);
      } else {
        console.warn("Editor instance is not available.");
      }
    } catch (error) {
      console.error("Error rendering widget content:", error);
    }
    setLoading(false);
  };

  const publishPage = () => {
    if (editorRef.current) {
      try {
        setLoading(true);
        messageApi.info("Publishing pages...");

        // Create the build directory structure
        const createBuildDir = async () => {
          try {
            // Use fetch to call our API route that will create the build folders
            // We explicitly set cleanFirst to true to remove any previous build
            const response = await fetch("/api/publish/create-dirs", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                cleanFirst: true, // Always clean previous build
              }),
            });

            if (!response.ok) {
              throw new Error("Failed to create build directories");
            }

            return await response.json();
          } catch (error) {
            console.error("Error creating build directories:", error);
            throw error;
          }
        };

        // Generate HTML and CSS files for all pages
        const generateFiles = async () => {
          await createBuildDir();

          // Process each page
          const publishedPages = [];

          for (const page of pages) {
            try {
              // Get the page content
              const pageContent = await constructPageContent(page.widgets);

              // Create clean file name from page title or use page ID
              const fileName = page.title
                ? page.title
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "")
                : `page-${page.id}`;

              // Build HTML with link to its CSS
              const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${page.title || "Untitled Page"}</title>
  <link rel="stylesheet" href="styles/${fileName}.css">
</head>
<body>
  ${pageContent.component}
</body>
</html>`;

              // Save HTML and CSS via API
              const response = await fetch("/api/publish/save-files", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  fileName,
                  html: htmlContent,
                  css: pageContent.styles,
                }),
              });

              if (!response.ok) {
                throw new Error(
                  `Failed to save files for page "${page.title}"`,
                );
              }

              publishedPages.push(fileName);
            } catch (error) {
              console.error(`Error publishing page ${page.title}:`, error);
              messageApi.error(
                `Failed to publish page "${page.title}": ${error.message}`,
              );
            }
          }

          return publishedPages;
        };

        // Execute the publishing process
        generateFiles()
          .then(async (publishedPages) => {
            messageApi.success(
              `Successfully published ${publishedPages.length} pages to the build folder!`,
            );

            // Start the preview server and open the first published page
            if (publishedPages.length > 0) {
              try {
                // Start the preview server via the API
                const previewResponse = await fetch("/api/publish/preview", {
                  method: "GET",
                });

                if (!previewResponse.ok) {
                  throw new Error("Failed to start preview server");
                }

                const previewData = await previewResponse.json();

                if (previewData.success && previewData.url) {
                  // Open the preview URL in a new tab
                  const previewUrl = `${previewData.url}/${publishedPages[0]}.html`;
                  window.open(previewUrl, "_blank");
                  messageApi.info(
                    `Preview server running at: ${previewData.url}`,
                  );
                } else {
                  // Fallback to direct file opening if preview server fails
                  window.open(`/build/${publishedPages[0]}.html`, "_blank");
                }
              } catch (error) {
                console.error("Preview server error:", error);
                // Fallback to direct file opening
                window.open(`/build/${publishedPages[0]}.html`, "_blank");
                messageApi.warning(
                  "Preview server could not start. Opening static file instead.",
                );
              }
            }
          })
          .catch((error) => {
            messageApi.error(`Publishing failed: ${error.message}`);
          })
          .finally(() => {
            setLoading(false);
          });
      } catch (error) {
        console.error("Error in publish process:", error);
        messageApi.error("Publishing failed");
        setLoading(false);
      }
    }
  };

  // Function to stop the preview server
  const stopPreviewServer = async () => {
    try {
      const response = await fetch("/api/publish/preview", {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        messageApi.success("Preview server stopped");
      } else {
        messageApi.info(data.message);
      }
    } catch (error) {
      console.error("Error stopping preview server:", error);
      messageApi.error("Failed to stop preview server");
    }
  };

  // Get the stored preview server URL
  const getPreviewServerUrl = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("previewServerUrl");
    }
    return null;
  };

  useEffect(() => {
    // Initialize editor with async setup
    const initializeEditor = async () => {
      setLoading(true);
      const editorConfig = {
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
              width: "1200px", // Full width for desktop
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
          showWrapper: false, // Don't show the wrapper
          // Custom layer view configuration
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
        fromElement: false, // Set to false so we can load our custom content
        storageManager: false,
        panels: { defaults: [] },
        // Configure selection behavior
        selectorManager: {
          componentFirst: true,
        },
      };
      const editor = grapesjs.init({
        container: containerRef.current,
        ...editorConfig,
      });

      // Configure selection constraints to only allow primary layer selection
      editor.on("component:selected", (component) => {
        // If the selected component is not a direct child of the body/wrapper,
        // select its nearest parent that is a direct child of the body/wrapper
        if (component) {
          const parent = component.parent();
          const wrapper = editor.getWrapper();

          // If component is not a direct child of the wrapper/body
          if (
            parent &&
            parent !== wrapper &&
            wrapper.find("#" + parent.getId()).length > 0
          ) {
            // Find the top-level parent (direct child of wrapper)
            let topLevelParent = component;
            let currentParent = component;

            while (
              currentParent.parent() &&
              currentParent.parent() !== wrapper
            ) {
              topLevelParent = currentParent.parent();
              currentParent = currentParent.parent();
            }

            // Select the top-level parent instead
            dispatch(
              setCurrentWidget(
                topLevelParent?.attributes?.attributes["data-widget-type"],
              ),
            );
            editor.select(topLevelParent);
            return;
          }
        }
      });

      // Disable selection of child elements in canvas
      editor.on("component:mousedown", (component, event) => {
        if (component && component.parent() !== editor.getWrapper()) {
          // Find the top-level parent (direct child of wrapper)
          let topLevelParent = component;
          let currentParent = component;

          while (
            currentParent.parent() &&
            currentParent.parent() !== editor.getWrapper()
          ) {
            topLevelParent = currentParent.parent();
            currentParent = currentParent.parent();
          }

          // Prevent the default event handling
          event.stopPropagation();

          // Select the top-level parent instead
          setTimeout(() => {
            dispatch(
              setCurrentWidget(
                topLevelParent?.attributes?.attributes["data-widget-type"],
              ),
            );
            editor.select(topLevelParent);
          }, 0);
        }
      });

      // Ensure layer manager selections follow the same rules
      editor.on("layer:select", (component) => {
        if (component) {
          const wrapper = editor.getWrapper();

          // If the component is not a direct child of the wrapper
          if (component.parent() !== wrapper) {
            // Find the top-level parent
            let topLevelParent = component;
            let currentParent = component;

            while (
              currentParent.parent() &&
              currentParent.parent() !== wrapper
            ) {
              topLevelParent = currentParent.parent();
              currentParent = currentParent.parent();
            }

            // Select the top-level parent instead
            setTimeout(() => {
              dispatch(
                setCurrentWidget(
                  topLevelParent?.attributes?.attributes["data-widget-type"],
                ),
              );
              editor.select(topLevelParent);
            }, 0);
          }
        }
      });

      // Register custom widget component
      //registerWidgetComponent(editor);

      // Add custom buttons to the component toolbar
      // Get the default component type
      const defaultType = editor.DomComponents.getType("default");
      // Get the existing toolbar configuration or initialize as an empty array
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
              // Add our new buttons
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

      // Store editor instance in ref
      editorRef.current = editor;

      //editor.editor.Canvas.setZoom(zoomLevel);

      // Initialize with available widget blocks
      registerWidgetBlocks(editor);

      // Load the initial page
      const initialPage = pages.find((p) => p.id === currentPage);

      if (initialPage?.widgets?.length > 0) {
        // If the page has widget definitions, render them
        try {
          const pageContent = await constructPageContent(initialPage.widgets);

          editor.setComponents(pageContent.component);
          editor.setStyle(pageContent.styles);
        } catch (error) {
          console.error("Error loading page content from widgets:", error);
          messageApi.error("Failed to load page content");
        }
      } else if (initialPage) {
        // Otherwise load raw HTML/CSS
        editor.setComponents(initialPage.component || "");
        editor.setStyle(initialPage.styles || "");
      }

      addPanel(editor, {
        id: "panel-devices",
        el: ".panel__devices",
        buttons: [
          {
            id: "device-desktop",
            label: `${DesktopIcon} <span class="device-label">Desktop</span>`,
            command: "set-device-desktop",
            active: true,
            togglable: false,
          },
          {
            id: "device-mobile",
            label: `${MobileIcon} <span class="device-label">Mobile</span>`,
            command: "set-device-mobile",
            togglable: false,
          },
        ],
      });
      // Add a panel for undo/redo buttons
      addPanel(editor, {
        id: "panel-history",
        el: ".panel__history",
        buttons: [
          {
            id: "undo",
            label: `${UndoIcon}`,
            command: (editor) => editor.Commands.run("core:undo"),
            attributes: { title: "Undo" },
          },
          {
            id: "redo",
            label: `${RedoIcon}`,
            command: (editor) => editor.Commands.run("core:redo"),
            attributes: { title: "Redo" },
          },
          {
            id: "separator",
            className: "separator",
          },
          {
            id: "fullscreen",
            label: `<button class="fullscreen-button">Editor Preview ${PlayIcon}</button>`,
            command: (editor) => editor.Commands.run("core:fullscreen"),
            attributes: { title: "Editor Fullscreen Preview" },
          },
          {
            id: "live-preview",
            label: `<button class="preview-button">Live Preview</button>`,
            attributes: { title: "Preview in HTTP Server" },
            command: async (editor) => {
              try {
                messageApi.info("Starting preview server...");

                // Start the preview server via the API
                const previewResponse = await fetch("/api/publish/preview", {
                  method: "GET",
                });

                if (!previewResponse.ok) {
                  throw new Error("Failed to start preview server");
                }

                const previewData = await previewResponse.json();

                if (previewData.success && previewData.url) {
                  // Open the preview URL in a new tab - default to home.html if available
                  window.open(previewData.url, "_blank");
                  messageApi.success(
                    `Preview server running at: ${previewData.url}`,
                  );

                  // Set a state to indicate the preview is active
                  setPreviewActive(true);
                  // Store the preview URL in localStorage to make it available across page refreshes
                  localStorage.setItem("previewServerUrl", previewData.url);
                } else {
                  throw new Error(
                    previewData.message || "Preview server error",
                  );
                }
              } catch (error) {
                console.error("Preview server error:", error);
                messageApi.error(`Preview failed: ${error.message}`);
              }
            },
          },
          {
            id: "stop-preview",
            label: `<button class="stop-preview-button">Stop Preview</button>`,
            attributes: { title: "Stop HTTP Preview Server" },
            command: async (editor) => {
              try {
                await stopPreviewServer();
                setPreviewActive(false);
                localStorage.removeItem("previewServerUrl");
              } catch (error) {
                console.error("Error stopping preview server:", error);
              }
            },
            // Only show stop button if preview is active
            visible: previewActive,
          },
          {
            id: "view-published",
            label: `<button class="view-published-button">View Published</button>`,
            attributes: { title: "View Published Site" },
            command: async (editor) => {
              const previewUrl = getPreviewServerUrl();
              if (previewUrl) {
                window.open(previewUrl, "_blank");
              } else if (previewActive) {
                // If the preview is active but URL not stored, check status again
                try {
                  const response = await fetch("/api/publish/preview", {
                    method: "GET",
                  });

                  if (response.ok) {
                    const data = await response.json();
                    if (data.success && data.url) {
                      window.open(data.url, "_blank");
                      localStorage.setItem("previewServerUrl", data.url);
                    } else {
                      messageApi.warning("Preview server URL not available");
                    }
                  }
                } catch (error) {
                  console.error("Error getting preview server URL:", error);
                  messageApi.error("Failed to get preview server URL");
                }
              } else {
                messageApi.info(
                  "No published site available. Please publish first.",
                );
              }
            },
            // Only show view button if preview is active
            visible: previewActive,
          },
          {
            id: "publish",
            label: `<button class="publish-button">Publish</button>`,
            attributes: { title: "Publish" },
            command: publishPage,
          },
        ],
      });

      // Define commands for device switching
      editor.Commands.add("set-device-desktop", {
        run: (editor) => editor.setDevice("desktop"),
      });

      editor.Commands.add("set-device-mobile", {
        run: (editor) => editor.setDevice("mobile"),
      });

      // Add custom commands for moving components up and down
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

      // Listen for device change events and update UI accordingly
      editor.on("change:device", () => {
        const deviceModel = editor.getDevice();
        setDeviceActive(deviceModel);
      });

      setLoading(false);
    };
    // Execute the async initialization
    if (editorRef.current == null) {
      initializeEditor();
    } else {
      setLoading(false);
    }
  });

  // Check if preview server is running on component mount
  const checkPreviewServerStatus = async () => {
    try {
      const response = await fetch("/api/publish/preview", {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPreviewActive(true);
        }
      }
    } catch (error) {
      console.error("Error checking preview server status:", error);
    }
  };

  // Call this in useEffect at component mount
  useEffect(() => {
    checkPreviewServerStatus();
  }, []);

  return (
    <div className="grapesjs">
      <LeftSidePanel
        onPageChange={changePage}
        currentPage={currentPage}
        pages={pages}
        addPage={() => {
          dispatch(addPage());
        }}
        updateWidgetOrder={(newOrder) => {
          setLoading(true);
          dispatch(
            updateWidgetOrder({
              pageId: currentPage,
              newOrder: newOrder,
            }),
          );
          contentRender(newOrder);
        }}
        updatePageTitle={(newTitle) => {
          setLoading(true);
          dispatch(
            updatePageTitle({
              pageId: currentPage,
              newTitle: newTitle,
            }),
          );
        }}
      />
      <div className={`editorPanel`}>
        <div className={`editor-container ${loading ? "loading" : ""}`}>
          {loading && <Loader />}
          <div
            ref={containerRef}
            className={`editor-canvas ${loading ? "hide" : ""}`}
          ></div>
        </div>
      </div>
      <RightSidePanel />
    </div>
  );
};

export default Grapesjs;
