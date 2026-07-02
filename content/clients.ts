/**
 * Client roster. Names only — add `logo` (path under /public/logos) when a
 * publishable logo file is provided; the UI renders text-set entries until then.
 */

export interface Client {
  name: string;
  sector: string;
  logo?: string;
}

export const clients: Client[] = [
  { name: "Hyundai", sector: "Automotive" },
  { name: "United Nations", sector: "Institutional" },
  { name: "MUSIAD", sector: "Business association" },
  { name: "Al Baraka Insurance", sector: "Insurance" },
  { name: "TBC", sector: "Corporate" },
  { name: "Optics", sector: "Retail" },
  { name: "Retail Groups", sector: "Retail" }
];

export const sectors = [
  "Institutional",
  "Insurance",
  "NGOs",
  "Retail",
  "Electronics",
  "Optics",
  "Construction",
  "Events"
];
