import { Sora, Caveat, Inter } from "next/font/google";
import "./globals.css";
import SketchFilter from "@/components/SketchFilter";
import GrainOverlay from "@/components/GrainOverlay";
import Preloader from "@/components/Preloader";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abdullahazhar.com";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Abdullah Azhar — I Fix The Bottlenecks Slowing Your Business Down",
    template: "%s | Abdullah Azhar",
  },
  description:
    "I find the bottleneck costing your team time or leads — a lead that sits too long, a report built by hand, a CRM nobody trusts — and build the AI agent, CRM workflow (HubSpot, Salesforce, Zoho), or website that fixes it for good.",
  keywords: [
    "AI Automation",
    "AI Agents",
    "CRM Workflows",
    "HubSpot Automation",
    "Salesforce Integration",
    "Zoho CRM Pipeline",
    "Next.js Developer",
    "Full-Stack Web Development",
    "Workflow Automation Specialist",
  ],
  authors: [{ name: "Abdullah Azhar", url: baseUrl }],
  creator: "Abdullah Azhar",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: "Abdullah Azhar — I Fix The Bottlenecks Slowing Your Business Down",
    description:
      "I find what's manual, slow, or duct-taped together across your tools, then build the AI agent, CRM workflow, or website that fixes it.",
    siteName: "Abdullah Azhar",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Abdullah Azhar — I Fix The Bottlenecks Slowing Your Business Down",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdullah Azhar — I Fix The Bottlenecks Slowing Your Business Down",
    description:
      "I find what's manual, slow, or duct-taped together across your tools, then build the fix.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${baseUrl}/#person`,
      name: "Abdullah Azhar",
      url: baseUrl,
      image: `${baseUrl}/profile.jpg`,
      jobTitle: "AI Automation Specialist & Full-Stack Engineer",
      description:
        "I find the bottleneck costing a business time or leads, then build the AI agent, CRM workflow, or website that fixes it.",
      knowsAbout: [
        "AI Agents",
        "CRM Automation",
        "HubSpot",
        "Salesforce",
        "Zoho",
        "Next.js",
        "React",
        "Full-Stack Development",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${baseUrl}/#website`,
      url: baseUrl,
      name: "Abdullah Azhar Portfolio",
      description: "Finding the bottleneck costing your business time or leads, and building the AI agent, CRM workflow, or website that fixes it.",
      publisher: { "@id": `${baseUrl}/#person` },
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sora.variable} ${caveat.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Preloader />
        <SketchFilter />
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
