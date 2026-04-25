import { QuantityControl } from "./QuantityControl"
import type { Product, ProductVariant } from "@/types/shopify"

export interface BookRowProps {
  product: Product
  variant?: ProductVariant
  note: string
  quantity: number
  onQuantityChange: (qty: number) => void
  userName?: string
  onNameChange?: (name: string) => void
}

export function BookRow({ 
  product, 
  variant, 
  note, 
  quantity, 
  onQuantityChange,
  userName,
  onNameChange
}: BookRowProps) {
  if (!variant) return null

  return (
    <div className="flex flex-col border-b border-border-soft first:border-t">
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] items-center gap-4 py-5">
        <div className="flex flex-col">
          <div className="text-[0.875rem] font-semibold tracking-[0.12em] uppercase text-gold mb-1.5">
            {product.vol_number?.value ? `Volume ${product.vol_number.value}` : product.handle.replace('-', ' ')}
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
      
      {quantity >= 1 && onNameChange && (
        <div className="pb-5 animate-in fade-in slide-in-from-top-2 duration-300">
          <label className="block text-xs font-semibold tracking-wider uppercase text-ink-muted mb-2">
            Name for acknowledgment (Optional)
          </label>
          <input
            type="text"
            value={userName || ''}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="How should your name appear in the book?"
            className="w-full max-w-md bg-white border border-border-custom rounded-[2px] px-4 py-2.5 text-sm focus:outline-none focus:border-gold transition-colors"
          />
        </div>
      )}
    </div>
  )
}
