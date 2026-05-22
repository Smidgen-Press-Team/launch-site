import { BookRow } from "@/components/BookRow";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PRODUCT_CONFIG } from "@/config/products";
import type { ProductVariant } from "@/types/shopify";

interface PreorderSectionProps {
  isLoading: boolean;
  acknowledgmentName: string;
  setAcknowledgmentName: (name: string) => void;
  quantities: Record<string, number>;
  onQtyChange: (id: string, qty: number) => void;
  selectedOptions: Record<string, string>;
  onOptionChange: (volKey: string, productId: string) => void;
  selectedEbook: string;
  setSelectedEbook: (vol: string) => void;
  addToCart: (format: 'sewn' | 'hardcover' | 'paperback' | 'ebooks' | 'hardcover_dj') => void;
  getVariant: (id: string, defaultAmount: string) => ProductVariant;
  getPrice: (id: string, defaultAmount: string) => { amount: string; currencyCode: string };
  prices: Record<string, ProductVariant>;
}
interface NameInputProps {
  acknowledgmentName: string;
  setAcknowledgmentName: (name: string) => void;
}

const NameInput = ({ acknowledgmentName,
  setAcknowledgmentName }: NameInputProps) => {
  return (<div className="w-full animate-in fade-in slide-in-from-top-2 duration-300">
    <label className="block text-xs font-semibold tracking-wider uppercase text-ink-muted mb-2.5">
      Can we thank you publicly? Name for acknowledgment (optional):
    </label>
    <input
      type="text"
      value={acknowledgmentName}
      onChange={(e) => setAcknowledgmentName(e.target.value)}
      placeholder="How should your name appear in the book?"
      className="w-full bg-white border border-border-custom rounded-[2px] px-4 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
    />
  </div>)
}

export function PreorderSection({
  isLoading,
  acknowledgmentName,
  setAcknowledgmentName,
  quantities,
  onQtyChange,
  selectedOptions,
  onOptionChange,
  selectedEbook,
  setSelectedEbook,
  addToCart,
  getVariant,
  getPrice,
  prices,
}: PreorderSectionProps) {
  const ebookDefaultPrices: Record<string, string> = {
    "2 & 3": "13.00",
    "1 & 6": "13.00",
    "1, 2, 3, & 6": "20.00",
  };

  const isFormatMissingSelection = (format: keyof typeof PRODUCT_CONFIG) => {
    if (format === 'ebooks') return !selectedEbook;
    return PRODUCT_CONFIG[format].some(book => {
      const volKey = `${format}-${book.vol}`;
      const qty = quantities[volKey] || 0;
      return qty > 0 && !selectedOptions[volKey];
    });
  };

  const hasItemsInFormat = (format: keyof typeof PRODUCT_CONFIG) => {
    if (format === 'ebooks') return !!selectedEbook;
    return PRODUCT_CONFIG[format].some(book => quantities[`${format}-${book.vol}`] > 0);
  };

  return (
    <section className="py-16 px-6 max-w-200 mx-auto bg-mid-soft">
      <div className="section-subtitle">Summer 2026</div>
      <h2 className="font-serif text-[1.875rem] font-medium leading-tight mb-2">Choose Your Format</h2>
      <div className="ornament text-gold text-center text-xl mb-9"></div>

      {isLoading ? (
        <div className="py-20 text-center italic text-ink-muted">Loading formats...</div>
      ) : (
        <>


          <Tabs defaultValue="Sewn" className="w-full">
            <TabsList
              className="grid md:grid-cols-2 lg:grid-cols-4 grid-cols-2 h-auto gap-px p-px bg-border-custom rounded-[3px] overflow-hidden w-full mb-8"
            >
              <TabsTrigger
                value="Sewn"
                className="data-active:bg-ink data-active:text-parchment rounded-none bg-cream-card w-full h-full py-3.5 px-4 text-xs font-medium tracking-[0.1em] uppercase flex flex-col gap-1"
              >
                Premium hardcover <span className="text-[10px] lowercase normal-case opacity-80">$55 / vol</span>
              </TabsTrigger>
              <TabsTrigger
                value="Hardcover-DJ"
                className="data-active:bg-ink data-active:text-parchment rounded-none bg-cream-card w-full h-full py-3.5 px-4 text-xs font-medium tracking-[0.1em] uppercase flex flex-col gap-1"
              >
                Standard hardcover <span className="text-[10px] lowercase normal-case opacity-80">$40 / vol</span>
              </TabsTrigger>
              {/*<TabsTrigger
                value="Hardcover"
                className="data-active:bg-ink data-active:text-parchment rounded-none bg-cream-card w-full h-full py-3.5 px-4 text-xs font-medium tracking-[0.1em] uppercase flex flex-col gap-1"
              >
                Hardcover (No Jacket) <span className="text-[10px] lowercase normal-case opacity-80">$33 / vol</span>
              </TabsTrigger>*/}
              <TabsTrigger
                value="Paperback"
                className="data-active:bg-ink data-active:text-parchment rounded-none bg-cream-card w-full h-full py-3.5 px-4 text-xs font-medium tracking-[0.1em] uppercase flex flex-col gap-1"
              >
                Paperback <span className="text-[10px] lowercase normal-case opacity-80">$25 / vol</span>
              </TabsTrigger>
              <TabsTrigger
                value="Kindle/EPUB"
                className="data-active:bg-ink data-active:text-parchment rounded-none bg-cream-card w-full h-full py-3.5 px-4 text-xs font-medium tracking-[0.1em] uppercase flex flex-col gap-1"
              >
                EPUB & PDF <span className="text-[10px] lowercase normal-case opacity-80">$10</span>
              </TabsTrigger>
              {/*<TabsTrigger value="__placeholder"
                disabled
                aria-hidden="true"
                className="lg:hidden pointer-events-none rounded-none opacity-100 bg-cream-card w-full h-full py-3.5 px-4 text-xs font-medium tracking-[0.1em] uppercase flex flex-col gap-1">

              </TabsTrigger>*/}
            </TabsList>

            <TabsContent value="Sewn" className="space-y-0 mt-0">
              <div className="bg-cream-card border-l-3 border-rust p-5 mb-6 rounded-[2px]">
                Smyth sewn hardcover binding with dust jacket | Acid-free paper stock |<strong className="text-rust"> Limited print run</strong>
              </div>
              {PRODUCT_CONFIG.sewn.map(book => {
                const volKey = `sewn-${book.vol}`;
                const selectedId = selectedOptions[volKey];
                const variant = getVariant(selectedId, '55.00');
                return (
                  <BookRow
                    key={volKey}
                    product={{
                      id: selectedId,
                      title: book.title,
                      handle: `volume-${book.vol}`,
                      images: { nodes: [] },
                      variants: { nodes: [variant] },
                      vol_number: { value: book.vol }
                    }}
                    variant={variant}
                    note={book.subtitle}
                    quantity={quantities[volKey] || 0}
                    onQuantityChange={(qty) => onQtyChange(volKey, qty)}
                    options={book.options}
                    selectedOptionId={selectedId}
                    onOptionChange={(id) => onOptionChange(volKey, id)}
                    prices={prices}
                  />
                );
              })}
              <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="w-full md:max-w-[34rem]">
                  <NameInput acknowledgmentName={acknowledgmentName} setAcknowledgmentName={setAcknowledgmentName} />
                </div>
                <div className="w-full md:w-auto md:self-end flex justify-end">
                  <Button
                    onClick={() => addToCart('sewn')}
                    disabled={hasItemsInFormat('sewn') && isFormatMissingSelection('sewn')}
                    className={`bg-ink hover:bg-moss text-parchment rounded-[2px] px-10 py-6 h-auto tracking-[0.15em] uppercase text-xs font-medium transition-all ${hasItemsInFormat('sewn') && isFormatMissingSelection('sewn') ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
              <p className="mt-3 text-xs italic text-ink-muted">Charged now · Ships summer 2026 · Ebook included free</p>
            </TabsContent>

            {/*<TabsContent value="Hardcover" className="space-y-0 mt-0">
              
              {PRODUCT_CONFIG.hardcover.map(book => {
                const volKey = `hardcover-${book.vol}`;
                const selectedId = selectedOptions[volKey];
                const variant = getVariant(selectedId, '35.00');
                return (
                  <BookRow
                    key={volKey}
                    product={{
                      id: selectedId,
                      title: book.title,
                      handle: `volume-${book.vol}`,
                      images: { nodes: [] },
                      variants: { nodes: [variant] },
                      vol_number: { value: book.vol }
                    }}
                    variant={variant}
                    note={book.subtitle}
                    quantity={quantities[volKey] || 0}
                    onQuantityChange={(qty) => onQtyChange(volKey, qty)}
                    options={book.options}
                    selectedOptionId={selectedId}
                    onOptionChange={(id) => onOptionChange(volKey, id)}
                    prices={prices}
                  />
                );
              })}
              <NameInput acknowledgmentName={acknowledgmentName} setAcknowledgmentName={setAcknowledgmentName} />
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Button
                  onClick={() => addToCart('hardcover')}
                  disabled={hasItemsInFormat('hardcover') && isFormatMissingSelection('hardcover')}
                  className={`bg-ink hover:bg-moss text-parchment rounded-[2px] px-10 py-6 h-auto tracking-[0.15em] uppercase text-xs font-medium transition-all ${hasItemsInFormat('hardcover') && isFormatMissingSelection('hardcover') ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  Add to Cart
                </Button>
              </div>
            </TabsContent>*/}
            <TabsContent value="Hardcover-DJ" className="space-y-0 mt-0">
              <div className="bg-cream-card border-l-3 border-rust p-5 mb-6 rounded-[2px]">
                Glue-bound hardcover binding with dust jacket | acid-free paper stock | Earliest.
              </div>
              <p>Ships in July | Available widely in August </p>
              {PRODUCT_CONFIG.hardcover_dj.map(book => {
                const volKey = `hardcover_dj-${book.vol}`;
                const selectedId = selectedOptions[volKey];
                const variant = getVariant(selectedId, '35.00');
                return (
                  <BookRow
                    key={volKey}
                    product={{
                      id: selectedId,
                      title: book.title,
                      handle: `volume-${book.vol}`,
                      images: { nodes: [] },
                      variants: { nodes: [variant] },
                      vol_number: { value: book.vol }
                    }}
                    variant={variant}
                    note={book.subtitle}
                    quantity={quantities[volKey] || 0}
                    onQuantityChange={(qty) => onQtyChange(volKey, qty)}
                    options={book.options}
                    selectedOptionId={selectedId}
                    onOptionChange={(id) => onOptionChange(volKey, id)}
                    prices={prices}
                  />
                );
              })}
              <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="w-full md:max-w-[34rem]">
                  <NameInput acknowledgmentName={acknowledgmentName} setAcknowledgmentName={setAcknowledgmentName} />
                </div>
                <div className="w-full md:w-auto md:self-end flex justify-end">
                  <Button
                    onClick={() => addToCart('hardcover_dj')}
                    disabled={hasItemsInFormat('hardcover_dj') && isFormatMissingSelection('hardcover_dj')}
                    className={`bg-ink hover:bg-moss text-parchment rounded-[2px] px-10 py-6 h-auto tracking-[0.15em] uppercase text-xs font-medium transition-all ${hasItemsInFormat('hardcover_dj') && isFormatMissingSelection('hardcover_dj') ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="Paperback" className="space-y-0 mt-0">
              <div className="bg-cream-card border-l-3 border-rust p-5 mb-6 rounded-[2px]">
                Ships in July | Available widely in August
              </div>
              {PRODUCT_CONFIG.paperback.map(book => {
                const volKey = `paperback-${book.vol}`;
                const selectedId = selectedOptions[volKey];
                const variant = getVariant(selectedId, '25.00');
                return (
                  <BookRow
                    key={volKey}
                    product={{
                      id: selectedId,
                      title: book.title,
                      handle: `volume-${book.vol}`,
                      images: { nodes: [] },
                      variants: { nodes: [variant] },
                      vol_number: { value: book.vol }
                    }}
                    variant={variant}
                    note={book.subtitle}
                    quantity={quantities[volKey] || 0}
                    onQuantityChange={(qty) => onQtyChange(volKey, qty)}
                    options={book.options}
                    selectedOptionId={selectedId}
                    onOptionChange={(id) => onOptionChange(volKey, id)}
                    prices={prices}
                  />
                );
              })}
              <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="w-full md:max-w-[34rem]">
                  <NameInput acknowledgmentName={acknowledgmentName} setAcknowledgmentName={setAcknowledgmentName} />
                </div>
                <div className="w-full md:w-auto md:self-end flex justify-end">
                  <Button
                    onClick={() => addToCart('paperback')}
                    disabled={hasItemsInFormat('paperback') && isFormatMissingSelection('paperback')}
                    className={`bg-ink hover:bg-moss text-parchment rounded-[2px] px-10 py-6 h-auto tracking-[0.15em] uppercase text-xs font-medium transition-all ${hasItemsInFormat('paperback') && isFormatMissingSelection('paperback') ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="Kindle/EPUB" className="space-y-0 mt-0">
              <div className="bg-cream-card border border-border-soft p-6 mb-6 rounded-[2px]">
                <h4 className="font-serif text-lg font-medium mb-2">EPUB & PDF — New Volumes</h4>
                <p className="text-sm text-ink-muted mb-4">Choose an ebook bundle below.</p>
                <div className="flex flex-wrap gap-3">
                  {PRODUCT_CONFIG.ebooks.map((ebook) => (
                    <label key={ebook.id} className="flex-1 min-w-[9rem] border border-border-custom rounded-[2px] p-4 bg-white cursor-pointer hover:border-gold transition-colors">
                      <div className="flex items-center gap-2 mb-1">
                        <input
                          type="radio"
                          name="ebook"
                          className="accent-moss"
                          checked={selectedEbook === ebook.vol}
                          onChange={() => setSelectedEbook(ebook.vol)}
                        />
                        <span className="text-sm font-medium">{ebook.title}</span>
                      </div>
                      <div className="font-serif text-xl text-moss font-semibold">
                        ${parseFloat(getPrice(ebook.id, ebookDefaultPrices[ebook.vol] || '7.00').amount).toFixed(0)}
                      </div>
                    </label>
                  ))}
                </div>
                <p className="text-xs italic text-moss mt-4 font-medium">✓ Ebooks are included free with any print order — no need to add them separately.</p>
              </div>
              <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="w-full md:max-w-[34rem]">
                  <NameInput acknowledgmentName={acknowledgmentName} setAcknowledgmentName={setAcknowledgmentName} />
                </div>
                <div className="w-full md:w-auto md:self-end flex justify-end">
                  <Button
                    onClick={() => addToCart('ebooks')}
                    className=" bg-ink hover:bg-moss text-parchment rounded-[2px] px-10 py-6 h-auto tracking-[0.15em] uppercase text-xs font-medium"
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}


    </section>
  );
}
