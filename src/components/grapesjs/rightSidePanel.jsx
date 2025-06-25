"use client";
import React from "react";
import "./grapesjs.css";

const RightSidePanel = () => {
  return (
    <div className="rightPanel sidePanel">
      <div className="panel_header">
        <span className="panel_header_title">Layer</span>
      </div>
      <div className="panel_body">
        <div className={`layer-container`}>
          <div className="layer-manager-note">
            Only primary layers are selectable
          </div>
        </div>
      </div>
      <div className="panel_header">
        <span className="panel_header_title">Edit Widget</span>
      </div>
    </div>
  );
};

export default RightSidePanel;
