import ContactHeroSection from "./sections/ContactHeroSection";
import ContactFormSection from "./sections/ContactFormSection";

export default function ContactPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <ContactHeroSection />
      <ContactFormSection />
    </main>
  );
}
