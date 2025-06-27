# Widget Pattern and Architecture

This document outlines the standardized patterns and architecture for the widget system in the CMS Website Builder. Understanding these patterns is essential for developing new widgets and maintaining consistency across the system.

## 🏗️ Widget Architecture Principles

### 1. One Schema, Multiple Templates

Each widget folder contains:

- **One schema definition** for all templates in that folder
- **One default data object** for all templates in that folder  
- **One metadata object** for all templates in that folder
- **Multiple templates** that share the schema and default data

**Example**: A "header_navigation" widget might have:
- `header_navigation_schema` - Field definitions and validation
- `header_navigation_default_data` - Initial values for all fields
- `defaultMetadata` - UI configuration for the editor
- Multiple templates: `header_navigation_1`, `header_navigation_2`, etc.

### 2. Consistent File Structure

```
src/widgets/widget_name/
├── widget_name.js           # Main widget definition
├── widget_name.data.json    # Optional default data (alternative to JS)
├── schema/                  # Schema definitions
│   └── widget_name_schema.js
├── templates/               # Individual template files
│   ├── template_1.js
│   ├── template_2.js
│   └── ...
└── assets/                  # Widget-specific assets
    ├── thumbnails/
    └── icons/
```

## 📋 Schema Definition Pattern

The schema defines the structure, validation rules, and UI configuration for widget data:

```javascript
export const widget_name_schema = {
  // Text field example
  title: {
    type: "text",
    label: "Widget Title",
    description: "The main heading for this widget",
    placeholder: "Enter your title here",
    validation: {
      required: true,
      maxLength: 100,
      minLength: 3
    }
  },
  
  // Rich text field
  content: {
    type: "textarea", 
    label: "Content",
    description: "Main content area with HTML support",
    placeholder: "Enter your content...",
    validation: {
      required: false,
      maxLength: 1000
    }
  },
  
  // Select dropdown
  layout: {
    type: "select",
    label: "Layout Style",
    description: "Choose the layout arrangement",
    options: [
      { value: "horizontal", label: "Horizontal" },
      { value: "vertical", label: "Vertical" },
      { value: "grid", label: "Grid" }
    ],
    validation: {
      required: true
    }
  },
  
  // Boolean toggle
  showIcon: {
    type: "boolean",
    label: "Show Icon",
    description: "Display an icon with the content",
    defaultValue: true
  },
  
  // Nested styling object
  styles: {
    type: "object",
    label: "Styling Options",
    properties: {
      backgroundColor: {
        type: "color",
        label: "Background Color",
        defaultValue: "#ffffff"
      },
      textColor: {
        type: "color", 
        label: "Text Color",
        defaultValue: "#333333"
      },
      padding: {
        type: "number",
        label: "Padding (px)",
        min: 0,
        max: 100,
        defaultValue: 20
      }
    }
  }
};
```

## 🎯 Default Data Pattern

Default data provides initial values for all fields defined in the schema:

```javascript
export const widget_name_default_data = {
  // Match schema field names exactly
  title: "Welcome to Our Site",
  content: "This is the default content for the widget.",
  layout: "horizontal",
  showIcon: true,
  
  // Nested styling object
  styles: {
    backgroundColor: "#ffffff",
    textColor: "#333333", 
    padding: 20,
    // Additional styling properties
    borderRadius: 8,
    marginBottom: 24,
    fontSize: 16,
    fontWeight: "normal"
  },
  
  // Dynamic content arrays
  items: [
    {
      id: 1,
      title: "Feature 1",
      description: "Description of feature 1",
      icon: "star"
    },
    {
      id: 2,
      title: "Feature 2", 
      description: "Description of feature 2",
      icon: "heart"
    }
  ],
  
  // Configuration flags
  settings: {
    autoplay: false,
    showNavigation: true,
    animationDuration: 300
  }
};
```

## ⚙️ Metadata Configuration

Metadata provides information about the widget for the CMS interface and customization panels:

```javascript
const defaultMetadata = {
  // Basic widget information
  folder: "widget_folder_name",
  title: "Widget Display Name",
  description: "Brief description of what this widget does",
  category: "Content", // Content, Layout, Navigation, Media, etc.
  
  // Schema reference
  editorSchema: "widget_name_schema",
  
  // Customization panels organization
  customizableSections: [
    {
      id: "content",
      title: "Content Settings",
      icon: "edit",
      fields: [
        "title",
        "content", 
        "items"
      ]
    },
    {
      id: "layout",
      title: "Layout & Display",
      icon: "layout",
      fields: [
        "layout",
        "showIcon",
        "settings.showNavigation"
      ]
    },
    {
      id: "appearance",
      title: "Styling",
      icon: "palette", 
      fields: [
        "styles.backgroundColor",
        "styles.textColor",
        "styles.padding",
        "styles.borderRadius"
      ]
    },
    {
      id: "advanced",
      title: "Advanced Options",
      icon: "settings",
      collapsible: true,
      collapsed: true,
      fields: [
        "settings.autoplay",
        "settings.animationDuration"
      ]
    }
  ],
  
  // Template-specific metadata
  templates: {
    "template_1": {
      name: "Modern Card Layout",
      description: "Clean, modern card-based design",
      thumbnail: "/assets/thumbnails/widget_template_1.svg",
      previewImage: "/assets/previews/widget_template_1.jpg"
    },
    "template_2": {
      name: "Classic List Layout", 
      description: "Traditional list-based layout",
      thumbnail: "/assets/thumbnails/widget_template_2.svg",
      previewImage: "/assets/previews/widget_template_2.jpg"
    }
  },
  
  // Responsive behavior
  responsive: {
    breakpoints: ["desktop", "tablet", "mobile"],
    defaultBreakpoint: "desktop"
  },
  
  // Dependencies and compatibility
  dependencies: [],
  compatibility: {
    minVersion: "1.0.0",
    maxVersion: "*"
  }
};
```

## 🎨 Template Definition Pattern

Each template defines HTML and CSS that uses the schema and default data with Handlebars templating:

```javascript
export const widget_name_template_1 = {
  id: "widget_name_template_1",
  title: "Modern Card Layout",
  
  // HTML template with Handlebars syntax
  html: `
    <div class="widget-container {{#if styles.customClass}}{{styles.customClass}}{{/if}}">
      {{#if showIcon}}
        <div class="widget-icon">
          <i class="icon-{{icon}}"></i>
        </div>
      {{/if}}
      
      <div class="widget-content">
        <h2 class="widget-title">{{title}}</h2>
        <div class="widget-description">{{{content}}}</div>
        
        {{#if items}}
          <div class="widget-items {{layout}}">
            {{#each items}}
              <div class="widget-item" data-id="{{id}}">
                <h3 class="item-title">{{title}}</h3>
                <p class="item-description">{{description}}</p>
                {{#if icon}}
                  <i class="item-icon icon-{{icon}}"></i>
                {{/if}}
              </div>
            {{/each}}
          </div>
        {{/if}}
      </div>
      
      {{#if settings.showNavigation}}
        <div class="widget-navigation">
          <button class="nav-prev">Previous</button>
          <button class="nav-next">Next</button>
        </div>
      {{/if}}
    </div>
  `,
  
  // CSS with variable interpolation
  css: `
    .widget-container {
      background-color: {{styles.backgroundColor}};
      color: {{styles.textColor}};
      padding: {{styles.padding}}px;
      border-radius: {{styles.borderRadius}}px;
      margin-bottom: {{styles.marginBottom}}px;
      font-size: {{styles.fontSize}}px;
      font-weight: {{styles.fontWeight}};
      position: relative;
      overflow: hidden;
      {{#if settings.autoplay}}
        animation: fadeIn {{settings.animationDuration}}ms ease-in-out;
      {{/if}}
    }
    
    .widget-title {
      font-size: 1.5em;
      margin-bottom: 1rem;
      font-weight: bold;
    }
    
    .widget-items {
      display: flex;
      gap: 1rem;
    }
    
    .widget-items.horizontal {
      flex-direction: row;
      flex-wrap: wrap;
    }
    
    .widget-items.vertical {
      flex-direction: column;
    }
    
    .widget-items.grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    
    .widget-item {
      flex: 1;
      min-width: 200px;
      padding: 1rem;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      transition: transform 0.2s ease;
    }
    
    .widget-item:hover {
      transform: translateY(-2px);
    }
    
    .widget-navigation {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      display: flex;
      gap: 0.5rem;
    }
    
    .widget-navigation button {
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      background: {{styles.textColor}};
      color: {{styles.backgroundColor}};
      cursor: pointer;
      transition: opacity 0.2s ease;
    }
    
    .widget-navigation button:hover {
      opacity: 0.8;
    }
    
    /* Responsive design */
    @media (max-width: 768px) {
      .widget-items.horizontal {
        flex-direction: column;
      }
      
      .widget-navigation {
        position: static;
        margin-top: 1rem;
        justify-content: center;
      }
    }
    
    /* Animation keyframes */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `,
  
  // Template-specific metadata
  metadata: {
    id: "widget_name_template_1",
    templateId: "widget_name_template_1",
    thumbnail: "/assets/thumbnails/widget_name_template_1.svg",
    previewImage: "/assets/previews/widget_name_template_1.jpg",
    description: "Modern card-based layout with hover effects",
    tags: ["modern", "cards", "responsive"],
    ...defaultMetadata // Inherit common metadata
  }
};
```

## 🔄 Integration with GrapesJS

### Widget Registration

Widgets are automatically registered with GrapesJS through the `registerWidgetBlocks` function:

```javascript
// src/lib/grapesJsWidgets.js
export const registerWidgetBlocks = async (editor) => {
  const blockManager = editor.BlockManager;
  const widgetCategories = await getAvailableWidgets();

  for (const category of widgetCategories) {
    for (const widget of category.items) {
      const { id, folder, templateId, name, thumbnail } = widget;
      const defaultData = await getWidgetDefaultData(folder, templateId);

      blockManager.add(`widget-${id}`, {
        label: name,
        category: category.category,
        content: {
          type: "widget",
          widgetId: id,
          folder,
          templateId, 
          data: defaultData
        },
        media: thumbnail
      });
    }
  }
};
```

### Widget Component Definition

The widget component handles rendering and data updates:

```javascript
// Widget component type registration
domComponents.addType("widget", {
  isComponent: (el) => el.hasAttribute("data-widget-id"),
  
  model: {
    defaults: {
      droppable: true,
      attributes: { "data-gjs-type": "widget" },
      traits: [
        { name: "widgetId", type: "text" },
        { name: "folder", type: "text" },
        { name: "templateId", type: "text" }
      ]
    },
    
    init() {
      this.on("change:attributes:data-widget-data", this.onDataUpdate);
    },
    
    onDataUpdate() {
      this.render(); // Re-render when data changes
    },
    
    async render() {
      // Load widget definition and render with current data
      const widgetDef = await loadWidget(folder, templateId);
      const html = renderTemplate(widgetDef.html, data);
      const css = renderTemplate(widgetDef.css, data);
      
      this.components(html);
      this.setStyle(css);
      this.setAttributes({
        "data-widget-id": widgetId,
        "data-widget-type": folder,
        "data-widget-template": templateId,
        "data-widget-data": encodeURIComponent(JSON.stringify(data))
      });
    }
  }
});
```

## 🚀 Development Workflow

### Creating a New Widget

1. **Create the widget folder structure**:
   ```bash
   mkdir src/widgets/my_new_widget
   mkdir src/widgets/my_new_widget/templates
   mkdir src/widgets/my_new_widget/assets
   ```

2. **Define the schema** (`src/widgets/my_new_widget/schema.js`):
   ```javascript
   export const my_new_widget_schema = {
     // Define your fields following the schema pattern
   };
   ```

3. **Create default data** (`src/widgets/my_new_widget/default_data.js`):
   ```javascript
   export const my_new_widget_default_data = {
     // Provide initial values for all schema fields
   };
   ```

4. **Set up metadata** (`src/widgets/my_new_widget/metadata.js`):
   ```javascript
   export const defaultMetadata = {
     // Configure widget information and customization panels
   };
   ```

5. **Create templates** (`src/widgets/my_new_widget/templates/template_1.js`):
   ```javascript
   export const my_new_widget_template_1 = {
     // Define HTML, CSS, and template-specific metadata
   };
   ```

6. **Register the widget** (`src/widgets/my_new_widget/index.js`):
   ```javascript
   export * from './schema.js';
   export * from './default_data.js';
   export * from './metadata.js';
   export * from './templates/template_1.js';
   // Export additional templates...
   ```

7. **Update the widget index** (`src/widgets/index.js`):
   ```javascript
   import * as myNewWidget from './my_new_widget';
   
   export const widgets = {
     // ... existing widgets
     my_new_widget: myNewWidget
   };
   ```

### Adding Templates to Existing Widgets

1. **Create new template file** in the widget's templates folder
2. **Use the same schema and default data** as other templates in that folder
3. **Define unique HTML and CSS** for the new layout
4. **Include template-specific metadata** with thumbnail and description
5. **Export the template** from the widget's index file

### Testing and Validation

```javascript
// Test widget schema validation
import { validateWidgetData } from '@/lib/utils';
import { my_new_widget_schema, my_new_widget_default_data } from './my_new_widget';

const isValid = validateWidgetData(my_new_widget_default_data, my_new_widget_schema);
console.log('Widget data is valid:', isValid);
```

## 🎯 Best Practices

### Schema Design
- **Use descriptive field names** that clearly indicate their purpose
- **Provide comprehensive validation** with appropriate limits and requirements
- **Include helpful descriptions and placeholders** for better user experience
- **Group related fields** using nested objects for better organization
- **Define sensible default values** to minimize configuration needed

### Template Development
- **Follow responsive design principles** with mobile-first approach
- **Use semantic HTML** for better accessibility and SEO
- **Implement proper error handling** for missing or invalid data
- **Optimize CSS** for performance and maintainability
- **Test templates** with various data configurations

### Performance Considerations
- **Lazy load heavy assets** when possible
- **Minimize DOM manipulation** in template rendering
- **Use CSS transforms** instead of layout-changing properties for animations
- **Implement proper caching** for widget definitions and templates
- **Optimize images and assets** used in widgets

### Accessibility Guidelines  
- **Include proper ARIA labels** and roles
- **Ensure keyboard navigation** works correctly
- **Provide alternative text** for images and icons
- **Maintain proper heading hierarchy** (h1, h2, h3, etc.)
- **Test with screen readers** and accessibility tools

### Maintenance
- **Version your widget schemas** to handle breaking changes
- **Document any dependencies** or special requirements
- **Provide migration paths** for schema updates
- **Keep templates simple** and avoid complex logic in Handlebars
- **Use consistent naming conventions** across all widget files

## 📚 Available Widget Examples

Current widgets following this pattern:

### Navigation & Layout
- **header_navigation**: Site navigation with multiple layouts
- **footer**: Footer sections with contact info and links

### Content Display
- **hero_banner**: Hero sections with call-to-action buttons
- **features**: Feature showcases with icons and descriptions
- **testimonials**: Customer testimonials with ratings
- **photo_gallery**: Image galleries with lightbox functionality

### Interactive Elements
- **contact_us**: Contact forms with validation
- **banner_search_widget**: Search interfaces for various content types
- **filters**: Dynamic filtering components

### Business-Specific
- **packages**: Service/product package displays
- **offers**: Promotional offer presentations
- **fare_summary**: Pricing breakdowns and summaries
- **route_details**: Travel route information displays

Each widget demonstrates different aspects of the pattern and provides excellent reference implementations for new widget development.

## 🔗 Related Documentation

- **[Widget System Guide](./README-WIDGET-SYSTEM.md)**: Comprehensive widget system overview
- **[API Documentation](./API-DOCUMENTATION.md)**: REST API endpoints for widget management
- **[JavaScript Bundling](./src/javascript/README.md)**: Understanding the JS bundling system
- **[Canvas Transform](./src/components/grapesjs/utils/CANVAS-TRANSFORM-README.md)**: Editor canvas transformation system
