'use client'
import { useSelector, useDispatch } from 'react-redux';
import { useMessage } from '@/lib/provider/MessageProvider';
import React, { useEffect, useRef} from 'react'
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import './grapesjs.css';
import RightSidePanel from './rightSidePanel';
import LeftSidePanel from './leftSidePanel';
import { DesktopIcon, MobileIcon, UndoIcon, RedoIcon, PlayIcon, DragIcon } from './EditorSvg';
import { setCurrentPage, setPageData, addPage } from '@/lib/redux/init/init.slice';
import { constructPageContent } from '@/lib/utils';
const Grapesjs = () => {
  const dispatch = useDispatch();
  const messageApi = useMessage();
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const currentPage = useSelector((state) => state.init.currentPage);

  const pages = useSelector((state) => state.init.pages);

  const changePage = (pageId) => {
    debugger
    if (editorRef.current) {
      const editor = editorRef.current;
      const page = pages.find(p => p.id === pageId);
      if (page) {
        dispatch(setPageData({
          pageId: currentPage,
          component: editor.getHtml(),
          styles: editor.getCss()
        }));
        debugger
        messageApi.success(`Switched to page: ${page.title}`);
        editor.setComponents(page.component);
        editor.setStyle(page.styles);
        dispatch(setCurrentPage(pageId));
      }
    }
  };

  const setDeviceActive = (deviceModel) => {
    if (deviceModel) {
      const deviceId = deviceModel ? deviceModel.get('id') : 'desktop';
      const deviceBtns = {
        'desktop': document.getElementById('device-desktop'),
        'mobile': document.getElementById('device-mobile')
      };
      Object.keys(deviceBtns).forEach(key => {
        if (deviceBtns[key]) {
          if (key === deviceId) {
            deviceBtns[key].classList.add('gjs-pn-active');
          } else {
            deviceBtns[key].classList.remove('gjs-pn-active');
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
      console.error('Panel configuration must include an id');
      return;
    }
    if (!config.el) {
      console.error('Panel configuration must include an element selector (el)');
      return;
    }
    const panel = editor.Panels.addPanel(config);
  }


  useEffect(() => {
    const editorConfig = {
      storageManager: {
        type: 'local',
        autosave: true,
        autoload: true,
        stepsBeforeSave: 1,
      },
      deviceManager: {
        devices: [
          {
            id: 'desktop',
            name: 'Desktop',
            width: '',  // Full width for desktop
          },
          {
            id: 'mobile',
            name: 'Mobile',
            width: '320px',
            widthMedia: '480px',
          },
        ],
      },
      layerManager: {
        appendTo: `.layer-container-${currentPage}`,
        scrollLayers: true,
        showWrapper: true
      },
      height: '100vh',
      width: 'auto',
      fromElement: false, // Set to false so we can load our custom content
      storageManager: false,
      panels: { defaults: [] },
    }
    const editor = grapesjs.init({
      container: containerRef.current,
      ...editorConfig,
    });

    // Load the initial page
    const initialPage = pages.find(p => p.id === currentPage);
    const initialPageContent = constructPageContent(initialPage.widgets);
    debugger
    if (initialPage) {
      editor.setComponents(initialPageContent.component);
      editor.setStyle(initialPageContent.styles);
    }
    editorRef.current = editor;

    addPanel(editor, {
      id: 'panel-devices',
      el: '.panel__devices',
      buttons: [
        {
          id: 'device-desktop',
          label: `${DesktopIcon} <span class="device-label">Desktop</span>`,
          command: 'set-device-desktop',
          active: true,
          togglable: false,
        },
        {
          id: 'device-mobile',
          label: `${MobileIcon} <span class="device-label">Mobile</span>`,
          command: 'set-device-mobile',
          togglable: false,
        },
      ],
    });
    // Add a panel for undo/redo buttons
    addPanel(editor, {
      id: 'panel-history',
      el: '.panel__history',
      buttons: [
        {
          id: 'undo',
          label: `${UndoIcon}`,
          command: (editor) => editor.Commands.run('core:undo'),
          attributes: { title: 'Undo' }
        },
        {
          id: 'redo',
          label: `${RedoIcon}`,
          command: (editor) => editor.Commands.run('core:redo'),
          attributes: { title: 'Redo' }
        },
        {
          id: 'separator',
          className: 'separator',
        },
        {
          id: 'fullscreen',
          label: `<button class="fullscreen-button">Preview ${PlayIcon}</button>`,
          command: (editor) => editor.Commands.run('core:fullscreen'),
          attributes: { title: 'Fullscreen' }
        },
        {
          id: 'publish',
          label: `<button class="publish-button">Publish</button>`,
          attributes: { title: 'Publish' },
        }
      ],
    });

    // Define commands for device switching
    editor.Commands.add('set-device-desktop', {
      run: (editor) => editor.setDevice('desktop')
    });

    editor.Commands.add('set-device-mobile', {
      run: (editor) => editor.setDevice('mobile')
    });

    // Listen for device change events and update UI accordingly
    editor.on('change:device', () => {
      const deviceModel = editor.getDevice();
      setDeviceActive(deviceModel);
    });
  }, []);

  return (
    <div className='grapesjs'>
      <LeftSidePanel onPageChange={changePage} currentPage={currentPage} pages={pages} addPage={() => {
        dispatch(addPage());
      }} />
      <div className='editorPanel'>
        <div className="editor-container">
          <div ref={containerRef} className="editor-canvas">
          </div>
        </div>
      </div>
      <RightSidePanel />
    </div >
  )
}

export default Grapesjs