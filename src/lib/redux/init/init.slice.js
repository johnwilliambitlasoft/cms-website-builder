import { createSlice } from "@reduxjs/toolkit";
import { useMessage } from "@/lib/provider/MessageProvider";
const defaultPage = {
  id: "",
  title: "",
  widgets: [],
  component: "",
  styles: "",
};

const initialState = {
  colorPalette: {
    text_color: {
      "#000000": "#000000",
      "#333333": "#333333",
      "#666666": "#666666",
    },
    sub_text: {
      "#000000": "#000000",
      "#333333": "#333333",
      "#666666": "#666666",
    },
    button_color: {
      "#000000": "#000000",
      "#333333": "#333333",
      "#666666": "#666666",
    },
    background_color: {
      "#000000": "#000000",
      "#333333": "#333333",
      "#666666": "#666666",
    },
  },
  pages: [
    {
      id: "home",
      title: "Home",
      widgets: [
        {
          id: "header_navigation",
          title: "Header Navigation",
          folder: "header_navigation",
          templateId: "header_navigation_1",
          thumbnail: "/assets/svg/header_navigation.svg",
          description:
            "A customizable header navigation bar with logo and links.",
          data: {
            logoUrl: "https://example.com/logo.png",
            links: [
              { text: "Home", url: "/home.html" },
              { text: "About Us", url: "/about.html" },
              { text: "Contact", url: "/contact.html" },
              { text: "john", url: "/help.html" },
            ],
          },
        },
        {
          id: "hero_banner",
          folder: "hero_banner",
          title: "Hero Banner",
          templateId: "hero_banner_1",
          thumbnail: "/assets/svg/hero_banner.svg",
          description:
            "A hero banner with a title, subtitle, button, and image. Perfect for showcasing your main message.",
          data: {
            title: "Build Beautiful Websites",
            subtitle:
              "Our CMS Website Builder makes it easy to create stunning, responsive websites without writing code.",
            buttonText: "Get Started",
            buttonUrl: "/get-started",
            imageUrl: "/assets/svg/hero_image.svg",
            imageAlt: "Website Builder Platform",
          },
        },
      ],
      component: "",
      styles: "",
    },
    {
      id: "about",
      title: "About",
      widgets: [
        {
          id: "header_navigation",
          title: "Header Navigation",
          folder: "header_navigation",
          templateId: "header_navigation_1",
          thumbnail: "/assets/svg/header_navigation.svg",
          description:
            "A customizable header navigation bar with logo and links.",
          data: {
            logoUrl: "https://example.com/logo.png",
            links: [
              { text: "Home", url: "/home.html" },
              { text: "About Us", url: "/about.html" },
              { text: "Contact", url: "/contact.html" },
              { text: "john", url: "/help.html" },
            ],
          },
        },
        {
          id: "hero_banner",
          folder: "hero_banner",
          title: "Hero Banner",
          templateId: "hero_banner_1",
          thumbnail: "/assets/svg/hero_banner.svg",
          description:
            "A hero banner with a title, subtitle, button, and image. Perfect for showcasing your main message.",
          data: {
            title: "Build Beautiful Websites",
            subtitle:
              "Our CMS Website Builder makes it easy to create stunning, responsive websites without writing code.",
            buttonText: "Get Started",
            buttonUrl: "/get-started",
            imageUrl: "/assets/svg/hero_image.svg",
            imageAlt: "Website Builder Platform",
          },
        },
        {
          id: "features",
          folder: "features",
          title: "Features",
          templateId: "features_1",
          thumbnail: "/assets/svg/features_1.svg",
          description:
            "A section to highlight key features of your product or service with icons and descriptions.",
          data: {
            title: "Our Key Features",
            subtitle:
              "Discover what makes our product stand out from the competition",
            layout: "3",
            features: [
              {
                title: "Easy to Use",
                description:
                  "Intuitive interface designed for users of all skill levels, no training required.",
                iconName: "zap",
                imageUrl: "",
              },
              {
                title: "Secure & Reliable",
                description:
                  "Bank-level security with 99.9% uptime guarantee to keep your data safe and accessible.",
                iconName: "shield",
                imageUrl: "",
              },
              {
                title: "24/7 Support",
                description:
                  "Our dedicated support team is available around the clock to assist you with any questions.",
                iconName: "users",
                imageUrl: "",
              },
              {
                title: "Regular Updates",
                description:
                  "Continuous improvements and new features added regularly based on customer feedback.",
                iconName: "refresh",
                imageUrl: "",
              },
              {
                title: "Integration Ready",
                description:
                  "Seamlessly connects with your existing tools and software ecosystem.",
                iconName: "box",
                imageUrl: "",
              },
              {
                title: "Data Analytics",
                description:
                  "Powerful insights and reporting to help you make data-driven decisions.",
                iconName: "bar-chart",
                imageUrl: "",
              },
            ],
            styles: {
              backgroundColor: "#ffffff",
              textColor: "#333333",
              accentColor: "#0070f3",
              iconColor: "#0070f3",
              titleColor: "#111111",
              cardBackgroundColor: "#f8f9fa",
              cardBorderRadius: "8px",
              cardPadding: "24px",
              sectionPadding: "80px 20px",
              titleFontSize: "36px",
              subtitleFontSize: "18px",
              featureTitleFontSize: "20px",
              iconSize: "36px",
              spacing: "24px",
            },
          },
        },
      ],
      component: "",
      styles: "",
    },
  ],
  currentPage: "page1",
  currentWidget: "header_navigation",
};

const initSlice = createSlice({
  name: "config",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      if (state.currentPage === action.payload) {
        state.currentPage = "";
      } else {
        state.currentPage = action.payload;
      }
    },
    setCurrentWidget: (state, action) => {
      state.currentWidget = action.payload;
    },
    setPageData: (state, action) => {
      const { pageId, component, styles, widgets } = action.payload;
      const pageIndex = state.pages.findIndex((page) => page.id === pageId);
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
      const newPage = {
        ...defaultPage,
        id: `page${state.pages.length + 1}`,
        title: `Page ${state.pages.length + 1}`,
      };
      if (action.payload && action.payload.title) {
        newPage.title = action.payload.title;
      }
      state.pages.push(newPage);
      state.currentPage = newPage.id; // Set the new page as current
    },
    deletePage: (state, action) => {
      const pageId = action.payload;
      state.pages = state.pages.filter((page) => page.id !== pageId);
      if (state.currentPage === pageId && state.pages.length > 0) {
        state.currentPage = state.pages[0].id; // Set the first page as current if deleted
      }
    },
    updatePageTitle: (state, action) => {
      const { pageId, newTitle } = action.payload;
      const pageIndex = state.pages.findIndex((page) => page.id === pageId);
      if (pageIndex !== -1) {
        state.pages[pageIndex].title = newTitle;
      }
    },
    updatePageContent: (state, action) => {
      const { pageId, newComponent, newStyles } = action.payload;
      const pageIndex = state.pages.findIndex((page) => page.id === pageId);
      if (pageIndex !== -1) {
        state.pages[pageIndex].component = newComponent;
        state.pages[pageIndex].styles = newStyles;
      }
    },
    updateWidgetOrder: (state, action) => {
      const { pageId, newOrder } = action.payload;

      const pageIndex = state.pages.findIndex((page) => page.id === pageId);
      if (pageIndex !== -1) {
        state.pages[pageIndex].widgets = newOrder;
      }
    },
    updateWidgetData: (state, action) => {
      const { pageId, widgetId, newData } = action.payload;
      const pageIndex = state.pages.findIndex((page) => page.id === pageId);
      if (pageIndex !== -1) {
        const widgetIndex = state.pages[pageIndex].widgets.findIndex(
          (widget) => widget.id === widgetId,
        );
        if (widgetIndex !== -1) {
          state.pages[pageIndex].widgets[widgetIndex] = {
            ...state.pages[pageIndex].widgets[widgetIndex],
            ...newData,
          };
        }
      }
    },
  },
  extraReducers: (builder) => {},
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
  updateWidgetData,
} = initSlice.actions;

export default initSlice.reducer;
