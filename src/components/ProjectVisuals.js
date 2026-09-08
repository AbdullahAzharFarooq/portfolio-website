import Image from "next/image";

export function ChatMockup({ messages, photo }) {
  return (
    <div className="relative flex h-52 w-full flex-col justify-end gap-2 overflow-hidden bg-[#111112] p-5 sm:h-full">
      {photo && (
        <>
          <Image src={photo} alt="" fill sizes="340px" className="object-cover opacity-50" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111112] via-[#111112]/85 to-[#111112]/40" />
        </>
      )}
      {messages.map((m, i) => (
        <div
          key={i}
          className={`relative flex ${m.from === "agent" ? "justify-start" : "justify-end"}`}
        >
          <div
            className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-[11.5px] leading-snug ${
              m.tag
                ? "border border-accent/40 bg-accent/10 text-accent"
                : m.from === "agent"
                  ? "rounded-bl-sm bg-white/[0.08] text-white/80"
                  : "rounded-br-sm bg-white/90 text-black"
            }`}
          >
            {m.text}
          </div>
        </div>
      ))}
    </div>
  );
}

export function PipelineMockup({ columns }) {
  return (
    <div className="h-52 w-full overflow-hidden bg-[#111112] p-5 sm:h-full">
      <div className="grid h-full grid-cols-3 gap-3">
        {columns.map((col) => (
          <div key={col.name} className="flex flex-col gap-2">
            <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wider text-white/35">
              <span className="h-1 w-1 rounded-full bg-accent" />
              {col.name}
            </div>
            {col.cards.map((c, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/10 bg-white/[0.05] px-2.5 py-2 text-[10.5px] leading-snug text-white/70"
              >
                {c}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function BrowserChrome({ url, children }) {
  return (
    <div className="h-52 w-full overflow-hidden bg-[#111112] p-4 sm:h-full">
      <div className="mb-3 flex items-center gap-1.5">
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="h-2 w-2 rounded-full bg-white/20" />
        <div className="ml-2 flex-1 truncate rounded-full bg-white/[0.07] px-3 py-1 text-[10px] text-white/40">
          {url}
        </div>
      </div>
      <div className="h-[calc(100%-2rem)] overflow-hidden rounded-lg bg-[#f1efe9]">
        {children}
      </div>
    </div>
  );
}

/** A photo-backed hero section styled as an original page design — not a screenshot of any real product. */
function PhotoHero({ hero }) {
  return (
    <div className="relative h-full w-full">
      <Image
        src={hero.image}
        alt=""
        fill
        sizes="340px"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
      <div className="relative flex h-full flex-col justify-between p-3.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-wide text-white">
            {hero.logo}
          </span>
          <div className="flex items-center gap-2.5">
            {hero.navLinks.map((l) => (
              <span key={l} className="text-[8px] text-white/75">
                {l}
              </span>
            ))}
            <span className="rounded-full bg-white px-2 py-0.5 text-[8px] font-semibold text-black">
              {hero.cta}
            </span>
          </div>
        </div>

        <div className="max-w-[75%]">
          {hero.badge && (
            <span className="mb-1.5 inline-block rounded-full bg-accent px-2 py-0.5 text-[8px] font-bold text-black">
              {hero.badge}
            </span>
          )}
          <p className="font-display text-[15px] font-extrabold leading-[1.15] text-white">
            {hero.headline}
          </p>
          <p className="mt-1 text-[9px] leading-snug text-white/80">
            {hero.subtext}
          </p>
        </div>
      </div>
    </div>
  );
}

export function BrowserMockup({ url, variant, hero }) {
  if (hero && (variant === "marketing" || variant === "realestate")) {
    return (
      <BrowserChrome url={url}>
        <PhotoHero hero={hero} />
      </BrowserChrome>
    );
  }

  return (
    <BrowserChrome url={url}>
      <div className="h-full p-3.5">
        {variant === "dashboard" ? (
          <div className="flex h-full gap-3">
            <div className="flex w-1/4 flex-col gap-1.5">
              <div className="h-2 w-full rounded bg-black/70" />
              <div className="h-2 w-4/5 rounded bg-black/15" />
              <div className="h-2 w-4/5 rounded bg-black/15" />
              <div className="h-2 w-4/5 rounded bg-black/15" />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="h-8 rounded-md bg-accent/25" />
                <div className="h-8 rounded-md bg-black/10" />
                <div className="h-8 rounded-md bg-black/10" />
              </div>
              <div className="flex-1 rounded-md bg-black/[0.06]" />
            </div>
          </div>
        ) : (
          <>
            <div className="mb-2.5 flex items-center justify-between">
              <div className="h-2 w-12 rounded bg-black/70" />
              <div className="h-2 w-9 rounded-full bg-black" />
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="rounded-md bg-white p-1 shadow-sm">
                  <div className={`mb-1 h-6 rounded ${i === 1 ? "bg-accent/30" : "bg-black/10"}`} />
                  <div className="h-1.5 w-3/5 rounded bg-black/40" />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </BrowserChrome>
  );
}
