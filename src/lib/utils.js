const  renderWithData = (templateHtml, data) => {
  return templateHtml.replace(/\{\{(.*?)\}\}/g, (_, key) => data[key.trim()] || '');
}

export const constructPageContent = async (widgets) => {
  debugger
  if (!Array.isArray(widgets) || widgets.length === 0) {
    return '';
  }
  let component = ``;
  let styles = ``;
  for (const widget of widgets) {
    debugger
    const { folder, templateId, data } = widget;
    const widgetModule = await import(`../widgets/${folder}/${templateId}.js`);
    const renderedHtml = renderWithData(widgetModule.html, data);
    component += renderedHtml;
    styles += widgetModule.css;
  }
  return {
    component,
    styles
  };
}