function PerkCard({ icon, title, description }: { icon: string, title: string, description: string }) {
  return (
    <div className="bg-cream-card border border-border-soft p-6 rounded-[2px]">
      <div className="text-3xl text-gold mb-3">{icon}</div>
      <h4 className="font-serif text-lg font-medium mb-2">{title}</h4>
      <p className="text-sm text-ink-muted leading-normal">{description}</p>
    </div>
  )
}

export function PerksSection() {
  return (
    <section className="bg-warm-mid py-16 px-6">
      <div className="max-w-[60rem] mx-auto">
        <div className="section-subtitle">Every preorder includes</div>
        <h2 className="font-serif text-[1.875rem] font-medium leading-tight mb-2">Why Order Now</h2>
        <div className="ornament text-gold text-center text-xl mb-9"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PerkCard
            icon="✦"
            title="Sewn Legacy Binding"
            description="Sewn signatures are available exclusively in this summer 2026 bulk print run."
          />
          <PerkCard
            icon="✉"
            title="Handwritten Thank-You"
            description="Every preorder receives a personal handwritten note and extras."
          />
          <PerkCard
            icon="🌿"
            title="Website Acknowledgment"
            description="All preorder supporters will be listed by name as founding patrons."
          />
        </div>
      </div>
    </section>
  );
}
