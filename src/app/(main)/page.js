import Achievement from "@/ui/Achievement";
import Hero from "@/ui/Hero";
import ProfileVideo from "@/ui/ProfileVideo";
import VisiMisiSection from "@/ui/VisiMisiSection";
import SejarahSection from "@/ui/SejarahSection";
import FilosofiSection from "@/ui/FilosofiSection";
import FasilitasSection from "@/ui/FasilitasSection";
import BeritaSection from "@/ui/BeritaSection";
import PengumumanSection from "@/components/PengumumanSection";
import GaleriSection from "@/components/GaleriSection";

const HomePage = () => {
  return (
    <>
      <Hero />
      <ProfileVideo />
      <VisiMisiSection />
      <SejarahSection />
      <FilosofiSection />
      <FasilitasSection />
      <BeritaSection />
      <PengumumanSection />
      <GaleriSection />
      <Achievement />
    </>
  );
};

export default HomePage;
