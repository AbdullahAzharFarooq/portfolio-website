import { TOOL_ICONS } from "@/lib/brandIcons";

// Column counts for the tool row, written out in full so Tailwind can see them.
// lg shows two cards per row, so four tools wrap to 2×2 there and go 4-up again at xl.
const TOOL_COLUMNS = {
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4",
};

function ToolIcon({ name }) {
  const icon = TOOL_ICONS[name];
  if (!icon) return null;
  return icon.path ? (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
      <path d={icon.path} />
    </svg>
  ) : (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={icon.stroke} />
    </svg>
  );
}

/**
 * One tool group: what it's for, then each tool with its logo and the role it
 * plays. Hover lifts the card, draws a lime rule along the top, and flips the
 * logos to lime-on-black one after another.
 */
export default function ToolkitCard({ n, title, desc, Icon, tools }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-black/[0.08] bg-white p-7 transition-[translate,box-shadow,border-color] duration-500 hover:-translate-y-1 hover:border-black/15 hover:shadow-[0_30px_60px_-32px_rgba(10,10,10,0.3)] sm:p-9 lg:p-10">
      {/* lime rule that draws across the top on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
      />

      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="font-display text-sm font-extrabold text-black/25">{n}</p>
          <h3 className="font-display mt-3 text-2xl font-bold text-ink-dark sm:text-3xl">{title}</h3>
        </div>
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-black/10 bg-bg-light text-ink-dark transition-colors duration-500 group-hover:border-ink-dark group-hover:bg-ink-dark group-hover:text-accent">
          <Icon />
        </span>
      </div>

      <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-light sm:text-base">{desc}</p>

      <ul className={`mt-8 grid gap-x-4 gap-y-6 border-t border-black/[0.08] pt-8 ${TOOL_COLUMNS[tools.length] ?? TOOL_COLUMNS[4]}`}>
        {tools.map((tool, i) => (
          <li key={tool.name} className="flex items-center gap-3 sm:flex-col sm:items-start">
            <span
              style={{ transitionDelay: `${i * 70}ms` }}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-black/[0.08] bg-bg-light text-ink-dark transition-colors duration-500 group-hover:border-ink-dark group-hover:bg-ink-dark group-hover:text-accent"
            >
              <ToolIcon name={tool.name} />
            </span>
            <span>
              <span className="block text-sm font-semibold text-ink-dark">{tool.name}</span>
              <span className="mt-0.5 block text-xs leading-snug text-muted-light">{tool.role}</span>
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}
