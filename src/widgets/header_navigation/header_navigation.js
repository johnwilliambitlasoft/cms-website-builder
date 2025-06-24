import { Categories } from "grapesjs"

export const header_navigation_default_data_type = {
  logoUrl: "url",
  links: [
    {
      text: "string",
      url: "url"
    }
  ]
}

export const header_navigation_default_data = {
  logoUrl: "https://example.com/logo.png",
  links: [
    {
      text: "Home",
      url: "/"
    },
    {
      text: "About Us",
      url: "/about"
    },
    {
      text: "Contact",
      url: "/contact"
    }
  ]
}

export const header_navigation_1 = {
  id: "header_navigation_1",
  title: "Header Navigation",
  html: `
<div class="header-navigation">
  <div class="logo">
    <a href="/"><img src="{{logoUrl}}" alt="Logo"></a>
  </div>
  <ul class="nav-links">
    {{#each links}}
      <li><a href="{{url}}">{{text}}</a></li>
    {{/each}}
  </ul>
</div>
  `,
  css: `
.header-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 40px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header-navigation .logo img {
  height: 40px;
}

.header-navigation .nav-links {
  list-style: none;
  display: flex;
  gap: 20px;
}

.header-navigation .nav-links li {
  display: inline;
}

.header-navigation .nav-links a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
}

.header-navigation .nav-links a:hover {
  color: #0070f3;
}

@media (max-width: 768px) {
  .header-navigation {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-navigation .nav-links {
    flex-direction: column;
    gap: 10px;
  }
}`,
  metadata: {
    id: "header_navigation_1",
    category: "header_navigation",
    title: "Header Navigation",
    thumbnail: "/assets/svg/header_navigation.svg",
    description: "A customizable header navigation bar with logo and links.",
  }
}
