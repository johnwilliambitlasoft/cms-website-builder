/**
 * Features Widget Templates
 * Contains different feature section layouts:
 * 1. Features Grid (features_1)
 * 2. Features with Icons (features_2)
 */

// ==============================================
// SCHEMA DEFINITION - Common for all templates
// ==============================================

export const features_schema = {
  title: {
    type: "text",
    label: "Section Title",
    description: "Main heading for the features section",
    placeholder: "Our Features",
    validation: {
      required: true,
      maxLength: 80
    }
  },
  subtitle: {
    type: "textarea",
    label: "Section Subtitle",
    description: "Secondary text below the main heading",
    placeholder: "Discover what makes our product great",
    validation: {
      maxLength: 200
    }
  },
  features: {
    type: "array",
    label: "Features",
    description: "List of product/service features",
    itemLabel: "Feature",
    addItemLabel: "Add Feature",
    minItems: 1,
    maxItems: 12,
    defaultNewItem: {
      title: "Feature Title",
      description: "Brief description of this feature and its benefits",
      iconName: "star",
      imageUrl: "",
    },
    item: {
      title: {
        type: "text",
        label: "Feature Title",
        validation: {
          required: true,
          maxLength: 50
        }
      },
      description: {
        type: "textarea",
        label: "Feature Description",
        validation: {
          required: true,
          maxLength: 200
        }
      },
      iconName: {
        type: "select",
        label: "Icon Name",
        options: [
          { value: "star", label: "Star" },
          { value: "check", label: "Check" },
          { value: "bell", label: "Bell" },
          { value: "shield", label: "Shield" },
          { value: "zap", label: "Lightning" },
          { value: "box", label: "Box" },
          { value: "globe", label: "Globe" },
          { value: "clock", label: "Clock" },
          { value: "heart", label: "Heart" },
          { value: "mail", label: "Mail" },
          { value: "users", label: "Users" },
          { value: "tool", label: "Tool" },
        ],
        description: "Icon to display with this feature"
      },
      imageUrl: {
        type: "image",
        label: "Feature Image",
        description: "Optional image to display with this feature",
        placeholder: "https://example.com/feature-image.jpg"
      }
    }
  },
  layout: {
    type: "select",
    label: "Grid Layout",
    options: [
      { value: "2", label: "2 columns" },
      { value: "3", label: "3 columns" },
      { value: "4", label: "4 columns" }
    ],
    description: "Number of columns in the feature grid"
  }
}

// ==============================================
// DEFAULT DATA - Common for all templates
// ==============================================

export const features_default_data = {
  title: "Our Key Features",
  subtitle: "Discover what makes our product stand out from the competition",
  layout: "3",
  features: [
    {
      title: "Easy to Use",
      description: "Intuitive interface designed for users of all skill levels, no training required.",
      iconName: "zap",
      imageUrl: ""
    },
    {
      title: "Secure & Reliable",
      description: "Bank-level security with 99.9% uptime guarantee to keep your data safe and accessible.",
      iconName: "shield",
      imageUrl: ""
    },
    {
      title: "24/7 Support",
      description: "Our dedicated support team is available around the clock to assist you with any questions.",
      iconName: "users",
      imageUrl: ""
    },
    {
      title: "Regular Updates",
      description: "Continuous improvements and new features added regularly based on customer feedback.",
      iconName: "refresh",
      imageUrl: ""
    },
    {
      title: "Integration Ready",
      description: "Seamlessly connects with your existing tools and software ecosystem.",
      iconName: "box",
      imageUrl: ""
    },
    {
      title: "Data Analytics",
      description: "Powerful insights and reporting to help you make data-driven decisions.",
      iconName: "bar-chart",
      imageUrl: ""
    }
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
    spacing: "24px"
  }
}

// ==============================================
// METADATA - Common for all templates
// ==============================================

const defaultMetadata = {
  folder: "features",
  title: "Features Section",
  description: "Display product or service features in various layouts",
  editorSchema: "features_schema",
  customizableSections: [
    {
      id: "content",
      title: "Content",
      fields: ["title", "subtitle", "features", "layout"]
    },
    {
      id: "appearance",
      title: "Appearance",
      fields: [
        "styles.backgroundColor", 
        "styles.textColor", 
        "styles.accentColor", 
        "styles.iconColor", 
        "styles.titleColor",
        "styles.cardBackgroundColor"
      ]
    },
    {
      id: "layout",
      title: "Layout",
      fields: [
        "styles.cardBorderRadius", 
        "styles.cardPadding", 
        "styles.sectionPadding",
        "styles.titleFontSize", 
        "styles.subtitleFontSize",
        "styles.featureTitleFontSize",
        "styles.iconSize",
        "styles.spacing"
      ]
    }
  ]
}

// ==============================================
// TEMPLATE 1: FEATURES GRID
// ==============================================

export const features_1 = {
  id: "features_1",
  title: "Features Grid",
  html: `
<section class="features-grid">
  <div class="features-header">
    <h2 class="features-title">{{title}}</h2>
    {{#if subtitle}}
      <p class="features-subtitle">{{subtitle}}</p>
    {{/if}}
  </div>
  
  <div class="features-container grid-{{layout}}">
    {{#each features}}
      <div class="feature-card">
        <div class="feature-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            {{#if (eq iconName "star")}}
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            {{else if (eq iconName "check")}}
              <polyline points="20 6 9 17 4 12"></polyline>
            {{else if (eq iconName "bell")}}
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            {{else if (eq iconName "shield")}}
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            {{else if (eq iconName "zap")}}
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            {{else if (eq iconName "box")}}
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            {{else if (eq iconName "globe")}}
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="2" y1="12" x2="22" y2="12"></line>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            {{else if (eq iconName "clock")}}
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            {{else if (eq iconName "heart")}}
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            {{else if (eq iconName "mail")}}
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
              <polyline points="22,6 12,13 2,6"></polyline>
            {{else if (eq iconName "users")}}
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            {{else if (eq iconName "tool")}}
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            {{else}}
              <circle cx="12" cy="12" r="10"></circle>
            {{/if}}
          </svg>
        </div>
        
        {{#if imageUrl}}
          <div class="feature-image">
            <img src="{{imageUrl}}" alt="{{title}}">
          </div>
        {{/if}}
        
        <h3 class="feature-title">{{title}}</h3>
        <p class="feature-description">{{description}}</p>
      </div>
    {{/each}}
  </div>
</section>
  `,
  css: `
.features-grid {
  padding: {{styles.sectionPadding}};
  background-color: {{styles.backgroundColor}};
  color: {{styles.textColor}};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.features-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
}

.features-title {
  font-size: {{styles.titleFontSize}};
  margin-bottom: 16px;
  color: {{styles.titleColor}};
  font-weight: 700;
}

.features-subtitle {
  font-size: {{styles.subtitleFontSize}};
  color: {{styles.textColor}}cc;
  line-height: 1.5;
}

.features-container {
  display: grid;
  gap: {{styles.spacing}};
  max-width: 1200px;
  margin: 0 auto;
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

.feature-card {
  background-color: {{styles.cardBackgroundColor}};
  border-radius: {{styles.cardBorderRadius}};
  padding: {{styles.cardPadding}};
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}

.feature-icon {
  color: {{styles.iconColor}};
  margin-bottom: 16px;
  height: {{styles.iconSize}};
  width: {{styles.iconSize}};
  display: flex;
  align-items: center;
  justify-content: center;
}

.feature-icon svg {
  width: 100%;
  height: 100%;
}

.feature-image {
  margin-bottom: 16px;
}

.feature-image img {
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}

.feature-title {
  font-size: {{styles.featureTitleFontSize}};
  margin: 0 0 12px;
  color: {{styles.titleColor}};
  font-weight: 600;
}

.feature-description {
  color: {{styles.textColor}};
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 992px) {
  .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
  
  .features-title {
    font-size: calc({{styles.titleFontSize}} * 0.8);
  }
  
  .features-subtitle {
    font-size: calc({{styles.subtitleFontSize}} * 0.9);
  }
}

@media (max-width: 480px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
}`,
  metadata: {
    id: "features_1",
    templateId: "features_1",
    thumbnail: "/assets/svg/features_grid.svg",
    ...defaultMetadata,
  }
}

// ==============================================
// TEMPLATE 2: FEATURES WITH ICONS ALTERNATING
// ==============================================

export const features_2 = {
  id: "features_2",
  title: "Features with Icons Alternating",
  html: `
<section class="features-alternating">
  <div class="features-header">
    <h2 class="features-title">{{title}}</h2>
    {{#if subtitle}}
      <p class="features-subtitle">{{subtitle}}</p>
    {{/if}}
  </div>
  
  <div class="features-list">
    {{#each features}}
      <div class="feature-item {{#if (isOdd @index)}}feature-right{{else}}feature-left{{/if}}">
        <div class="feature-content">
          <div class="feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              {{#if (eq iconName "star")}}
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              {{else if (eq iconName "check")}}
                <polyline points="20 6 9 17 4 12"></polyline>
              {{else if (eq iconName "bell")}}
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              {{else if (eq iconName "shield")}}
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              {{else if (eq iconName "zap")}}
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              {{else if (eq iconName "box")}}
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              {{else if (eq iconName "globe")}}
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              {{else}}
                <circle cx="12" cy="12" r="10"></circle>
              {{/if}}
            </svg>
          </div>
          <h3 class="feature-title">{{title}}</h3>
          <p class="feature-description">{{description}}</p>
        </div>
        
        <div class="feature-media">
          {{#if imageUrl}}
            <img src="{{imageUrl}}" alt="{{title}}" class="feature-image">
          {{else}}
            <div class="feature-placeholder" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                {{#if (eq iconName "star")}}
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                {{else if (eq iconName "check")}}
                  <polyline points="20 6 9 17 4 12"></polyline>
                {{else if (eq iconName "bell")}}
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                {{else if (eq iconName "shield")}}
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                {{else if (eq iconName "zap")}}
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                {{else if (eq iconName "box")}}
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                {{else if (eq iconName "globe")}}
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="2" y1="12" x2="22" y2="12"></line>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                {{else}}
                  <circle cx="12" cy="12" r="10"></circle>
                {{/if}}
              </svg>
            </div>
          {{/if}}
        </div>
      </div>
    {{/each}}
  </div>
</section>
  `,
  css: `
.features-alternating {
  padding: {{styles.sectionPadding}};
  background-color: {{styles.backgroundColor}};
  color: {{styles.textColor}};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.features-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
}

.features-title {
  font-size: {{styles.titleFontSize}};
  margin-bottom: 16px;
  color: {{styles.titleColor}};
  font-weight: 700;
}

.features-subtitle {
  font-size: {{styles.subtitleFontSize}};
  color: {{styles.textColor}}cc;
  line-height: 1.5;
}

.features-list {
  max-width: 1200px;
  margin: 0 auto;
}

.feature-item {
  display: flex;
  align-items: center;
  margin-bottom: 80px;
  gap: {{styles.spacing}};
}

.feature-item:last-child {
  margin-bottom: 0;
}

.feature-left {
  flex-direction: row;
}

.feature-right {
  flex-direction: row-reverse;
}

.feature-content {
  flex: 1;
}

.feature-media {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.feature-icon {
  color: {{styles.iconColor}};
  margin-bottom: 16px;
  height: {{styles.iconSize}};
  width: {{styles.iconSize}};
  display: flex;
  align-items: center;
  justify-content: center;
  background: {{styles.accentColor}}15;
  border-radius: 50%;
  padding: 10px;
}

.feature-icon svg {
  width: 60%;
  height: 60%;
}

.feature-title {
  font-size: {{styles.featureTitleFontSize}};
  margin: 0 0 12px;
  color: {{styles.titleColor}};
  font-weight: 600;
}

.feature-description {
  color: {{styles.textColor}};
  line-height: 1.6;
  margin: 0;
  font-size: 16px;
}

.feature-image {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.feature-placeholder {
  width: 100%;
  height: 200px;
  background-color: {{styles.cardBackgroundColor}};
  border-radius: {{styles.cardBorderRadius}};
  display: flex;
  align-items: center;
  justify-content: center;
  color: {{styles.iconColor}}40;
}

.feature-placeholder svg {
  width: 80px;
  height: 80px;
}

@media (max-width: 768px) {
  .feature-item {
    flex-direction: column;
    margin-bottom: 40px;
  }
  
  .feature-media {
    order: -1;
    margin-bottom: 20px;
  }
  
  .features-title {
    font-size: calc({{styles.titleFontSize}} * 0.8);
  }
  
  .features-subtitle {
    font-size: calc({{styles.subtitleFontSize}} * 0.9);
  }
}`,
  metadata: {
    id: "features_2",
    templateId: "features_2",
    thumbnail: "/assets/svg/features_alternating.svg",
    ...defaultMetadata,
  }
}
