import { PRODUCT_CONFIG } from "@/config/products";
import type { ProductVariant, ShopifyAttribute } from "@/types/shopify";
import { useCart } from "@shopify/hydrogen-react";
import { useCallback, useState, useEffect } from "react";

export function usePreorderCart(prices: Record<string, ProductVariant>) {
  const { linesAdd, cartAttributesUpdate, attributes, cartReady } = useCart();
  
  // Quantities are now keyed by "format-vol" (e.g. "sewn-1") to persist across design changes
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  
  // Selected Shopify Product ID per volume: keyed by "format-vol"
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    (['sewn', 'hardcover', 'hardcover_dj', 'paperback'] as const).forEach(format => {
      PRODUCT_CONFIG[format].forEach(book => {
        // Only pre-select if there is exactly one option
        if (book.options.length === 1) {
          initial[`${format}-${book.vol}`] = book.options[0].id;
        } else {
          initial[`${format}-${book.vol}`] = "";
        }
      });
    });
    return initial;
  });

  const [acknowledgmentName, setAcknowledgmentName] = useState("");
  const [selectedEbook, setSelectedEbook] = useState<string>("");
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync from cart attributes once when they load
  const [hasInitializedName, setHasInitializedName] = useState(false);
  useEffect(() => {
    if (cartReady && attributes && !hasInitializedName) {
      const attr = (attributes as ShopifyAttribute[]).find(a => a?.key === "Acknowledgment Name");
      if (attr?.value) {
        setAcknowledgmentName(attr.value);
      }
      setHasInitializedName(true);
    }
  }, [cartReady, attributes, hasInitializedName]);

  // Sync to cart attributes when name changes (debounced)
  useEffect(() => {
    if (!cartReady) return;

    const currentAttr = (attributes as ShopifyAttribute[])?.find(a => a?.key === "Acknowledgment Name");
    const currentValue = currentAttr?.value || "";

    if (acknowledgmentName !== currentValue) {
      const timer = setTimeout(() => {
        cartAttributesUpdate([
          { key: "Acknowledgment Name", value: acknowledgmentName },
        ]);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [acknowledgmentName, cartReady, attributes, cartAttributesUpdate]);

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
        let missingSelection = false;
        PRODUCT_CONFIG[format].forEach((book) => {
          const volKey = `${format}-${book.vol}`;
          const qty = quantities[volKey] || 0;
          const selectedProductId = selectedOptions[volKey];
          
          if (qty > 0) {
            if (!selectedProductId) {
              missingSelection = true;
              return;
            }
            const variant = prices[selectedProductId];
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

        if (missingSelection) {
          alert("Please select a cover design for all selected books.");
          return;
        }
      }

      if (linesToUpdate.length > 0) {
        linesAdd(linesToUpdate);
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
      linesAdd,
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
