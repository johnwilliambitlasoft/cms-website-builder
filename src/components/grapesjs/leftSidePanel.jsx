'use client'
import React from 'react'
import './grapesjs.css'
import { AddIcon, CollapseIcon, ActionIcon, DragIcon } from './EditorSvg'
const LeftSidePanel = ({
  pages = [],
  currentPage = '',
  onPageChange
}) => {
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
              onClick={() => { onPageChange(page.id) }}
            >
              <span className={'page_item_title'}>
                {page.title}
              </span>
              <div className={'page_item_actions'}>
                <span className={'page_item_icon collapseIcon'} dangerouslySetInnerHTML={{ __html: CollapseIcon }}
                ></span>
                <span className={'page_item_icon'} dangerouslySetInnerHTML={{ __html: ActionIcon }}
                  onClick={() => { }}
                ></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default LeftSidePanel