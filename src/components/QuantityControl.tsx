interface QuantityControlProps {
  value: number
  onChange: (value: number) => void
}

export function QuantityControl({ value, onChange }: QuantityControlProps) {
  return (
    <div className="inline-flex items-center border border-border-custom rounded-[2px] bg-white overflow-hidden h-10">
      <button
        onClick={() => onChange(Math.max(0, value - 1))}
        className="w-10 h-full bg-warm-mid hover:bg-border-soft transition-colors text-lg font-medium text-ink flex items-center justify-center border-none cursor-pointer"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="inline-flex items-center justify-center min-width-[2.75rem] px-2 h-full text-base font-medium text-ink border-x border-border-custom bg-white select-none" aria-live="polite">
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-10 h-full bg-warm-mid hover:bg-border-soft transition-colors text-lg font-medium text-ink flex items-center justify-center border-none cursor-pointer"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
