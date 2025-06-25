/**
 * Hero Banner Widget Templates
 * Contains different hero banner layouts:
 * 1. Standard Hero Banner (hero_banner_1)
 */

// ==============================================
// SCHEMA DEFINITION - Common for all templates
// ==============================================

export const hero_banner_schema = {
  title: {
    type: "text",
    label: "Title",
    description: "Main heading text for the banner",
    placeholder: "Welcome to Our Website",
    validation: {
      required: true,
      maxLength: 80
    }
  },
  subtitle: {
    type: "textarea",
    label: "Subtitle",
    description: "Secondary text below the main heading",
    placeholder: "Discover amazing content and features",
    validation: {
      maxLength: 200
    }
  },
  buttonText: {
    type: "text",
    label: "Button Text",
    description: "Call-to-action button text",
    placeholder: "Get Started",
  },
  buttonUrl: {
    type: "url",
    label: "Button URL",
    description: "URL for the call-to-action button",
    placeholder: "/get-started",
    conditional: {
      field: "buttonText",
      operator: "notEmpty"
    }
  },
  imageUrl: {
    type: "image",
    label: "Background Image",
    description: "Banner background image URL",
    placeholder: "https://example.com/hero-image.jpg",
    validation: {
      required: true
    }
  },
  imageAlt: {
    type: "text",
    label: "Image Alt Text",
    description: "Accessibility description for the image",
    placeholder: "Hero Banner Image"
  }
}

// ==============================================
// DEFAULT DATA - Common for all templates
// ==============================================

export const hero_banner_default_data = {
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
    subtitleFontSize: "20px"
  }
}

// ==============================================
// METADATA - Common for all templates
// ==============================================

const defaultMetadata = {
  folder: "hero_banner",
  title: "Hero Banner",
  description: "A customizable hero banner with title, subtitle, and call-to-action button.",
  editorSchema: "hero_banner_schema", // Reference to the schema export name
  customizableSections: [
    {
      id: "content",
      title: "Content",
      fields: ["title", "subtitle", "buttonText", "buttonUrl", "imageUrl", "imageAlt"]
    },
    {
      id: "appearance",
      title: "Appearance",
      fields: [
        "styles.backgroundColor", 
        "styles.textColor", 
        "styles.subtitleColor", 
        "styles.buttonColor", 
        "styles.buttonTextColor", 
        "styles.buttonHoverColor",
        "styles.borderRadius"
      ]
    },
    {
      id: "layout",
      title: "Layout",
      fields: ["styles.padding", "styles.titleFontSize", "styles.subtitleFontSize"]
    }
  ]
}

export const hero_banner_1 = {
  id: "hero_banner_1",
  title: "Standard Hero Banner",
  html: `
<div class="hero-banner">
  <div class="hero-content">
    <h1 class="hero-title">{{title}}</h1>
    <p class="hero-subtitle">{{subtitle}}</p>
    {{#if buttonText}}
      <a href="{{buttonUrl}}" class="hero-button">{{buttonText}}</a>
    {{/if}}
  </div>
  <div class="hero-image">
    <img src="{{imageUrl}}" alt="{{imageAlt}}">
  </div>
</div>
  `,
  css: `
.hero-banner {
  display: flex;
  align-items: center;
  padding: {{styles.padding}};
  max-width: 1200px;
  margin: 0 auto;
  gap: 40px;
  background-color: {{styles.backgroundColor}};
}

.hero-content {
  flex: 1;
}

.hero-title {
  font-size: {{styles.titleFontSize}};
  margin-bottom: 16px;
  color: {{styles.textColor}};
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
}

.hero-subtitle {
  font-size: {{styles.subtitleFontSize}};
  margin-bottom: 32px;
  color: {{styles.subtitleColor}};
  line-height: 1.5;
}

.hero-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: {{styles.buttonColor}};
  color: {{styles.buttonTextColor}};
  text-decoration: none;
  border-radius: {{styles.borderRadius}};
  font-weight: 500;
  transition: background-color 0.3s;
}

.hero-button:hover {
  background-color: {{styles.buttonHoverColor}};
}

.hero-image {
  flex: 1;
}

.hero-image img {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: {{styles.borderRadius}};
}

@media (max-width: 768px) {
  .hero-banner {
    flex-direction: column-reverse;
    padding: 40px 20px;
  }

  .hero-title {
    font-size: calc({{styles.titleFontSize}} * 0.75);
  }

  .hero-subtitle {
    font-size: calc({{styles.subtitleFontSize}} * 0.9);
  }
}
  `,
  metadata: {
    id: "hero_banner_1",
    templateId: "hero_banner_1",
    thumbnail: "/assets/svg/hero_banner.svg",
    ...defaultMetadata,
  }
}

// ==============================================
// TEMPLATE 2: CENTERED HERO BANNER
// ==============================================

export const hero_banner_2 = {
  id: "hero_banner_2",
  title: "Centered Hero Banner with Overlay",
  html: `
<div class="hero-banner-centered">
  <div class="overlay"></div>
  <div class="hero-content">
    <h1 class="hero-title">{{title}}</h1>
    <p class="hero-subtitle">{{subtitle}}</p>
    {{#if buttonText}}
      <a href="{{buttonUrl}}" class="hero-button">{{buttonText}}</a>
    {{/if}}
  </div>
</div>
  `,
  css: `
.hero-banner-centered {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: {{styles.padding}};
  background-image: url({{imageUrl}});
  background-size: cover;
  background-position: center;
  text-align: center;
  min-height: 500px;
  overflow: hidden;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 30px;
  border-radius: {{styles.borderRadius}};
  background-color: rgba(255, 255, 255, 0.85);
}

.hero-title {
  font-size: {{styles.titleFontSize}};
  margin-bottom: 16px;
  color: {{styles.textColor}};
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
}

.hero-subtitle {
  font-size: {{styles.subtitleFontSize}};
  margin-bottom: 32px;
  color: {{styles.subtitleColor}};
  line-height: 1.5;
}

.hero-button {
  display: inline-block;
  padding: 12px 32px;
  background-color: {{styles.buttonColor}};
  color: {{styles.buttonTextColor}};
  text-decoration: none;
  border-radius: {{styles.borderRadius}};
  font-weight: 500;
  transition: all 0.3s;
  border: 2px solid {{styles.buttonColor}};
}

.hero-button:hover {
  background-color: {{styles.buttonHoverColor}};
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

@media (max-width: 768px) {
  .hero-banner-centered {
    min-height: 400px;
  }

  .hero-content {
    padding: 20px;
    max-width: 90%;
  }

  .hero-title {
    font-size: calc({{styles.titleFontSize}} * 0.75);
  }

  .hero-subtitle {
    font-size: calc({{styles.subtitleFontSize}} * 0.9);
    margin-bottom: 24px;
  }
}`,
  metadata: {
    id: "hero_banner_2",
    templateId: "hero_banner_2",
    thumbnail: "/assets/svg/hero_banner_centered.svg",
    ...defaultMetadata,
  }
}