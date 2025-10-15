import Script from "next/script";

interface StructuredDataProps {
  type?: "homepage" | "about" | "services" | "contact";
}

export function StructuredData({ type = "homepage" }: StructuredDataProps) {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.goldstarplumbing.ca/#business",
    name: "Gold Star Plumbing",
    alternateName: "Gold Star Plumbing Services",
    description:
      "Professional plumbing services in Vancouver, BC. Emergency repairs, installations, drain cleaning, and heating services. Licensed plumbers serving Greater Vancouver Area.",
    url: "https://www.goldstarplumbing.ca",
    telephone: "+1-778-554-8619", // Replace with actual phone number
    email: "goldstarplumbingvancouver@gmail.com", // Replace with actual email
    priceRange: "$$",
    image: ["https://www.goldstarplumbing.ca/goldstarplumbing.jpg"],
    logo: {
      "@type": "ImageObject",
      url: "https://www.goldstarplumbing.ca/goldstarplumbing.jpg",
      width: 400,
      height: 400,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Main Street", // Replace with actual address
      addressLocality: "Vancouver",
      addressRegion: "BC",
      postalCode: "V6B 1A1", // Replace with actual postal code
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 49.2827, // Vancouver coordinates - replace with actual business location
      longitude: -123.1207,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Vancouver",
        sameAs: "https://en.wikipedia.org/wiki/Vancouver",
      },
      {
        "@type": "City",
        name: "Burnaby",
      },
      {
        "@type": "City",
        name: "Richmond",
      },
      {
        "@type": "City",
        name: "Surrey",
      },
      {
        "@type": "City",
        name: "North Vancouver",
      },
      {
        "@type": "City",
        name: "West Vancouver",
      },
    ],
    serviceType: [
      "Emergency Plumbing",
      "Drain Cleaning",
      "Water Heater Repair",
      "Pipe Installation",
      "Bathroom Plumbing",
      "Kitchen Plumbing",
      "Heating Services",
      "Commercial Plumbing",
      "Residential Plumbing",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Plumbing Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Emergency Plumbing Repair",
            description: "24/7 emergency plumbing services in Vancouver",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Drain Cleaning",
            description: "Professional drain cleaning and unclogging services",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Water Heater Services",
            description: "Water heater installation, repair, and maintenance",
          },
        },
      ],
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "16:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/goldstarplumbing", // Replace with actual social media
      "https://www.instagram.com/goldstarplumbing",
      "https://www.linkedin.com/company/goldstarplumbing",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1",
    },
  };

  // Add breadcrumb for non-homepage pages
  const breadcrumbData =
    type !== "homepage"
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://www.goldstarplumbing.ca",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: type.charAt(0).toUpperCase() + type.slice(1),
              item: `https://www.goldstarplumbing.ca/${type}`,
            },
          ],
        }
      : null;

  return (
    <>
      <Script
        id="business-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(baseStructuredData),
        }}
      />
      {breadcrumbData && (
        <Script
          id="breadcrumb-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbData),
          }}
        />
      )}
    </>
  );
}
