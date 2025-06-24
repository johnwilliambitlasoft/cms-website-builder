import React, { useEffect, useState } from 'react'
import { ReactSortable } from "react-sortablejs";
import { DragIcon } from "./EditorSvg";
const WidgetsList = ({
  widgets,
  updateWidgetOrder
}) => {
  const [widgetsList, setWidgetsList] = useState(widgets);
  // if widgetsList is changed print a console log
  useEffect(() => {
    debugger
    if (JSON.stringify(widgets) !== JSON.stringify(widgetsList)) {
      console.log("Widgets list updated:", widgetsList);
      updateWidgetOrder(widgetsList);
    }
  }, [widgetsList]);

  return (
    <div className="page_child_item_list">
      <ReactSortable list={widgetsList}
        // onEnd={(evt) => {
        //   const newIndex = evt.newIndex;
        //   const oldIndex = evt.oldIndex;
        //   const updatedList = [...widgetsList];
        //   const [movedItem] = updatedList.splice(oldIndex, 1);
        //   updatedList.splice(newIndex, 0, movedItem);
        //   updateWidgetOrder(updatedList);
        //   setWidgetsList(updatedList);
        // }}
        setList={(newList) => setWidgetsList(newList)} className="widgets_list" animation={150} handle=".page_child_item_drag_icon"  >
        {widgetsList.map((widget, widgetIndex) => (
          <div
            key={widget.id || widgetIndex}
            className="page_child_item"
          >
            <span className="page_child_item_title">
              {widget.title || `Widget ${widgetIndex + 1}`}
            </span>
            <div
              className="page_child_item_drag_icon"
              dangerouslySetInnerHTML={{ __html: DragIcon }}
            ></div>
          </div>
        ))}
      </ReactSortable>
    </div>
  )
}

export default WidgetsList;
