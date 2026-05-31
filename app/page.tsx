import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Portfolio } from "@/components/portfolio";
import { SiteHeader } from "@/components/site-header";
import { StoryJourney } from "@/components/story-journey";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteHeader />
      <Hero />
      <div id="journey" className="h-px bg-ink" aria-hidden="true" />
      <StoryJourney />
      <Portfolio />
      <Footer />
    </main>
  );
}
