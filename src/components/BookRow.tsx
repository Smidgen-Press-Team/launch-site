import { QuantityControl } from "./QuantityControl"
import type { Product, ProductVariant } from "@/types/shopify"
import type { ProductOption } from "@/config/products"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export interface BookRowProps {
  product: Product
  variant?: ProductVariant
  note: string
  quantity: number
  onQuantityChange: (qty: number) => void
  options?: ProductOption[]
  selectedOptionId?: string
  onOptionChange?: (id: string) => void
}

export function BookRow({ 
  product, 
  variant, 
  note, 
  quantity, 
  onQuantityChange,
  options = [],
  selectedOptionId,
  onOptionChange
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
          <div className="text-[0.875rem] color-ink-muted italic leading-snug mb-3">
            {note}
          </div>

          {options.length > 1 && onOptionChange && selectedOptionId && (
            <div className="max-w-[200px]">
              <label className="block text-[10px] font-semibold tracking-wider uppercase text-ink-muted mb-1.5">
                Cover Design
              </label>
              <Select value={selectedOptionId} onValueChange={onOptionChange}>
                <SelectTrigger className="h-9 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {options.map((opt) => (
                      <SelectItem key={opt.id} value={opt.id}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        <div className="font-serif text-2xl text-moss font-semibold whitespace-nowrap text-left sm:text-right">
          ${parseFloat(variant.price.amount).toFixed(0)}
        </div>
        <div className="flex justify-end sm:justify-start">
          <QuantityControl value={quantity} onChange={onQuantityChange} />
        </div>
      </div>
    </div>
  )
}
