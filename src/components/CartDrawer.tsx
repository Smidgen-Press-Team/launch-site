import { QuantityControl } from "@/components/QuantityControl";
import { Button } from "@/components/ui/button";
import { TITLE_CONFIG } from "@/config/products";
import type { CartLine, ShopifyAttribute } from '@/types/shopify';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  lines: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  linesRemove: (ids: string[]) => void;
  linesUpdate: (lines: { id: string; quantity: number }[]) => void;
  checkoutUrl?: string;
  status: string;
  attributes?: ShopifyAttribute[];
  acknowledgmentName?: string;
  setAcknowledgmentName?: (name: string) => void;
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
  attributes,
  acknowledgmentName = "",
  setAcknowledgmentName
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
                    <div className="flex justify-between items-start mb-6">
                      <h4 className="font-serif font-medium">{idToTitleMap(line.merchandise.product.id) ?? line.merchandise.product.title}</h4>
                      {/*<button
                        onClick={() => linesRemove([line.id])}
                        className="text-ink-muted hover:text-rust text-xs uppercase tracking-wider font-medium"
                      >
                        Remove
                      </button>*/}
                    </div>
                    {/*<p className="text-sm text-ink-muted mb-3">{line.merchandise.title}</p>*/}

                    {line.attributes?.map((attr) => (
                      <p key={attr.key} className="text-xs italic text-moss mt-1">
                        {attr.key}: {attr.value}
                      </p>
                    ))}

                    <div className="flex justify-between items-center mt-2">
                      <div className="flex gap-4 items-center">
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
                        <Button variant={"ghost"} onClick={() => linesRemove([line.id])}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="48" width="48">
                          <path fill="#000000" d="M15.2188 0c0.2229 0.0000058603 0.4394 0.0747674 0.6152 0.211914 0.1757 0.137143 0.3013 0.328695 0.3555 0.544922L16.5 2H24v2h-3v17c0 0.7957 -0.3163 1.5585 -0.8789 2.1211S18.7957 24 18 24H6c-0.79565 0 -1.55849 -0.3163 -2.12109 -0.8789C3.3163 22.5585 3 21.7957 3 21V4H0V2h7.5L7.81055 0.756836c0.05418 -0.216227 0.17973 -0.407779 0.35547 -0.544922C8.34176 0.0747674 8.55833 0.0000058603 8.78125 0zM5 21c0 0.2652 0.10543 0.5195 0.29297 0.707 0.18754 0.1876 0.44181 0.293 0.70703 0.293h12c0.2652 0 0.5195 -0.1054 0.707 -0.293 0.1876 -0.1875 0.293 -0.4418 0.293 -0.707V4H5zm5 -2H8V7h2zm6 0h-2V7h2z" stroke-width="1"></path>
                        </svg></Button>
                      </div>
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
          <div className="space-y-2 mb-4">
            <label className="block text-[10px] font-semibold tracking-wider uppercase text-ink-muted">
              Acknowledgment Name (Optional)
            </label>
            <input
              type="text"
              value={acknowledgmentName}
              onChange={(e) => setAcknowledgmentName?.(e.target.value)}
              placeholder="How should your name appear?"
              className="w-full bg-white border border-border-custom rounded-[2px] px-3 py-2 text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>
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
