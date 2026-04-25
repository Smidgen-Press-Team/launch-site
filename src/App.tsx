import { BookRow } from "@/components/BookRow"
import { Timeline } from "@/components/Timeline"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { type Product, type CartLine } from '@/types/shopify'
import { useCart } from '@shopify/hydrogen-react'
import { useState } from 'react'

const PRODUCTS: Product[] = [
  {
    id: 'gid://shopify/Product/1',
    handle: 'Volume-1',
    title: 'Home Education',
    images: { nodes: [] },
    variants: {
      nodes: [
        { id: 'gid://shopify/ProductVariant/1234567890123', title: 'Sewn', price: { amount: '70.00', currencyCode: 'USD' }, availableForSale: true },
        { id: 'gid://shopify/ProductVariant/1234567890124', title: 'Hardcover', price: { amount: '40.00', currencyCode: 'USD' }, availableForSale: true },
        { id: 'gid://shopify/ProductVariant/1234567890125', title: 'Paperback', price: { amount: '20.00', currencyCode: 'USD' }, availableForSale: true }
      ]
    }
  },
  {
    id: 'gid://shopify/Product/2',
    handle: 'Volume-2',
    title: 'Parents and Children',
    images: { nodes: [] },
    variants: {
      nodes: [
        { id: 'gid://shopify/ProductVariant/1234567890126', title: 'Sewn', price: { amount: '70.00', currencyCode: 'USD' }, availableForSale: true },
        { id: 'gid://shopify/ProductVariant/1234567890127', title: 'Hardcover', price: { amount: '40.00', currencyCode: 'USD' }, availableForSale: true },
        { id: 'gid://shopify/ProductVariant/1234567890128', title: 'Paperback', price: { amount: '20.00', currencyCode: 'USD' }, availableForSale: true },
        { id: 'gid://shopify/ProductVariant/1234567890135', title: 'Kindle/EPUB', price: { amount: '7.00', currencyCode: 'USD' }, availableForSale: true }
      ]
    }
  },
  {
    id: 'gid://shopify/Product/3',
    handle: 'Volume-3',
    title: 'School Education',
    images: { nodes: [] },
    variants: {
      nodes: [
        { id: 'gid://shopify/ProductVariant/1234567890129', title: 'Sewn', price: { amount: '70.00', currencyCode: 'USD' }, availableForSale: true },
        { id: 'gid://shopify/ProductVariant/1234567890130', title: 'Hardcover', price: { amount: '40.00', currencyCode: 'USD' }, availableForSale: true },
        { id: 'gid://shopify/ProductVariant/1234567890131', title: 'Paperback', price: { amount: '20.00', currencyCode: 'USD' }, availableForSale: true },
        { id: 'gid://shopify/ProductVariant/1234567890136', title: 'Kindle/EPUB', price: { amount: '7.00', currencyCode: 'USD' }, availableForSale: true }
      ]
    }
  },
  {
    id: 'gid://shopify/Product/6',
    handle: 'Volume-6',
    title: 'Philosophy of Education',
    images: { nodes: [] },
    variants: {
      nodes: [
        { id: 'gid://shopify/ProductVariant/1234567890132', title: 'Sewn', price: { amount: '70.00', currencyCode: 'USD' }, availableForSale: true },
        { id: 'gid://shopify/ProductVariant/1234567890133', title: 'Hardcover', price: { amount: '40.00', currencyCode: 'USD' }, availableForSale: true },
        { id: 'gid://shopify/ProductVariant/1234567890134', title: 'Paperback', price: { amount: '20.00', currencyCode: 'USD' }, availableForSale: true }
      ]
    }
  },
]

const EBOOK_BUNDLE_VARIANT_ID = 'gid://shopify/ProductVariant/1234567890137'

export default function App() {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const { linesAdd, checkoutUrl, status, lines, totalQuantity } = useCart()
  const [selectedEbook, setSelectedEbook] = useState<string>('')
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleQtyChange = (id: string, qty: number) => {
    setQuantities(prev => ({ ...prev, [id]: qty }))
  }

  const addToCart = (format: string) => {
    const linesToUpdate: Array<{ merchandiseId: string; quantity: number }> = []

    if (format === 'Kindle/EPUB') {
      if (selectedEbook === 'both') {
        linesToUpdate.push({ merchandiseId: EBOOK_BUNDLE_VARIANT_ID, quantity: 1 })
      } else if (selectedEbook) {
        const product = PRODUCTS.find(p => p.handle === selectedEbook)
        const variant = product?.variants.nodes.find(v => v.title === 'Kindle/EPUB')
        if (variant) {
          linesToUpdate.push({ merchandiseId: variant.id, quantity: 1 })
        }
      }
    } else {
      PRODUCTS.forEach(product => {
        const qty = quantities[`${format}-${product.id}`] || 0
        const variant = product.variants.nodes.find(v => v.title === format)
        if (qty > 0 && variant) {
          linesToUpdate.push({
            merchandiseId: variant.id,
            quantity: qty
          })
        }
      })
    }

    if (linesToUpdate.length > 0) {
      linesAdd(linesToUpdate)
      setIsCartOpen(true)
    }
  }

  return (
    <div className="min-h-screen">
      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsCartOpen(false)} />
          <div className="relative w-full max-w-md bg-parchment h-full shadow-2xl flex flex-col">
            <div className="p-6 border-b border-border-soft flex justify-between items-center">
              <h2 className="font-serif text-2xl font-medium">Your Cart</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-2xl">&times;</button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {lines && lines.length > 0 ? (
                (lines as unknown as CartLine[]).map((line) => (
                  <div key={line.id} className="flex gap-4 items-start">
                    <div className="flex-1">
                      <h4 className="font-serif font-medium">{line.merchandise.product.title}</h4>
                      <p className="text-sm text-ink-muted">{line.merchandise.title}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm">Qty: {line.quantity}</span>
                        <span className="font-serif font-semibold">${parseFloat(line.cost.totalAmount.amount).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-ink-muted py-12 italic text-lg">Your cart is currently empty.</p>
              )}
            </div>
            <div className="p-6 border-t border-border-soft space-y-4 bg-cream-card">
              <div className="flex justify-between text-lg font-serif font-semibold">
                <span>Subtotal</span>
                <span>{lines && lines.length > 0 ? `$${(lines as unknown as CartLine[]).reduce((acc: number, line) => acc + parseFloat(line.cost.totalAmount.amount), 0).toFixed(2)}` : '$0.00'}</span>
              </div>
              <Button
                disabled={!checkoutUrl || status !== 'idle'}
                onClick={() => checkoutUrl && (window.location.href = checkoutUrl)}
                className="w-full bg-ink hover:bg-moss text-parchment rounded-[2px] py-6 h-auto tracking-[0.15em] uppercase text-xs font-medium"
              >
                {status !== 'idle' ? 'Loading...' : 'Proceed to Checkout'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <header className="bg-ink text-parchment text-center px-6 py-18 md:py-24">
        <div className="hero-label">Smidgen Press · Summer 2026 Print Run</div>
        <div className="flex justify-center mb-4">
          <Button
            variant="outline"
            onClick={() => setIsCartOpen(true)}
            className="border-gold-light text-parchment hover:bg-gold-light hover:text-ink rounded-[2px] tracking-[0.15em] uppercase text-xs px-4 py-2 h-auto"
          >
            Cart ({totalQuantity || 0})
          </Button>
        </div>
        <h1 className="text-4xl md:text-6xl font-normal leading-tight mb-5 max-w-4xl mx-auto">
          The Charlotte Mason<br />
          <em className="italic text-gold-light">Home Education Series</em>
        </h1>
        <p className="text-lg md:text-xl max-w-[34rem] mx-auto mb-8 leading-normal">
          A faithful restoration of Charlotte Mason's complete writings — bound to last generations. Preorder your copies and become part of the story.
        </p>
        <Button variant="outline" className="border-gold-light text-parchment hover:bg-gold-light hover:text-ink rounded-[2px] tracking-[0.15em] uppercase text-xs px-7 py-3 h-auto">
          About this campaign & our timeline →
        </Button>
      </header>

      {/* DEADLINE BANNER */}
      <div className="bg-moss text-white text-center py-4 px-6 text-[0.9375rem]">
        <span aria-hidden="true">✦</span> &nbsp;Every preorder receives a handwritten thank-you & website acknowledgment &nbsp;·&nbsp; Order by <strong className="font-semibold text-moss-light">May 31</strong> to also be printed in the books &nbsp;<span aria-hidden="true">✦</span>
      </div>

      {/* TIMELINE */}
      <section className="bg-cream-card border-b border-border-soft py-14 px-6">
        <div className="max-w-[60rem] mx-auto">
          <div className="section-subtitle mb-2">The complete works of Charlotte Mason</div>
          <h2 className="font-serif text-[1.875rem] font-medium leading-tight mb-8">A Six-Volume Journey</h2>
          <Timeline />
        </div>
      </section>

      {/* PREORDER SECTION */}
      <section className="py-16 px-6 max-w-[60rem] mx-auto">
        <div className="section-subtitle">Summer 2026 · All volumes ship together</div>
        <h2 className="font-serif text-[1.875rem] font-medium leading-tight mb-2">Choose Your Format</h2>
        <div className="ornament text-gold text-center text-xl mb-9"></div>

        <Tabs defaultValue="Sewn" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto p-0 bg-transparent border border-border-custom rounded-[3px] overflow-visible max-w-[34rem] mb-8">
            <TabsTrigger
              value="Sewn"
              className="data-active:bg-ink data-active:text-parchment rounded-none border-r border-border-custom last:border-r-0 py-3.5 px-4 text-xs font-medium tracking-[0.1em] uppercase flex flex-col gap-1"
            >
              Sewn Legacy <span className="text-[10px] lowercase normal-case opacity-80">$70 / vol</span>
            </TabsTrigger>
            <TabsTrigger
              value="Hardcover"
              className="data-active:bg-ink data-active:text-parchment rounded-none border-r border-border-custom last:border-r-0 py-3.5 px-4 text-xs font-medium tracking-[0.1em] uppercase flex flex-col gap-1"
            >
              Hardcover <span className="text-[10px] lowercase normal-case opacity-80">$40 / vol</span>
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
            {PRODUCTS.map(product => (
              <BookRow
                key={product.id}
                product={product}
                variant={product.variants.nodes.find(v => v.title === 'Sewn')}
                note="Sewn binding · Ships summer 2026"
                quantity={quantities[`Sewn-${product.id}`] || 0}
                onQuantityChange={(qty) => handleQtyChange(`Sewn-${product.id}`, qty)}
              />
            ))}
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button
                onClick={() => addToCart('Sewn')}
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
            {PRODUCTS.map(product => (
              <BookRow
                key={product.id}
                product={product}
                variant={product.variants.nodes.find(v => v.title === 'Hardcover')}
                note="Glued hardcover · Ships summer 2026"
                quantity={quantities[`Hardcover-${product.id}`] || 0}
                onQuantityChange={(qty) => handleQtyChange(`Hardcover-${product.id}`, qty)}
              />
            ))}
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button
                onClick={() => addToCart('Hardcover')}
                className="bg-ink hover:bg-moss text-parchment rounded-[2px] px-10 py-6 h-auto tracking-[0.15em] uppercase text-xs font-medium"
              >
                Add to Cart
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="Paperback" className="space-y-0 mt-0">
            {PRODUCTS.map(product => (
              <BookRow
                key={product.id}
                product={product}
                variant={product.variants.nodes.find(v => v.title === 'Paperback')}
                note="Paperback · Ships summer 2026"
                quantity={quantities[`Paperback-${product.id}`] || 0}
                onQuantityChange={(qty) => handleQtyChange(`Paperback-${product.id}`, qty)}
              />
            ))}
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button
                onClick={() => addToCart('Paperback')}
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
                <label className="flex-1 min-w-[9rem] border border-border-custom rounded-[2px] p-4 bg-white cursor-pointer hover:border-gold transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="radio"
                      name="ebook"
                      className="accent-moss"
                      checked={selectedEbook === 'Volume-2'}
                      onChange={() => setSelectedEbook('Volume-2')}
                    />
                    <span className="text-sm font-medium">Volume 2</span>
                  </div>
                  <div className="font-serif text-xl text-moss font-semibold">$7</div>
                </label>
                <label className="flex-1 min-w-[9rem] border border-border-custom rounded-[2px] p-4 bg-white cursor-pointer hover:border-gold transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="radio"
                      name="ebook"
                      className="accent-moss"
                      checked={selectedEbook === 'Volume-3'}
                      onChange={() => setSelectedEbook('Volume-3')}
                    />
                    <span className="text-sm font-medium">Volume 3</span>
                  </div>
                  <div className="font-serif text-xl text-moss font-semibold">$7</div>
                </label>
                <label className="flex-1 min-w-[9rem] border border-border-custom rounded-[2px] p-4 bg-white cursor-pointer hover:border-gold transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <input
                      type="radio"
                      name="ebook"
                      className="accent-moss"
                      checked={selectedEbook === 'both'}
                      onChange={() => setSelectedEbook('both')}
                    />
                    <span className="text-sm font-medium">Both new volumes</span>
                  </div>
                  <div className="font-serif text-xl text-moss font-semibold">$13</div>
                </label>
              </div>
              <p className="text-xs italic text-moss mt-4 font-medium">✓ Ebooks are included free with any print order — no need to add them separately.</p>
            </div>
            <div className="mt-6">
              <Button
                onClick={() => addToCart('Kindle/EPUB')}
                className="bg-ink hover:bg-moss text-parchment rounded-[2px] px-10 py-6 h-auto tracking-[0.15em] uppercase text-xs font-medium"
              >
                Add to Cart
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-warm-mid border-l-3 border-gold-accent p-6 mt-10 rounded-[2px] flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm">📖 <strong>Looking for Volumes 4 & 5?</strong> They're coming — we anticipate a 2027 release.</p>
          <a href="#" className="text-xs font-semibold tracking-[0.12em] uppercase text-moss underline hover:text-ink whitespace-nowrap">Read our update →</a>
        </div>
      </section>

      {/* PERKS */}
      <section className="bg-warm-mid py-16 px-6">
        <div className="max-w-[60rem] mx-auto">
          <div className="section-subtitle">Every preorder includes</div>
          <h2 className="font-serif text-[1.875rem] font-medium leading-tight mb-2">Why Order Now</h2>
          <div className="ornament text-gold text-center text-xl mb-9"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <PerkCard
              icon="✦"
              title="Sewn Legacy Binding"
              description="Sewn signatures are available exclusively in this summer 2026 bulk print run."
            />
            <PerkCard
              icon="✉"
              title="Handwritten Thank-You"
              description="Every preorder receives a personal handwritten note and extras."
            />
            <PerkCard
              icon="🌿"
              title="Website Acknowledgment"
              description="All preorder supporters will be listed by name as founding patrons."
            />
          </div>
        </div>
      </section>

      <footer className="bg-ink text-gold-light text-center py-8 px-6 text-xs tracking-wider leading-relaxed">
        © 2026 Smidgen Press · All preorders ship summer 2026 · Questions? <a href="#" className="text-parchment underline font-medium">Contact us</a>
      </footer>
    </div>
  )
}

function PerkCard({ icon, title, description }: { icon: string, title: string, description: string }) {
  return (
    <div className="bg-cream-card border border-border-soft p-6 rounded-[2px]">
      <div className="text-3xl text-gold mb-3">{icon}</div>
      <h4 className="font-serif text-lg font-medium mb-2">{title}</h4>
      <p className="text-sm text-ink-muted leading-normal">{description}</p>
    </div>
  )
}
