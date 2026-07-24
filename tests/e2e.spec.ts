import { expect, test, type Page } from "@playwright/test";
import { insights } from "../content/insights";
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
    await page
      .getByRole("link", { name: /UNSMIL — Strategic Communications & Institutional Media — read the case study/ })
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

test.describe("responsive: no horizontal overflow", () => {
  for (const vp of VIEWPORTS) {
    test(`${vp.w}x${vp.h}`, async ({ page }) => {
      await page.setViewportSize({ width: vp.w, height: vp.h });
      const errors = collectErrors(page);
      await page.goto("/");
      // Walk the page so lazy reveals run and layout settles.
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
