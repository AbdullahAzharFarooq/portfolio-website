/**
 * Defines a reusable SVG filter graph that turns a photo into a pencil-sketch
 * line-art rendering entirely in the browser (grayscale -> inverted blur ->
 * color-dodge blend -> contrast). Referenced via `filter: url(#pencil-sketch)`.
 */
export default function SketchFilter() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <filter id="pencil-sketch" colorInterpolationFilters="sRGB">
        <feColorMatrix
          type="matrix"
          values="0.33 0.33 0.33 0 0
                  0.33 0.33 0.33 0 0
                  0.33 0.33 0.33 0 0
                  0    0    0    1 0"
          result="gray"
        />
        <feComponentTransfer in="gray" result="inverted">
          <feFuncR type="table" tableValues="1 0" />
          <feFuncG type="table" tableValues="1 0" />
          <feFuncB type="table" tableValues="1 0" />
        </feComponentTransfer>
        <feGaussianBlur in="inverted" stdDeviation="7" result="blurred" />
        <feBlend in="gray" in2="blurred" mode="color-dodge" result="dodged" />
        <feComponentTransfer in="dodged" result="sketch">
          <feFuncR type="linear" slope="1.55" intercept="-0.28" />
          <feFuncG type="linear" slope="1.55" intercept="-0.28" />
          <feFuncB type="linear" slope="1.55" intercept="-0.28" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}
