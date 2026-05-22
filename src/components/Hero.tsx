import { Button } from "@/components/ui/button";

interface HeroProps {
  totalQuantity: number;
  onOpenCart: () => void;
}

export function Hero({ totalQuantity, onOpenCart }: HeroProps) {
  return (
    <header className="bg-ink text-parchment text-center px-6 py-18 md:py-24 " role="banner">
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={onOpenCart}
          className="border-gold-light text-ink hover:bg-gold-light hover:text-ink rounded-[2px] tracking-[0.15em] uppercase text-xs px-4 py-2 h-auto"
        >
          Cart ({totalQuantity || 0})
        </Button>
      </div>
      <div className="hero-label">Limited Print Run 2026 · Archival Editions</div>

      <h1 className="text-4xl md:text-6xl font-normal leading-tight mb-5 max-w-4xl mx-auto">
        The Charlotte Mason<br />
        <em className="italic text-gold-light">Home Education Series</em>
      </h1>
      <p className="text-lg md:text-xl max-w-[34rem] mx-auto mb-8 leading-normal">
        A faithful restoration of Charlotte Mason's complete writings — bound to last generations. Preorder your copies and become part of the story.
      </p>
    </header>
  );
}
