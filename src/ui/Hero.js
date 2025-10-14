import Image from "next/image";
import Banner_Seyegan from "../../public/Banner_Seyegan.jpeg";
import Kepala_Sekolah_Seyegan from "../../public/Kepala_Sekolah_Seyegan.png";

const Hero = () => {
  return (
    <section className="relative w-full h-screen">
      <div>
        <Image
          src={Banner_Seyegan}
          alt="Banner SMP Muhammadiyah 1 Seyegan"
          fill
          className="object-cover brightness-30"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full">
        <div className="grid grid-cols-2 items-center gap-[4.8rem] text-white px-4 max-w-[120rem]">
          <div className="flex flex-col gap-[4.8rem]">
            <div>
              <h1 className="text-[2.4rem] md:text-[3.2rem] lg:text-[4.8rem] font-bold mb-4">
                SMP Muhammadiyah 1 Seyegan
              </h1>
              <p className="text-[1.8rem] md:text-[2rem] lg:text-[2.4rem] mb-8 drop-shadow-md">
                Islami, Berintegritas, Berprestasi
              </p>
            </div>
            <div className="space-x-4">
              <button className="text-[1.4rem] font-[700] px-[3.2rem] py-[1.8rem] rounded-xl bg-[var(--primary-color)] cursor-pointer hover:bg-[#fff] hover:text-[var(--primary-color)] transition-all duration-[.25s] shadow-lg">
                Pelajari Lebih Lanjut
              </button>
              <button className="text-[1.4rem] text-[var(--primary-color)] font-[700] px-[3.2rem] py-[1.8rem] rounded-xl bg-[#fff] cursor-pointer hover:bg-[var(--primary-color)] hover:text-[#fff] transition-all duration-[.15s] shadow-lg">
                Daftar Sekarang
              </button>
            </div>
          </div>
          <div className="flex justify-end">
            <Image
              src={Kepala_Sekolah_Seyegan}
              alt="Kepala Sekolah Seyegan"
              width={500}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
