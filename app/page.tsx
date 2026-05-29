import { Footer } from "@/components/footer";
import { Hero } from "@/components/hero";
import { Method } from "@/components/method";
import { Portfolio } from "@/components/portfolio";
import { Services } from "@/components/services";
import { SiteHeader } from "@/components/site-header";
import { StudioManifesto } from "@/components/studio-manifesto";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-paper text-ink">
      <SiteHeader />
      <Hero />
      <Portfolio />
      <StudioManifesto />
      <Services />
      <Method />
      <Footer />
    </main>
  );
}
