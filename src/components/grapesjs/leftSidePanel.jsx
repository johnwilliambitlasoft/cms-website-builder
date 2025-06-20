'use client'
import React, { useState, useEffect } from 'react'
import './grapesjs.css'
import { AddIcon, CollapseIcon, ActionIcon, DragIcon } from './EditorSvg'

const LeftSidePanel = ({
  pages = [],
  currentPage = '',
  onPageChange
}) => {
  const [expandedPages, setExpandedPages] = useState({});

  // Initialize with current page expanded
  useEffect(() => {
    if (currentPage) {
      setExpandedPages(prev => ({ ...prev, [currentPage]: true }));
    }
  }, [currentPage]);

  const togglePageExpand = (e, pageId) => {
    e.stopPropagation();
    setExpandedPages(prev => ({
      ...prev,
      [pageId]: !prev[pageId]
    }));
  };

  return (
    <div className='leftPanel sidePanel'>
      <div className='panel_header'>
        <span className='panel_header_title'>
          Pages
        </span>
        <button className='add_page_btn' onClick={() => { }}>
          Add new page
          <span className='add-icon' dangerouslySetInnerHTML={{ __html: AddIcon }}></span>
        </button>
      </div>
      <div className='panel_body'>
        <div className='pages_list'>
          {pages && pages.map((page, index) => (
            <div
              key={page.id || index}
              className={`page_item ${currentPage === page.id ? 'active' : ''}`}
            >
              <div className='page_item_content' onClick={() => { onPageChange(page.id) }}>
                <span className={'page_item_title'}>
                  {page.title}
                </span>
                <div className={'page_item_actions'}>
                  <span
                    className={`page_item_icon collapseIcon ${expandedPages[page.id] ? 'expanded' : ''}`}
                    dangerouslySetInnerHTML={{ __html: CollapseIcon }}
                    onClick={(e) => togglePageExpand(e, page.id)}
                  ></span>
                  <span
                    className={'page_item_icon'}
                    dangerouslySetInnerHTML={{ __html: ActionIcon }}
                    onClick={(e) => { e.stopPropagation(); }}
                  ></span>
                </div>
              </div>
              <div className={`layer-container-${page.id} ${expandedPages[page.id] ? 'expanded' : ''}`}>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeftSidePanel