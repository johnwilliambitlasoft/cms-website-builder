/**
 * GrapesJS editor panel configuration
 */
import {
  DesktopIcon,
  MobileIcon,
  UndoIcon,
  RedoIcon,
  PlayIcon,
  MoveUp,
  MoveDown,
} from "../EditorSvg";

/**
 * Configure the devices panel
 */
export const getDevicesPanel = () => ({
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

/**
 * Configure the history panel with publish and preview buttons
 */
export const getHistoryPanel = (publishPage, previewActive, previewHandlers) => {
  const { startLivePreview, stopPreview, viewPublished } = previewHandlers;
  
  return {
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
      // {
      //   id: "live-preview",
      //   label: `<button class="preview-button">Live Preview</button>`,
      //   attributes: { title: "Preview in HTTP Server" },
      //   command: startLivePreview,
      // },
      // {
      //   id: "stop-preview",
      //   label: `<button class="stop-preview-button">Stop Preview</button>`,
      //   attributes: { title: "Stop HTTP Preview Server" },
      //   command: stopPreview,
      //   // Only show stop button if preview is active
      //   visible: previewActive,
      // },
      // {
      //   id: "view-published",
      //   label: `<button class="view-published-button">View Published</button>`,
      //   attributes: { title: "View Published Site" },
      //   command: viewPublished,
      //   // Only show view button if preview is active
      //   visible: previewActive,
      // },
      {
        id: "publish",
        label: `<button class="publish-button">Publish</button>`,
        attributes: { title: "Publish" },
        command: publishPage,
      },
    ],
  };
};
