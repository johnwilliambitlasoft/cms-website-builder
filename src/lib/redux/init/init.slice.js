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
              {
                text: "Home",
                url: "/",
                hasDropdown: false,
              },
              {
                text: "Products",
                url: "/products",
                hasDropdown: true,
                dropdownItems: [
                  {
                    text: "Product A",
                    url: "/products/a",
                  },
                  {
                    text: "Product B",
                    url: "/products/b",
                  },
                  {
                    text: "Product C",
                    url: "/products/c",
                  },
                ],
              },
              {
                text: "About Us",
                url: "/about",
                hasDropdown: false,
              },
              {
                text: "Contact",
                url: "/contact",
                hasDropdown: false,
              },
            ],
            showSearchBox: false,
            styles: {
              backgroundColor: "#ffffff",
              textColor: "#333333",
              hoverColor: "#0070f3",
              activeColor: "#0051cc",
              dropdownBackground: "#ffffff",
              padding: "20px 40px",
              spacing: "20px",
              mobileBehavior: "stacked", // or "hamburger"
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            },
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
            title: "Welcome to Our Website",
            subtitle: "Discover amazing content and features",
            buttonText: "Get Started",
            buttonUrl: "/get-started",
            imageUrl: "https://example.com/hero-image.jpg",
            imageAlt: "Hero Image",
            styles: {
              backgroundColor: "#ffffff",
              textColor: "#222222",
              subtitleColor: "#666666",
              buttonColor: "#0070f3",
              buttonTextColor: "#ffffff",
              buttonHoverColor: "#0051cc",
              padding: "60px 20px",
              borderRadius: "8px",
              titleFontSize: "48px",
              subtitleFontSize: "20px",
            },
          },
        },
        {
          id: "banner_search_widget",
          folder: "banner_search_widget",
          title: "Banner Search Widget",
          templateId: "banner_search_widget_1",
          thumbnail: "/assets/svg/banner_search_widget.svg",
          description:
            "A banner search widget that allows users to search for products or content directly from the homepage.",
          data: {
            title: "Find Your Perfect Journey",
            subtitle: "Search and book bus tickets between cities across the country",
            searchType: "city",
            fromCityLabel: "From",
            toCityLabel: "To",
            departureDateLabel: "Departure Date",
            returnDateLabel: "Return Date",
            showReturnDate: false,
            searchButtonText: "Search Buses",
            popularCities: [
              { name: "New York", code: "NYC", state: "New York" },
              { name: "Los Angeles", code: "LAX", state: "California" },
              { name: "Chicago", code: "CHI", state: "Illinois" },
              { name: "Houston", code: "HOU", state: "Texas" },
              { name: "Miami", code: "MIA", state: "Florida" },
              { name: "Boston", code: "BOS", state: "Massachusetts" }
            ],
            apiConfig: {
              citySearchEndpoint: "/api/cities/search",
              routeSearchEndpoint: "/api/routes/search",
              enableAutoComplete: true,
              minSearchLength: 3
            },
            styles: {
              backgroundColor: "#f8f9fa",
              overlayColor: "rgba(0, 0, 0, 0.4)",
              textColor: "#333333",
              buttonColor: "#007bff",
              buttonHoverColor: "#0056b3",
              inputBorderColor: "#ddd",
              borderRadius: 8,
              padding: "40px 20px"
            }
          },
        }
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
              {
                text: "Home",
                url: "/",
                hasDropdown: false,
              },
              {
                text: "Products",
                url: "/products",
                hasDropdown: true,
                dropdownItems: [
                  {
                    text: "Product A",
                    url: "/products/a",
                  },
                  {
                    text: "Product B",
                    url: "/products/b",
                  },
                  {
                    text: "Product C",
                    url: "/products/c",
                  },
                ],
              },
              {
                text: "About Us",
                url: "/about",
                hasDropdown: false,
              },
              {
                text: "Contact",
                url: "/contact",
                hasDropdown: false,
              },
            ],
            showSearchBox: false,
            styles: {
              backgroundColor: "#ffffff",
              textColor: "#333333",
              hoverColor: "#0070f3",
              activeColor: "#0051cc",
              dropdownBackground: "#ffffff",
              padding: "20px 40px",
              spacing: "20px",
              mobileBehavior: "stacked", // or "hamburger"
              borderRadius: "4px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            },
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
            title: "Welcome to Our Website",
            subtitle: "Discover amazing content and features",
            buttonText: "Get Started",
            buttonUrl: "/get-started",
            imageUrl: "https://example.com/hero-image.jpg",
            imageAlt: "Hero Image",
            styles: {
              backgroundColor: "#ffffff",
              textColor: "#222222",
              subtitleColor: "#666666",
              buttonColor: "#0070f3",
              buttonTextColor: "#ffffff",
              buttonHoverColor: "#0051cc",
              padding: "60px 20px",
              borderRadius: "8px",
              titleFontSize: "48px",
              subtitleFontSize: "20px",
            },
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
  currentPage: "home",
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
  extraReducers: (builder) => { },
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
