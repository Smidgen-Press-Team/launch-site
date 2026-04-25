import { QuantityControl } from "./QuantityControl"
import type { Product, ProductVariant } from "@/types/shopify"

interface BookRowProps {
  product: Product
  variant?: ProductVariant
  note: string
  quantity: number
  onQuantityChange: (qty: number) => void
}

export function BookRow({ product, variant, note, quantity, onQuantityChange }: BookRowProps) {
  if (!variant) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] items-center gap-4 py-5 border-b border-border-soft first:border-t border-border-soft">
      <div className="flex flex-col">
        <div className="text-[0.875rem] font-semibold tracking-[0.12em] uppercase text-gold mb-1.5">
          {product.handle.replace('-', ' ')}
        </div>
        <h3 className="font-serif text-xl font-medium leading-snug mb-1">
          {product.title}
        </h3>
        <div className="text-[0.875rem] color-ink-muted italic leading-snug">
          {note}
        </div>
      </div>
      <div className="font-serif text-2xl text-moss font-semibold whitespace-nowrap text-left sm:text-right">
        ${parseFloat(variant.price.amount).toFixed(0)}
      </div>
      <div className="flex justify-end sm:justify-start">
        <QuantityControl value={quantity} onChange={onQuantityChange} />
      </div>
    </div>
  )
}
