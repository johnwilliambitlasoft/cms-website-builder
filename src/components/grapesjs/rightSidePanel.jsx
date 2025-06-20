'use client'
import React from 'react'
import './grapesjs.css'

const RightSidePanel = () => {
  return (
    <div className='rightPanel sidePanel'>
      <div className='panel_header'>
        <span className='panel_header_title'>
          Layers
        </span>
      </div>
      <div className='panel_body'>
        <div className='layer-container'></div>
      </div>
    </div>
  )
}

export default RightSidePanel