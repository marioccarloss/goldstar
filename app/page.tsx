import { Hero } from "@/components/home/hero";
import { WorkItems } from "@/components/home/work-items";
import { WorkSection } from "@/components/home/work-section";
import { getContent } from "@/lib/content";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Gold Star Plumbing - Professional Plumbing Services in Vancouver, BC",
  description: "Professional plumbing services in Vancouver, BC. Emergency repairs, installations, drain cleaning, and heating services. Licensed plumbers serving Greater Vancouver Area. Call now!",
  keywords: [
    "plumbing Vancouver",
    "plumber Vancouver BC",
    "emergency plumbing Vancouver",
    "drain cleaning Vancouver",
    "water heater repair Vancouver",
    "plumbing services Vancouver",
    "licensed plumber Vancouver",
    "residential plumbing Vancouver",
    "commercial plumbing Vancouver",
    "heating services Vancouver"
  ],
  openGraph: {
    title: "Gold Star Plumbing - Professional Plumbing Services in Vancouver, BC",
    description: "Professional plumbing services in Vancouver, BC. Emergency repairs, installations, drain cleaning, and heating services. Licensed plumbers serving Greater Vancouver Area.",
    url: 'https://www.goldstarplumbing.ca',
    images: [
      {
        url: '/goldstarplumbing.jpg',
        width: 1200,
        height: 630,
        alt: 'Gold Star Plumbing - Professional Plumbing Services in Vancouver',
      },
    ],
  },
  twitter: {
    title: "Gold Star Plumbing - Professional Plumbing Services in Vancouver, BC",
    description: "Professional plumbing services in Vancouver, BC. Emergency repairs, installations, drain cleaning, and heating services. Licensed plumbers serving Greater Vancouver Area.",
    images: ['/goldstarplumbing.jpg'],
  },
  alternates: {
    canonical: '/',
  },
};

export default async function HomePage() {
  // Cargar contenido en el servidor para pintar el Hero inmediatamente (mejor LCP)
  const initialContent = await getContent();

  return (
    <>
      <Hero initialContent={initialContent} />
      <WorkSection initialContent={initialContent} />
      <WorkItems initialContent={initialContent} />
    </>
  );
}
