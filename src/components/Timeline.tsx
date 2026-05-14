interface TimelineItemProps {
  year: string
  vols: string
  titles: string
  status: string
  variant: 'complete' | 'current' | 'future'
}

function TimelineItem({ year, vols, titles, status, variant }: TimelineItemProps) {
  const statusColors = {
    complete: 'bg-moss text-white',
    current: 'bg-gold text-white',
    future: 'bg-warm-darker text-ink-muted'
  }

  const dotColors = {
    complete: 'bg-moss border-moss',
    current: 'bg-gold-accent border-gold-accent shadow-[0_0_0_4px_rgba(138,111,48,0.2)]',
    future: 'bg-parchment border-border-custom'
  }

  return (
    <div className="flex-1 min-w-[11rem] flex flex-col items-center text-center relative">
      <div className={`w-4 h-4 rounded-full border-2 mb-3 relative z-10 ${dotColors[variant]}`} />
      <div className={`font-serif text-2xl font-medium mb-1 ${variant === 'future' ? 'text-ink-muted' : ''}`}>{year}</div>
      <div className="flex flex-col">
        <div className={`text-[0.875rem] font-semibold tracking-[0.12em] uppercase mb-1.5 ${variant === 'future' ? 'text-ink-muted' : 'text-gold'}`}>
          {vols}
        </div>
        <div className={`font-serif text-base italic mb-2.5 leading-snug ${variant === 'future' ? 'text-ink-muted' : 'text-ink'}`}>
          {titles}
        </div>
        <div className={`text-[0.875rem] font-semibold tracking-[0.12em] uppercase py-1 px-3 rounded-[2px] inline-block self-center ${statusColors[variant]}`}>
          {status}
        </div>
      </div>
    </div>
  )
}

function Connector() {
  return <div className="hidden md:block flex-none w-10 h-[2px] bg-border-custom mt-2" />
}

export function Timeline() {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-0">
      <TimelineItem
        year="2025"
        vols="Volumes 1 & 6"
        titles="Home Education & Philosophy of Education"
        status="Launched ✓"
        variant="complete"
      />
      <Connector />
      <TimelineItem
        year="2026"
        vols="Volumes 2 & 3"
        titles="Parents and Children & School Education"
        status="Preorder Open Now"
        variant="current"
      />
      <Connector />
      <TimelineItem
        year="2027"
        vols="Volumes 4 & 5"
        titles="Ourselves & Formation of Character"
        status="Coming 2027"
        variant="future"
      />
    </div>
  )
}
