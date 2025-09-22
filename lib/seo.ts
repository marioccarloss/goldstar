// SEO utility functions for Gold Star Plumbing

export const siteConfig = {
  name: "Gold Star Plumbing",
  description: "Professional plumbing services in Vancouver, BC. Emergency repairs, installations, drain cleaning, and heating services. Licensed plumbers serving Greater Vancouver Area.",
  url: "https://www.goldstarplumbing.ca",
  ogImage: "/images/plumbing-repair.jpg",
  links: {
    twitter: "https://twitter.com/goldstarplumbing",
    facebook: "https://facebook.com/goldstarplumbing",
    instagram: "https://instagram.com/goldstarplumbing",
  },
  business: {
    name: "Gold Star Plumbing",
    phone: "+1-604-XXX-XXXX", // Replace with actual phone
    email: "info@goldstarplumbing.ca", // Replace with actual email
    address: {
      street: "123 Main Street", // Replace with actual address
      city: "Vancouver",
      province: "BC",
      postalCode: "V6B 1A1", // Replace with actual postal code
      country: "Canada",
    },
    serviceAreas: [
      "Vancouver",
      "Burnaby",
      "Richmond",
      "Surrey",
      "North Vancouver",
      "West Vancouver",
      "Coquitlam",
      "New Westminster",
      "Delta",
      "Langley",
    ],
    services: [
      "Emergency Plumbing",
      "Drain Cleaning",
      "Water Heater Repair",
      "Pipe Installation",
      "Bathroom Plumbing",
      "Kitchen Plumbing",
      "Heating Services",
      "Commercial Plumbing",
      "Residential Plumbing",
      "Leak Detection",
      "Sewer Line Repair",
      "Fixture Installation",
    ],
  },
};

export function generateCanonicalUrl(path: string): string {
  return `${siteConfig.url}${path}`;
}

export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    "name": siteConfig.business.name,
    "description": siteConfig.description,
    "url": siteConfig.url,
    "telephone": siteConfig.business.phone,
    "email": siteConfig.business.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": siteConfig.business.address.street,
      "addressLocality": siteConfig.business.address.city,
      "addressRegion": siteConfig.business.address.province,
      "postalCode": siteConfig.business.address.postalCode,
      "addressCountry": siteConfig.business.address.country,
    },
    "areaServed": siteConfig.business.serviceAreas.map(area => ({
      "@type": "City",
      "name": area,
    })),
    "serviceType": siteConfig.business.services,
    "priceRange": "$$",
    "image": `${siteConfig.url}${siteConfig.ogImage}`,
    "logo": {
      "@type": "ImageObject",
      "url": `${siteConfig.url}${siteConfig.ogImage}`,
    },
  };
}

export const vancouverKeywords = [
  "plumbing Vancouver",
  "plumber Vancouver BC",
  "emergency plumbing Vancouver",
  "drain cleaning Vancouver",
  "water heater repair Vancouver",
  "plumbing services Vancouver",
  "licensed plumber Vancouver",
  "residential plumbing Vancouver",
  "commercial plumbing Vancouver",
  "heating services Vancouver",
  "Vancouver plumbing company",
  "Greater Vancouver plumbing",
  "Metro Vancouver plumber",
  "Vancouver emergency plumber",
  "24/7 plumber Vancouver",
];

export function generatePageMetadata(page: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}) {
  return {
    title: page.title,
    description: page.description,
    keywords: [...(page.keywords || []), ...vancouverKeywords],
    openGraph: {
      title: page.title,
      description: page.description,
      url: generateCanonicalUrl(page.path),
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - ${page.title}`,
        },
      ],
      locale: "en_CA",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [siteConfig.ogImage],
    },
    alternates: {
      canonical: page.path,
    },
  };
}