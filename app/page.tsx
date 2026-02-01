import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { FeaturesSection } from "@/components/features-section";
import { TopicsSection } from "@/components/topics-section";
import { PricingSection } from "@/components/pricing-section";
import { TestimonialsSection } from "@/components/testimonials-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <HeroSection />
        <section id="features">
          <FeaturesSection />
        </section>
        <section id="topics">
          <TopicsSection />
        </section>
        <TestimonialsSection />
        <section id="pricing">
          <PricingSection />
        </section>
        <CtaSection />
      </div>
      <Footer />
    </main>
  );
}
