# Widget System Structure

This document outlines the structure and organization of the widget system in the CMS Website Builder.

## Widget Structure Pattern

Every widget in the system follows a consistent pattern to ensure modularity, reusability, and maintainability:

### 1. One Schema, Multiple Templates

Each widget folder contains:

- One schema definition for all templates in that folder
- One default data object for all templates in that folder
- One metadata object for all templates in that folder
- Multiple templates that share the schema and default data

For example, a "header_navigation" widget might have:

- header_navigation_schema
- header_navigation_default_data
- defaultMetadata (for all templates in that folder)
- Multiple templates: header_navigation_1, header_navigation_2, etc.

### 2. Schema Definition

The schema defines the structure and validation rules for the widget data:

```javascript
export const widget_name_schema = {
  fieldName: {
    type: "text", // text, textarea, number, boolean, select, array, etc.
    label: "Human-readable label",
    description: "Help text for the field",
    placeholder: "Example placeholder",
    validation: {
      required: true,
      maxLength: 100,
      // other validation rules
    },
  },
  // Additional fields...
};
```

### 3. Default Data

The default data provides initial values for all fields defined in the schema:

```javascript
export const widget_name_default_data = {
  fieldName: "Initial value",
  // other fields with default values
  styles: {
    // Common styling variables used by all templates
    backgroundColor: "#ffffff",
    textColor: "#333333",
    // etc.
  },
};
```

### 4. Metadata

The metadata provides information about the widget for the CMS interface:

```javascript
const defaultMetadata = {
  folder: "widget_folder_name",
  title: "Widget Display Name",
  description: "Description of what this widget does",
  editorSchema: "widget_name_schema", // Reference to the schema
  customizableSections: [
    {
      id: "content",
      title: "Content",
      fields: ["fieldName1", "fieldName2"],
    },
    {
      id: "appearance",
      title: "Appearance",
      fields: ["styles.backgroundColor", "styles.textColor"],
    },
    // Additional sections...
  ],
};
```

### 5. Templates

Each template defines HTML and CSS that uses the schema and default data:

```javascript
export const widget_name_1 = {
  id: "widget_name_1",
  title: "Template Name",
  html: `
    <!-- HTML template with Handlebars syntax -->
    <div>{{fieldName}}</div>
  `,
  css: `
    /* CSS with variable interpolation */
    div {
      background-color: {{styles.backgroundColor}};
      color: {{styles.textColor}};
    }
  `,
  metadata: {
    id: "widget_name_1",
    templateId: "widget_name_1",
    thumbnail: "/assets/svg/widget_thumbnail.svg",
    ...defaultMetadata, // Include the common metadata
  },
};
```

## Adding New Widget Templates

To add a new template to an existing widget type:

1. Use the same schema, default data, and metadata as other templates in that folder
2. Create a new template object with a unique ID
3. Define HTML and CSS that works with the common schema and default data
4. Reference the common metadata

## Example Widgets

Examples of this pattern can be found in:

- src/widgets/header_navigation/header_navigation.js
- src/widgets/hero_banner/hero_banner.js
- src/widgets/testimonials/testimonials.js
- src/widgets/features/features.js

## Widget Customization

The CMS dynamically generates customization UI based on:

1. The schema, which defines field types and validation
2. The metadata, which organizes fields into customizable sections
3. The default data, which provides initial values

Each template in a widget folder uses the same customization UI, as they all share the same schema.
