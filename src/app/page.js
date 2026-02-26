import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import EmailSection from "@/components/EmailSection";
import AchievementsSection from "@/components/AchievementsSection";
import GallerySection from "@/components/GallerySection";
import HolopinBoard from "@/components/HolopinBoard";
import YoutubePlayer from "@/components/YoutubePlayer";
import CinematicIntro from "@/components/CinematicIntro";

export default function Home() {
  return (
    <>
      <CinematicIntro />
      <HeroSection />
      <div className="container mx-auto px-12 py-4">
        <AchievementsSection />
        <AboutSection />
        <HolopinBoard />
        <YoutubePlayer />
        <GallerySection />
        <ProjectsSection />
        <EmailSection />
      </div>
    </>
  );
}
