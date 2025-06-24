'use client';
import React, { useState } from "react";
import { AddIcon, CollapseIcon, ActionIcon, DragIcon } from "./EditorSvg";
import WidgetsList from "./widgetsList";
const PagesList = ({
  page,
  currentPage,
  onPageChange,
  expandedPages,
  togglePageExpand,
  updateWidgetOrder,
  updatePageTitle
}) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div
      key={page.id || index}
      className={`page_item ${currentPage === page.id ? "active" : ""}`}
    >
      <div
        className="page_item_list"
        onClick={(e) => {
          onPageChange(page.id);
          e.stopPropagation();
        }}
      >
        {isEditing ? (<input
          type="text"
          className="page_item_input"
          value={page.title}
          onChange={(e) => {
            debugger
            updatePageTitle(e.target.value);
            e.stopPropagation();
          }}
          onBlur={() => setIsEditing(false)}
        />) : (
          <span className={"page_item_title"}
            onClick={(e) => {
              setIsEditing(true);
              e.stopPropagation();
            }}>{page.title}</span>
        )}
        <div className={"page_item_actions"}>
          <span
            className={`page_item_icon collapseIcon ${expandedPages[page.id] ? "expanded" : ""}`}
            dangerouslySetInnerHTML={{ __html: CollapseIcon }}
            onClick={(e) => {
              onPageChange(page.id);
              e.stopPropagation();
            }}
          ></span>
          <span
            className={"page_item_icon"}
            dangerouslySetInnerHTML={{ __html: ActionIcon }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          ></span>
        </div>
      </div>
      {
        currentPage == page.id && page.widgets && page.widgets.length > 0 && (
          <WidgetsList
            widgets={page.widgets}
            updateWidgetOrder={updateWidgetOrder}
          />
        )
      }
    </div >
  );
};

export default PagesList;
