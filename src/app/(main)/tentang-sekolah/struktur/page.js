import Image from "next/image";
import Struktur_Organisasi_Seyegan from "../../../../../public/Struktur_Organisasi_Seyegan.png";
import Title from "@/components/Title";

const StrukturPages = () => {
  return (
    <section className="pt-[7.4rem]">
      <div className="py-[9.6rem]">
        <div className="max-w-[120rem] mx-auto">
          <Title>Struktur Organisasi</Title>
          <div className="flex justify-center">
            <Image
              src={Struktur_Organisasi_Seyegan}
              alt="Struktur Organisasi Seyegan"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrukturPages;
