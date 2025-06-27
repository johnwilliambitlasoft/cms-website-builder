# CMS Website Builder - API Documentation

This document describes the API endpoints available for working with the CMS Website Builder. These APIs can be used to programmatically integrate with your published site content.

## API Endpoints

### Page Content

#### Get Page HTML and CSS (Body Content Only)

Gets the HTML body content and CSS for a specified page.

```
GET /api/[pageName]
```

**Parameters:**
- `pageName` - The name of the page to fetch (in URL)

**Responses:**

Success (200):
```json
{
  "html": "<div class='container'>Page content here</div>",
  "css": ".container { max-width: 1200px; margin: 0 auto; }"
}
```

Error (404):
```json
{
  "error": "Page not found"
}
```

#### Get Full Page Content

Gets the full page content including HTML body and CSS.

```
GET /api/page/[pageName]
```

**Parameters:**
- `pageName` - The name of the page to fetch (in URL)

**Responses:**

Success (200):
```json
{
  "pageName": "home",
  "html": "<div class='container'>Page content here</div>",
  "css": ".container { max-width: 1200px; margin: 0 auto; }"
}
```

Error (404):
```json
{
  "error": "Page not found"
}
```

#### Save Page Content

Saves HTML and CSS content for a page.

```
POST /api/page/[pageName]
```

**Parameters:**
- `pageName` - The name of the page (in URL)

**Request Body:**
```json
{
  "html": "<div class='container'>New page content</div>",
  "css": ".container { max-width: 1200px; margin: 0 auto; }",
  "title": "Page Title"
}
```

**Responses:**

Success (200):
```json
{
  "success": true,
  "pageName": "home",
  "files": {
    "html": "/build/home.html",
    "css": "/build/styles/home.css"
  },
  "message": "Successfully saved page 'home'"
}
```

Error (400):
```json
{
  "error": "HTML or CSS content is required"
}
```

### Page Management

#### List All Pages

Gets a list of all published pages.

```
GET /api/pages
```

**Responses:**

Success (200):
```json
{
  "pages": [
    {
      "name": "home",
      "title": "Home Page",
      "paths": {
        "html": "/build/home.html",
        "css": "/build/styles/home.css"
      }
    },
    {
      "name": "about",
      "title": "About Us",
      "paths": {
        "html": "/build/about.html",
        "css": "/build/styles/about.css"
      }
    }
  ]
}
```

## Client-Side API Helpers

### Import the API Helpers

```javascript
import { 
  fetchPageContent, 
  fetchPageBodyContent,
  fetchAllPages, 
  savePageContent 
} from '@/lib/pageApi';
```

### Examples

#### Fetch Full Page Content

```javascript
const { html, css } = await fetchPageContent('home');
```

#### Fetch Just Body Content

```javascript
const { html, css } = await fetchPageBodyContent('home');
```

#### List All Pages

```javascript
const { pages } = await fetchAllPages();
```

#### Save Page Content

```javascript
const result = await savePageContent('home', {
  html: '<div>New content</div>',
  css: '.container { padding: 20px; }',
  title: 'Home Page'
});
```

## Preview Published Site

You can preview your published site using the included preview server:

```bash
npm run preview-site
```

This starts a local HTTP server on port 3001 (by default) serving your published files from `/public/build`.
