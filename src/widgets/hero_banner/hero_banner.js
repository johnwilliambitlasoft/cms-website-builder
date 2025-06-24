export const hero_banner_1_default_data_type = {
  title: "string",
  subtitle: "string",
  buttonText: "string",
  buttonUrl: "url",
  imageUrl: "url",
  imageAlt: "url"
  
}

export const hero_banner_1_default_data = {
  title: "Welcome to Our Website",
  subtitle: "Discover amazing content and features",
  buttonText: "Get Started",
  buttonUrl: "/get-started",
  imageUrl: "https://example.com/hero-image.jpg",
  imageAlt: "Hero Image"
}

export const hero_banner_1 = {
  id: "hero_banner_1",
  title: "Hero Banner",
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
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
  gap: 40px;
}

.hero-content {
  flex: 1;
}

.hero-title {
  font-size: 48px;
  margin-bottom: 16px;
  color: #222;
  font-family: 'DM Sans', sans-serif;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 20px;
  margin-bottom: 32px;
  color: #666;
  line-height: 1.5;
}

.hero-button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #0070f3;
  color: #fff;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.hero-button:hover {
  background-color: #0051cc;
}

.hero-image {
  flex: 1;
}

.hero-image img {
  max-width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .hero-banner {
    flex-direction: column-reverse;
    padding: 40px 20px;
  }

  .hero-title {
    font-size: 36px;
  }

  .hero-subtitle {
    font-size: 18px;
  }
}
  `,
  metadata: {
    id: "hero_banner_1",
    category: "hero_banner",
    title: "Hero Banner",
    thumbnail: "/assets/svg/hero_banner.svg",
    description: "A customizable hero banner with title, subtitle, and call-to-action button.",
  }
}