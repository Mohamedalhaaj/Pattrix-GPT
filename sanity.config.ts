"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./lib/sanity/schemas";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "0rakouhl";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "pattrix",
  title: "Pattrix — Content",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            S.documentTypeListItem("project").title("Projects (Selected Work)"),
            S.documentTypeListItem("service").title("Services (The Systems)"),
            S.documentTypeListItem("client").title("Clients")
          ])
    })
  ],
  schema: { types: schemaTypes }
});
