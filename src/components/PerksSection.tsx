function PerkCard({ name, description }: { name: string, description: string }) {
  return (
    <div className="bg-cream-card border border-border-soft p-6 rounded-[2px]">
      <div className="text-3xl text-gold mb-3 flex items-center justify-center">✦</div>
      <p className="text-lg text-ink-muted leading-normal">{description}</p>
      <p className="text-sm mt-2"><em>— {name}</em></p>
    </div>
  )
}

export function PerksSection() {
  return (
    <section className="bg-warm-mid py-16 px-6">
      <div className="max-w-[60rem] mx-auto">
        <div className="section-subtitle">Testimonials</div>
        <h2 className="font-serif text-[1.875rem] font-medium leading-tight mb-2">What Readers Love</h2>
        <div className="ornament text-gold text-center text-xl mb-9"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PerkCard

            name="Sheri F."
            description='"The quality reprinting Smidgen Press is doing makes them inviting to look at but also gives Miss Mason’s books the honor they deserve."' />
          <PerkCard

            name="Sheila B."
            description="&quot;I&apos;m so very delighted with my Smyth-sewn binding hardcovers. You&apos;ve done fantastic work!&quot;"
          />

          <PerkCard

            name="Kirsten T."
            description="&quot;Beautifully designed and a pleasure to read, this edition breathes fresh life into Charlotte Mason’s timeless wisdom for a new generation of homeschool mothers.&quot; "
          />
        </div>
      </div>
    </section>
  );
}
