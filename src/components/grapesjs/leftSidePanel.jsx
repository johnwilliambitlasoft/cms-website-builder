"use client";
import React, { useState, useEffect } from "react";
import { AddIcon } from "./EditorSvg";
import PagesList from "./pagesList";

const LeftSidePanel = ({
  pages = [],
  currentPage = "",
  onPageChange,
  addPage,
  updateWidgetOrder,
}) => {
  const [expandedPages, setExpandedPages] = useState({});

  // Initialize with current page expanded
  useEffect(() => {
    if (currentPage) {
      setExpandedPages((prev) => ({ ...prev, [currentPage]: true }));
    }
  }, [currentPage]);

  const togglePageExpand = (e, pageId) => {
    e.stopPropagation();
    setExpandedPages((prev) => ({
      ...prev,
      [pageId]: !prev[pageId],
    }));
  };

  return (
    <div className="leftPanel sidePanel">
      <div className="panel_header">
        <span className="panel_header_title">Pages</span>
        <button className="add_page_btn" onClick={addPage}>
          Add new page
          <span
            className="add-icon"
            dangerouslySetInnerHTML={{ __html: AddIcon }}
          ></span>
        </button>
      </div>
      <div className="panel_body">
        <div className="pages_list">
          {pages &&
            pages.map((page, index) => (
              <PagesList
                key={page.id || index}
                page={page}
                currentPage={currentPage}
                onPageChange={onPageChange}
                expandedPages={expandedPages}
                togglePageExpand={togglePageExpand}
                updateWidgetOrder={updateWidgetOrder}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidePanel;
