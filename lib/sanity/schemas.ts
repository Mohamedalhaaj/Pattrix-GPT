import { defineField, defineType } from "sanity";

/**
 * Sanity schemas mirroring the typed content system in content/*.ts.
 * Editing model: the site remains file-driven; `npm run sanity:pull`
 * materializes Studio edits back into content/*.ts (and downloads any
 * uploaded images into public/images/sanity/). See docs/rebuild/SANITY_GUIDE.md
 */

const formationOptions = [
  "signal",
  "orbit",
  "lattice",
  "stream",
  "weave",
  "constellation",
  "interference",
  "radiate",
  "converge",
  "noise"
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "metaTitle", type: "string", title: "Meta title (browser tab / Google)" }),
    defineField({ name: "metaDescription", type: "text", rows: 3, title: "Meta description" }),
    defineField({ name: "url", type: "string", title: "Site URL (for SEO links)" }),
    defineField({ name: "contactEmail", type: "string", title: "Contact email" }),
    defineField({
      name: "phones",
      type: "array",
      of: [{ type: "string" }],
      title: "Phone numbers"
    }),
    defineField({ name: "location", type: "string", title: "Location line" }),
    defineField({
      name: "socials",
      title: "Social links (only verified URLs)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", type: "string" }),
            defineField({ name: "href", type: "url" })
          ]
        }
      ]
    }),
    defineField({ name: "heroEyebrow", type: "string", title: "Hero — small line above headline" }),
    defineField({ name: "heroSub", type: "text", rows: 3, title: "Hero — supporting paragraph" }),
    defineField({ name: "positioningStatement", type: "text", rows: 3, title: "Positioning — big statement" }),
    defineField({ name: "positioningBody", type: "text", rows: 4, title: "Positioning — paragraph" }),
    defineField({ name: "workSub", type: "text", rows: 3, title: "Selected work — supporting line" }),
    defineField({ name: "clientsStatement", type: "text", rows: 2, title: "Clients — statement" }),
    defineField({ name: "aboutBody", type: "text", rows: 5, title: "About — paragraph" }),
    defineField({ name: "contactStatement", type: "string", title: "Contact — big statement" }),
    defineField({ name: "contactSub", type: "text", rows: 2, title: "Contact — supporting line" }),
    defineField({ name: "footerLine", type: "string", title: "Footer — description line" })
  ]
});

export const project = defineType({
  name: "project",
  title: "Projects (Selected Work)",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required()
    }),
    defineField({ name: "order", type: "number", title: "Order on the page (1 = first)" }),
    defineField({ name: "category", type: "string" }),
    defineField({ name: "year", type: "string" }),
    defineField({
      name: "services",
      type: "array",
      of: [{ type: "string" }],
      title: "Systems used (names from Services)"
    }),
    defineField({ name: "premise", type: "text", rows: 2, title: "One-line premise (home page)" }),
    defineField({ name: "challenge", type: "text", rows: 4 }),
    defineField({ name: "approach", type: "text", rows: 4 }),
    defineField({ name: "outcome", type: "text", rows: 4 }),
    defineField({ name: "accent", type: "string", title: "Accent color (hex)" }),
    defineField({
      name: "cover",
      type: "image",
      title: "Cover image (drag & drop to replace)",
      description: "Upload here to replace the current cover. Leave empty to keep the file in the repo."
    }),
    defineField({ name: "coverPath", type: "string", title: "Cover path in repo (fallback)", readOnly: false }),
    defineField({ name: "coverAlt", type: "string", title: "Cover description (alt text)" }),
    defineField({ name: "coverW", type: "number", hidden: true }),
    defineField({ name: "coverH", type: "number", hidden: true }),
    defineField({
      name: "gallery",
      type: "array",
      title: "Gallery (case-study page)",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "image", type: "image", title: "Image (drag & drop)" }),
            defineField({ name: "path", type: "string", title: "…or path in repo" }),
            defineField({ name: "alt", type: "string", title: "Description (alt text)" }),
            defineField({ name: "w", type: "number", hidden: true }),
            defineField({ name: "h", type: "number", hidden: true })
          ],
          preview: { select: { title: "alt", media: "image" } }
        }
      ]
    }),
    defineField({
      name: "videos",
      type: "array",
      title: "Videos (In motion)",
      description: "Video files live in the repo under public/videos/ — set the paths here.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "path", type: "string", title: "Video path (/videos/….mp4)" }),
            defineField({ name: "posterPath", type: "string", title: "Poster path (/videos/….jpg)" }),
            defineField({ name: "label", type: "string" }),
            defineField({ name: "w", type: "number" }),
            defineField({ name: "h", type: "number" })
          ],
          preview: { select: { title: "label" } }
        }
      ]
    })
  ],
  orderings: [
    { title: "Page order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }
  ],
  preview: { select: { title: "title", subtitle: "category", media: "cover" } }
});

export const service = defineType({
  name: "service",
  title: "Services (The Systems)",
  type: "document",
  fields: [
    defineField({ name: "index", type: "string", title: "Number (01–06)" }),
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "formation",
      type: "string",
      title: "Background field formation",
      options: { list: formationOptions }
    }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "includes", type: "array", of: [{ type: "string" }] })
  ],
  orderings: [{ title: "Number", name: "indexAsc", by: [{ field: "index", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "index" } }
});

export const client = defineType({
  name: "client",
  title: "Clients",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "sector", type: "string" }),
    defineField({ name: "order", type: "number" })
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "sector" } }
});

export const schemaTypes = [siteSettings, project, service, client];
