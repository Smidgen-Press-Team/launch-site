import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { ProductOption } from "@/config/products"
import type { Product, ProductVariant } from "@/types/shopify"
import { QuantityControl } from "./QuantityControl"

export interface BookRowProps {
  product: Product
  variant?: ProductVariant
  note: string
  quantity: number
  onQuantityChange: (qty: number) => void
  options?: ProductOption[]
  selectedOptionId?: string
  onOptionChange?: (id: string) => void
  prices?: Record<string, ProductVariant>
}

export function BookRow({
  product,
  variant,
  note,
  quantity,
  onQuantityChange,
  options = [],
  selectedOptionId,
  onOptionChange,
  prices = {}
}: BookRowProps) {
  if (!variant) return null

  const displayedPrice = selectedOptionId && prices[selectedOptionId]
    ? prices[selectedOptionId].price.amount
    : variant.price.amount;

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
          <div className="text-[0.875rem] color-ink-muted italic leading-snug mb-4">
            {note}
          </div>

          {options.length > 1 && onOptionChange && (
            <div className="space-y-3 mt-2 w-50">
              <label className="block text-[10px] font-semibold tracking-wider uppercase text-ink-muted mb-2">
                Choose Cover Design
              </label>
              <Select value={selectedOptionId || ""} onValueChange={onOptionChange}>
                <SelectTrigger className={`h-9 text-xs ${!selectedOptionId ? "border-rust/50 text-rust" : ""}`}>
                  <SelectValue placeholder="Select Design">
                    {selectedOptionId ? options.find(opt => opt.id === selectedOptionId)?.label : "Select Design"}
                  </SelectValue>
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
              {!selectedOptionId && quantity > 0 && (
                <p className="text-[10px] text-rust font-medium italic mt-1">Please select a cover design</p>
              )}
            </div>
          )}
        </div>
        <div className="flex justify-end sm:justify-start gap-4">
          <div className="font-serif text-2xl text-moss font-semibold whitespace-nowrap text-left sm:text-right">
            ${parseFloat(displayedPrice).toFixed(0)}
          </div>

          <QuantityControl value={quantity} onChange={onQuantityChange} />

        </div>
      </div>
    </div>
  )
}
