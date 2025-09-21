import ContactClient from "@/components/contact/contact-client";
import { getContent } from "@/lib/content";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Contact Gold Star Plumbing - Vancouver Plumbers | Get Free Quote",
  description:
    "Contact Gold Star Plumbing for professional plumbing services in Vancouver, BC. Get a free quote, emergency service available 24/7. Call now for fast, reliable plumbing solutions.",
  keywords: [
    "contact Gold Star Plumbing",
    "Vancouver plumber contact",
    "plumbing quote Vancouver",
    "emergency plumber Vancouver",
    "plumbing services Vancouver contact",
    "Vancouver plumbing phone number",
    "get plumbing quote Vancouver",
    "24/7 plumber Vancouver",
  ],
  openGraph: {
    title: "Contact Gold Star Plumbing - Vancouver Plumbers | Get Free Quote",
    description:
      "Contact Gold Star Plumbing for professional plumbing services in Vancouver, BC. Get a free quote, emergency service available 24/7.",
    url: "https://goldstarplumbing.ca/contact",
    images: [
      {
        url: "/goldstarplumbing.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Gold Star Plumbing Vancouver",
      },
    ],
  },
  twitter: {
    title: "Contact Gold Star Plumbing - Vancouver Plumbers | Get Free Quote",
    description:
      "Contact Gold Star Plumbing for professional plumbing services in Vancouver, BC. Get a free quote, emergency service available 24/7.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default async function Contact() {
  const content = await getContent();
  return <ContactClient initialContent={content} />;
}
