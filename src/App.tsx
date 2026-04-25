import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Timeline } from "@/components/Timeline"
import { BookRow } from "@/components/BookRow"
import { useCart } from '@shopify/hydrogen-react'

const BOOKS = [
  { 
    id: 'v1', 
    vol: 'Volume 1', 
    title: 'Home Education',
    variants: {
      sewn: 'gid://shopify/ProductVariant/1234567890123',
      glued: 'gid://shopify/ProductVariant/1234567890124',
      pb: 'gid://shopify/ProductVariant/1234567890125'
    }
  },
  { 
    id: 'v2', 
    vol: 'Volume 2 · New', 
    title: 'Parents and Children',
    variants: {
      sewn: 'gid://shopify/ProductVariant/1234567890126',
      glued: 'gid://shopify/ProductVariant/1234567890127',
      pb: 'gid://shopify/ProductVariant/1234567890128'
    }
  },
  { 
    id: 'v3', 
    vol: 'Volume 3 · New', 
    title: 'School Education',
    variants: {
      sewn: 'gid://shopify/ProductVariant/1234567890129',
      glued: 'gid://shopify/ProductVariant/1234567890130',
      pb: 'gid://shopify/ProductVariant/1234567890131'
    }
  },
  { 
    id: 'v6', 
    vol: 'Volume 6', 
    title: 'Philosophy of Education',
    variants: {
      sewn: 'gid://shopify/ProductVariant/1234567890132',
      glued: 'gid://shopify/ProductVariant/1234567890133',
      pb: 'gid://shopify/ProductVariant/1234567890134'
    }
  },
]

const EBOOK_VARIANTS = {
  v2: 'gid://shopify/ProductVariant/1234567890135',
  v3: 'gid://shopify/ProductVariant/1234567890136',
  both: 'gid://shopify/ProductVariant/1234567890137'
}

export default function App() {
  const [quantities, setQuantities] = useState<Record<string, number>>({})
  const { linesAdd, checkoutUrl, status } = useCart()
  const [selectedEbook, setSelectedEbook] = useState<string>('')

  const handleQtyChange = (id: string, qty: number) => {
    setQuantities(prev => ({ ...prev, [id]: qty }))
  }

  const addToCart = (format: 'sewn' | 'glued' | 'pb' | 'ebook') => {
    const lines: Array<{ merchandiseId: string; quantity: number }> = []

    if (format === 'ebook') {
      if (selectedEbook) {
        lines.push({ merchandiseId: EBOOK_VARIANTS[selectedEbook as keyof typeof EBOOK_VARIANTS], quantity: 1 })
      }
    } else {
      BOOKS.forEach(book => {
        const qty = quantities[`${format}-${book.id}`] || 0
        if (qty > 0) {
          lines.push({
            merchandiseId: book.variants[format],
            quantity: qty
          })
        }
      })
    }

    if (lines.length > 0) {
      linesAdd(lines)
    }
  }

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <header className="bg-ink text-parchment text-center px-6 py-18 md:py-24">
        <div className="hero-label">Smidgen Press · Summer 2026 Print Run</div>
        <div className="flex justify-center mb-4">
          {checkoutUrl && (
            <Button 
              variant="outline" 
              onClick={() => window.location.href = checkoutUrl}
              className="border-gold-light text-parchment hover:bg-gold-light hover:text-ink rounded-[2px] tracking-[0.15em] uppercase text-xs px-4 py-2 h-auto"
            >
              Checkout ({status !== 'idle' ? '...' : 'View Cart'})
            </Button>
          )}
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

        <Tabs defaultValue="sewn" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto p-0 bg-transparent border border-border-custom rounded-[3px] overflow-visible max-w-[34rem] mb-8">
            <TabsTrigger 
              value="sewn" 
              className="data-active:bg-ink data-active:text-parchment rounded-none border-r border-border-custom last:border-r-0 py-3.5 px-4 text-xs font-medium tracking-[0.1em] uppercase flex flex-col gap-1"
            >
              Sewn Legacy <span className="text-[10px] lowercase normal-case opacity-80">$70 / vol</span>
            </TabsTrigger>
            <TabsTrigger 
              value="glued" 
              className="data-active:bg-ink data-active:text-parchment rounded-none border-r border-border-custom last:border-r-0 py-3.5 px-4 text-xs font-medium tracking-[0.1em] uppercase flex flex-col gap-1"
            >
              Hardcover <span className="text-[10px] lowercase normal-case opacity-80">$40 / vol</span>
            </TabsTrigger>
            <TabsTrigger 
              value="pb" 
              className="data-active:bg-ink data-active:text-parchment rounded-none border-r border-border-custom last:border-r-0 py-3.5 px-4 text-xs font-medium tracking-[0.1em] uppercase flex flex-col gap-1"
            >
              Paperback <span className="text-[10px] lowercase normal-case opacity-80">$20 / vol</span>
            </TabsTrigger>
            <TabsTrigger 
              value="ebook" 
              className="data-active:bg-ink data-active:text-parchment rounded-none border-r border-border-custom last:border-r-0 py-3.5 px-4 text-xs font-medium tracking-[0.1em] uppercase flex flex-col gap-1"
            >
              Kindle/EPUB <span className="text-[10px] lowercase normal-case opacity-80">from $7</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sewn" className="space-y-0 mt-0">
            <div className="bg-[#fdf6f5] border-l-3 border-rust p-5 mb-6 rounded-[2px]">
              <strong className="text-rust font-semibold">Limited to this print run.</strong> Sewn legacy bindings are only available through this summer 2026 bulk order.
            </div>
            {BOOKS.map(book => (
              <BookRow 
                key={book.id}
                vol={book.vol}
                title={book.title}
                note="Sewn binding · Ships summer 2026"
                price={70}
                quantity={quantities[`sewn-${book.id}`] || 0}
                onQuantityChange={(qty) => handleQtyChange(`sewn-${book.id}`, qty)}
              />
            ))}
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
          
          <TabsContent value="glued" className="space-y-0 mt-0">
            <div className="bg-cream-card border border-border-soft p-5 mb-6 rounded-[2px] text-sm">
              <strong>Want Volumes 1 & 6 sooner?</strong> Glued hardcover editions are <a href="#" className="text-moss font-medium underline">available now in our store</a>.
            </div>
            {BOOKS.map(book => (
              <BookRow 
                key={book.id}
                vol={book.vol}
                title={book.title}
                note="Glued hardcover · Ships summer 2026"
                price={40}
                quantity={quantities[`glued-${book.id}`] || 0}
                onQuantityChange={(qty) => handleQtyChange(`glued-${book.id}`, qty)}
              />
            ))}
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button 
                onClick={() => addToCart('glued')}
                className="bg-ink hover:bg-moss text-parchment rounded-[2px] px-10 py-6 h-auto tracking-[0.15em] uppercase text-xs font-medium"
              >
                Add to Cart
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="pb" className="space-y-0 mt-0">
            {BOOKS.map(book => (
              <BookRow 
                key={book.id}
                vol={book.vol}
                title={book.title}
                note="Paperback · Ships summer 2026"
                price={20}
                quantity={quantities[`pb-${book.id}`] || 0}
                onQuantityChange={(qty) => handleQtyChange(`pb-${book.id}`, qty)}
              />
            ))}
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button 
                onClick={() => addToCart('pb')}
                className="bg-ink hover:bg-moss text-parchment rounded-[2px] px-10 py-6 h-auto tracking-[0.15em] uppercase text-xs font-medium"
              >
                Add to Cart
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="ebook" className="space-y-0 mt-0">
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
                      checked={selectedEbook === 'v2'} 
                      onChange={() => setSelectedEbook('v2')} 
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
                      checked={selectedEbook === 'v3'} 
                      onChange={() => setSelectedEbook('v3')} 
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
                onClick={() => addToCart('ebook')}
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
