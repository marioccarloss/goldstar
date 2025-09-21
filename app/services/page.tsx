import { Metadata } from "next";
import { getContent } from "@/lib/content";
import ServicesClient from "./services.client";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Professional Plumbing Services in Vancouver, BC",
  description: "Comprehensive plumbing services in Vancouver: emergency repairs, drain cleaning, water heater installation, pipe repair, and heating services. Licensed plumbers serving Greater Vancouver Area.",
  keywords: [
    "plumbing services Vancouver",
    "emergency plumbing Vancouver",
    "drain cleaning Vancouver",
    "water heater repair Vancouver",
    "pipe installation Vancouver",
    "bathroom plumbing Vancouver",
    "kitchen plumbing Vancouver",
    "heating services Vancouver",
    "commercial plumbing Vancouver",
    "residential plumbing Vancouver"
  ],
  openGraph: {
    title: "Professional Plumbing Services in Vancouver, BC | Gold Star Plumbing",
    description: "Comprehensive plumbing services in Vancouver: emergency repairs, drain cleaning, water heater installation, pipe repair, and heating services. Licensed plumbers serving Greater Vancouver Area.",
    url: 'https://www.goldstarplumbing.ca/services',
    images: [
      {
        url: '/goldstarplumbing.jpg',
        width: 1200,
        height: 630,
        alt: 'Gold Star Plumbing Services in Vancouver',
      },
    ],
  },
  twitter: {
    title: "Professional Plumbing Services in Vancouver, BC | Gold Star Plumbing",
    description: "Comprehensive plumbing services in Vancouver: emergency repairs, drain cleaning, water heater installation, pipe repair, and heating services.",
  },
  alternates: {
    canonical: '/services',
  },
};

export default async function Services() {
  const content = await getContent();
  return <ServicesClient initialContent={content} />;
}
