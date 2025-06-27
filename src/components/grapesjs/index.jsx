"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMessage } from "@/lib/provider/MessageProvider";
import grapesjs from "grapesjs";

// Styles
import "grapesjs/dist/css/grapes.min.css";
import "./grapesjs.css";

// Components
import RightSidePanel from "./rightSidePanel";
import LeftSidePanel from "./leftSidePanel";
import { Loader } from "@/components";

// SVG Icons
import {
  MoveUp,
  MoveDown,
} from "./EditorSvg";

// Redux actions
import {
  setCurrentPage,
  addPage,
  updateWidgetOrder,
  setCurrentWidget,
  updatePageTitle,
} from "@/lib/redux/init/init.slice";

// Utility functions
import { constructPageContent } from "@/lib/utils";
import { registerWidgetBlocks } from "@/lib/grapesJsWidgets";

// Editor utilities
import {
  addPanel,
  getEditorConfig,
  setupComponentSelection,
  setupComponentToolbar,
  setupDeviceCommands,
  setupMoveCommands,
  setDeviceActive
} from "./utils/editorUtils";

// Panel configurations
import { getDevicesPanel, getHistoryPanel } from "./utils/panelConfigs";

// Preview utilities
import {
  stopPreviewServer,
  getPreviewServerUrl,
  startPreviewServer,
  checkPreviewServerStatus,
  openPreviewInBrowser,
  storePreviewUrl
} from "./utils/previewUtils";

// Publishing utilities
import {
  createBuildDirectories,
  savePageFiles,
  normalizeFileName, 
  generateHtmlTemplate
} from "./utils/publishUtils";

// Canvas utilities
import {
  updateCanvasTransform,
  setupCanvasResizeObserver
} from "./utils/canvasUtils";

/**
 * GrapesJS Editor Component
 * Main editor component for the CMS Website Builder
 */
const Grapesjs = () => {
  // Hooks
  const dispatch = useDispatch();
  const messageApi = useMessage();
  
  // Refs
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  
  // Redux state
  const currentPage = useSelector((state) => state.init.currentPage);
  const pages = useSelector((state) => state.init.pages);
  
  // Component state
  const [loading, setLoading] = useState(true);
  const [previewActive, setPreviewActive] = useState(false);

  /**
   * Changes the current active page
   * @param {string} pageId - ID of the page to switch to
   */
  const changePage = async (pageId) => {
    if (!editorRef.current) return;
    
    const editor = editorRef.current;
    const page = pages.find((p) => p.id === pageId);
    
    if (!page) return;
    
    try {
      setLoading(true);
      const pageContent = await constructPageContent(page.widgets);
      
      editor.setComponents(pageContent.component);
      editor.setStyle(pageContent.styles);
      dispatch(setCurrentPage(pageId));
    } catch (error) {
      console.error("Error loading page content from widgets:", error);
      messageApi.error("Failed to load page content");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Renders widget content in the editor
   * @param {Array} widget - The widgets to render
   */
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
    } finally {
      setLoading(false);
    }
  };

  /**
   * Publishes all pages to the build directory
   */
  const publishPage = async () => {
    if (!editorRef.current) return;
    
    try {
      setLoading(true);
      messageApi.info("Publishing pages...");
      
      // Create build directories first
      await createBuildDirectories();
      
      // Generate and save all page files
      const publishedPages = await generateAllPages();
      
      messageApi.success(
        `Successfully published ${publishedPages.length} pages to the build folder!`
      );
      
      // Start preview server and open the first published page
      if (publishedPages.length > 0) {
        await startPreviewAndOpen(publishedPages[0]);
      }
    } catch (error) {
      console.error("Error in publish process:", error);
      messageApi.error(`Publishing failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Generates HTML and CSS files for all pages
   * @returns {Promise<Array>} Array of published page filenames
   */
  const generateAllPages = async () => {
    const publishedPages = [];
    
    for (const page of pages) {
      try {
        // Get the page content
        const pageContent = await constructPageContent(page.widgets);
        
        // Create clean filename
        const fileName = normalizeFileName(page.title, page.id);
        
        // Generate HTML content
        const htmlContent = generateHtmlTemplate(
          page.title, 
          pageContent.component, 
          fileName
        );
        
        // Save files
        await savePageFiles(fileName, htmlContent, pageContent.styles);
        
        publishedPages.push(fileName);
      } catch (error) {
        console.error(`Error publishing page ${page.title}:`, error);
        messageApi.error(
          `Failed to publish page "${page.title}": ${error.message}`
        );
      }
    }
    
    return publishedPages;
  };
  
  /**
   * Starts the preview server and opens the specified page
   * @param {string} pageFileName - The page filename to open
   */
  const startPreviewAndOpen = async (pageFileName) => {
    try {
      // Start the preview server
      const previewData = await startPreviewServer();
      
      if (previewData.success && previewData.url) {
        // Store the URL and update state
        storePreviewUrl(previewData.url);
        setPreviewActive(true);
        
        // Open in browser
        openPreviewInBrowser(previewData.url, pageFileName);
        messageApi.info(`Preview server running at: ${previewData.url}`);
      } else {
        // Fallback to direct file opening
        window.open(`/build/${pageFileName}.html`, "_blank");
      }
    } catch (error) {
      console.error("Preview server error:", error);
      // Fallback to direct file opening
      window.open(`/build/${pageFileName}.html`, "_blank");
      messageApi.warning(
        "Preview server could not start. Opening static file instead."
      );
    }
  };

  /**
   * Handles starting the live preview
   */
  const handleStartLivePreview = async () => {
    try {
      messageApi.info("Starting preview server...");
      
      const previewData = await startPreviewServer();
      
      if (previewData.success && previewData.url) {
        openPreviewInBrowser(previewData.url);
        storePreviewUrl(previewData.url);
        setPreviewActive(true);
        messageApi.success(`Preview server running at: ${previewData.url}`);
      } else {
        throw new Error(previewData.message || "Preview server error");
      }
    } catch (error) {
      console.error("Preview server error:", error);
      messageApi.error(`Preview failed: ${error.message}`);
    }
  };
  
  /**
   * Handles stopping the preview server
   */
  const handleStopPreview = async () => {
    try {
      const data = await stopPreviewServer();
      
      if (data.success) {
        messageApi.success("Preview server stopped");
        setPreviewActive(false);
        localStorage.removeItem("previewServerUrl");
      } else {
        messageApi.info(data.message);
      }
    } catch (error) {
      console.error("Error stopping preview server:", error);
      messageApi.error("Failed to stop preview server");
    }
  };
  
  /**
   * Handles viewing the published site
   */
  const handleViewPublished = async () => {
    const previewUrl = getPreviewServerUrl();
    
    if (previewUrl) {
      openPreviewInBrowser(previewUrl);
    } else if (previewActive) {
      // If the preview is active but URL not stored, check status again
      try {
        const data = await startPreviewServer();
        
        if (data.success && data.url) {
          openPreviewInBrowser(data.url);
          storePreviewUrl(data.url);
        } else {
          messageApi.warning("Preview server URL not available");
        }
      } catch (error) {
        console.error("Error getting preview server URL:", error);
        messageApi.error("Failed to get preview server URL");
      }
    } else {
      messageApi.info("No published site available. Please publish first.");
    }
  };

  /**
   * Apply canvas transformation to fit within the container
   */
  const applyCanvasTransform = () => {
    if (editorRef.current && containerRef.current) {
      const transform = updateCanvasTransform(editorRef.current, containerRef.current);
      if (transform) {
        console.log(`Applied canvas transform: ${transform.transform}`);
      }
    }
  };

  /**
   * Initialize the GrapesJS editor
   */
  const initializeEditor = async () => {
    setLoading(true);
    
    try {
      // Initialize with config from utils
      const editor = grapesjs.init({
        container: containerRef.current,
        ...getEditorConfig(),
      });
      
      // Set up component selection behavior
      setupComponentSelection(editor, dispatch, setCurrentWidget);
      
      // Set up component toolbar with custom buttons
      setupComponentToolbar(editor, MoveUp, MoveDown);
      
      // Set up device and move commands
      setupDeviceCommands(editor);
      setupMoveCommands(editor);
      
      // Store editor reference
      editorRef.current = editor;
      
      // Register widget blocks
      registerWidgetBlocks(editor);
      
      // Load initial page content
      await loadInitialPage(editor);
      
      // Set up editor panels
      setupEditorPanels(editor);
      
      // Set up device change listener with canvas transformation
      editor.on("change:device", () => {
        const deviceModel = editor.getDevice();
        // Apply canvas transform when device changes
        applyCanvasTransform();
        setDeviceActive(deviceModel);
      });
      
      // Set up canvas resize observer
      setupCanvasResizeObserver(editor, containerRef.current);
      
      // Add keyboard shortcut for canvas transformation (Ctrl + equals)
      editor.Commands.add('canvas-transform-fit', {
        run: () => {
          applyCanvasTransform();
          return true;
        }
      });
      
      editor.Keymaps.add('canvas-transform-fit', 'ctrl+=', 'canvas-transform-fit');
      
      // Initial transform application
      applyCanvasTransform();
    } catch (error) {
      console.error("Error initializing editor:", error);
      messageApi.error("Failed to initialize editor");
    } finally {
      setLoading(false);
    }
  };
  
  /**
   * Load the initial page content
   * @param {Object} editor - GrapesJS editor instance
   */
  const loadInitialPage = async (editor) => {
    const initialPage = pages.find((p) => p.id === currentPage);
    
    if (!initialPage) return;
    
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
    } else {
      // Otherwise load raw HTML/CSS
      editor.setComponents(initialPage.component || "");
      editor.setStyle(initialPage.styles || "");
    }
  };
  
  /**
   * Set up editor panels (devices, history, etc.)
   * @param {Object} editor - GrapesJS editor instance
   */
  const setupEditorPanels = (editor) => {
    // Add devices panel
    addPanel(editor, getDevicesPanel());
    
    // Add history panel with preview/publish controls
    const previewHandlers = {
      startLivePreview: () => handleStartLivePreview(editor),
      stopPreview: () => handleStopPreview(editor),
      viewPublished: () => handleViewPublished(editor)
    };
    
    addPanel(editor, getHistoryPanel(
      () => publishPage(editor),
      previewActive,
      previewHandlers
    ));
  };
  
  // Initialize editor on component mount
  useEffect(() => {
    if (editorRef.current == null) {
      // Using .then() since we can't use await directly in useEffect
      initializeEditor().catch(error => {
        console.error("Error during editor initialization:", error);
        messageApi.error("Failed to initialize editor");
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  // Add keyboard shortcuts effect
  useEffect(() => {
    if (!editorRef.current) return;
    
    const handleKeyDown = (event) => {
      // Check for Ctrl + = key combination
      if ((event.ctrlKey || event.metaKey) && event.key === '=') {
        event.preventDefault();
        applyCanvasTransform();
        messageApi.info('Canvas fitted to container');
      }
    };
    
    // Add event listener for keyboard shortcuts
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (editorRef.current && containerRef.current) {
        applyCanvasTransform();
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Check preview server status on component mount
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const isActive = await checkPreviewServerStatus();
        setPreviewActive(isActive);
      } catch (error) {
        console.error("Error checking preview server status:", error);
      }
    };
    
    checkStatus();
  }, []);

  /**
   * Handle updating widget order
   * @param {Array} newOrder - New widget order
   */
  const handleUpdateWidgetOrder = (newOrder) => {
    setLoading(true);
    dispatch(
      updateWidgetOrder({
        pageId: currentPage,
        newOrder: newOrder,
      })
    );
    contentRender(newOrder);
  };
  
  /**
   * Handle creating a new page
   */
  const handleAddPage = () => {
    dispatch(addPage());
  };
  
  /**
   * Handle updating page title
   * @param {string} newTitle - New page title
   */
  const handleUpdatePageTitle = (newTitle) => {
    setLoading(true);
    dispatch(
      updatePageTitle({
        pageId: currentPage,
        newTitle: newTitle,
      })
    );
  };
  
  return (
    <div className="grapesjs">
      {/* Left panel with pages and widgets */}
      <LeftSidePanel
        onPageChange={changePage}
        currentPage={currentPage}
        pages={pages}
        addPage={handleAddPage}
        updateWidgetOrder={handleUpdateWidgetOrder}
        updatePageTitle={handleUpdatePageTitle}
      />
      
      {/* Main editor panel */}
      <div className="editorPanel">
        <div className={`editor-container ${loading ? "loading" : ""}`}>
          {loading && <Loader />}
          <div
            ref={containerRef}
            className={`editor-canvas ${loading ? "hide" : ""}`}
          ></div>
        </div>
      </div>
      
      {/* Right panel with properties */}
      <RightSidePanel />
    </div>
  );
};

export default Grapesjs;
