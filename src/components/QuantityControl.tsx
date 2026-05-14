interface QuantityControlProps {
  value: number
  onChange: (value: number) => void
}

export function QuantityControl({ value, onChange }: QuantityControlProps) {
  return (
    <div className="inline-grid grid-cols-3 w-32 border border-border-custom rounded-[2px] bg-white overflow-hidden h-10">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="h-full bg-warm-mid hover:bg-border-soft transition-colors text-lg font-medium text-ink flex items-center justify-center border-none cursor-pointer"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="flex items-center justify-center h-full text-base font-medium text-ink border-x border-border-custom bg-white select-none" aria-live="polite">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="h-full bg-warm-mid hover:bg-border-soft transition-colors text-lg font-medium text-ink flex items-center justify-center border-none cursor-pointer"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
