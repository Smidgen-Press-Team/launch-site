import compare from "@/assets/compare.jpg";
import features from "@/assets/features.webp";
import mockup from "@/assets/mockup.webp";
import { CartDrawer } from "@/components/CartDrawer";
import { DeadlineBanner } from "@/components/DeadlineBanner";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { PerksSection } from "@/components/PerksSection";
import { PreorderSection } from "@/components/PreorderSection";
import { Timeline } from "@/components/Timeline";
import { usePreorderCart } from '@/hooks/usePreorderCart';
import { usePreorderPrices } from '@/hooks/usePreorderPrices';
import { useCart } from '@shopify/hydrogen-react';
import { useEffect, useState } from 'react';

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
    selectedOptions,
    handleOptionChange,
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
      <div className="p-2 justify-center items-center bg-gold text-white w-full flex"><span>Discount codes and full FAQ: <a href="https://smidgenpress.com/home-education-series-faqs" target="_blank" className="underline hover:text-black">View the guide →</a></span></div>

      <Hero
        totalQuantity={totalQuantity || 0}
        onOpenCart={() => setIsCartOpen(true)}
      />
      <DeadlineBanner />
      <div><img src={mockup} alt="Smidgen Press Charlotte Mason Home Education Series mockup" className="md:p-20 m-auto" /></div>




      <section className="bg-cream-card md:border-b border-border-soft py-14 px-6" role="main">
        <div className="max-w-[60rem] mx-auto">
          <div className="section-subtitle mb-2">The Home Education Series by Charlotte Mason
          </div>
          <h2 className="font-serif text-[1.875rem] font-medium leading-tight mb-8">A Six-Volume Journey</h2>
          <Timeline />
        </div>
      </section>
      <section>
        <img className="m-auto items-center md:w-150 md:py-14" src={compare} alt="Comparison of the Filigree and Typography hardcover formats" />
      </section>
      <div className="w-full m-auto bg-mid-soft">
        <PreorderSection
          isLoading={isLoading}
          acknowledgmentName={acknowledgmentName}
          setAcknowledgmentName={setAcknowledgmentName}
          quantities={quantities}
          onQtyChange={handleQtyChange}
          selectedOptions={selectedOptions}
          onOptionChange={handleOptionChange}
          selectedEbook={selectedEbook}
          setSelectedEbook={setSelectedEbook}
          addToCart={addToCart}
          getVariant={getVariant}
          getPrice={getPrice}
          prices={prices}
        />
      </div>
      <section>
        <img className="m-auto items-center md:w-200 md:py-14" src={features} alt="Illustration highlighting features of the Charlotte Mason Home Education Series" />
      </section>

      <PerksSection />
      {/*<FAQs></FAQs>*/}

      <Footer />
    </div>
  );
}
