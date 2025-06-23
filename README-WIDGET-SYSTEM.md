## Widget System

The CMS Website Builder uses a dynamic widget system for rendering page components. Widgets are modular templates with HTML, CSS, and configurable data.

### Widget Structure

Widgets are located in `/src/widgets/[widget_type]/[widget_name].js` and follow a standard format:

```javascript
// widget_name.js
export const html = `
<div class="widget-class">
  <h2>{{title}}</h2>
  <p>{{description}}</p>
  <ul>
    {{#each items}}
      <li>{{text}}</li>
    {{/each}}
  </ul>
</div>
`;

export const css = `
.widget-class {
  /* CSS styles for the widget */
}
`;

export const metadata = {
  id: 'widget_name',
  name: 'Friendly Widget Name',
  thumbnail: '/path/to/thumbnail.png'
};
```

### Template Engine

Widgets use a simple template engine that supports:

- `{{variable}}` - Variable replacement
- `{{#each items}}...{{/each}}` - Loop through arrays
- `{{#if condition}}...{{else}}...{{/if}}` - Conditional rendering

### Adding New Widgets

1. Create a new directory for your widget type in `/src/widgets/` if it doesn't exist
2. Create a new JS file following the standard format
3. Export `html`, `css`, and `metadata` from your widget file
4. The widget will be available for use in the CMS editor

### Alternative Widget Format

Widgets can also be defined as JSON files in the public directory:

```json
{
  "html": "<div class=\"my-widget\">{{content}}</div>",
  "css": ".my-widget { padding: 20px; }",
  "metadata": {
    "id": "widget_name",
    "name": "Friendly Widget Name",
    "thumbnail": "/path/to/thumbnail.png"
  }
}
```

JSON-based widgets are loaded at runtime via fetch, while JS modules are imported directly.

## Development

### Requirements

- Node.js 18.x or higher

### Getting Started

1. Clone this repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Editor Features

- Multiple pages
- Device switcher (mobile, tablet, desktop)
- Undo/redo functionality
- Custom blocks for common UI components
- Layer manager for rearranging sections
- CSS class editor
- Component style manager
