import { site } from "@/content/site";

/**
 * Site-wide structured data: one business entity typed as both Organization
 * and ProfessionalService, plus WebSite — rendered once from the root layout.
 * Every value must be traceable to
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

/**
 * ONE node, two types — not two nodes.
 *
 * This previously emitted a separate Organization and ProfessionalService that
 * carried the same name, url, logo, image, description, email, telephone and
 * address, and then linked them with
 * `parentOrganization: { "@id": ".../#organization" }` — which asserted that
 * Pattrix is a subsidiary of itself, and left a consumer to guess which of two
 * identical entities the rest of the graph meant. Every other reference on the
 * site (author, publisher, provider, creator, about) already points at
 * `#organization`, so that is the id that is kept; `#service` is dropped and
 * nothing referenced it.
 *
 * schema.org allows an array of types on one node, which is the correct way to
 * say "this single business is both an organization and a professional
 * service" and keeps the service-specific properties on the entity that
 * actually provides them.
 */
const organization = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo,
  image,
  description,
  email: site.contact.email,
  telephone: site.contact.phones[0],
  address,
  priceRange: site.business.priceRange,
  areaServed: ["Tripoli", "Libya", "Global"],
  serviceType: [
    "Strategic communications",
    "Public relations",
    "Campaign development",
    "Social media management",
    "Event coverage",
    "Content production",
    "Brand communication"
  ],
  // Social profiles are added in content/site.ts only once URLs are verified.
  ...(site.contact.socials.length > 0
    ? { sameAs: site.contact.socials.map((s) => s.href) }
    : {})
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
  "@graph": [organization, webSite]
};

// `<` is escaped so user-editable content can never close the script tag.
const json = JSON.stringify(graph).replace(/</g, "\\u003c");

export function JsonLd() {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
