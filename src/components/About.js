import fs from "node:fs";
import path from "node:path";
import SketchPhoto from "@/components/SketchPhoto";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import PhotoReveal from "@/components/PhotoReveal";
import Reveal from "@/components/Reveal";
import ScrollTextReveal from "@/components/ScrollTextReveal";
import SplitText from "@/components/SplitText";

const BIO =
  "I don't start with a tech stack. I start with what's broken in your day: the follow-up that's two days late, the lead that lands in the wrong inbox, the report someone rebuilds by hand every Monday. Then I build whatever actually fixes it, whether that's an AI agent, a CRM workflow, or the website behind it, for teams tired of repeating the same manual steps every day.";

const HIGHLIGHTS = [
  "Fixes lost leads and slow follow-ups",
  "Rebuilds broken CRM workflows",
  "Builds the web systems that feed them",
];

export default function About() {
  const hasPhoto = fs.existsSync(
    path.join(process.cwd(), "public", "profile.jpg")
  );

  return (
    <section id="about" className="section-light container-px py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] xl:gap-24">
        <div>
          <Reveal direction="left" delay={100} duration={0.85}>
            <p className="font-script mb-2 text-2xl text-muted-light">
              About me
            </p>
          </Reveal>
          <SplitText
            as="h2"
            text="Hello!"
            className="font-display text-6xl font-extrabold leading-none sm:text-7xl text-ink-dark"
          />
          <Reveal direction="up" delay={250} duration={0.8}>
            <p className="font-display mt-4 text-xl font-semibold sm:text-2xl text-ink-dark">
              I&apos;m Abdullah Azhar<span className="text-accent-dark">.</span>
            </p>
          </Reveal>

          <ScrollTextReveal
            text={BIO}
            className="mt-6 max-w-2xl text-base leading-relaxed text-ink-dark sm:text-lg"
          />

          <ul className="mt-8 flex max-w-2xl flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-muted-light">
            {HIGHLIGHTS.map((h, i) => (
              <Reveal key={h} as="li" direction="up" delay={i * 120} duration={0.6} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-accent ring-2 ring-accent/30" />
                {h}
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="relative flex justify-center lg:justify-end">
          {hasPhoto ? (
            <>
              <PhotoReveal className="w-full max-w-lg">
                <SketchPhoto src="/profile.jpg" sketchSrc="/images/profile-sketch.png" alt="Portrait" />
              </PhotoReveal>
              <Reveal
                direction="up"
                delay={900}
                duration={0.7}
                className="absolute -bottom-5 left-4 z-10 sm:left-8"
              >
                <div className="flex items-center gap-3 rounded-full bg-black py-2 pl-4 pr-2 text-xs text-white shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)]">
                  <span className="flex items-center gap-1.5 whitespace-nowrap">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                    </span>
                    Available for hire
                  </span>
                  <a
                    href="#contact"
                    className="whitespace-nowrap rounded-full bg-accent px-3 py-1.5 font-semibold text-black transition-transform hover:scale-105"
                  >
                    Hire me
                  </a>
                </div>
              </Reveal>
            </>
          ) : (
            <Reveal direction="zoom" duration={0.8}>
              <PhotoPlaceholder />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
