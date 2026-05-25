# Smidgen Press Launch Storefront

A React-based storefront for the Smidgen Press Charlotte Mason Home Education Series preorder launch, built with Vite, TypeScript, Tailwind CSS 4, and integrated with the Shopify Storefront API using `@shopify/hydrogen-react`.

---

## 🛠️ Technical Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Shopify Integration**: `@shopify/hydrogen-react` (utilizing `<ShopifyProvider>`, `<CartProvider>`, and hooks like `useCart`)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 📁 Code Structure

The repository follows a clean React + Vite application structure, separated by logical responsibility:

```
├── GEMINI.md                   # Project context and rules
├── README.md                   # Project documentation
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # Tailwind CSS settings (or Vite config plugin)
├── tsconfig.json               # TypeScript configuration
├── public/                     # Static assets
└── src/
    ├── App.css                 # Application-specific styling
    ├── App.tsx                 # Main application entry point, page layout, and cart setup
    ├── index.css               # Global stylesheet importing Tailwind CSS 4 and theme rules
    ├── main.tsx                # React mounting entry point with Shopify context wrappers
    ├── assets/                 # Local images and visual assets (mockups, covers)
    ├── components/             # Business logic & structural components
    │   ├── BookRow.tsx         # Renders individual book details, design selector, and quantity controls
    │   ├── CartDrawer.tsx      # Slide-out cart displaying line items, quantities, and checkout triggers
    │   ├── DeadlineBanner.tsx  # Promotional banner showing shipping deadlines/updates
    │   ├── FAQ.tsx             # Collapsible FAQ section utilizing UI Accordion
    │   ├── Footer.tsx          # Storefront footer and links
    │   ├── Hero.tsx            # Welcome section with background design and quick cart trigger
    │   ├── PerksSection.tsx    # Details the custom features of the series
    │   ├── PreorderSection.tsx # Tabbed interface managing order formats (Sewn, Hardcover, Paperback, etc.)
    │   ├── QuantityControl.tsx # Shared utility for incrementing/decrementing item count
    │   ├── Timeline.tsx        # Visual publication and shipment timeline
    │   └── ui/                 # Reusable UI primitives (styled with Tailwind CSS)
    │       ├── accordion.tsx
    │       ├── badge.tsx
    │       ├── button.tsx
    │       ├── card.tsx
    │       ├── input.tsx
    │       ├── radio-group.tsx
    │       ├── select.tsx
    │       └── tabs.tsx
    ├── config/
    │   └── products.ts         # Static product configurations, option variants, and GraphQL queries
    ├── hooks/
    │   ├── usePreorderCart.ts  # Custom state management hook for preorder cart configuration
    │   └── usePreorderPrices.ts# Custom hook to fetch dynamic pricing from Shopify Storefront API
    ├── lib/
    │   └── utils.ts            # Utility functions (e.g., clsx/tailwind-merge helper)
    └── types/
        └── shopify.ts          # Typings for Shopify nodes, variant data, and custom attributes
```

### Key Components & Logic

- **[App.tsx](file:///Users/michaelmasarik/Documents/GitHub/smidgen-site/src/App.tsx)**: Coordinates all the sections of the site. On mount, it automatically registers the checkout discount codes (e.g., `CMLaunch26Ship`) and manages open/close states for the drawer.
- **[usePreorderCart.ts](file:///Users/michaelmasarik/Documents/GitHub/smidgen-site/src/hooks/usePreorderCart.ts)**: Handles multi-book item configurations, option mapping per volume, and synchronizes the custom Shopify cart attribute `Acknowledgment Name` with a 1-second debounce.
- **[usePreorderPrices.ts](file:///Users/michaelmasarik/Documents/GitHub/smidgen-site/src/hooks/usePreorderPrices.ts)**: Uses the dynamic `PRICES_QUERY` from `config/products.ts` to request live pricing updates for every product in the series directly from the Shopify Storefront API.

---

## ⚙️ Shopify Integration & Environment Setup

To connect the storefront to your Shopify store, create a `.env` file in the root directory with the following variables:

```env
VITE_SHOPIFY_STORE_DOMAIN=your-shopify-store.myshopify.com
VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_public_storefront_token
VITE_SHOPIFY_STOREFRONT_API_VERSION=2026-04 # or your preferred version
```

### Conventions
* UI components are located in `src/components/ui/`
* Business logic components are in `src/components/`
* Shopify types are defined in `src/types/shopify.ts`
* Environment variables for Shopify are prefixed with `VITE_SHOPIFY_`

---

## 🚀 Getting Started

### Installation

```bash
pnpm install
```

### Development Server

Start the local development server with Hot Module Replacement (HMR):

```bash
pnpm run dev
```

### Building for Production

Compile the TypeScript and bundle the application assets:

```bash
pnpm run build
```

Preview the production build locally:

```bash
pnpm run preview
```

Build and release

```bash
make release
```