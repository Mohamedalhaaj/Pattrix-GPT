import { site } from "@/content/site";

/**
 * Site-wide structured data (Organization, ProfessionalService, WebSite),
 * rendered once from the root layout. Every value must be traceable to
 * content/*.ts or the public brand assets — no invented facts (see AGENTS.md).
 * Address, postal code, and price range come from site.business (approved
 * public details).
 */

const description =
  "Pattrix is a strategic communications and PR agency in Tripoli, Libya, working with brands and institutions globally.";

const logo = `${site.url}/brand/logo-dark.png`;

// Stable build-generated brand card (1200×630) served by Next's file
// convention — crawlable at a fixed path, so it doubles as the schema image.
const image = `${site.url}/opengraph-image`;

// Shared between Organization and ProfessionalService so the two nodes can
// never drift into conflicting address values.
const address = {
  "@type": "PostalAddress",
  streetAddress: site.business.streetAddress,
  addressLocality: site.business.addressLocality,
  postalCode: site.business.postalCode,
  addressCountry: site.business.addressCountry
};

const organization = {
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo,
  image,
  description,
  email: site.contact.email,
  telephone: site.contact.phones[0],
  address,
  // Social profiles are added in content/site.ts only once URLs are verified.
  ...(site.contact.socials.length > 0
    ? { sameAs: site.contact.socials.map((s) => s.href) }
    : {})
};

const professionalService = {
  "@type": "ProfessionalService",
  "@id": `${site.url}/#service`,
  name: site.name,
  url: site.url,
  logo,
  image,
  description,
  email: site.contact.email,
  telephone: site.contact.phones[0],
  priceRange: site.business.priceRange,
  address,
  parentOrganization: { "@id": `${site.url}/#organization` },
  areaServed: ["Tripoli", "Libya", "Global"],
  serviceType: [
    "Strategic communications",
    "Public relations",
    "Campaign development",
    "Social media management",
    "Event coverage",
    "Content production",
    "Brand communication"
  ]
};

const webSite = {
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  publisher: { "@id": `${site.url}/#organization` }
};

const graph = {
  "@context": "https://schema.org",
  "@graph": [organization, professionalService, webSite]
};

// `<` is escaped so user-editable content can never close the script tag.
const json = JSON.stringify(graph).replace(/</g, "\\u003c");

export function JsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
