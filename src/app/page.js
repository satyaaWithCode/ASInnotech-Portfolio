import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import LeadershipSection from "@/components/LeadershipSection";
import ServicesSection from "@/components/ServicesSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactForm from "@/components/ContactForm";
import IndustriesSection from "@/components/IndustriesSection";
import TrustedSection from "@/components/TrustedSection";
import TechnologiesSection from "@/components/TechnologiesSection";
import BackToTop from "@/components/BackToTop";

export default function HomePage() {
  return (
    <>
      {/* Hero banner */}
      <HeroSection />

      {/* About company */}
      <AboutSection />

      {/* Leadership team */}
      <LeadershipSection />

      {/* Our services */}
      <ServicesSection />

      {/* Featured portfolio */}
      <PortfolioSection />

         {/* 💻 Technologies */}
      <TechnologiesSection useMarquee={true} />

         <TrustedSection />      
      <IndustriesSection /> 

      {/* Contact form */}
      <ContactForm />
           <BackToTop />

      
    </>
  );
}
