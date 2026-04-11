import { HeroSection } from "@/components/public/HeroSection";
import { ServicesGrid } from "@/components/public/ServicesGrid";
import { StatsSection } from "@/components/public/StatsSection";
import { PortfolioGallery } from "@/components/public/PortfolioGallery";
import { TestimonialCarousel } from "@/components/public/TestimonialCarousel";
import { CTASection } from "@/components/public/CTASection";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export const metadata = {
  // We use the default from layout.tsx but can override if needed
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      
      <SectionWrapper>
        <ServicesGrid />
      </SectionWrapper>
      
      <SectionWrapper>
        <StatsSection />
      </SectionWrapper>
      
      <SectionWrapper>
        <PortfolioGallery />
      </SectionWrapper>
      
      <SectionWrapper>
        <TestimonialCarousel />
      </SectionWrapper>
      
      <SectionWrapper>
        <CTASection />
      </SectionWrapper>
    </>
  );
}
