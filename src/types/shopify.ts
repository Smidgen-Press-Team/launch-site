export interface ShopifyAttribute {
  key: string;
  value: string;
}

export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface Image {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: MoneyV2;
  availableForSale: boolean;
  image?: Image;
}

export interface Product {
  id: string;
  title: string;
  handle: string;
  description?: string;
  images: {
    nodes: Image[];
  };
  variants: {
    nodes: ProductVariant[];
  };
  vol_number?: {
    value: string;
  };
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: ProductVariant & {
    product: Pick<Product, 'id' | 'title' | 'handle'>;
  };
  cost: {
    totalAmount: MoneyV2;
  };
  attributes?: ShopifyAttribute[];
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  lines: {
    nodes: CartLine[];
  };
  cost: {
    totalAmount: MoneyV2;
    subtotalAmount: MoneyV2;
  };
}
