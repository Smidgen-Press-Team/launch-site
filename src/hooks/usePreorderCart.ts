import { PRODUCT_CONFIG } from "@/config/products";
import type { ProductVariant } from "@/types/shopify";
import { useCart } from "@shopify/hydrogen-react";
import { useCallback, useState } from "react";

export function usePreorderCart(prices: Record<string, ProductVariant>) {
  const { linesAdd, cartAttributesUpdate } = useCart();
  
  // Quantities are now keyed by "format-vol" (e.g. "sewn-1") to persist across design changes
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  
  // Selected Shopify Product ID per volume: keyed by "format-vol"
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    (['sewn', 'hardcover', 'hardcover_dj', 'paperback'] as const).forEach(format => {
      PRODUCT_CONFIG[format].forEach(book => {
        initial[`${format}-${book.vol}`] = book.options[0].id;
      });
    });
    return initial;
  });

  const [acknowledgmentName, setAcknowledgmentName] = useState("");
  const [selectedEbook, setSelectedEbook] = useState<string>("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleQtyChange = useCallback((volKey: string, qty: number) => {
    setQuantities((prev) => ({ ...prev, [volKey]: qty }));
  }, []);

  const handleOptionChange = useCallback((volKey: string, productId: string) => {
    setSelectedOptions((prev) => ({ ...prev, [volKey]: productId }));
  }, []);

  const addToCart = useCallback(
    (
      format: "sewn" | "hardcover" | "paperback" | "ebooks" | "hardcover_dj",
    ) => {
      const linesToUpdate: Array<{
        merchandiseId: string;
        quantity: number;
      }> = [];

      if (format === "ebooks") {
        const ebook = PRODUCT_CONFIG.ebooks.find(
          (e) => e.vol === selectedEbook,
        );
        const variant = ebook ? prices[ebook.id] : null;
        if (variant && !variant.id.startsWith("fallback-")) {
          linesToUpdate.push({ merchandiseId: variant.id, quantity: 1 });
        } else {
          console.warn("No valid variant found for ebook:", selectedEbook);
        }
      } else {
        PRODUCT_CONFIG[format].forEach((book) => {
          const volKey = `${format}-${book.vol}`;
          const qty = quantities[volKey] || 0;
          const selectedProductId = selectedOptions[volKey];
          const variant = prices[selectedProductId];

          if (qty > 0) {
            if (variant && !variant.id.startsWith("fallback-")) {
              linesToUpdate.push({
                merchandiseId: variant.id,
                quantity: qty,
              });
            } else {
              console.warn(`No valid variant found for product ${selectedProductId}.`);
            }
          }
        });
      }

      if (linesToUpdate.length > 0) {
        linesAdd(linesToUpdate);
        if (acknowledgmentName) {
          cartAttributesUpdate([
            { key: "Acknowledgment Name", value: acknowledgmentName },
          ]);
        }
        setIsCartOpen(true);
      } else {
        alert("Please select at least one book");
      }
    },
    [
      prices,
      quantities,
      selectedOptions,
      selectedEbook,
      acknowledgmentName,
      linesAdd,
      cartAttributesUpdate,
    ],
  );

  return {
    quantities,
    handleQtyChange,
    selectedOptions,
    handleOptionChange,
    acknowledgmentName,
    setAcknowledgmentName,
    selectedEbook,
    setSelectedEbook,
    isCartOpen,
    setIsCartOpen,
    addToCart,
  };
}
