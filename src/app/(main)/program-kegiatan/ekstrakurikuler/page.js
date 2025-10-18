"use client";

import Title from "@/component/Title";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Ekstrakurikuler = () => {
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (itemId) => {
    setImageErrors((prev) => ({ ...prev, [itemId]: true }));
  };

  const ekstrakurikulerData = [
    {
      id: 1,
      title: "Hizbul Wathan",
      description:
        "Bertujuan untuk mendidik anak, remaja, dan pemuda agar menjadi pribadi yang beriman, berilmu, berteknologi, dan berakhlak mulia, serta menjadi kader Muhammadiyah, umat, dan bangsa.",
      image: "/Ekstrakurikuler/Hisbul_Waton.png",
      category: "Pengembangan Karakter",
    },
    {
      id: 2,
      title: "Karawitan Gamelan",
      description:
        "Pelestarian budaya Jawa melalui seni musik gamelan dan karawitan. Siswa mempelajari berbagai instrumen gamelan dan lagu-lagu tradisional Jawa.",
      image: "/Ekstrakurikuler/Karawitan.png",
      category: "Seni & Budaya",
    },
    {
      id: 3,
      title: "Komputer",
      description:
        "Pengembangan kemampuan teknologi dan komputer. Siswa belajar programming, design grafis, dan keterampilan teknologi digital untuk masa depan.",
      image: "/Ekstrakurikuler/Komputer.png",
      category: "IPTEK",
    },
    {
      id: 4,
      title: "Seni Tari Tradisional",
      description:
        "Pelestarian dan pengembangan seni tari tradisional Indonesia. Siswa mempelajari berbagai tarian daerah dan mengembangkan kreativitas seni budaya.",
      image: "/Ekstrakurikuler/Seni_Tari.png",
      category: "Seni & Budaya",
    },
    {
      id: 5,
      title: "Tapak Suci",
      description:
        "Seni bela diri tradisional Muhammadiyah yang mengembangkan fisik, mental, dan spiritual. Melatih kedisiplinan dan keberanian siswa.",
      image: "/Ekstrakurikuler/Tapak_Suci.png",
      category: "Olahraga & Bela Diri",
    },
  ];

  return (
    <section className="pt-[7.4rem] bg-gray-50">
      <div className="py-[8rem] lg:py-[9.6rem]">
        <div className="max-w-[120rem] mx-auto px-4 lg:px-12">
          <Title>Ekstrakurikuler</Title>

          {/* Ekstrakurikuler Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {ekstrakurikulerData.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-[.15s] group"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3] relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                    {imageErrors[item.id] ? (
                      <div className="w-full h-full bg-gradient-to-br from-[var(--primary-color)] to-blue-700 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                          <div className="text-4xl mb-2">🎯</div>
                          <div className="font-bold text-lg">{item.title}</div>
                          <div className="text-sm opacity-80">
                            {item.category}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-[.15s]"
                        onError={() => handleImageError(item.id)}
                      />
                    )}
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-yellow-500 text-[var(--primary-color)] px-3 py-1 rounded-full text-[1.6rem]">
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 lg:p-8">
                  <h3 className="text-[1.6rem] md:text-[2rem] font-bold text-[var(--primary-color)] mb-4 duration-[.15s]">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-[1.5rem] md:text-[1.6rem] leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Action Button */}
                  <div className="flex items-center justify-between">
                    <button className="text-[1.4rem] hover:bg-[var(--primary-color)] text-[var(--primary-color)] hover:text-[#fff] px-6 py-3 rounded-full font-medium transition-all duration-[.15s] hover:shadow-lg transform hover:-translate-y-1 cursor-pointer">
                      Pelajari Lebih Lanjut
                    </button>
                    <div className="flex items-center text-yellow-500">
                      <span className="text-[1.6rem] font-medium">Aktif</span>
                      <div className="w-2 h-2 bg-green-500 rounded-full ml-2 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
            <h3 className="text-[2.4rem] md:text-[2.8rem] font-bold text-[var(--primary-color)] mb-4">
              Tertarik Bergabung?
            </h3>
            <p className="text-gray-600 text-[1.6rem] mb-8 max-w-2xl mx-auto">
              Hubungi bagian kesiswaan untuk informasi lebih lanjut tentang
              pendaftaran dan jadwal kegiatan ekstrakurikuler.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#"
                className="border-2 border-[var(--primary-color)] text-[#fff] text-[1.4rem] font-[700] px-[2.4rem] sm:px-[3.2rem] py-[1.6rem] sm:py-[1.8rem] rounded-full bg-[var(--primary-color)] cursor-pointer hover:bg-[#fff] hover:text-[var(--primary-color)] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Hubungi Sekolah
              </Link>
              <button className="border-2 border-white text-[1.4rem] text-[var(--primary-color)] font-[700] px-[2.4rem] sm:px-[3.2rem] py-[1.6rem] sm:py-[1.8rem] rounded-full bg-transparent cursor-pointer hover:bg-yellow-400 hover:text-[var(--primary-color)] hover:border-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl">
                Unduh Brosur
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ekstrakurikuler;
