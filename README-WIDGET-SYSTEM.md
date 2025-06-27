# Widget System Documentation

The CMS Website Builder features a comprehensive widget system with 18+ modular, customizable components for building dynamic websites. Each widget follows a schema-based architecture for type safety and consistency.

## 🧩 Available Widgets

### Navigation & Header
- **Header Navigation**: Responsive navigation bars with dropdowns and search functionality
- **Banner Search**: Search widgets for travel and booking applications

### Layout & Structure  
- **Hero Banner**: Eye-catching header sections with titles, subtitles, and call-to-action buttons
- **Footer**: Comprehensive footers with links, contact information, and social media

### Content Showcase
- **Features**: Highlight product/service features with icons and descriptions (grid and alternating layouts)
- **Testimonials**: Customer reviews and testimonials with ratings and photos
- **Photo Gallery**: Image galleries with lightbox functionality
- **Amenities**: Showcase facilities and amenities with visual representations

### E-commerce & Booking
- **Offers**: Promotional content and special deals
- **Packages**: Product/service packages with pricing and features
- **Fare Summary**: Booking summaries and pricing breakdowns
- **Apply Offers**: Coupon and discount application interfaces

### Forms & Interaction
- **Contact Us**: Contact forms with validation
- **Contact Details**: Display contact information and maps
- **Passenger Details**: Travel booking forms
- **Route Search**: Search interfaces for travel applications

### Search & Results
- **Search Result List**: Display search results with filtering
- **Filters**: Advanced filtering interfaces
- **Route Details**: Detailed route information and schedules

## 🏗️ Widget Architecture

### Schema-Based Definition
Each widget includes a comprehensive schema that defines:

```javascript
export const widget_name_schema = {
  title: {
    type: "text",
    label: "Widget Title",
    description: "The main title displayed in the widget",
    placeholder: "Enter title...",
    validation: {
      required: true,
      maxLength: 100
    }
  },
  content: {
    type: "textarea", 
    label: "Content",
    description: "Main content for the widget"
  },
  layout: {
    type: "select",
    label: "Layout Style",
    options: ["grid-2", "grid-3", "grid-4", "alternating"]
  },
  styles: {
    type: "object",
    properties: {
      backgroundColor: { type: "color", label: "Background Color" },
      textColor: { type: "color", label: "Text Color" },
      padding: { type: "text", label: "Padding" }
    }
  }
};
```

### Default Data Structure
```javascript
export const widget_name_default_data = {
  title: "Default Widget Title",
  content: "Default content...",
  layout: "grid-3",
  styles: {
    backgroundColor: "#ffffff",
    textColor: "#333333",
    padding: "40px 20px",
    borderRadius: "8px"
  }
};
```

### Template System
Multiple templates per widget type for layout variety:

```javascript
export const widget_name_1 = {
  id: "widget_name_1",
  title: "Grid Layout",
  html: `
<section class="widget-container">
  <div class="widget-header">
    <h2>{{title}}</h2>
    {{#if subtitle}}<p>{{subtitle}}</p>{{/if}}
  </div>
  <div class="widget-grid layout-{{layout}}">
    {{#each items}}
      <div class="widget-item">
        <h3>{{title}}</h3>
        <p>{{description}}</p>
      </div>
    {{/each}}
  </div>
</section>`,
  css: `
.widget-container {
  padding: {{styles.padding}};
  background-color: {{styles.backgroundColor}};
  color: {{styles.textColor}};
}
.widget-grid.layout-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
@media (max-width: 768px) {
  .widget-grid.layout-3 {
    grid-template-columns: 1fr;
  }
}`
};
```

## 🎨 Templating Engine

### Handlebars Syntax Support
The widget system uses Handlebars templating for dynamic content:

#### Variable Replacement
```handlebars
<h1>{{title}}</h1>
<p>{{description}}</p>
<span style="color: {{styles.textColor}}">Styled text</span>
```

#### Conditional Rendering
```handlebars
{{#if showButton}}
  <button class="cta-button">{{buttonText}}</button>
{{/if}}

{{#if image}}
  <img src="{{image}}" alt="{{imageAlt}}">
{{else}}
  <div class="placeholder">No image available</div>
{{/if}}
```

#### Loop Iteration
```handlebars
<ul class="feature-list">
  {{#each features}}
    <li class="feature-item">
      <h3>{{title}}</h3>
      <p>{{description}}</p>
      {{#if iconName}}
        <i class="icon-{{iconName}}"></i>
      {{/if}}
    </li>
  {{/each}}
</ul>
```

#### Helper Functions
```handlebars
{{#eq layout "grid"}}Grid Layout{{/eq}}
{{#neq status "active"}}Inactive{{/neq}}
```

## 🔧 Widget Development

### Creating a New Widget

1. **Create Widget Directory**
```bash
mkdir src/widgets/my_widget
touch src/widgets/my_widget/my_widget.js
```

2. **Define Schema**
```javascript
export const my_widget_schema = {
  title: {
    type: "text",
    label: "Title",
    required: true,
    validation: { maxLength: 100 }
  },
  items: {
    type: "array",
    label: "Items",
    itemSchema: {
      name: { type: "text", label: "Item Name" },
      value: { type: "number", label: "Value" }
    }
  }
};
```

3. **Set Default Data**
```javascript
export const my_widget_default_data = {
  title: "My Widget",
  items: [
    { name: "Item 1", value: 100 },
    { name: "Item 2", value: 200 }
  ],
  styles: {
    backgroundColor: "#f8f9fa",
    textColor: "#212529"
  }
};
```

4. **Create Templates**
```javascript
export const my_widget_1 = {
  id: "my_widget_1",
  title: "Basic Layout",
  html: `<div class="my-widget">...</div>`,
  css: `.my-widget { ... }`,
  metadata: {
    id: "my_widget_1",
    templateId: "my_widget_1",
    thumbnail: "/assets/svg/my_widget.svg",
    ...defaultMetadata
  }
};
```

5. **Register Widget**
```javascript
// In src/widgets/index.js
import * as my_widget from "./my_widget/my_widget.js";

export {
  // ...existing widgets
  my_widget
};
```

### Widget Metadata
```javascript
const defaultMetadata = {
  folder: "my_widget",
  title: "My Widget",
  description: "Description of widget functionality",
  editorSchema: "my_widget_schema",
  customizableSections: [
    {
      id: "content",
      title: "Content",
      fields: ["title", "items"]
    },
    {
      id: "appearance", 
      title: "Appearance",
      fields: ["styles.backgroundColor", "styles.textColor"]
    }
  ]
};
```

## 🎯 Widget Categories

### Content Widgets
Focus on displaying information and engaging users:
- Rich text content with formatting
- Image galleries and media showcases
- Feature highlights with icons
- Testimonials and reviews

### Layout Widgets  
Structural components for page organization:
- Hero sections and banners
- Navigation headers and footers
- Section dividers and spacers
- Grid and column layouts

### Interactive Widgets
User engagement and functionality:
- Contact forms with validation
- Search interfaces and filters
- Booking and reservation forms
- Interactive maps and directions

### E-commerce Widgets
Business and commerce functionality:
- Product showcases and catalogs
- Pricing tables and packages
- Shopping carts and checkout
- Promotional offers and discounts

## 📱 Responsive Design

### Mobile-First Approach
All widgets are designed with mobile-first responsive principles:

```css
/* Base styles for mobile */
.widget-container {
  padding: 20px 16px;
}

/* Tablet styles */
@media (min-width: 768px) {
  .widget-container {
    padding: 40px 32px;
  }
}

/* Desktop styles */
@media (min-width: 1024px) {
  .widget-container {
    padding: 60px 40px;
  }
}
```

### Flexible Grid System
```css
.widget-grid {
  display: grid;
  gap: 16px;
}

/* Responsive grid columns */
.grid-1 { grid-template-columns: 1fr; }
.grid-2 { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); }
.grid-3 { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); }
.grid-4 { grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); }
```

## 🔒 Type Safety & Validation

### Schema Validation
Widgets include comprehensive validation rules:

```javascript
validation: {
  required: true,
  minLength: 5,
  maxLength: 100,
  pattern: /^[a-zA-Z0-9\s]+$/,
  custom: (value) => value !== 'forbidden'
}
```

### TypeScript Support
Widget schemas can be converted to TypeScript interfaces:

```typescript
interface WidgetData {
  title: string;
  items: Array<{
    name: string;
    value: number;
  }>;
  styles: {
    backgroundColor: string;
    textColor: string;
  };
}
```

## 🚀 Performance Optimization

### Lazy Loading
Widgets support lazy loading for better performance:

```javascript
// Dynamic widget import
const widget = await import(`./widgets/${widgetType}/${widgetName}.js`);
```

### CSS Optimization
Widgets generate optimized CSS:
- Unused styles are stripped
- Variables are compiled to actual values
- Media queries are optimized

### Caching Strategy
Widget data and templates are cached for faster rendering:
- Schema validation results
- Compiled templates
- Rendered HTML/CSS output

## 📊 Usage Analytics

Track widget usage and performance:
- Most popular widgets
- Rendering performance metrics
- User interaction patterns
- Error rates and debugging info

## 🛠️ Development Tools

### Widget Inspector
Debug widget data and rendering:
```javascript
console.log('Widget Data:', widgetData);
console.log('Compiled Template:', compiledTemplate);
console.log('Rendered Output:', renderedHTML);
```

### Schema Validator
Validate widget schemas during development:
```javascript
import { validateSchema } from '@/lib/schema-validator';

const isValid = validateSchema(widgetData, widgetSchema);
```

### Template Compiler
Compile Handlebars templates for production:
```javascript
import { compileTemplate } from '@/lib/template-engine';

const template = compileTemplate(htmlTemplate);
const output = template(widgetData);
```

This widget system provides a powerful, flexible foundation for creating dynamic, responsive websites with a consistent development experience and robust architecture.
