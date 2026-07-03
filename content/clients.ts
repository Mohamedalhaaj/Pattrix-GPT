/**
 * Client roster — from the official Pattrix profile ("Brands We've Partnered
 * With"). Add `logo` (path under /public/logos) when a publishable logo file
 * is provided; the UI renders text-set entries until then.
 */

export interface Client {
  name: string;
  sector: string;
  logo?: string;
}

export const clients: Client[] = [
  { name: "UNSMIL", sector: "United Nations mission" },
  { name: "Hyundai Libya", sector: "Automotive" },
  { name: "Albaraka Insurance", sector: "Insurance" },
  { name: "MUSIAD", sector: "Business network" },
  { name: "Karjen Generators", sector: "Energy equipment" },
  { name: "Takadum", sector: "Corporate" },
  { name: "Biout Aleaz", sector: "Real estate" }
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
