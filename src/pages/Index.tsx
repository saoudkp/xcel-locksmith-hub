import StickyHeader from "@/components/StickyHeader";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import VehicleVerifier from "@/components/VehicleVerifier";
import QuoteTool from "@/components/QuoteTool";
import BeforeAfterGallery from "@/components/BeforeAfterGallery";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import ServiceAreaMap from "@/components/ServiceAreaMap";
import VisitorCounter from "@/components/VisitorCounter";
import Footer from "@/components/Footer";
import { LocalBusinessSchema, FAQSchema } from "@/components/StructuredData";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-page">
      <LocalBusinessSchema />
      <FAQSchema />

      <StickyHeader />

      <main>
        <HeroSection />
        <ServicesSection />
        <VehicleVerifier />
        <QuoteTool />
        <BeforeAfterGallery />
        <ReviewsSection />
        <ServiceAreaMap />
        <FAQSection />
        <VisitorCounter />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
