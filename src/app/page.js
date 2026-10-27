import Hero from "./sections/Hero";
import DownloadBanner from "./sections/DownloadBanner";
import SystemRequirements from "./sections/SystemRequirements";
import Screenshots from "./sections/Screenshots";
import Reviews from "./sections/Reviews";
import HowToInstall from "./sections/HowToInstall";
import WhyChooseUs from "./sections/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <DownloadBanner />
      <SystemRequirements />
      <Screenshots />
      <Reviews />
      <HowToInstall />
      <WhyChooseUs />
    </>
  );
}