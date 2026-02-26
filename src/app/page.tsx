import Navbar from './components/landing/Navbar';
import HeroSection from './components/landing/HeroSection';
import FeaturesSection from './components/landing/FeaturesSection';
import HowItWorksSection from './components/landing/HowItWorksSection';
import SavingsSection from './components/landing/SavingsSection';
import CtaSection from './components/landing/CtaSection';
import Footer from './components/landing/Footer';

export default function LandingPage() {
  return (
    <div style={{ backgroundColor: '#030305' }}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <SavingsSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
