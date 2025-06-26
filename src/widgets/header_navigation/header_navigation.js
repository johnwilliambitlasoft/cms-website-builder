/**
 * Header Navigation Widget Templates
 * Contains two different header navigation layouts:
 * 1. Standard horizontal navigation (header_navigation_1)
 * 2. Centered navigation with dropdowns (header_navigation_2)
 */

// ==============================================
// SCHEMA DEFINITION - Common for all templates
// ==============================================

export const header_navigation_schema = {
  logoUrl: {
    type: "image", // Use image input type
    label: "Logo URL",
    description: "URL for the logo image",
    placeholder: "https://example.com/logo.png",
    validation: {
      required: true,
    },
  },
  links: {
    type: "array", // Array of items (repeatable)
    label: "Navigation Links",
    description: "Add navigation menu links",
    itemLabel: "Menu Link", // Label for each item in the array
    addItemLabel: "Add Navigation Link", // Button text for adding new item
    minItems: 1, // Minimum required items
    maxItems: 10, // Maximum allowed items
    defaultNewItem: {
      // Default values for new items
      text: "New Link",
      url: "#",
      hasDropdown: false,
      dropdownItems: [],
    },
    item: {
      // Schema for each item in the array
      text: {
        type: "text", // Simple text input
        label: "Link Text",
        validation: {
          required: true,
          maxLength: 30,
        },
      },
      url: {
        type: "url", // URL input with validation
        label: "Link URL",
        placeholder: "/page-url",
        validation: {
          required: true,
        },
      },
      hasDropdown: {
        type: "boolean",
        label: "Has Dropdown Menu",
        description: "Whether this link has a dropdown submenu",
      },
      dropdownItems: {
        type: "array",
        label: "Dropdown Menu Items",
        description: "Items in the dropdown menu",
        itemLabel: "Dropdown Item",
        addItemLabel: "Add Dropdown Item",
        conditional: {
          field: "hasDropdown",
          value: true,
        },
        item: {
          text: {
            type: "text",
            label: "Link Text",
            validation: {
              required: true,
              maxLength: 30,
            },
          },
          url: {
            type: "url",
            label: "Link URL",
            placeholder: "/dropdown-page",
            validation: {
              required: true,
            },
          },
        },
      },
    },
  },
  showSearchBox: {
    type: "boolean",
    label: "Show Search Box",
    description: "Display a search box in the navigation",
  },
};

// ==============================================
// DEFAULT DATA - Common for all templates
// ==============================================

export const header_navigation_default_data = {
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
};

// ==============================================
// METADATA - Common for all templates
// ==============================================

const defaultMetadata = {
  folder: "header_navigation",
  title: "Header Navigation",
  description: "A customizable header navigation bar with logo and links.",
  editorSchema: "header_navigation_schema", // Reference to the schema export name
  customizableSections: [
    {
      id: "content",
      title: "Content",
      fields: ["logoUrl", "links", "showSearchBox"],
    },
    {
      id: "appearance",
      title: "Appearance",
      fields: [
        "styles.backgroundColor",
        "styles.textColor",
        "styles.hoverColor",
        "styles.activeColor",
        "styles.dropdownBackground",
        "styles.borderRadius",
        "styles.boxShadow",
      ],
    },
    {
      id: "layout",
      title: "Layout",
      fields: ["styles.padding", "styles.spacing", "styles.mobileBehavior"],
    },
  ],
};

// ==============================================
// TEMPLATE 1: STANDARD HORIZONTAL NAVIGATION
// ==============================================

export const header_navigation_1 = {
  id: "header_navigation_1",
  title: "Standard Horizontal Navigation",
  html: `
<div class="header-navigation">
  <div class="logo">
    <a href="/"><img src="{{logoUrl}}" alt="Logo"></a>
  </div>
  <ul class="nav-links">
    {{#each links}}
      <li><a href="{{url}}">{{text}}</a></li>
    {{/each}}
  </ul>
</div>
  `,
  css: `
.header-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: {{styles.padding}};
  background-color: {{styles.backgroundColor}};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-navigation .logo img {
  height: 40px;
}

.header-navigation .nav-links {
  list-style: none;
  display: flex;
  gap: {{styles.spacing}};
}

.header-navigation .nav-links li {
  display: inline;
}

.header-navigation .nav-links a {
  text-decoration: none;
  color: {{styles.textColor}};
  font-weight: 500;
  transition: color 0.3s;
}

.header-navigation .nav-links a:hover {
  color: {{styles.hoverColor}};
}

@media (max-width: 768px) {
  .header-navigation {
    flex-direction: {{#if (eq styles.mobileBehavior "stacked")}}column{{else}}row{{/if}};
    align-items: {{#if (eq styles.mobileBehavior "stacked")}}flex-start{{else}}center{{/if}};
  }

  .header-navigation .nav-links {
    {{#if (eq styles.mobileBehavior "stacked")}}
    flex-direction: column;
    gap: calc({{styles.spacing}} / 2);
    {{else}}
    display: none;
    {{/if}}
  }
}`,
  metadata: {
    id: "header_navigation_1",
    templateId: "header_navigation_1",
    thumbnail: "/assets/svg/header_navigation.svg",
    ...defaultMetadata,
  },
};

// ==============================================
// TEMPLATE 2: CENTERED NAVIGATION WITH DROPDOWNS
// ==============================================

export const header_navigation_2 = {
  id: "header_navigation_2",
  title: "Centered Navigation with Dropdowns",
  html: `
<nav class="header-navigation-centered">
  <div class="navigation-container">
    <div class="navigation-top">
      <div class="logo-container">
        <a href="/" class="logo">
          <img src="{{logoUrl}}" alt="Logo">
        </a>
      </div>
      
      {{#if showSearchBox}}
      <div class="search-box">
        <input type="text" placeholder="Search...">
        <button class="search-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
      {{/if}}
      
      <div class="mobile-menu-toggle">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    
    <div class="navigation-links">
      <ul class="main-menu">
        {{#each links}}
          <li class="{{#if hasDropdown}}has-dropdown{{/if}}">
            <a href="{{url}}">{{text}}
              {{#if hasDropdown}}
              <svg class="dropdown-icon" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
              {{/if}}
            </a>
            
            {{#if hasDropdown}}
            <ul class="dropdown-menu">
              {{#each dropdownItems}}
                <li><a href="{{url}}">{{text}}</a></li>
              {{/each}}
            </ul>
            {{/if}}
          </li>
        {{/each}}
      </ul>
    </div>
  </div>
</nav>
  `,
  css: `
.header-navigation-centered {
  background-color: {{styles.backgroundColor}};
  box-shadow: {{styles.boxShadow}};
  padding: {{styles.padding}};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.navigation-container {
  max-width: 1200px;
  margin: 0 auto;
}

.navigation-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.logo-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.logo img {
  height: 50px;
  max-width: 100%;
}

.search-box {
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
  border-radius: {{styles.borderRadius}};
  overflow: hidden;
  border: 1px solid #ddd;
}

.search-box input {
  border: none;
  padding: 8px 12px;
  font-size: 14px;
  outline: none;
}

.search-button {
  background: {{styles.hoverColor}};
  border: none;
  color: white;
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.navigation-links {
  display: flex;
  justify-content: center;
}

.main-menu {
  list-style: none;
  display: flex;
  gap: {{styles.spacing}};
  margin: 0;
  padding: 0;
}

.main-menu li {
  position: relative;
}

.main-menu a {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: {{styles.textColor}};
  padding: 10px 0;
  font-weight: 500;
  transition: color 0.2s ease;
  font-size: 16px;
}

.main-menu a:hover {
  color: {{styles.hoverColor}};
}

.dropdown-icon {
  margin-left: 4px;
  transition: transform 0.2s;
}

.has-dropdown:hover .dropdown-icon {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: {{styles.dropdownBackground}};
  min-width: 200px;
  border-radius: {{styles.borderRadius}};
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 8px 0;
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.2s ease;
  list-style: none;
}

.dropdown-menu a {
  padding: 8px 16px;
  display: block;
}

.has-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  cursor: pointer;
}

.mobile-menu-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background-color: {{styles.textColor}};
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .navigation-top {
    margin-bottom: 0;
  }
  
  .logo-container {
    justify-content: flex-start;
    width: auto;
  }
  
  .search-box {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: flex;
    position: relative;
    z-index: 110;
  }
  
  .navigation-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 70%;
    height: 100vh;
    background: {{styles.backgroundColor}};
    box-shadow: -5px 0 15px rgba(0,0,0,0.1);
    transition: right 0.3s ease;
    z-index: 100;
    padding-top: 70px;
    overflow-y: auto;
  }
  
  .navigation-links.active {
    right: 0;
  }
  
  .main-menu {
    flex-direction: column;
    gap: 0;
  }
  
  .main-menu a {
    padding: 15px 20px;
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }
  
  .dropdown-menu {
    position: static;
    opacity: 1;
    visibility: visible;
    transform: none;
    box-shadow: none;
    padding: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }
  
  .has-dropdown.active .dropdown-menu {
    max-height: 500px;
  }
  
  .dropdown-menu a {
    padding-left: 40px;
  }
}`,
  metadata: {
    id: "header_navigation_2",
    templateId: "header_navigation_2",
    thumbnail: "/assets/svg/header_navigation_centered.svg",
    ...defaultMetadata,
  },
};
