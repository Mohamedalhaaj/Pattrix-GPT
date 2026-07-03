import { FieldCanvas } from "@/components/field/field-canvas";
import { About } from "@/components/chapters/about";
import { Clients } from "@/components/chapters/clients";
import { Contact } from "@/components/chapters/contact";
import { Hero } from "@/components/chapters/hero";
import { Interlude } from "@/components/chapters/interlude";
import { Positioning } from "@/components/chapters/positioning";
import { Services } from "@/components/chapters/services";
import { Work } from "@/components/chapters/work";
import { Footer } from "@/components/ui/footer";
import { Header } from "@/components/ui/header";

export default function Home() {
  return (
    <>
      <FieldCanvas />
      <Header />
      <main id="main" className="content-layer">
        <Hero />
        <Positioning />
        <Interlude />
        <Work />
        <Services />
        <Clients />
        <About />
        <Contact />
      </main>
      <div className="content-layer">
        <Footer />
      </div>
    </>
  );
}
