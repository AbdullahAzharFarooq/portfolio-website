import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudyDetail from "@/components/CaseStudyDetail";
import Reveal from "@/components/Reveal";
import SplitText from "@/components/SplitText";
import { CATEGORY_META, PROJECTS, getProject } from "@/lib/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Case Study`,
    description: project.desc,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const meta = CATEGORY_META[project.categoryKey] || { label: "Case Study" };

  return (
    <>
      <Nav />
      <main>
        {/* Page Hero Header */}
        <header className="section-dark container-px relative flex min-h-[40vh] flex-col justify-end overflow-hidden pb-12 pt-28">
          <div className="bg-grid absolute inset-0" aria-hidden="true" />
          <div className="pointer-events-none absolute h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />

          <div className="relative mx-auto w-full max-w-[1300px]">
            <Reveal direction="left" duration={0.7}>
              <Link
                href="/#work"
                className="group mb-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-dark transition-colors hover:text-accent"
              >
                <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span> Back to all Case Studies
              </Link>
              <p className="font-script text-lg sm:text-xl text-accent">{meta.label}</p>
            </Reveal>
            <SplitText
              as="h1"
              text={project.title}
              stagger={0.04}
              className="font-display mt-1 block text-3xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl max-w-4xl text-white"
            />
            <Reveal direction="up" delay={400} duration={0.7}>
              <p className="mt-3 text-xs sm:text-sm text-muted-dark uppercase tracking-widest font-semibold">
                Client: {project.client}
              </p>
            </Reveal>
          </div>
        </header>

        {/* Case Study Body */}
        <div className="section-light container-px py-12 sm:py-20">
          <CaseStudyDetail project={project} />
        </div>
      </main>
      <Footer />
    </>
  );
}
