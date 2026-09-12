import fs from "node:fs";
import path from "node:path";
import SketchPhoto from "@/components/SketchPhoto";
import PhotoPlaceholder from "@/components/PhotoPlaceholder";
import Reveal from "@/components/Reveal";

export default function About() {
  const hasPhoto = fs.existsSync(
    path.join(process.cwd(), "public", "profile.jpg")
  );

  return (
    <section id="about" className="section-light container-px py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] xl:gap-24">
        <Reveal direction="left" delay={100} duration={0.85}>
          <p className="font-script mb-2 text-2xl text-muted-light">
            About me
          </p>
          <h2 className="font-display text-6xl font-extrabold leading-none sm:text-7xl text-ink-dark">
            Hello!
          </h2>
          <p className="font-display mt-4 text-xl font-semibold sm:text-2xl text-ink-dark">
            I&apos;m Abdullah Azhar.
          </p>

          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-light sm:text-lg">
            I don&apos;t start with a tech stack. I start with what&apos;s
            broken in your day: the follow-up that&apos;s two days late, the
            lead that lands in the wrong inbox, the report someone rebuilds
            by hand every Monday. Then I build whatever actually fixes it,
            whether that&apos;s an AI agent, a CRM workflow, or the website
            behind it, for teams tired of repeating the same manual steps
            every day.
          </p>

          <ul className="mt-8 flex max-w-2xl flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-muted-light">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Fixes lost leads and slow follow-ups
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Rebuilds broken CRM workflows
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Builds the web systems that feed them
            </li>
          </ul>
        </Reveal>

        <Reveal direction="right" delay={250} duration={0.85} className="relative flex justify-center lg:justify-end">
          {hasPhoto ? (
            <>
              <SketchPhoto src="/profile.jpg" sketchSrc="/images/profile-sketch.png" alt="Portrait" />
              <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-full bg-black py-2 pl-4 pr-2 text-xs text-white shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)] sm:left-8">
                <span className="flex items-center gap-1.5 whitespace-nowrap">
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                  Available for hire
                </span>
                <a
                  href="/#top"
                  className="whitespace-nowrap rounded-full bg-accent px-3 py-1.5 font-semibold text-black transition-transform hover:scale-105"
                >
                  Hire me
                </a>
              </div>
            </>
          ) : (
            <PhotoPlaceholder />
          )}
        </Reveal>
      </div>
    </section>
  );
}
