import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookRow } from "@/components/BookRow";
import { PRODUCT_CONFIG } from "@/config/products";
import type { ProductVariant } from "@/types/shopify";

interface PreorderSectionProps {
  isLoading: boolean;
  acknowledgmentName: string;
  setAcknowledgmentName: (name: string) => void;
  quantities: Record<string, number>;
  onQtyChange: (id: string, qty: number) => void;
  selectedEbook: string;
  setSelectedEbook: (vol: string) => void;
  addToCart: (format: 'sewn' | 'hardcover' | 'paperback' | 'ebooks') => void;
  getVariant: (id: string, defaultAmount: string) => ProductVariant;
  getPrice: (id: string, defaultAmount: string) => { amount: string; currencyCode: string };
}

export function PreorderSection({
  isLoading,
  acknowledgmentName,
  setAcknowledgmentName,
  quantities,
  onQtyChange,
  selectedEbook,
  setSelectedEbook,
  addToCart,
  getVariant,
  getPrice,
}: PreorderSectionProps) {
  return (
    <section className="py-16 px-6 max-w-[60rem] mx-auto">
      <div className="section-subtitle">Summer 2026 · All volumes ship together</div>
      <h2 className="font-serif text-[1.875rem] font-medium leading-tight mb-2">Choose Your Format</h2>
      <div className="ornament text-gold text-center text-xl mb-9"></div>

      {isLoading ? (
        <div className="py-20 text-center italic text-ink-muted">Loading formats...</div>
      ) : (
        <>
          <div className="max-w-[34rem] mb-10 pb-6 border-b border-border-soft animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="block text-xs font-semibold tracking-wider uppercase text-ink-muted mb-2.5">
              Name for acknowledgment (Optional)
            </label>
            <input
              type="text"
              value={acknowledgmentName}
              onChange={(e) => setAcknowledgmentName(e.target.value)}
              placeholder="How should your name appear in the book?"
              className="w-full bg-white border border-border-custom rounded-[2px] px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
            />
            <p className="text-[11px] text-ink-muted italic mt-2.5">This name will be used for all items in your order.</p>
          </div>

          <Tabs defaultValue="Sewn" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto p-0 bg-transparent border border-border-custom rounded-[3px] overflow-visible max-w-[34rem] mb-8">
              <TabsTrigger
                value="Sewn"
                className="data-active:bg-ink data-active:text-parchment rounded-none border-r border-border-custom last:border-r-0 py-3.5 px-4 text-xs font-medium tracking-[0.1em] uppercase flex flex-col gap-1"
              >
                Sewn Legacy <span className="text-[10px] lowercase normal-case opacity-80">$50 / vol</span>
              </TabsTrigger>
              <TabsTrigger
                value="Hardcover"
                className="data-active:bg-ink data-active:text-parchment rounded-none border-r border-border-custom last:border-r-0 py-3.5 px-4 text-xs font-medium tracking-[0.1em] uppercase flex flex-col gap-1"
              >
                Hardcover <span className="text-[10px] lowercase normal-case opacity-80">$35 / vol</span>
              </TabsTrigger>
              <TabsTrigger
                value="Paperback"
                className="data-active:bg-ink data-active:text-parchment rounded-none border-r border-border-custom last:border-r-0 py-3.5 px-4 text-xs font-medium tracking-[0.1em] uppercase flex flex-col gap-1"
              >
                Paperback <span className="text-[10px] lowercase normal-case opacity-80">$20 / vol</span>
              </TabsTrigger>
              <TabsTrigger
                value="Kindle/EPUB"
                className="data-active:bg-ink data-active:text-parchment rounded-none border-r border-border-custom last:border-r-0 py-3.5 px-4 text-xs font-medium tracking-[0.1em] uppercase flex flex-col gap-1"
              >
                Kindle/EPUB <span className="text-[10px] lowercase normal-case opacity-80">from $7</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="Sewn" className="space-y-0 mt-0">
              <div className="bg-[#fdf6f5] border-l-3 border-rust p-5 mb-6 rounded-[2px]">
                <strong className="text-rust font-semibold">Limited to this print run.</strong> Sewn legacy bindings are only available through this summer 2026 bulk order.
              </div>
              {PRODUCT_CONFIG.sewn.map(config => {
                const variant = getVariant(config.id, '70.00');
                return (
                  <BookRow
                    key={config.id}
                    product={{
                      id: config.id,
                      title: config.title,
                      handle: `volume-${config.vol}`,
                      images: { nodes: [] },
                      variants: { nodes: [variant] },
                      vol_number: { value: config.vol }
                    }}
                    variant={variant}
                    note={config.subtitle}
                    quantity={quantities[config.id] || 0}
                    onQuantityChange={(qty) => onQtyChange(config.id, qty)}
                  />
                );
              })}
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Button
                  onClick={() => addToCart('sewn')}
                  className="bg-ink hover:bg-moss text-parchment rounded-[2px] px-10 py-6 h-auto tracking-[0.15em] uppercase text-xs font-medium"
                >
                  Add to Cart
                </Button>
                <span className="text-xs italic text-ink-muted">Charged now · Ships summer 2026 · Ebook included free</span>
              </div>
            </TabsContent>

            <TabsContent value="Hardcover" className="space-y-0 mt-0">
              <div className="bg-cream-card border border-border-soft p-5 mb-6 rounded-[2px] text-sm">
                <strong>Want Volumes 1 & 6 sooner?</strong> Glued hardcover editions are <a href="#" className="text-moss font-medium underline">available now in our store</a>.
              </div>
              {PRODUCT_CONFIG.hardcover.map(config => {
                const variant = getVariant(config.id, '40.00');
                return (
                  <BookRow
                    key={config.id}
                    product={{
                      id: config.id,
                      title: config.title,
                      handle: `volume-${config.vol}`,
                      images: { nodes: [] },
                      variants: { nodes: [variant] },
                      vol_number: { value: config.vol }
                    }}
                    variant={variant}
                    note={config.subtitle}
                    quantity={quantities[config.id] || 0}
                    onQuantityChange={(qty) => onQtyChange(config.id, qty)}
                  />
                );
              })}
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Button
                  onClick={() => addToCart('hardcover')}
                  className="bg-ink hover:bg-moss text-parchment rounded-[2px] px-10 py-6 h-auto tracking-[0.15em] uppercase text-xs font-medium"
                >
                  Add to Cart
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="Paperback" className="space-y-0 mt-0">
              {PRODUCT_CONFIG.paperback.map(config => {
                const variant = getVariant(config.id, '20.00');
                return (
                  <BookRow
                    key={config.id}
                    product={{
                      id: config.id,
                      title: config.title,
                      handle: `volume-${config.vol}`,
                      images: { nodes: [] },
                      variants: { nodes: [variant] },
                      vol_number: { value: config.vol }
                    }}
                    variant={variant}
                    note={config.subtitle}
                    quantity={quantities[config.id] || 0}
                    onQuantityChange={(qty) => onQtyChange(config.id, qty)}
                  />
                );
              })}
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Button
                  onClick={() => addToCart('paperback')}
                  className="bg-ink hover:bg-moss text-parchment rounded-[2px] px-10 py-6 h-auto tracking-[0.15em] uppercase text-xs font-medium"
                >
                  Add to Cart
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="Kindle/EPUB" className="space-y-0 mt-0">
              <div className="bg-cream-card border border-border-soft p-6 mb-6 rounded-[2px]">
                <h4 className="font-serif text-lg font-medium mb-2">Kindle & EPUB — New Volumes</h4>
                <p className="text-sm text-ink-muted mb-4">Volumes 2 & 3 are available as Kindle/EPUB. Choose one or both.</p>
                <div className="flex flex-wrap gap-3">
                  {['2', '3', 'both'].map((vol) => (
                    <label key={vol} className="flex-1 min-w-[9rem] border border-border-custom rounded-[2px] p-4 bg-white cursor-pointer hover:border-gold transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <input
                          type="radio"
                          name="ebook"
                          className="accent-moss"
                          checked={selectedEbook === vol}
                          onChange={() => setSelectedEbook(vol)}
                        />
                        <span className="text-sm font-medium">
                          {vol === 'both' ? 'Both new volumes' : `Volume ${vol}`}
                        </span>
                      </div>
                      <div className="font-serif text-xl text-moss font-semibold">
                        ${parseFloat(getPrice(PRODUCT_CONFIG.ebooks.find(e => e.vol === vol)?.id || '', vol === 'both' ? '13.00' : '7.00').amount).toFixed(0)}
                      </div>
                    </label>
                  ))}
                </div>
                <p className="text-xs italic text-moss mt-4 font-medium">✓ Ebooks are included free with any print order — no need to add them separately.</p>
              </div>
              <div className="mt-6">
                <Button
                  onClick={() => addToCart('ebooks')}
                  className="bg-ink hover:bg-moss text-parchment rounded-[2px] px-10 py-6 h-auto tracking-[0.15em] uppercase text-xs font-medium"
                >
                  Add to Cart
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}

      <div className="bg-warm-mid border-l-3 border-gold-accent p-6 mt-10 rounded-[2px] flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm">📖 <strong>Looking for Volumes 4 & 5?</strong> They're coming — we anticipate a 2027 release.</p>
        <a href="#" className="text-xs font-semibold tracking-[0.12em] uppercase text-moss underline hover:text-ink whitespace-nowrap">Read our update →</a>
      </div>
    </section>
  );
}
