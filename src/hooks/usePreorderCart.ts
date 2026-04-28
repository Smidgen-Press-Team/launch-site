import { PRODUCT_CONFIG } from '@/config/products';
import { useCart } from '@shopify/hydrogen-react';
import { useState, useCallback } from 'react';
import type { ProductVariant } from '@/types/shopify';

export function usePreorderCart(prices: Record<string, ProductVariant>) {
  const { linesAdd, cartAttributesUpdate } = useCart();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [acknowledgmentName, setAcknowledgmentName] = useState('');
  const [selectedEbook, setSelectedEbook] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleQtyChange = useCallback((id: string, qty: number) => {
    setQuantities(prev => ({ ...prev, [id]: qty }));
  }, []);

  const addToCart = useCallback((format: 'sewn' | 'hardcover' | 'paperback' | 'ebooks') => {
    const linesToUpdate: Array<{
      merchandiseId: string;
      quantity: number;
    }> = [];

    if (format === 'ebooks') {
      const ebook = PRODUCT_CONFIG.ebooks.find(e => e.vol === selectedEbook);
      const variant = ebook ? prices[ebook.id] : null;
      if (variant && !variant.id.startsWith('fallback-')) {
        linesToUpdate.push({ merchandiseId: variant.id, quantity: 1 });
      } else {
        console.warn('No valid variant found for ebook:', selectedEbook);
      }
    } else {
      PRODUCT_CONFIG[format].forEach(product => {
        const qty = quantities[product.id] || 0;
        const variant = prices[product.id];

        if (qty > 0) {
          if (variant && !variant.id.startsWith('fallback-')) {
            linesToUpdate.push({
              merchandiseId: variant.id,
              quantity: qty
            });
          } else {
            console.warn(`No valid variant found for product ${product.id}.`);
          }
        }
      });
    }

    if (linesToUpdate.length > 0) {
      linesAdd(linesToUpdate);
      if (acknowledgmentName) {
        cartAttributesUpdate([{ key: 'Acknowledgment Name', value: acknowledgmentName }]);
      }
      setIsCartOpen(true);
    } else {
      alert('Please select at least one book');
    }
  }, [prices, quantities, selectedEbook, acknowledgmentName, linesAdd, cartAttributesUpdate]);

  return {
    quantities,
    handleQtyChange,
    acknowledgmentName,
    setAcknowledgmentName,
    selectedEbook,
    setSelectedEbook,
    isCartOpen,
    setIsCartOpen,
    addToCart
  };
}
