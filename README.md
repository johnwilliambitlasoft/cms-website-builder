# CMS Website Builder

This is a Next.js project with Redux Toolkit integration, clean code architecture, and GrapesJS for visual website building.

## Author
**John William**  
Email: JohnWilliam9499@gmail.com

## Project Architecture

This project follows a clean code architecture with the following structure:

```
├── public/                   # Static assets
│   └── assets/               # Images, fonts, and other static files
│       ├── font/             # Custom fonts
│       │   ├── DM_Sans/      # DM Sans font family (18pt, 24pt, 36pt variants)
│       │   ├── Genos/        # Genos font family
│       │   └── test-soehne-dreiviertelfett.woff2
│       └── svg/              # SVG icons and graphics
│           └── index.js      # SVG export file
├── src/
│   ├── app/                  # Next.js app router pages
│   │   ├── favicon.ico       # Site favicon
│   │   ├── globals.css       # Global styles
│   │   ├── layout.js         # Root layout component
│   │   ├── page.js           # Home page component
│   │   └── page.module.css   # Home page styles
│   ├── components/           # Reusable UI components
│   │   ├── Counter.js        # Example counter component
│   │   ├── Counter.module.css # Counter styles
│   │   ├── index.jsx         # Components export file
│   │   ├── header/           # Header components
│   │   │   ├── index.jsx     # Header implementation
│   │   │   └── header.module.css # Header styles
│   │   └── grapesjs/         # GrapesJS editor components
│   │       ├── index.jsx         # Main editor component
│   │       ├── leftSidePanel.jsx # Left panel with pages and blocks
│   │       ├── rightSidePanel.jsx # Right panel with layer manager
│   │       ├── EditorSvg.js      # SVG icons for the editor
│   │       └── grapesjs.css      # Editor-specific styles
│   ├── features/             # Feature-specific components and logic
│   ├── fonts/                # Font configuration
│   │   └── index.js          # Font loading and configuration
│   ├── lib/                  # Libraries and configurations
│   │   └── redux/            # Redux setup and configuration
│   │       ├── provider.js   # Redux provider component
│   │       ├── store.js      # Redux store configuration
│   │       ├── config/       # Redux configuration
│   │       ├── hooks/        # Custom Redux hooks
│   │       ├── init/         # Initialization slices
│   │       └── slices/       # Redux slices with reducers and actions
│   ├── services/             # API and other external services
│   │   └── api/              # API service configurations
│   │       └── axios.Instance.js # Axios instance configuration
│   ├── template/             # Page templates
│   └── utils/                # Utility functions and helpers
│       └── helpers.js        # Helper functions
├── eslint.config.mjs         # ESLint configuration
├── jsconfig.json             # JavaScript configuration
├── next.config.mjs           # Next.js configuration
└── package.json              # Project dependencies and scripts
```

## GrapesJS Integration

The project integrates GrapesJS, a web builder framework, with the following features:
- Device switcher (desktop, tablet, mobile views)
- Page manager for handling multiple pages
- Custom blocks for easy section creation
- Layer manager for rearranging sections and components
- Undo/redo functionality
- Fullscreen and publish options

## Redux Implementation

The project uses Redux Toolkit for state management with the following features:
- Centralized store configuration
- Slice-based state management
- Async thunks for API calls
- Custom hooks for simplified Redux usage

## Font Management

The project implements custom font management with:
- DM Sans (multiple weights and optical sizes)
- Genos font family
- Font loading optimizations

## Requirements

- Node.js version 22.x (Compatible with React 19)
- npm or yarn package manager

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses custom font loading strategy to load DM Sans and Genos font families.

## Features

- **Modern React & Next.js**: Utilizing React 19 and Next.js 15 with app router
- **Visual Website Builder**: GrapesJS integration with custom blocks
- **Multi-page Support**: Create and manage multiple pages with unique content
- **Device Preview**: Test your designs across different device sizes
- **Layer Management**: Rearrange sections and components with the layer manager
- **Redux State Management**: Clean Redux implementation with Redux Toolkit
- **Custom Font System**: Optimized loading of custom fonts

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## License

This project is proprietary software developed by John William.

© 2023-2024 John William. All rights reserved.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# cms-website-builder
