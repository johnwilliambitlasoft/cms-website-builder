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
              { text: 'Help', url: '/help' }
            ]
          }
        },
        {
          id: 'banner_search_widget',
          folder: 'banner_search_widget',
          templateId: 'banner_search_widget_1',
          data: {
            bannerImageUrl: 'https://example.com/banner.jpg',
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
      component: `<div class="section" style="padding: 20px; background-color: #fff;">
                      <h1>About Us</h1>
                      <p>This is the content of the about page.</p>
                    </div>`,
      styles: `.section { color: #333; font-family: Arial, sans-serif; font-size: 16px; }`
    }],
  currentPage: 'page1',
  currentWidget: [{
    id: 'header_navigation',
    title: 'Header Navigation',
    data: {}
  },
  {
    id: 'banner_&_search_widget',
    title: 'Banner & Search Widget',
    data: {}
  }
  ],
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
      const { pageId, component, styles } = action.payload;
      const pageIndex = state.pages.findIndex(page => page.id === pageId);
      if (pageIndex !== -1) {
        state.pages[pageIndex].component = component;
        state.pages[pageIndex].styles = styles;
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
  updatePageContent
} = initSlice.actions;

export default initSlice.reducer;

