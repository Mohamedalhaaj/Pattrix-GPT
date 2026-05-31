import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Portfolio } from "@/components/portfolio";
import { SiteHeader } from "@/components/site-header";
import { StoryJourney } from "@/components/story-journey";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-paper text-ink">
      <SiteHeader />
      <Hero />
      <section id="journey" className="scroll-mt-28 bg-ink">
        <div id="systems" className="scroll-mt-28">
          <StoryJourney />
        </div>
      </section>
      <Portfolio />
      <Footer />
    </main>
  );
}
