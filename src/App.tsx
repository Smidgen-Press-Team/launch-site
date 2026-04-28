import { useEffect, useState } from 'react';
import { useCart } from '@shopify/hydrogen-react';
import { Timeline } from "@/components/Timeline";
import { CartDrawer } from "@/components/CartDrawer";
import { Hero } from "@/components/Hero";
import { DeadlineBanner } from "@/components/DeadlineBanner";
import { PreorderSection } from "@/components/PreorderSection";
import { PerksSection } from "@/components/PerksSection";
import { Footer } from "@/components/Footer";
import { usePreorderPrices } from '@/hooks/usePreorderPrices';
import { usePreorderCart } from '@/hooks/usePreorderCart';

export default function App() {
  const {
    linesUpdate,
    linesRemove,
    checkoutUrl,
    status,
    lines,
    totalQuantity,
    discountCodesUpdate,
    cartReady,
    attributes
  } = useCart();

  const { prices, isLoading, getVariant, getPrice } = usePreorderPrices();
  const {
    quantities,
    handleQtyChange,
    acknowledgmentName,
    setAcknowledgmentName,
    selectedEbook,
    setSelectedEbook,
    isCartOpen,
    setIsCartOpen,
    addToCart
  } = usePreorderCart(prices);

  const [hasSetDiscount, setHasSetDiscount] = useState(false);

  useEffect(() => {
    if (cartReady && !hasSetDiscount) {
      discountCodesUpdate(['CMLaunch26Ship']);
      setHasSetDiscount(true);
    }
  }, [cartReady, hasSetDiscount, discountCodesUpdate]);

  return (
    <div className="min-h-screen">
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        lines={lines || []}
        linesRemove={linesRemove}
        linesUpdate={linesUpdate}
        checkoutUrl={checkoutUrl}
        status={status}
        attributes={attributes}
      />

      <Hero
        totalQuantity={totalQuantity || 0}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <DeadlineBanner />

      <section className="bg-cream-card border-b border-border-soft py-14 px-6">
        <div className="max-w-[60rem] mx-auto">
          <div className="section-subtitle mb-2">The complete works of Charlotte Mason</div>
          <h2 className="font-serif text-[1.875rem] font-medium leading-tight mb-8">A Six-Volume Journey</h2>
          <Timeline />
        </div>
      </section>

      <PreorderSection
        isLoading={isLoading}
        acknowledgmentName={acknowledgmentName}
        setAcknowledgmentName={setAcknowledgmentName}
        quantities={quantities}
        onQtyChange={handleQtyChange}
        selectedEbook={selectedEbook}
        setSelectedEbook={setSelectedEbook}
        addToCart={addToCart}
        getVariant={getVariant}
        getPrice={getPrice}
      />

      <PerksSection />

      <Footer />
    </div>
  );
}
