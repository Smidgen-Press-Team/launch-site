import { useState, useEffect, useMemo } from 'react';
import { createStorefrontClient } from '@shopify/hydrogen-react';
import { ALL_PRODUCT_IDS, PRICES_QUERY } from '@/config/products';
import type { ProductVariant, Image } from '@/types/shopify';

interface ShopifyProductNode {
  id: string;
  featuredImage?: Image;
  variants: {
    nodes: ProductVariant[];
  };
}

interface ShopifyPricesResponse {
  data: {
    nodes: (ShopifyProductNode | null)[];
  };
  errors?: any[];
}

export function usePreorderPrices() {
  const [prices, setPrices] = useState<Record<string, ProductVariant>>({});
  const [isLoading, setIsLoading] = useState(true);

  const client = useMemo(() => createStorefrontClient({
    storeDomain: import.meta.env.VITE_SHOPIFY_STORE_DOMAIN,
    publicStorefrontToken: import.meta.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
    storefrontApiVersion: import.meta.env.VITE_SHOPIFY_STOREFRONT_API_VERSION,
  }), []);

  useEffect(() => {
    async function fetchPrices() {
      try {
        console.log('Fetching prices for IDs:', ALL_PRODUCT_IDS);
        const response = await fetch(client.getStorefrontApiUrl(), {
          method: 'POST',
          headers: client.getPublicTokenHeaders(),
          body: JSON.stringify({
            query: PRICES_QUERY,
            variables: { ids: ALL_PRODUCT_IDS },
          }),
        });

        const result = (await response.json()) as ShopifyPricesResponse;
        const { data, errors } = result;

        if (errors) {
          console.error('Shopify API Errors:', errors);
        } else if (data && data.nodes) {
          const priceMap: Record<string, ProductVariant> = {};
          data.nodes.forEach((node) => {
            if (node && node.variants && node.variants.nodes.length > 0) {
              const variant = node.variants.nodes[0];
              // Use product image if variant image is missing
              if (!variant.image && node.featuredImage) {
                variant.image = node.featuredImage;
              }
              priceMap[node.id] = variant;
            }
          });
          setPrices(priceMap);
        }
      } catch (e) {
        console.error('Fetch error:', e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPrices();
  }, [client]);

  const getVariant = (id: string, defaultAmount: string): ProductVariant => {
    const variant = prices[id];
    return variant || {
      id: `fallback-${id}`,
      title: 'Default Variant',
      price: { amount: defaultAmount, currencyCode: 'USD' },
      availableForSale: true
    };
  };

  const getPrice = (id: string, defaultAmount: string) => {
    const variant = prices[id];
    return variant ? variant.price : { amount: defaultAmount, currencyCode: 'USD' };
  };

  return { prices, isLoading, getVariant, getPrice };
}
