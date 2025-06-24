import React from 'react'
import { AddIcon, CollapseIcon, ActionIcon, DragIcon } from "./EditorSvg";
import WidgetsList from './widgetsList';
const PagesList = ({
  page,
  currentPage,
  onPageChange,
  expandedPages,
  togglePageExpand,
  updateWidgetOrder
}) => {
  return (
    <div
      key={page.id || index}
      className={`page_item ${currentPage === page.id ? "active" : ""}`}
    >
      <div
        className="page_item_list"
        onClick={() => {
          onPageChange(page.id);
        }}
      >
        <span className={"page_item_title"}>{page.title}</span>
        <div className={"page_item_actions"}>
          <span
            className={`page_item_icon collapseIcon ${expandedPages[page.id] ? "expanded" : ""}`}
            dangerouslySetInnerHTML={{ __html: CollapseIcon }}
            onClick={(e) => togglePageExpand(e, page.id)}
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
      {currentPage == page.id &&
        page.widgets &&
        page.widgets.length > 0 && (
          <WidgetsList
            widgets={page.widgets}
            updateWidgetOrder={updateWidgetOrder}
          />
        )}
    </div>
  )
}

export default PagesList