# CMS Website Builder

This is a Next.js project with Redux Toolkit integration and clean code architecture.

## Project Architecture

This project follows a clean code architecture with the following structure:

```
src/
├── app/                  # Next.js app router pages
├── components/           # Reusable UI components
├── features/             # Feature-specific components and logic
├── lib/                  # Libraries and configurations
│   └── redux/            # Redux setup and configuration
│       ├── hooks/        # Custom Redux hooks
│       ├── slices/       # Redux slices with reducers and actions
│       ├── provider.js   # Redux provider component
│       └── store.js      # Redux store configuration
├── services/             # API and other external services
└── utils/                # Utility functions and helpers
```

## Redux Implementation

The project uses Redux Toolkit for state management with the following features:
- Centralized store configuration
- Slice-based state management
- Async thunks for API calls
- Custom hooks for simplified Redux usage

## Getting Started

First, run the development server:

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# cms-website-builder
