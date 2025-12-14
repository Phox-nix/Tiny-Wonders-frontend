import HeroSection from '@/modules/news/components/HeroSection/HeroSection';
import SplitSection from '@/modules/news/components/SplitSection/SplitSection';
import FeaturedSection from '@/modules/news/components/FeaturedSection/FeaturedSection';
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
