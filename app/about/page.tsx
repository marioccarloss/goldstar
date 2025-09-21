import { Metadata } from "next";
import { getContent } from "@/lib/content";
import AboutClient from "@/components/about/about-client";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "About Gold Star Plumbing - Licensed Plumbers in Vancouver, BC",
  description: "Learn about Gold Star Plumbing, Vancouver's trusted plumbing company. Licensed, insured, and experienced plumbers serving Greater Vancouver Area since [year]. Quality workmanship guaranteed.",
  keywords: [
    "about Gold Star Plumbing",
    "licensed plumbers Vancouver",
    "Vancouver plumbing company",
    "experienced plumbers Vancouver BC",
    "trusted plumbing services Vancouver",
    "insured plumbers Vancouver",
    "plumbing company history Vancouver"
  ],
  openGraph: {
    title: "About Gold Star Plumbing - Licensed Plumbers in Vancouver, BC",
    description: "Learn about Gold Star Plumbing, Vancouver's trusted plumbing company. Licensed, insured, and experienced plumbers serving Greater Vancouver Area.",
    url: 'https://www.goldstarplumbing.ca/about',
    images: [
      {
        url: '/goldstarplumbing.jpg',
        width: 1200,
        height: 630,
        alt: 'About Gold Star Plumbing - Vancouver Plumbers',
      },
    ],
  },
  twitter: {
    title: "About Gold Star Plumbing - Licensed Plumbers in Vancouver, BC",
    description: "Learn about Gold Star Plumbing, Vancouver's trusted plumbing company. Licensed, insured, and experienced plumbers serving Greater Vancouver Area.",
  },
  alternates: {
    canonical: '/about',
  },
};

export default async function AboutPage() {
  const content = await getContent();
  return <AboutClient initialContent={content} />;
}
