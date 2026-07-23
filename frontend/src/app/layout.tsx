import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { GoogleAnalytics } from "@next/third-parties/google";

const outfit = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abdul Razak | AI Engineer & Systems Architect",
  description: "Personal portfolio and AI identity of Abdul Razak N. Showcase of machine learning models, low-latency distributed systems, and backend engineering excellence.",
  metadataBase: new URL("https://abdulrasak.me"),
  alternates: {
    canonical: "/",
  },
  keywords: ["AI Engineer", "Machine Learning", "Distributed Systems", "Spring Boot", "FastAPI", "Next.js", "LangGraph", "Qdrant", "GPU serving", "Software Engineer"],
  authors: [{ name: "Abdul Razak N" }],
  openGraph: {
    title: "Abdul Razak | AI Engineer & Systems Architect",
    description: "Personal portfolio and AI identity of Abdul Razak N. Showcase of machine learning models, low-latency distributed systems, and backend engineering excellence.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Abdul Razak N",
    "jobTitle": "AI Engineer & Systems Architect",
    "url": "https://abdulrasak.me",
    "sameAs": [
      "https://www.linkedin.com/in/abdul-rasak-n-46b178279/",
      "https://github.com/iamRaz-01"
    ],
    "knowsAbout": [
      "Software Engineering",
      "Machine Learning",
      "Distributed Systems",
      "Java",
      "Spring Boot",
      "FastAPI",
      "Qdrant",
      "Docker",
      "Kubernetes"
    ]
  };

  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} scroll-smooth`}
    >
      <body className="bg-background text-foreground min-h-screen flex flex-col antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-grow flex flex-col">{children}</main>
        <Footer />
      </body>
      <GoogleAnalytics gaId="G-9Y1NVF0BD1" />
    </html>
  );
}
