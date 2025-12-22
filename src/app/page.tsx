import HeroSection from '@/components/HeroSection/HeroSection';
import SplitSection from '@/components/SplitSection/SplitSection';
import FeaturedSection from '@/components/FeaturedSection/FeaturedSection';
import App from 'next/app';

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <SplitSection />
      <FeaturedSection />
    </>
  );
};

export default HomePage;
