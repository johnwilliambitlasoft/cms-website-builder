# CMS Website Builder

A powerful, modern Next.js-based visual website builder with GrapesJS integration, featuring dynamic widgets, canvas transformation, and a complete publishing system with API support.

## Author

**John William**  
Email: rjohnWilliam9499@gmail.com

## 🚀 Key Features

- **Visual Drag & Drop Editor**: GrapesJS-powered editor with custom widgets and components
- **Smart Canvas Transformation**: Automatic scaling for responsive design across all device sizes
- **Multi-Page Management**: Create and manage multiple pages with unique layouts
- **Widget System**: 18+ modular, customizable widgets with schemas and templates
- **Publishing System**: One-click publishing with JavaScript bundling and optimization
- **Live Preview Server**: Built-in HTTP server for real-time site preview
- **REST API**: Complete API endpoints for programmatic site management
- **Responsive Design**: Mobile-first approach with device preview capabilities
- **Modern Tech Stack**: React 19, Next.js 15, Redux Toolkit, and TypeScript support

## 🏗️ Project Architecture

```
├── public/                   # Static assets and build output
│   ├── assets/               # Images, fonts, and other static files
│   │   ├── font/             # Custom fonts (DM Sans, Genos)
│   │   └── svg/              # SVG icons and graphics
│   └── build/                # Published site output
│       ├── *.html            # Generated HTML pages
│       ├── styles/           # Generated CSS files
│       └── scripts/          # Bundled JavaScript files
├── src/
│   ├── app/                  # Next.js app router
│   │   ├── api/              # API routes
│   │   │   ├── [pageName]/   # Dynamic page content API
│   │   │   ├── page/         # Page CRUD operations
│   │   │   ├── pages/        # List all pages
│   │   │   └── publish/      # Publishing endpoints
│   │   ├── widget-customizer-example/ # Widget customization demo
│   │   └── widgets/          # Widget browser page
│   ├── components/           # Reusable UI components
│   │   ├── grapesjs/         # GrapesJS editor components
│   │   │   ├── utils/        # Editor utilities
│   │   │   │   ├── canvasUtils.js      # Canvas transformation
│   │   │   │   ├── editorUtils.js      # Editor configuration
│   │   │   │   ├── panelConfigs.js     # Panel configurations
│   │   │   │   ├── previewUtils.js     # Preview server utilities
│   │   │   │   └── publishUtils.js     # Publishing utilities
│   │   │   ├── index.jsx     # Main editor component
│   │   │   ├── leftSidePanel.jsx  # Pages and widgets panel
│   │   │   ├── rightSidePanel.jsx # Properties and layers panel
│   │   │   └── grapesjs.css  # Editor-specific styles
│   │   ├── header/           # Header components
│   │   ├── loader/           # Loading components
│   │   └── WidgetCustomizer/ # Widget customization interface
│   ├── javascript/           # Modular JavaScript for published sites
│   │   ├── mainApplication.js # Main entry point
│   │   ├── api.js            # API communication
│   │   ├── utils.js          # Utility functions
│   │   ├── config.js         # Configuration settings
│   │   └── *.js              # Other modular files
│   ├── lib/                  # Libraries and configurations
│   │   ├── redux/            # Redux store and slices
│   │   ├── constants.js      # Project constants
│   │   ├── pageApi.js        # Client-side API helpers
│   │   ├── publish-utils.js  # Server-side publishing utilities
│   │   └── utils.js          # Utility functions
│   ├── widgets/              # Widget system (18+ widgets)
│   │   ├── header_navigation/ # Navigation widgets
│   │   ├── hero_banner/      # Hero banner widgets
│   │   ├── features/         # Feature showcase widgets
│   │   ├── footer/           # Footer widgets
│   │   └── */                # Other widget categories
│   └── utils/                # Global utility functions
├── API-DOCUMENTATION.md      # Complete API documentation
├── package.json              # Dependencies and scripts
└── README files...           # Various documentation files
```

## 🎨 GrapesJS Editor Features

### Core Editor Capabilities
- **Device Switcher**: Preview designs on desktop, tablet, and mobile
- **Smart Canvas Scaling**: Automatic canvas transformation when device width > container width
- **Page Manager**: Switch between multiple pages seamlessly
- **Custom Blocks**: 18+ pre-built widgets for rapid development
- **Layer Manager**: Visual hierarchy management with drag-and-drop
- **Undo/Redo**: Full history management
- **Live Preview**: Real-time preview with HTTP server
- **Publishing**: One-click site generation and deployment

### Canvas Transformation System
Our innovative canvas transformation automatically scales the editor canvas to fit within the container:

- **Automatic Scaling**: `scale(0.37)` for 449×486 containers on 1200×800 devices
- **Smart Centering**: `translate(-376px, -401px)` for optimal positioning
- **Device-Responsive**: Only applies when device width > container width
- **Keyboard Shortcut**: `Ctrl+=` to manually trigger canvas fitting
- **Real-time Updates**: Responds to window resizing and device changes

## 🧩 Widget System

### Available Widget Categories
1. **Navigation**: Header navigation with dropdowns and search
2. **Layout**: Hero banners, sections, and structural elements
3. **Content**: Features, testimonials, photo galleries
4. **Forms**: Contact forms, passenger details, applications
5. **E-commerce**: Offers, packages, fare summaries
6. **Search**: Route search, filters, result listings
7. **Interactive**: Amenities, booking calculations

### Widget Architecture
Each widget follows a consistent pattern:
- **Schema Definition**: Type-safe field definitions with validation
- **Default Data**: Pre-configured content and styling
- **Multiple Templates**: Various layouts sharing the same schema
- **Handlebars Templating**: Dynamic content rendering
- **CSS Styling**: Responsive, customizable styles

## 📦 Publishing & Deployment

### Publishing Process
1. **Build Directory Creation**: Automatic folder structure generation
2. **JavaScript Bundling**: Combine 12+ JS files into single `bundle.js`
3. **HTML Generation**: Complete HTML documents with proper meta tags
4. **CSS Compilation**: Optimized stylesheets for each page
5. **Asset Management**: Automatic copying of fonts and images

### Live Preview Server
- **Automatic Server**: Starts on ports 3100-3200
- **Static File Serving**: Serves published files with proper MIME types
- **Hot Preview**: Real-time updates when content changes
- **Cross-Platform**: Works on all operating systems

## 🔌 API Endpoints

### Page Management
```
GET    /api/[pageName]        # Get page HTML and CSS (body only)
GET    /api/page/[pageName]   # Get full page content
POST   /api/page/[pageName]   # Save page content
GET    /api/pages             # List all published pages
```

### Publishing
```
POST   /api/publish/create-dirs    # Create build directories
POST   /api/publish/save-files     # Save page files
GET    /api/publish/preview        # Start preview server
DELETE /api/publish/preview        # Stop preview server
```

### Client-Side Helpers
```javascript
import { 
  fetchPageContent, 
  fetchPageBodyContent,
  fetchAllPages, 
  savePageContent 
} from '@/lib/pageApi';

// Usage examples
const { html, css } = await fetchPageContent('home');
const { pages } = await fetchAllPages();
await savePageContent('about', { html, css, title });
```

## 🛠️ Technology Stack

### Frontend
- **React 19**: Latest React with concurrent features
- **Next.js 15**: App router with server-side rendering
- **Redux Toolkit**: State management with RTK Query
- **GrapesJS**: Visual page builder framework
- **Ant Design**: UI component library

### Backend
- **Next.js API Routes**: RESTful API endpoints
- **File System**: Direct file operations for publishing
- **HTTP Server**: Built-in preview server

### Development Tools
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Turbopack**: Fast development bundling

## 🚀 Getting Started

### Prerequisites
- Node.js 22.x or higher (React 19 compatible)
- npm, yarn, or pnpm package manager

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd cms-website-builder

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev          # Start development server on port 3002
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
```

### Development Workflow
1. **Design**: Use the visual editor to create pages with widgets
2. **Customize**: Modify widget properties and styling
3. **Preview**: Use device switcher to test responsiveness
4. **Publish**: Generate static files for deployment
5. **API Integration**: Use REST endpoints for dynamic content

## 📖 Documentation

- **[API Documentation](./API-DOCUMENTATION.md)**: Complete API reference
- **[Widget System](./README-WIDGET-SYSTEM.md)**: Widget development guide
- **[Widget Patterns](./README-WIDGET-PATTERN.md)**: Architecture patterns
- **[JavaScript Bundling](./src/javascript/README.md)**: JS organization guide
- **[Canvas Transform](./src/components/grapesjs/utils/CANVAS-TRANSFORM-README.md)**: Canvas scaling system

## 🎯 Use Cases

### Content Creators
- **Visual Design**: Drag-and-drop interface for non-technical users
- **Multi-Page Sites**: Create complex websites with multiple pages
- **Responsive Design**: Automatic mobile optimization

### Developers
- **API Integration**: Programmatic content management
- **Custom Widgets**: Extend functionality with new components
- **Publishing Pipeline**: Automated deployment workflows

### Agencies
- **Client Collaboration**: Visual editor for client feedback
- **White-Label**: Customizable branding and styling
- **Scalable Architecture**: Handle multiple client projects

## 🔧 Advanced Features

### Canvas Transformation
- **Formula-Based Scaling**: Precise mathematical calculations for optimal fit
- **Device-Aware**: Different transformations for different screen sizes
- **Performance Optimized**: Smooth transitions with CSS transforms
- **Keyboard Controls**: Manual control with `Ctrl+=` shortcut

### JavaScript Architecture
- **Modular Design**: Separate files for different functionality
- **Global Namespacing**: Avoid conflicts with `window.ModuleName` pattern
- **Build Optimization**: Single bundle for production deployment
- **Development Friendly**: Individual files for easier debugging

### Widget Extensibility
- **Schema-Based**: Type-safe widget definitions
- **Template Variants**: Multiple layouts per widget type
- **Custom Fields**: Flexible content structure
- **Style System**: Consistent theming across widgets

## 📝 License

This project is proprietary software developed by John William.

© 2024-2025 John William. All rights reserved.

## 🤝 Contributing

This is a private project. For collaboration inquiries, please contact JohnWilliam9499@gmail.com.

---

**Built with ❤️ using React 19, Next.js 15, and GrapesJS**

Open [http://localhost:3002](http://localhost:3002) with your browser to see the result.

The application includes:
- **Visual Editor**: Drag-and-drop interface for building pages
- **Widget System**: 18+ customizable widgets for different content types
- **Live Preview**: Real-time preview with built-in HTTP server
- **Publishing**: One-click generation of static HTML/CSS/JS files
- **API Integration**: REST endpoints for programmatic content management
- **Canvas Transformation**: Smart scaling for responsive design workflows

## 🎨 Editor Features

### Visual Website Building
- **Drag & Drop**: Intuitive visual editor powered by GrapesJS
- **Device Preview**: Test designs across desktop, tablet, and mobile
- **Smart Canvas**: Automatic scaling when device width > container width
- **Multi-Page Support**: Create and manage multiple pages with unique layouts
- **Layer Management**: Visual hierarchy with drag-and-drop organization

### Widget System
- **18+ Widgets**: Header navigation, hero banners, features, testimonials, and more
- **Schema-Based**: Type-safe widget definitions with validation
- **Multiple Templates**: Various layouts per widget type
- **Customizable**: Flexible content and styling options
- **Responsive**: Mobile-first design approach

### Publishing & Preview
- **One-Click Publishing**: Generate complete static sites
- **JavaScript Bundling**: Combine multiple JS files into optimized bundle
- **Live Preview Server**: Built-in HTTP server on ports 3100-3200
- **API Endpoints**: Programmatic access to page content and site management

## 🔧 Development

### Canvas Transformation
The editor features an advanced canvas transformation system that automatically scales the design canvas to fit within the editor container:

```javascript
// Example transformations
Container: 449×486, Device: 1200×800 → scale(0.37) translate(-376px, -401px)
Container: 596×552, Device: 1200×800 → scale(0.49) translate(-303px, -278px)
Container: 719×607, Device: 1200×800 → scale(0.59) translate(-239px, -201px)
```

**Features:**
- Only applies when device width > container width
- Automatic updates on device changes and window resizing
- Manual trigger with `Ctrl+=` keyboard shortcut
- Smooth CSS transitions for better user experience

### API Integration
Complete REST API for programmatic site management:

```javascript
// Fetch page content
const { html, css } = await fetchPageContent('home');

// Save page content
await savePageContent('about', {
  html: '<div>Content</div>',
  css: '.content { padding: 20px; }',
  title: 'About Page'
});

// List all pages
const { pages } = await fetchAllPages();
```

### Widget Development
Create custom widgets following the established pattern:

```javascript
export const widget_schema = {
  title: { type: "text", label: "Title", required: true },
  content: { type: "textarea", label: "Content" }
};

export const widget_default_data = {
  title: "Default Title",
  content: "Default content...",
  styles: { backgroundColor: "#ffffff" }
};

export const widget_template_1 = {
  html: `<div>{{title}}</div><p>{{content}}</p>`,
  css: `.widget { background: {{styles.backgroundColor}}; }`
};
```

## 📚 Learn More

### Documentation
- **[API Documentation](./API-DOCUMENTATION.md)**: Complete REST API reference
- **[Widget System Guide](./README-WIDGET-SYSTEM.md)**: Widget development and usage
- **[Widget Patterns](./README-WIDGET-PATTERN.md)**: Architecture and best practices  
- **[JavaScript Bundling](./src/javascript/README.md)**: Modular JS organization
- **[Canvas Transform](./src/components/grapesjs/utils/CANVAS-TRANSFORM-README.md)**: Advanced scaling system

### External Resources
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [GrapesJS Documentation](https://grapesjs.com/docs/) - Visual editor framework
- [Redux Toolkit Guide](https://redux-toolkit.js.org/) - State management

## 🚀 Deployment

### Build Process
```bash
npm run build     # Build the Next.js application
npm run start     # Start production server
```

### Publishing Workflow
1. **Design**: Create pages using the visual editor
2. **Customize**: Configure widgets and styling
3. **Preview**: Test with device switcher and live preview
4. **Publish**: Generate static files in `/public/build`
5. **Deploy**: Upload published files to your hosting provider

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📄 License

This project is proprietary software developed by John William.

© 2024-2025 John William. All rights reserved.
