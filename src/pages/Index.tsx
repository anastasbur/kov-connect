import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/home/Hero";
import { Stats } from "@/components/home/Stats";
import { DiasporaStrong } from "@/components/home/DiasporaStrong";
import { Solutions } from "@/components/home/Solutions";
import { Quotes } from "@/components/home/Quotes";
import { Timeline } from "@/components/home/Timeline";
import { CtaBlock } from "@/components/home/CtaBlock";
import { MediaStrip } from "@/components/home/MediaStrip";
import { WorldMapSection } from "@/components/home/WorldMapSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <Stats />
        <DiasporaStrong />
        <Solutions />
        <WorldMapSection />
        <Quotes />
        <Timeline />
        <CtaBlock />
        <MediaStrip />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
