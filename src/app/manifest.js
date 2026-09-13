export default function manifest() {
  return {
    name: "Abdullah Azhar — AI Automation & Full-Stack Studio",
    short_name: "Abdullah Azhar",
    description:
      "Autonomous AI Agents, CRM Workflows, and High-Performance Web Platforms that accelerate business operations.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0a",
    theme_color: "#0a0a0a",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
