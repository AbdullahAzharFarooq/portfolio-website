import { PROJECTS } from "@/lib/projects";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abdullahazhar.com";
  const currentDate = new Date().toISOString();

  const projectRoutes = PROJECTS.map((project) => ({
    url: `${baseUrl}/work/${project.slug}`,
    lastModified: currentDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    ...projectRoutes,
  ];
}
