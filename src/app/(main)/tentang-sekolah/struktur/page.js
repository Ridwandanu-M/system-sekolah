import Image from "next/image";
import Struktur_Organisasi_Seyegan from "../../../../../public/Struktur_Organisasi_Seyegan.png";

const StrukturPages = () => {
  return (
    <section className="pt-[7.4rem]">
      <div className="py-[9.6rem]">
        <div className="max-w-[120rem] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-[3rem] md:text-[3.6rem] lg:text-[4.2rem] font-bold text-[var(--primary-color)] mb-4">
              Struktur Organisasi
            </h1>
            <div className="w-[6rem] h-[0.4rem] bg-yellow-400 mx-auto rounded-full"></div>
          </div>
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
