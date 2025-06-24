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
  DragIcon,
} from "./EditorSvg";
import {
  setCurrentPage,
  setPageData,
  addPage,
  updateWidgetOrder,
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

  // const changePage = async (pageId) => {
  //   if (!editorRef.current) return;

  //   const editor = editorRef.current;
  //   const page = pages.find(p => p.id === pageId);

  //   if (page) {
  //     try {
  //       // Save current page before switching
  //       const currentHtml = editor.getHtml();
  //       const currentCss = editor.getCss();

  //       // Extract widgets from current page content
  //       const extractedWidgets = extractWidgetsFromContent(currentHtml);

  //       // Save both raw HTML/CSS and extracted widgets
  //       dispatch(setPageData({
  //         pageId: currentPage,
  //         component: currentHtml,
  //         styles: currentCss,
  //         widgets: extractedWidgets
  //       }));

  //       // Show success message
  //       messageApi.success(`Switched to page: ${page.title}`);

  //       // Load new page
  //       if (page.widgets?.length > 0) {
  //         // If the page has widget configurations, render them
  //         try {
  //           const pageContent = await constructPageContent(page.widgets);
  //           editor.setComponents(pageContent.component);
  //           editor.setStyle(pageContent.styles);
  //         } catch (error) {
  //           console.error('Error constructing page content:', error);
  //           // Fall back to raw HTML/CSS if widget rendering fails
  //           editor.setComponents(page.component || '');
  //           editor.setStyle(page.styles || '');
  //         }
  //       } else {
  //         // Otherwise just load the raw HTML/CSS
  //         editor.setComponents(page.component || '');
  //         editor.setStyle(page.styles || '');
  //       }

  //       // Update current page in state
  //       dispatch(setCurrentPage(pageId));
  //     } catch (error) {
  //       console.error('Error changing page:', error);
  //       messageApi.error('Failed to switch page');
  //     }
  //   }
  // };

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
    const panel = editor.Panels.addPanel(config);
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
              width: "", // Full width for desktop
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
          showWrapper: true,
        },
        height: "100vh",
        width: "auto",
        fromElement: false, // Set to false so we can load our custom content
        storageManager: false,
        panels: { defaults: [] },
      };
      const editor = grapesjs.init({
        container: containerRef.current,
        ...editorConfig,
      });

      // Register custom widget component
      //registerWidgetComponent(editor);

      // Store editor instance in ref
      editorRef.current = editor;

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
            label: `<button class="fullscreen-button">Preview ${PlayIcon}</button>`,
            command: (editor) => editor.Commands.run("core:fullscreen"),
            attributes: { title: "Fullscreen" },
          },
          {
            id: "publish",
            label: `<button class="publish-button">Publish</button>`,
            attributes: { title: "Publish" },
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
      />
      <div className={`editorPanel`}>
        <div className={`editor-container ${loading ? "loading" : ""}`}>
          {loading && <Loader />}
          <div ref={containerRef} className={`editor-canvas ${loading ? "hide" : ""}`}>
          </div>
        </div>
      </div>
      <RightSidePanel />
    </div>
  );
};

export default Grapesjs;
