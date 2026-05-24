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
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] items-start gap-4 py-5">
        <div className="flex flex-col">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[0.875rem] font-semibold tracking-[0.12em] uppercase text-gold mb-1.5">
                {product.vol_number?.value ? `Volume ${product.vol_number.value}` : product.handle.replace('-', ' ')}
              </div>
              <h3 className="font-serif text-xl font-medium leading-snug mb-1">
                {product.title}
              </h3>
              <div className="text-[15px] color-ink-muted italic leading-snug mb-4">
                {note}
              </div>
            </div>
            <div className="font-serif text-2xl text-moss font-semibold whitespace-nowrap md:hidden">
              ${parseFloat(displayedPrice).toFixed(0)}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="hidden md:flex items-center gap-4">
            <div className="font-serif text-2xl text-moss font-semibold whitespace-nowrap">
              ${parseFloat(displayedPrice).toFixed(0)}
            </div>

            {options.length > 1 && onOptionChange ? (
              <div className="hidden md:block">
                <QuantityControl value={quantity} onChange={onQuantityChange} />
              </div>
            ) : (
              <QuantityControl value={quantity} onChange={onQuantityChange} />
            )}
          </div>

          {options.length <= 1 || !onOptionChange ? (
            <div className="md:hidden">
              <QuantityControl value={quantity} onChange={onQuantityChange} />
            </div>
          ) : null}

          {options.length > 1 && onOptionChange && (
            <div className="flex w-full items-end gap-3 md:block md:w-50">
              <div className="flex-1 md:w-auto">
                <label className="block text-[10px] font-semibold tracking-wider uppercase text-ink-muted mb-2">
                  Choose Cover Design
                </label>
                <Select value={selectedOptionId || ""} onValueChange={onOptionChange}>
                  <SelectTrigger className={`h-9 text-sm ${!selectedOptionId ? "border-rust/50 text-rust" : ""}`}>
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
              <div className="md:hidden">
                <QuantityControl value={quantity} onChange={onQuantityChange} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
