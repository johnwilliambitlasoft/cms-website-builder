'use client'
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useRef, useState, useCallback } from 'react'
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import './grapesjs.css';
import RightSidePanel from './rightSidePanel';
import LeftSidePanel from './leftSidePanel';
import { DesktopIcon, MobileIcon, UndoIcon, RedoIcon, PlayIcon } from './EditorSvg';
import { setCurrentPage } from '@/lib/redux/init/init.slice';
const Grapesjs = () => {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const currentPage = useSelector((state) => state.init.currentPage);
  const pages = [
    {
      id: 'page1',
      title: 'Home',
      component: `<div class="section" style="padding: 20px; background-color: #fff;">
                    <h1>Welcome to the Home Page 1</h1>
                    <p>This is the content of the home page.</p>
                  </div><div class="section" style="padding: 20px; background-color: #fff;">
                    <h1>Welcome to the Home Page 2</h1>
                    <p>This is the content of the home page.</p>
                  </div>`,
      styles: `.section { color: #333; font-family: Arial, sans-serif; font-size: 16px; }`
    },
    {
      id: 'page2',
      title: 'About',
      component: `<div class="section" style="padding: 20px; background-color: #fff;">
                    <h1>About Us</h1>
                    <p>This is the content of the about page.</p>
                  </div>`,
      styles: `.section { color: #333; font-family: Arial, sans-serif; font-size: 16px; }`
    }]
  const changePage = (pageId) => {
    debugger
    if (editorRef.current) {
      const editor = editorRef.current;
      const page = pages.find(p => p.id === pageId);

      if (page) {
        const currentPageIndex = pages.findIndex(p => p.id === currentPage);
        if (currentPageIndex !== -1) {
          pages[currentPageIndex].component = editor.getHtml();
          pages[currentPageIndex].styles = editor.getCss();
        }
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
        appendTo: '.layer-container',
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
    if (initialPage) {
      editor.setComponents(initialPage.component);
      editor.setStyle(initialPage.styles);
    }
    editorRef.current = editor;

    editor.Panels.addPanel({
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
    editor.Panels.addPanel({
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
      <LeftSidePanel onPageChange={changePage} currentPage={currentPage} pages={pages} />
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