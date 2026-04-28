import { QuantityControl } from "@/components/QuantityControl";
import { Button } from "@/components/ui/button";
import { TITLE_CONFIG } from "@/config/products";
import type { CartLine } from '@/types/shopify';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lines: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  linesRemove: (ids: string[]) => void;
  linesUpdate: (lines: { id: string; quantity: number }[]) => void;
  checkoutUrl?: string;
  status: string;
  attributes?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}

function idToTitleMap(id: string): string | null {

  const value = TITLE_CONFIG[id] || null
  console.log(value)
  return value
}

export function CartDrawer({
  isOpen,
  onClose,
  lines,
  linesRemove,
  linesUpdate,
  checkoutUrl,
  status,
  attributes
}: CartDrawerProps) {
  if (!isOpen) return null;

  const cartLines = (lines || []) as unknown as CartLine[];
  const subtotal = cartLines.reduce((acc: number, line) => acc + parseFloat(line.cost.totalAmount.amount), 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-md bg-parchment h-full shadow-2xl flex flex-col">
        <div className="p-6 border-b border-border-soft flex justify-between items-center">
          <h2 className="font-serif text-2xl font-medium">Your Cart</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartLines.length > 0 ? (
            <>
              {cartLines.map((line) => (
                <div key={line.id} className="flex gap-4 items-start pb-6 border-b border-border-soft last:border-0">
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-serif font-medium">{idToTitleMap(line.merchandise.product.id) ?? line.merchandise.product.title}</h4>
                      <button
                        onClick={() => linesRemove([line.id])}
                        className="text-ink-muted hover:text-rust text-xs uppercase tracking-wider font-medium"
                      >
                        Remove
                      </button>
                    </div>
                    {/*<p className="text-sm text-ink-muted mb-3">{line.merchandise.title}</p>*/}

                    {line.attributes?.map((attr) => (
                      <p key={attr.key} className="text-xs italic text-moss mt-1">
                        {attr.key}: {attr.value}
                      </p>
                    ))}

                    <div className="flex justify-between items-center mt-2">
                      <QuantityControl
                        value={line.quantity}
                        onChange={(qty) => {
                          if (qty === 0) {
                            linesRemove([line.id])
                          } else {
                            linesUpdate([{ id: line.id, quantity: qty }])
                          }
                        }}
                      />
                      <span className="font-serif font-semibold">${parseFloat(line.cost.totalAmount.amount).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ))}

              {attributes && attributes.length > 0 && (
                <div className="mt-4 p-4 bg-cream-card border border-border-soft rounded-[2px]">
                  <h3 className="text-xs font-semibold tracking-wider uppercase text-ink-muted mb-2">Order Attributes</h3>
                  {attributes.map((attr) => {
                    if (!attr) return null;
                    return (
                      <p key={attr.key} className="text-sm italic text-moss">
                        {attr.key}: <span className="font-medium">{attr.value}</span>
                      </p>
                    );
                  })}
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-ink-muted py-12 italic text-lg">Your cart is currently empty.</p>
          )}
        </div>
        <div className="p-6 border-t border-border-soft space-y-4 bg-cream-card">
          <div className="flex justify-between text-lg font-serif font-semibold">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Button
            disabled={!checkoutUrl || status !== 'idle'}
            onClick={() => checkoutUrl && (window.location.href = checkoutUrl)}
            className="w-full bg-ink hover:bg-moss text-parchment rounded-[2px] py-6 h-auto tracking-[0.15em] uppercase text-xs font-medium"
          >
            {status !== 'idle' ? 'Loading...' : 'Proceed to Checkout'}
          </Button>
        </div>
      </div>
    </div>
  );
}
