import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ShopifyProvider, CartProvider } from '@shopify/hydrogen-react'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ShopifyProvider
      storeDomain={import.meta.env.VITE_SHOPIFY_STORE_DOMAIN}
      storefrontToken={import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN}
      storefrontApiVersion={import.meta.env.VITE_SHOPIFY_STOREFRONT_API_VERSION}
      countryIsoCode="US"
      languageIsoCode="EN"
    >
      <CartProvider>
        <App />
      </CartProvider>
    </ShopifyProvider>
  </StrictMode>,
)
