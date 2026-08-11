import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import HistoryTimeline from "@/components/home/HistoryTimeline";
import LeadershipPreview from "@/components/home/LeadershipPreview";
import FeaturedPrograms from "@/components/home/FeaturedPrograms";
import GenerationPreview from "@/components/home/GenerationPreview";
import GalleryPreview from "@/components/home/GalleryPreview";
import LegacySection from "@/components/home/LegacySection";

import { getHomeContent } from "@/lib/data/content";

export default async function Home() {
  const { sejarah, angkatan, pengurus, programKerja, galeri } =
    await getHomeContent();

  return (
    <main>
      <Hero />

      <AboutPreview angkatan={angkatan} sejarah={sejarah} />

      <HistoryTimeline sejarah={sejarah} />

      <LeadershipPreview pengurus={pengurus} />

      <FeaturedPrograms programKerja={programKerja} />

      <GenerationPreview angkatan={angkatan} />

      <GalleryPreview galeri={galeri} />

      <LegacySection />
    </main>
  );
}
