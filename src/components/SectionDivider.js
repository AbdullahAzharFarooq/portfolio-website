export default function SectionDivider() {
  return (
    <div className="section-dark relative overflow-hidden" aria-hidden="true">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.12] blur-[100px]" />

      <div className="relative mx-auto flex max-w-6xl items-center gap-4 px-6 py-10 sm:py-12">
        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/10" />
        <span className="h-1 w-1 shrink-0 rounded-full bg-white/20" />

        <span className="relative mx-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40">
          <span className="absolute h-8 w-8 rounded-full bg-accent/20 blur-md" />
          <span className="relative h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_#cdff3a]" />
        </span>

        <span className="h-1 w-1 shrink-0 rounded-full bg-white/20" />
        <span className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/10" />
      </div>
    </div>
  );
}
