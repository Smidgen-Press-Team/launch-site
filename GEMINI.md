# Gemini CLI Project

This project is a React-based storefront for Smidgen Press, built with Vite and integrated with Shopify Storefront API using `@shopify/hydrogen-react`.

## Technical Stack
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 4
- **Shopify Integration**: @shopify/hydrogen-react
- **Language**: TypeScript

## Conventions
- UI components are located in `src/components/ui`.
- Business logic components are in `src/components`.
- Shopify types are defined in `src/types/shopify.ts`.
- Environment variables for Shopify are prefixed with `VITE_SHOPIFY_`.

## Key Files
- `src/App.tsx`: Main application entry point and cart logic.
- `src/components/BookRow.tsx`: Component for displaying individual book items.
- `src/components/QuantityControl.tsx`: Shared component for quantity adjustments.
