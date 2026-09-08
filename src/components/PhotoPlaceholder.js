export default function PhotoPlaceholder() {
  return (
    <div className="relative flex aspect-[4/5] w-full max-w-sm flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-black/20 bg-card-light p-8 text-center">
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-black/30"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
      </svg>
      <p className="font-script text-xl text-black/50">waiting on you</p>
      <p className="max-w-[220px] text-xs text-muted-light">
        Drop your photo in as <code className="font-mono">public/profile.jpg</code>{" "}
        and it&apos;ll turn into the line-art portrait automatically.
      </p>
    </div>
  );
}
