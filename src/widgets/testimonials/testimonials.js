/**
 * Testimonials Widget Templates
 * Contains different testimonial layouts:
 * 1. Standard Testimonials Grid (testimonials_1)
 * 2. Testimonials Carousel (testimonials_2)
 */

// ==============================================
// SCHEMA DEFINITION - Common for all templates
// ==============================================

export const testimonials_schema = {
  title: {
    type: "text",
    label: "Section Title",
    description: "Main heading for the testimonials section",
    placeholder: "What Our Customers Say",
    validation: {
      required: true,
      maxLength: 80
    }
  },
  subtitle: {
    type: "textarea",
    label: "Section Subtitle",
    description: "Secondary text below the main heading",
    placeholder: "Read testimonials from our satisfied customers",
    validation: {
      maxLength: 200
    }
  },
  testimonials: {
    type: "array",
    label: "Testimonials",
    description: "List of customer testimonials",
    itemLabel: "Testimonial",
    addItemLabel: "Add Testimonial",
    minItems: 1,
    maxItems: 10,
    defaultNewItem: {
      name: "Customer Name",
      role: "Customer Role",
      quote: "This is a fantastic product that has significantly improved my workflow.",
      rating: 5,
      avatarUrl: "https://example.com/avatar.jpg",
    },
    item: {
      name: {
        type: "text",
        label: "Customer Name",
        validation: {
          required: true,
          maxLength: 50
        }
      },
      role: {
        type: "text",
        label: "Customer Role/Company",
        placeholder: "CEO at Company X",
        validation: {
          maxLength: 50
        }
      },
      quote: {
        type: "textarea",
        label: "Testimonial Quote",
        validation: {
          required: true,
          maxLength: 300
        }
      },
      rating: {
        type: "number",
        label: "Rating (1-5)",
        min: 1,
        max: 5,
        step: 1,
        validation: {
          required: true
        }
      },
      avatarUrl: {
        type: "image",
        label: "Customer Avatar",
        description: "Profile image of the customer",
        placeholder: "https://example.com/avatar.jpg"
      }
    }
  },
  showRatings: {
    type: "boolean",
    label: "Show Ratings",
    description: "Display customer ratings as stars"
  }
}

// ==============================================
// DEFAULT DATA - Common for all templates
// ==============================================

export const testimonials_default_data = {
  title: "What Our Customers Say",
  subtitle: "Read genuine testimonials from our satisfied customers worldwide",
  showRatings: true,
  testimonials: [
    {
      name: "John Smith",
      role: "CEO at TechCorp",
      quote: "This product has transformed how our company operates. The ease of use and powerful features make it a must-have for any business looking to grow.",
      rating: 5,
      avatarUrl: "https://example.com/avatar1.jpg"
    },
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      quote: "I've tried many similar solutions, but none compare to this. The customer support is exceptional, and the platform is intuitive yet powerful.",
      rating: 4,
      avatarUrl: "https://example.com/avatar2.jpg"
    },
    {
      name: "Michael Wong",
      role: "Freelance Designer",
      quote: "As a freelancer, I need tools that are reliable and efficient. This product has saved me countless hours and helped me deliver better results to my clients.",
      rating: 5,
      avatarUrl: "https://example.com/avatar3.jpg"
    }
  ],
  styles: {
    backgroundColor: "#f9f9f9",
    textColor: "#333333",
    accentColor: "#0070f3",
    cardBackgroundColor: "#ffffff",
    cardBorderRadius: "8px",
    cardPadding: "24px",
    titleFontSize: "36px",
    subtitleFontSize: "18px",
    quoteColor: "#555555",
    starColor: "#FFD700",
    spacing: "24px"
  }
}

// ==============================================
// METADATA - Common for all templates
// ==============================================

const defaultMetadata = {
  folder: "testimonials",
  title: "Testimonials",
  description: "Display customer testimonials and reviews",
  editorSchema: "testimonials_schema",
  customizableSections: [
    {
      id: "content",
      title: "Content",
      fields: ["title", "subtitle", "testimonials", "showRatings"]
    },
    {
      id: "appearance",
      title: "Appearance",
      fields: [
        "styles.backgroundColor", 
        "styles.textColor", 
        "styles.accentColor", 
        "styles.cardBackgroundColor", 
        "styles.quoteColor",
        "styles.starColor"
      ]
    },
    {
      id: "layout",
      title: "Layout",
      fields: [
        "styles.cardBorderRadius", 
        "styles.cardPadding", 
        "styles.titleFontSize", 
        "styles.subtitleFontSize",
        "styles.spacing"
      ]
    }
  ]
}

// ==============================================
// TEMPLATE 1: TESTIMONIALS GRID
// ==============================================

export const testimonials_1 = {
  id: "testimonials_1",
  title: "Testimonials Grid",
  html: `
<section class="testimonials-grid">
  <div class="testimonials-header">
    <h2 class="testimonials-title">{{title}}</h2>
    {{#if subtitle}}
      <p class="testimonials-subtitle">{{subtitle}}</p>
    {{/if}}
  </div>
  
  <div class="testimonials-container">
    {{#each testimonials}}
      <div class="testimonial-card">
        <div class="testimonial-content">
          <div class="quote-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
            </svg>
          </div>
          <p class="quote-text">{{quote}}</p>
          
          {{#if ../showRatings}}
            <div class="rating">
              {{#times rating}}
                <span class="star">★</span>
              {{/times}}
              {{#times (subtract 5 rating)}}
                <span class="star unfilled">★</span>
              {{/times}}
            </div>
          {{/if}}
        </div>
        
        <div class="testimonial-author">
          {{#if avatarUrl}}
            <div class="author-avatar">
              <img src="{{avatarUrl}}" alt="{{name}}">
            </div>
          {{/if}}
          <div class="author-info">
            <h3 class="author-name">{{name}}</h3>
            {{#if role}}
              <p class="author-role">{{role}}</p>
            {{/if}}
          </div>
        </div>
      </div>
    {{/each}}
  </div>
</section>
  `,
  css: `
.testimonials-grid {
  padding: 60px 20px;
  background-color: {{styles.backgroundColor}};
  color: {{styles.textColor}};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.testimonials-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px;
}

.testimonials-title {
  font-size: {{styles.titleFontSize}};
  margin-bottom: 16px;
  color: {{styles.textColor}};
  font-weight: 700;
}

.testimonials-subtitle {
  font-size: {{styles.subtitleFontSize}};
  color: {{styles.textColor}}cc;
  line-height: 1.5;
}

.testimonials-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: {{styles.spacing}};
  max-width: 1200px;
  margin: 0 auto;
}

.testimonial-card {
  background-color: {{styles.cardBackgroundColor}};
  border-radius: {{styles.cardBorderRadius}};
  padding: {{styles.cardPadding}};
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.testimonial-content {
  flex: 1;
  margin-bottom: 20px;
  position: relative;
}

.quote-icon {
  color: {{styles.accentColor}}30;
  margin-bottom: 16px;
}

.quote-text {
  color: {{styles.quoteColor}};
  line-height: 1.6;
  font-size: 16px;
  margin-bottom: 20px;
}

.rating {
  margin-top: auto;
}

.star {
  color: {{styles.starColor}};
  font-size: 18px;
  margin-right: 2px;
}

.star.unfilled {
  color: {{styles.starColor}}40;
}

.testimonial-author {
  display: flex;
  align-items: center;
  border-top: 1px solid {{styles.backgroundColor}};
  padding-top: 16px;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 12px;
  flex-shrink: 0;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-name {
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px;
  color: {{styles.textColor}};
}

.author-role {
  font-size: 14px;
  color: {{styles.textColor}}99;
  margin: 0;
}

@media (max-width: 768px) {
  .testimonials-container {
    grid-template-columns: 1fr;
  }
  
  .testimonials-title {
    font-size: calc({{styles.titleFontSize}} * 0.8);
  }
  
  .testimonials-subtitle {
    font-size: calc({{styles.subtitleFontSize}} * 0.9);
  }
}`,
  metadata: {
    id: "testimonials_1",
    templateId: "testimonials_1",
    thumbnail: "/assets/svg/testimonials_grid.svg",
    ...defaultMetadata,
  }
}

// ==============================================
// TEMPLATE 2: TESTIMONIALS CAROUSEL
// ==============================================

export const testimonials_2 = {
  id: "testimonials_2",
  title: "Testimonials Carousel",
  html: `
<section class="testimonials-carousel">
  <div class="testimonials-header">
    <h2 class="testimonials-title">{{title}}</h2>
    {{#if subtitle}}
      <p class="testimonials-subtitle">{{subtitle}}</p>
    {{/if}}
  </div>
  
  <div class="carousel-container">
    <div class="carousel-track">
      {{#each testimonials}}
        <div class="carousel-slide">
          <div class="testimonial-card">
            {{#if avatarUrl}}
              <div class="author-avatar">
                <img src="{{avatarUrl}}" alt="{{name}}">
              </div>
            {{/if}}
            
            {{#if ../showRatings}}
              <div class="rating">
                {{#times rating}}
                  <span class="star">★</span>
                {{/times}}
                {{#times (subtract 5 rating)}}
                  <span class="star unfilled">★</span>
                {{/times}}
              </div>
            {{/if}}
            
            <p class="quote-text">"{{quote}}"</p>
            
            <div class="author-info">
              <h3 class="author-name">{{name}}</h3>
              {{#if role}}
                <p class="author-role">{{role}}</p>
              {{/if}}
            </div>
          </div>
        </div>
      {{/each}}
    </div>
    
    <div class="carousel-nav">
      <button class="carousel-prev" aria-label="Previous testimonial">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <button class="carousel-next" aria-label="Next testimonial">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  </div>
</section>
  `,
  css: `
.testimonials-carousel {
  padding: 60px 20px;
  background-color: {{styles.backgroundColor}};
  color: {{styles.textColor}};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.testimonials-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 40px;
}

.testimonials-title {
  font-size: {{styles.titleFontSize}};
  margin-bottom: 16px;
  color: {{styles.textColor}};
  font-weight: 700;
}

.testimonials-subtitle {
  font-size: {{styles.subtitleFontSize}};
  color: {{styles.textColor}}cc;
  line-height: 1.5;
}

.carousel-container {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease;
}

.carousel-slide {
  min-width: 100%;
  padding: 0 20px;
}

.testimonial-card {
  background-color: {{styles.cardBackgroundColor}};
  border-radius: {{styles.cardBorderRadius}};
  padding: {{styles.cardPadding}};
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  text-align: center;
}

.author-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 20px;
  border: 3px solid {{styles.accentColor}};
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.rating {
  margin-bottom: 20px;
}

.star {
  color: {{styles.starColor}};
  font-size: 22px;
  margin: 0 2px;
}

.star.unfilled {
  color: {{styles.starColor}}40;
}

.quote-text {
  color: {{styles.quoteColor}};
  line-height: 1.8;
  font-size: 18px;
  margin-bottom: 30px;
  position: relative;
  font-style: italic;
}

.author-info {
  margin-top: 20px;
}

.author-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px;
  color: {{styles.textColor}};
}

.author-role {
  font-size: 14px;
  color: {{styles.textColor}}99;
  margin: 0;
}

.carousel-nav {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 20px;
}

.carousel-prev,
.carousel-next {
  background-color: transparent;
  border: 2px solid {{styles.accentColor}};
  color: {{styles.accentColor}};
  border-radius: 50%;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.carousel-prev:hover,
.carousel-next:hover {
  background-color: {{styles.accentColor}};
  color: white;
}

@media (max-width: 768px) {
  .testimonials-title {
    font-size: calc({{styles.titleFontSize}} * 0.8);
  }
  
  .testimonials-subtitle {
    font-size: calc({{styles.subtitleFontSize}} * 0.9);
  }
  
  .quote-text {
    font-size: 16px;
  }
}

/* Simple carousel functionality */
.carousel-track {
  /* Start with the first slide */
  transform: translateX(0);
}
`,
  metadata: {
    id: "testimonials_2",
    templateId: "testimonials_2",
    thumbnail: "/assets/svg/testimonials_carousel.svg",
    ...defaultMetadata,
  }
}
