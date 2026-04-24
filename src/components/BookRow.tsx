import { QuantityControl } from "./QuantityControl"

interface BookRowProps {
  vol: string
  title: string
  note: string
  price: number
  quantity: number
  onQuantityChange: (qty: number) => void
}

export function BookRow({ vol, title, note, price, quantity, onQuantityChange }: BookRowProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] items-center gap-4 py-5 border-b border-border-soft first:border-t border-border-soft">
      <div className="flex flex-col">
        <div className="text-[0.875rem] font-semibold tracking-[0.12em] uppercase text-gold mb-1.5">
          {vol}
        </div>
        <h3 className="font-serif text-xl font-medium leading-snug mb-1">
          {title}
        </h3>
        <div className="text-[0.875rem] color-ink-muted italic leading-snug">
          {note}
        </div>
      </div>
      <div className="font-serif text-2xl text-moss font-semibold whitespace-nowrap text-left sm:text-right">
        ${price}
      </div>
      <div className="flex justify-end sm:justify-start">
        <QuantityControl value={quantity} onChange={onQuantityChange} />
      </div>
    </div>
  )
}
