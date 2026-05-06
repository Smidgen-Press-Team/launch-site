import { Radio, RadioGroup, RadioIndicator } from "@/components/ui/radio-group"
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

          {options.length > 1 && onOptionChange && selectedOptionId && (
            <div className="space-y-3 mt-2">
              <label className="block text-[10px] font-semibold tracking-wider uppercase text-ink-muted mb-2">
                Choose Cover Design
              </label>
              <RadioGroup value={selectedOptionId} onValueChange={onOptionChange} className="grid grid-cols-1 gap-3 max-w-[500px]">
                {options.map((opt) => {
                  const optVariant = prices[opt.id]
                  const imageUrl = optVariant?.image?.url

                  return (
                    <Radio key={opt.id} value={opt.id} className="min-h-30">
                      {imageUrl && (
                        <div className="h-30 w-30 border-r border-border-soft overflow-hidden bg-white flex items-center justify-center">
                          <img
                            src={imageUrl}
                            alt={opt.label}
                            className="h-full w-full object-contain grayscale-[0.2] group-data-[state=checked]:grayscale-0 transition-all"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-4 p-4 flex-1 justify-between">
                        <span className="text-sm font-medium">{opt.label}</span>
                        <RadioIndicator />
                      </div>
                    </Radio>
                  )
                })}
              </RadioGroup>

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
