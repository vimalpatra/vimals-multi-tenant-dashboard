# Multi-Tenant Dashboard

This is a Next js app for multi-tenant accounts having a scalable architecture with dynamic feature loading.

## Architecture

This project is built with NEXT, leveraging its App Router for routing and server-side rendering and other capabilities.

- **App Router (`app/`)**: Handles routing and layout for different parts of the application, including the dynamic tenant routes (`app/[tenant]`).
- **Middleware (`middleware.js`)**: Manages tenant identification, authentication and route guards based on the path and JWT.
- **API Routes (`app/api/`)**: Provides backend endpoints for login and logout functionality.
- **Shared Components (`shared/components/`)**: Reusable UI components used across different features and layouts (e.g., `LoginForm`, `FeatureCard`, `TenantHeader`).
- **Shared UI (`shared/ui/`)**: Reusanle Generic UI library for elements like `Button`, `Input`, `Select`, `Toast`, and `Skeleton Loader`.
- **Shared Features (`shared/features/`)**: Individual feature components designed to be loaded dynamically like charts, notifications, billing etc. (If some feature isn't available it shows coming soon).
- **Lib (`lib/`)**: Utility functions and constants (e.g., JWT handling, cookies, core constants).
- **Locales (`shared/locales/`)**: JSON files for managing user-facing text strings, enabling internationalization possibilities.
- **Config (`config.json`)**: Centralized configuration file defining tenants and their enabled features.

## How to Run the Project

**Prerequisites:**

- Node.js (v18 or higher)
- npm or yarn

**Setup:**

1.  Clone the repo
2.  Install dependencies:
    ```
    npm install
    # or yarn install
    ```
3.  Create a `.env.local` file in the project root for environment variables. Add your JWT secret key:
    ```env
    JWT_SECRET=YOUR_SECURE_RANDOM_KEY (Replace `YOUR_SECURE_RANDOM_KEY` with a unique string)
    ```
4.  Run the development server:
    ```bash
    npm run dev
    # or yarn dev
    ```
5.  Open `[http://localhost:3000]` in your browser or live preview at (https://vimals-multi-tenant-dashboard.vercel.app/)

6.  Use one of the valid users (hardcoded) for accessing mentioned tenant below,

```
    {
    "milan-corp": { username: "milan", password: "milan123" },
    "vimal-co": { username: "vimal", password: "vimal123" },
    "abc-corp": { username: "admin", password: "admin123" },
    }
```

## Design Decisions

- **Multi-Tenancy**: Tenant-specific data and features are managed via `config.json`. The `middleware.js` extracts the tenant from the URL, and the `app/[tenant]` route structure ensures tenant context is available throughout the application for authenticated users.
- **Authentication**: JWT-based authentication managed via API routes (`/api/login`, `/api/logout`) and secured using HttpOnly cookies handled by the middleware.
- **Internationalization (i18n) Ready**: User-facing strings are externalized in JSON locale files (`shared/locales`), allowing for easy translation and maintenance, ensuring separation from component logic.

## Dynamic Feature Loading per Tenant

Features are loaded dynamically based on the `config.json` file using `next/dynamic`.

- The `config.json` specifies which features are enabled for each tenant.
- The `shared/components/features/FeatureLoader.js` component reads the tenant's enabled features from the config.
- For each enabled feature, `FeatureLoader` uses `dynamic(import(...))` to load the corresponding feature component (`shared/features/*Feature.js`) only when needed.
- A loading state with a `Skeleton` component is displayed while the feature component is being fetched, providing a better user experience. An added loading delay there for visualizing it better.
- If a feature is configured but the component file doesn't exist, or if a tenant has no configured features, fallback components (`FeatureComingSoon` or `NoFeatures`) are displayed. This prevents errors and provides clear feedback to the user.

## Deployment (Vercel)

project is deployed on Vercel, if you want to deploy it as well,

1.  Connect your Git repository to Vercel.
2.  During the setup or in the project settings under "Environment Variables", add `JWT_SECRET` with your unique secret key.
3.  Vercel will automatically build and deploy your application on new commits.

## Made with sweat and tears by Vimal 😇

**Cheers! 🥲**
