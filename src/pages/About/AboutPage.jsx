import AboutHero from "./sections/AboutHero";
import AchievementsSection from "./sections/AchievementsSection";
import GoalsSection from "./sections/GoalsSection";
import AboutCta from "./sections/AboutCta";

export default function AboutPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[#f7f7f8]">
      <AboutHero />
      <AchievementsSection />
      <GoalsSection />
      <AboutCta />
    </main>
  );
}
