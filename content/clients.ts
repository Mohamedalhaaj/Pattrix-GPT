/**
 * Client roster — from the official Pattrix profile ("Brands We've Partnered
 * With"). Add `logo` (path under /public/logos) when a publishable logo file
 * is provided; the UI renders text-set entries until then.
 */

export interface Client {
  name: string;
  sector: string;
  /** Arabic sector label — factual descriptor only, shown on the Arabic home page. */
  arSector: string;
  logo?: string;
}

export const clients: Client[] = [
  { name: "UNSMIL", sector: "United Nations mission", arSector: "بعثة أممية" },
  { name: "Hyundai Libya", sector: "Automotive", arSector: "سيارات" },
  { name: "Albaraka Insurance", sector: "Insurance", arSector: "تأمين" },
  { name: "MUSIAD", sector: "Business network", arSector: "شبكة أعمال" },
  { name: "Karjen Generators", sector: "Energy equipment", arSector: "معدات طاقة" },
  { name: "Takadum", sector: "Corporate", arSector: "شركات" },
  { name: "Biout Aleaz", sector: "Real estate", arSector: "عقارات" },
  { name: "Tripoli Optics", sector: "Optics", arSector: "بصريات" }
];

export const sectors = [
  "International institutions",
  "Automotive",
  "Insurance",
  "Business networks",
  "Energy",
  "Real estate",
  "Events"
];
