import { createSlice } from '@reduxjs/toolkit';
import { useMessage } from '@/lib/provider/MessageProvider';
const defaultPage = {
  id: '',
  title: '',
  component: '',
  styles: ''
}
const initialState = {
  pages: [
    {
      id: 'page1',
      title: 'Home',
      widgets: [
        {
          id: 'header_navigation',
          folder: 'header_navigation',
          templateId: 'header_navigation_1',
          data: {
            logoUrl: 'https://example.com/logo.png',
            links: [
              { text: 'Home', url: '/' },
              { text: 'About Us', url: '/about' },
              { text: 'Contact', url: '/contact' },
              { text: 'john', url: '/help' }
            ]
          }
        },
        {
          id: 'hero_banner',
          folder: 'hero_banner',
          templateId: 'hero_banner_1',
          data: {
            "title": "Build Beautiful Websites",
            "subtitle": "Our CMS Website Builder makes it easy to create stunning, responsive websites without writing code.",
            "buttonText": "Get Started",
            "buttonUrl": "/get-started",
            "imageUrl": "/assets/svg/hero_image.svg",
            "imageAlt": "Website Builder Platform"
          }
        }
      ],
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
      widgets: [],
      component: `<div class="section" style="padding: 20px; background-color: #fff;">
                      <h1>About Us</h1>
                      <p>This is the content of the about page.</p>
                    </div>`,
      styles: `.section { color: #333; font-family: Arial, sans-serif; font-size: 16px; }`
    }],
  currentPage: 'page1',
  currentWidget: 'header_navigation',
}


const initSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setCurrentWidget: (state, action) => {
      state.currentWidget = action.payload;
    },
    setPageData: (state, action) => {
      const { pageId, component, styles, widgets } = action.payload;
      const pageIndex = state.pages.findIndex(page => page.id === pageId);
      if (pageIndex !== -1) {
        state.pages[pageIndex].component = component;
        state.pages[pageIndex].styles = styles;

        // Also update widgets if provided
        if (widgets) {
          state.pages[pageIndex].widgets = widgets;
        }
      }
    },
    addPage: (state, action) => {
      const newPage = { ...defaultPage, id: `page${state.pages.length + 1}`, title: `Page ${state.pages.length + 1}` };
      if (action.payload && action.payload.title) {
        newPage.title = action.payload.title;
      }
      state.pages.push(newPage);
      state.currentPage = newPage.id; // Set the new page as current
    },
    deletePage: (state, action) => {
      const pageId = action.payload;
      state.pages = state.pages.filter(page => page.id !== pageId);
      if (state.currentPage === pageId && state.pages.length > 0) {
        state.currentPage = state.pages[0].id; // Set the first page as current if deleted
      }
    },
    updatePageTitle: (state, action) => {
      const { pageId, newTitle } = action.payload;
      const pageIndex = state.pages.findIndex(page => page.id === pageId);
      if (pageIndex !== -1) {
        state.pages[pageIndex].title = newTitle;
      }
    },
    updatePageContent: (state, action) => {
      const { pageId, newComponent, newStyles } = action.payload;
      const pageIndex = state.pages.findIndex(page => page.id === pageId);
      if (pageIndex !== -1) {
        state.pages[pageIndex].component = newComponent;
        state.pages[pageIndex].styles = newStyles;
      }
    },
    updateWidgetOrder: (state, action) => {
      const { pageId, newOrder } = action.payload;
      debugger
      const pageIndex = state.pages.findIndex(page => page.id === pageId);
      if (pageIndex !== -1) {
        state.pages[pageIndex].widgets = newOrder;
      }
    },
    updateWidgetData: (state, action) => {
      const { pageId, widgetId, newData } = action.payload;
      const pageIndex = state.pages.findIndex(page => page.id === pageId);
      if (pageIndex !== -1) {
        const widgetIndex = state.pages[pageIndex].widgets.findIndex(widget => widget.id === widgetId);
        if (widgetIndex !== -1) {
          state.pages[pageIndex].widgets[widgetIndex] = {
            ...state.pages[pageIndex].widgets[widgetIndex],
            ...newData
          };
        }
      }
    }
  },
  extraReducers: (builder) => {
  },
});

export const {
  setCurrentPage,
  setCurrentWidget,
  setPageData,
  addPage,
  deletePage,
  updatePageTitle,
  updatePageContent,
  updateWidgetOrder,
  updateWidgetData
} = initSlice.actions;

export default initSlice.reducer;

