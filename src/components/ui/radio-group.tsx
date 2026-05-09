import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { Radio as RadioPrimitive } from "@base-ui/react/radio"

import { cn } from "@/lib/utils"

function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props<any>) {
  return (
    <RadioGroupPrimitive
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function Radio({ className, ...props }: RadioPrimitive.Root.Props<any>) {
  return (
    <RadioPrimitive.Root
      className={cn(
        "group relative flex items-center justify-between rounded-md border border-border-custom bg-white text-left transition-all hover:border-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-gold data-[state=checked]:bg-cream-card cursor-pointer overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function RadioIndicator({ className, ...props }: RadioPrimitive.Indicator.Props) {
  return (
    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border-custom group-data-[state=checked]:border-gold transition-colors">
      <RadioPrimitive.Indicator
        className={cn(
          "h-2.5 w-2.5 rounded-full bg-gold transition-transform data-[state=unchecked]:scale-0",
          className
        )}
        {...props}
      />
    </div>
  )
}

export { RadioGroup, Radio, RadioIndicator }
