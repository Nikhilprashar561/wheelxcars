import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SearchBar } from "@/components/SearchBar";
import { FeaturedCars } from "@/components/FeaturedCars";
import { TrustSection } from "@/components/TrustSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { NewArrivals } from "@/components/NewArrivals";
import { HowItWorks } from "@/components/HowItWorks";
import { SellYourCar } from "@/components/SellYourCar";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <SearchBar />
      <FeaturedCars />
      <TrustSection />
      <WhyChooseUs />
      <NewArrivals />
      <HowItWorks />
      <SellYourCar />
      <Testimonials />
      <FAQ />
      <ContactSection />
      <Footer />
    </main>
  );
}
