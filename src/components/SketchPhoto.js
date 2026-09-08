import Image from "next/image";

export default function SketchPhoto({ src, alt, sketchSrc }) {
  return (
    <div className="relative aspect-[4/5] w-full max-w-lg overflow-hidden rounded-2xl bg-[#e2e0d6] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.35)]">
      <Image
        src={sketchSrc || src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 512px"
        className={sketchSrc ? "object-contain" : "object-cover"}
        style={sketchSrc ? undefined : { filter: "url(#pencil-sketch)" }}
        priority
      />
    </div>
  );
}
