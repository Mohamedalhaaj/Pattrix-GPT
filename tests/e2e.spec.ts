import { expect, test, type Page } from "@playwright/test";
import { insights } from "../content/insights";
import { projects } from "../content/projects";
import { servicePages } from "../content/service-pages";
import { site } from "../content/site";

const VIEWPORTS = [
  { w: 1440, h: 900 },
  { w: 1280, h: 800 },
  { w: 1024, h: 768 },
  { w: 768, h: 1024 },
  { w: 430, h: 932 },
  { w: 390, h: 844 },
  { w: 360, h: 800 }
];

function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console: ${m.text()}`);
  });
  return errors;
}

test.describe("home", () => {
  test("loads with correct metadata and hero", async ({ page }) => {
    const errors = collectErrors(page);
    await page.goto("/");
    await expect(page).toHaveTitle(/Pattrix — Marketing & PR Agency in Tripoli, Libya/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("patterns");
    await expect(page.locator("main section")).toHaveCount(8);
    expect(errors).toEqual([]);
  });

  test("all chapters and landmarks are present", async ({ page }) => {
    await page.goto("/");
    for (const id of ["positioning", "work", "services", "clients", "about", "contact"]) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
    await expect(page.getByRole("banner")).toBeVisible();
    await expect(page.getByRole("contentinfo")).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();
  });

  test("primary CTAs and contact actions are functional", async ({ page }) => {
    await page.goto("/");
    const mailtos = page.locator('a[href^="mailto:info@pattrix.co"]');
    expect(await mailtos.count()).toBeGreaterThanOrEqual(3);
    // Verified phone actions (contact band + footer).
    expect(await page.locator('a[href^="tel:+218"]').count()).toBeGreaterThanOrEqual(4);
    await expect(page.getByRole("link", { name: "See selected work" })).toHaveAttribute("href", "/#work");
    // No dead placeholder links anywhere.
    expect(await page.locator('a[href="#"]').count()).toBe(0);
  });

  test("anchor navigation scrolls to sections", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("navigation", { name: "Primary" }).getByRole("link", { name: "Work" }).click();
    await page.waitForTimeout(1200);
    const y = await page.evaluate(() => window.scrollY);
    expect(y).toBeGreaterThan(500);
  });

  test("services accordion is keyboard accessible", async ({ page }) => {
    await page.goto("/#services");
    const second = page.getByRole("button", { name: /Public Relations & Media/ });
    await second.click();
    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("Reputation built in public", { exact: false })).toBeVisible();
    // First row closed after opening the second.
    await expect(page.getByRole("button", { name: /Strategy & Positioning/ })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  test("keyboard: skip link and focus visibility", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    const skip = page.locator(".skip-link");
    await expect(skip).toBeFocused();
    await page.keyboard.press("Tab");
    // Header logo is an image link; verify via its accessible name.
    const focused = await page.evaluate(() => document.activeElement?.getAttribute("aria-label"));
    expect(focused).toBe("Pattrix — home");
  });
});

test.describe("service pages", () => {
  // Data-driven: every entry in content/service-pages.ts is exercised, so new
  // pages are covered the moment they are added to the content file.
  for (const sp of servicePages) {
    test(`${sp.path} renders with correct SEO`, async ({ page }) => {
      const errors = collectErrors(page);
      const res = await page.goto(sp.path);
      expect(res?.status()).toBe(200);
      // Exactly one visible H1 with the expected heading.
      expect(await page.locator("h1").count()).toBe(1);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(sp.h1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://pattrix.co${sp.path}`
      );
      // hreflang pair: en, ar, and x-default.
      for (const hl of ["en", "ar", "x-default"]) {
        expect(await page.locator(`link[rel="alternate"][hreflang="${hl}"]`).count()).toBe(1);
      }
      if (sp.locale === "ar") {
        await expect(page.locator('article[dir="rtl"][lang="ar"]')).toBeAttached();
      }
      // Site-wide @graph plus the page's Service/Breadcrumb block — exactly two.
      expect(await page.locator('script[type="application/ld+json"]').count()).toBe(2);
      // Public pages must stay indexable.
      expect(await page.locator('meta[name="robots"][content*="noindex"]').count()).toBe(0);
      expect(errors).toEqual([]);
    });
  }

  test("service pages cross-link and CTA works", async ({ page }) => {
    await page.goto("/services/pr-agency-libya");
    await expect(
      page.locator("main").getByRole("link", { name: "Strategic communications in Libya" })
    ).toHaveAttribute("href", "/services/strategic-communications-libya");
    await expect(page.getByRole("link", { name: "اقرأ هذه الصفحة بالعربية" })).toHaveAttribute(
      "href",
      "/ar/services/pr-agency-libya"
    );
    expect(await page.locator('a[href^="mailto:info@pattrix.co"]').count()).toBeGreaterThanOrEqual(1);
  });

  test("sitemap includes every service, insight, and hub URL", async ({ request }) => {
    const res = await request.get("/sitemap.xml");
    expect(res.status()).toBe(200);
    const body = await res.text();
    for (const sp of servicePages) {
      expect(body).toContain(`https://pattrix.co${sp.path}`);
    }
    if (insights.length > 0) {
      expect(body).toContain("https://pattrix.co/insights");
      for (const a of insights) {
        expect(body).toContain(`https://pattrix.co${a.path}`);
      }
    }
    // Hub routes carry the middle crumb of every service and case-study
    // BreadcrumbList, so they must be listed.
    for (const hub of ["/services", "/work", "/ar", "/ar/services", "/ar/insights", "/ar/work"]) {
      expect(body).toContain(`https://pattrix.co${hub}`);
    }
    for (const p of projects) {
      expect(body).toContain(`https://pattrix.co/work/${p.slug}`);
      if (p.ar) expect(body).toContain(`https://pattrix.co/ar/work/${p.slug}`);
    }
  });

  test("footer links to every footer service entry", async ({ page }) => {
    await page.goto("/");
    const footer = page.getByRole("contentinfo");
    for (const item of site.footerServices) {
      await expect(footer.getByRole("link", { name: item.label })).toHaveAttribute(
        "href",
        item.href
      );
    }
  });

  test("unknown service slug 404s", async ({ page }) => {
    const res = await page.goto("/services/not-a-real-service");
    expect(res?.status()).toBe(404);
    const resAr = await page.goto("/ar/services/not-a-real-service");
    expect(resAr?.status()).toBe(404);
  });
});

test.describe("insights", () => {
  test("hub renders with all article cards", async ({ page }) => {
    const errors = collectErrors(page);
    const res = await page.goto("/insights");
    expect(res?.status()).toBe(200);
    expect(await page.locator("h1").count()).toBe(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://pattrix.co/insights"
    );
    for (const a of insights) {
      await expect(page.locator(`main a[href="${a.path}"]`)).toBeAttached();
    }
    expect(errors).toEqual([]);
  });

  // Data-driven: every entry in content/insights.ts is exercised.
  for (const a of insights) {
    test(`${a.path} renders with correct SEO`, async ({ page }) => {
      const errors = collectErrors(page);
      const res = await page.goto(a.path);
      expect(res?.status()).toBe(200);
      expect(await page.locator("h1").count()).toBe(1);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(a.h1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://pattrix.co${a.path}`
      );
      if (a.counterpartPath) {
        for (const hl of ["en", "ar", "x-default"]) {
          expect(await page.locator(`link[rel="alternate"][hreflang="${hl}"]`).count()).toBe(1);
        }
      }
      if (a.locale === "ar") {
        await expect(page.locator('article[dir="rtl"][lang="ar"]')).toBeAttached();
      }
      // Site-wide @graph plus the Article/Breadcrumb block — exactly two.
      expect(await page.locator('script[type="application/ld+json"]').count()).toBe(2);
      expect(await page.locator('meta[name="robots"][content*="noindex"]').count()).toBe(0);
      // Article links back to its supporting service page.
      await expect(page.locator(`main a[href="${a.relatedService.href}"]`).first()).toBeAttached();
      expect(errors).toEqual([]);
    });
  }

  test("unknown insight slug 404s", async ({ page }) => {
    const res = await page.goto("/insights/not-a-real-article");
    expect(res?.status()).toBe(404);
  });
});

test.describe("case studies", () => {
  test("home work card navigates to case study and next-case works", async ({ page }) => {
    await page.goto("/#work");
    // Let the section's once-only reveal fire before interacting.
    await page.waitForTimeout(1400);
    // The card carries no aria-label (that would override its visible text and
    // trip WCAG 2.5.3), so its accessible name is computed from its contents —
    // category, year, title, premise. Matching on the title alone is enough.
    await page
      .getByRole("link", { name: /UNSMIL — Strategic Communications & Institutional Media/ })
      .click();
    await expect(page).toHaveURL(/\/work\/unsmil-strategic-communications/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText("UNSMIL");
    await expect(page.getByText("The challenge")).toBeVisible();
    await page.getByRole("link", { name: "Read next" }).click();
    await expect(page).toHaveURL(/\/work\/hyundai-libya-showroom-identity/);
  });

  test("unknown slug 404s", async ({ page }) => {
    const res = await page.goto("/work/not-a-real-project");
    expect(res?.status()).toBe(404);
  });
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("menu opens, traps interaction, closes on Escape", async ({ page }) => {
    await page.goto("/");
    // Name flips Open/Close menu with state — target by aria-controls.
    const btn = page.locator('button[aria-controls="mobile-menu"]');
    await btn.click();
    await expect(btn).toHaveAttribute("aria-expanded", "true");
    const menu = page.locator("#mobile-menu");
    await expect(menu.getByRole("link", { name: "Services" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(btn).toHaveAttribute("aria-expanded", "false");
    // Menu links unreachable when closed.
    await expect(menu.getByRole("link", { name: "Services" })).not.toBeVisible();
  });

  test("mobile menu link navigates and closes", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await page.locator("#mobile-menu").getByRole("link", { name: "About" }).click();
    await page.waitForTimeout(1200);
    expect(await page.evaluate(() => window.scrollY)).toBeGreaterThan(500);
  });
});

/**
 * The Arabic site. /ar/* has its own root layout (app/(ar)/layout.tsx), so the
 * document itself — not just an inner wrapper — must declare Arabic and RTL,
 * and the chrome must be translated. These assertions are what would have
 * caught the English header shipping on Arabic pages.
 */
test.describe("arabic site", () => {
  const arRoutes = [
    "/ar",
    "/ar/services",
    "/ar/insights",
    "/ar/work",
    ...projects.filter((p) => p.ar).map((p) => `/ar/work/${p.slug}`),
    ...servicePages.filter((p) => p.locale === "ar").map((p) => p.path)
  ];

  for (const path of arRoutes) {
    test(`${path} declares Arabic and RTL on <html>`, async ({ page }) => {
      const errors = collectErrors(page);
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      const html = page.locator("html");
      await expect(html).toHaveAttribute("lang", "ar");
      await expect(html).toHaveAttribute("dir", "rtl");
      expect(await page.locator("h1").count()).toBe(1);
      // Chrome is translated, not the English nav.
      await expect(page.getByRole("banner").getByRole("link", { name: "الخدمات" })).toBeAttached();
      expect(errors).toEqual([]);
    });
  }

  test("english routes stay LTR", async ({ page }) => {
    for (const path of ["/", "/services", "/work", "/insights"]) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("lang", "en");
      await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    }
  });

  test("arabic case studies mirror their english counterparts", async ({ page }) => {
    for (const p of projects.filter((x) => x.ar)) {
      const res = await page.goto(`/ar/work/${p.slug}`);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toContainText(p.ar!.title);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://pattrix.co/ar/work/${p.slug}`
      );
      for (const hl of ["en", "ar", "x-default"]) {
        expect(await page.locator(`link[rel="alternate"][hreflang="${hl}"]`).count()).toBe(1);
      }
    }
  });

  test("arabic hero mirrors the english CTAs", async ({ page }) => {
    await page.goto("/ar");
    // Primary CTA anchors to the on-page work chapter (counterpart of
    // "See selected work" → /#work). Deliberately NOT "كل الأعمال", which is
    // the work chapter's hub link on the same page — the label must stay
    // unique per destination.
    await expect(page.getByRole("link", { name: "شاهد أعمالاً مختارة" })).toHaveAttribute(
      "href",
      "/ar#ar-work"
    );
    await expect(page.locator("#ar-work")).toBeAttached();
    // Secondary CTA starts a project by mail, as on the English hero.
    await expect(
      page.locator("main").getByRole("link", { name: "ابدأ مشروعاً" }).first()
    ).toHaveAttribute("href", "mailto:info@pattrix.co");
  });

  test("arabic services accordion opens, retunes, and closes", async ({ page }) => {
    await page.goto("/ar");
    const second = page.getByRole("button", { name: /العلاقات العامة والإعلام/ });
    await second.scrollIntoViewIfNeeded();
    await second.click();
    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(page.getByText("سمعة تُبنى على الملأ", { exact: false })).toBeVisible();
    // First row closed after opening the second.
    await expect(page.getByRole("button", { name: /الاستراتيجية والتموضع/ })).toHaveAttribute(
      "aria-expanded",
      "false"
    );
  });

  test("arabic interlude keeps all three statements readable", async ({ page }) => {
    // Reduced motion: the interlude renders as a static navy block, so the
    // lines must be visible without any scrub — mirrors the English check.
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/ar");
    const line = page.getByText("كلها تقريباً ضجيج.");
    await line.scrollIntoViewIfNeeded();
    await expect(line).toBeVisible();
    const opacity = await line.evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacity)).toBeGreaterThan(0.9);
    await expect(page.getByText("بعد التصفية", { exact: false })).toBeVisible();
  });

  test("unmatched /ar URLs render the Arabic 404", async ({ page }) => {
    const res = await page.goto("/ar/this-route-does-not-exist");
    expect(res?.status()).toBe(404);
    // The catch-all keeps dead Arabic URLs inside the (ar) root layout — an
    // Arabic document, not the English global 404. NOTE: dynamic notFound()
    // responses ship as Next's error shell and hydrate into this content
    // client-side (same as the English dynamic 404s), so these assertions
    // hold after hydration — which Playwright runs. The raw HTML carries the
    // 404 status, which is the signal crawlers act on.
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.getByRole("heading", { level: 1 })).toContainText("النمط");
    await expect(page.getByRole("link", { name: "الرئيسية" })).toHaveAttribute("href", "/ar");
  });

  test("language switch round-trips between the two sites", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("banner").getByRole("link", { name: "التبديل إلى العربية" }).click();
    await expect(page).toHaveURL(/\/ar$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await page.getByRole("banner").getByRole("link", { name: "Switch to English" }).click();
    await expect(page).toHaveURL(/\/$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
  });

  // The switch resolves the real counterpart route. Where none exists it walks
  // UP to the nearest ancestor that does, rather than dumping the reader on the
  // other home page: someone reading an article who asks for Arabic should land
  // on the Arabic articles hub, not the Arabic front page.
  test("language switch lands on the counterpart page, never a 404", async ({ page, request }) => {
    const cases: [string, string][] = [
      ["/services", "/ar/services"],
      ["/work", "/ar/work"],
      ["/insights", "/ar/insights"],
      ["/services/pr-agency-libya", "/ar/services/pr-agency-libya"],
      ["/work/unsmil-strategic-communications", "/ar/work/unsmil-strategic-communications"],
      ["/ar/services", "/services"],
      ["/ar/work/unsmil-strategic-communications", "/work/unsmil-strategic-communications"],
      // Both articles now have Arabic counterparts, so the switch must resolve
      // the exact article — these two used to fall back to the /ar/insights hub.
      ["/insights/pr-vs-marketing-libya", "/ar/insights/pr-vs-marketing-libya"],
      [
        "/insights/strategic-communications-libyan-institutions",
        "/ar/insights/strategic-communications-libyan-institutions"
      ]
    ];
    for (const [from, expected] of cases) {
      await page.goto(from);
      const sw = page.getByRole("banner").getByRole("link", { name: /التبديل إلى العربية|Switch to English/ });
      await expect(sw).toHaveAttribute("href", expected);
      expect((await request.get(expected)).status(), `${from} -> ${expected}`).toBe(200);
    }
  });
});

test.describe("responsive: no horizontal overflow", () => {
  // Both sites: RTL mirrors every logical property, so overflow can regress on
  // one side while the other stays clean.
  for (const vp of VIEWPORTS) {
    for (const route of ["/", "/ar"]) {
      test(`${route} ${vp.w}x${vp.h}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.w, height: vp.h });
        const errors = collectErrors(page);
        await page.goto(route);
        await page.evaluate(async () => {
          const step = window.innerHeight * 0.8;
          for (let y = 0; y <= document.body.scrollHeight; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 60));
          }
        });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - document.documentElement.clientWidth
        );
        expect(overflow, "horizontal overflow px").toBeLessThanOrEqual(0);
        expect(errors).toEqual([]);
      });
    }
  }
});

test.describe("reduced motion", () => {
  test("content fully readable without animation", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    // Interlude renders as a static navy block with all lines visible.
    const line = page.getByText("Almost all of them are noise.");
    await line.scrollIntoViewIfNeeded();
    await expect(line).toBeVisible();
    const opacity = await line.evaluate((el) => getComputedStyle(el).opacity);
    expect(Number(opacity)).toBeGreaterThan(0.9);
    // Work section content visible without scroll-triggered reveals.
    const work = page.locator("#work h2");
    await work.scrollIntoViewIfNeeded();
    await expect(work).toBeVisible();
  });
});
