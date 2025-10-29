"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Banner_Seyegan from "../../public/Banner_Seyegan.jpeg";
import Link from "next/link";

const Hero = () => {
  const [kepalaSekolahImage, setKepalaSekolahImage] = useState(
    "/Kepala_Sekolah_Seyegan.png"
  );
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    const fetchKepalaSekolahImage = async () => {
      try {
        const response = await fetch("/api/tentang-sekolah/sambutan");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data && result.data.gambar) {
          setKepalaSekolahImage(result.data.gambar);
        }
      } catch (error) {
        console.error("Error fetching kepala sekolah image:", error);
      } finally {
        setImageLoading(false);
      }
    };

    fetchKepalaSekolahImage();
  }, []);
  return (
    <section className="relative w-full h-screen shadow-2xl pt-[7.4rem] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={Banner_Seyegan}
          alt="Banner SMP Muhammadiyah 1 Seyegan"
          fill
          className="object-cover brightness-30"
          priority
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-[4.8rem] text-white max-w-[120rem] w-full">
          <div className="flex flex-col gap-6 lg:gap-[4.8rem] text-center lg:text-left">
            <div>
              <h1 className="text-[2.8rem] md:text-[3.6rem] lg:text-[4.5rem] xl:text-[5rem] font-bold mb-4 leading-tight">
                SMP Muhammadiyah 1 Seyegan
              </h1>
              <p className="text-[1.6rem] md:text-[1.8rem] lg:text-[2rem] xl:text-[2.4rem] mb-8 drop-shadow-md text-yellow-400 font-medium">
                Islami, Berintegritas, Berprestasi
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                href="/tentang-sekolah/sambutan"
                className="border-2 border-[var(--primary-color)] text-[1.4rem] font-[700] px-[2.4rem] sm:px-[3.2rem] py-[1.6rem] sm:py-[1.8rem] rounded-full bg-[var(--primary-color)] cursor-pointer hover:bg-[#fff] hover:text-[var(--primary-color)] transition-all duration-[.15s] shadow-lg hover:shadow-xl"
              >
                Profil Sekolah
              </Link>
              <button className="border-2 border-white text-[1.4rem] text-[#fff] font-[700] px-[2.4rem] sm:px-[3.2rem] py-[1.6rem] sm:py-[1.8rem] rounded-full bg-transparent cursor-pointer hover:bg-yellow-400 hover:text-[var(--primary-color)] hover:border-yellow-400 transition-all duration-[.15s] shadow-lg hover:shadow-xl">
                Daftar Sekarang
              </button>
            </div>
          </div>
          <div className="hidden lg:flex justify-center lg:justify-end">
            <div className="relative">
              <div className="relative w-[400px] h-[500px]">
                {imageLoading ? (
                  <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg"></div>
                ) : (
                  <Image
                    src={kepalaSekolahImage}
                    alt="Kepala Sekolah SMP Muhammadiyah 1 Seyegan"
                    fill
                    className="object-contain drop-shadow-2xl"
                    onError={() => {
                      setKepalaSekolahImage("/Kepala_Sekolah_Seyegan.png");
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
