import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { WhoWeAre } from "@/components/who-we-are";
import { Method } from "@/components/method";
import { Portfolio } from "@/components/portfolio";
import { Credibility } from "@/components/credibility";
import { Services } from "@/components/services";
import { SiteHeader } from "@/components/site-header";
import { RegionalPresence } from "@/components/regional-presence";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteHeader />
      <Hero />
      <WhoWeAre />
      <Services />
      <Credibility />
      <Method />
      <Portfolio />
      <RegionalPresence />
      <Footer />
    </main>
  );
}
