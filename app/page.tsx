import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import OriginSection from "@/components/sections/OriginSection";
import FieldSection from "@/components/sections/FieldSection";
import PeopleSection from "@/components/sections/PeopleSection";
import TechnologySection from "@/components/sections/TechnologySection";
import IndustrySection from "@/components/sections/IndustrySection";
import SustainabilitySection from "@/components/sections/SustainabilitySection";
import GlobalSection from "@/components/sections/GlobalSection";
import FinalSection from "@/components/sections/FinalSection";

/**
 * ORIGEM → CAMPO → PESSOAS → TECNOLOGIA → INDÚSTRIA → SUSTENTABILIDADE → ESCALA GLOBAL → FUTURO
 * A ordem dos componentes é a ordem dos ScrollTriggers (pins refrescam de cima para baixo).
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <OriginSection />
        <FieldSection />
        <PeopleSection />
        <TechnologySection />
        <IndustrySection />
        <SustainabilitySection />
        <GlobalSection />
        <FinalSection />
      </main>
      <Footer />
    </>
  );
}
