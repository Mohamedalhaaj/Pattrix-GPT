import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Method } from "@/components/method";
import { Portfolio } from "@/components/portfolio";
import { Credibility } from "@/components/credibility";
import { Services } from "@/components/services";
import { SiteHeader } from "@/components/site-header";
import { StudioManifesto } from "@/components/studio-manifesto";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteHeader />
      <Hero />
      <Credibility />
      <Portfolio />
      <StudioManifesto />
      <Services />
      <Method />
      <Footer />
    </main>
  );
}
