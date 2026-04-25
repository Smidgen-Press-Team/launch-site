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
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: ProductVariant & {
    product: Pick<Product, 'title' | 'handle'>;
  };
  cost: {
    totalAmount: MoneyV2;
  };
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
