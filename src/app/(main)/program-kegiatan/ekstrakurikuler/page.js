"use client";

import Title from "@/components/Title";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const Ekstrakurikuler = () => {
  const [imageErrors, setImageErrors] = useState({});
  const [ekstrakurikulerData, setEkstrakurikulerData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEkstrakurikuler = async () => {
      try {
        const response = await fetch("/api/ekstrakurikuler?aktif=true");
        const result = await response.json();

        if (result.success && result.data) {
          setEkstrakurikulerData(result.data);
        }
      } catch (error) {
        console.error("Error fetching ekstrakurikuler:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEkstrakurikuler();
  }, []);

  const handleImageError = (itemId) => {
    setImageErrors((prev) => ({ ...prev, [itemId]: true }));
  };

  const getCategoryByName = (nama) => {
    const lowerName = nama.toLowerCase();
    if (lowerName.includes("hizbul") || lowerName.includes("wathan")) {
      return "Pengembangan Karakter";
    } else if (lowerName.includes("karawitan") || lowerName.includes("tari")) {
      return "Seni & Budaya";
    } else if (
      lowerName.includes("komputer") ||
      lowerName.includes("teknologi")
    ) {
      return "IPTEK";
    } else if (
      lowerName.includes("tapak") ||
      lowerName.includes("suci") ||
      lowerName.includes("olahraga")
    ) {
      return "Olahraga & Bela Diri";
    } else {
      return "Lainnya";
    }
  };

  return (
    <section className="pt-[7.4rem] bg-gray-50">
      <div className="py-[8rem] lg:py-[9.6rem]">
        <div className="max-w-[120rem] mx-auto px-4 lg:px-12">
          <Title>Ekstrakurikuler</Title>

          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
              <span className="ml-4 text-[1.6rem] text-gray-600">
                Memuat data ekstrakurikuler...
              </span>
            </div>
          )}

          {!loading && ekstrakurikulerData.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-[2.4rem] font-bold text-gray-800 mb-4">
                Belum Ada Ekstrakurikuler
              </h3>
              <p className="text-[1.6rem] text-gray-600">
                Data ekstrakurikuler akan segera ditambahkan.
              </p>
            </div>
          )}

          {!loading && ekstrakurikulerData.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
              {ekstrakurikulerData.map((item, index) => {
                const category = getCategoryByName(item.nama);
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-[.15s] group"
                  >
                    <div className="relative overflow-hidden">
                      <div className="aspect-[4/3] relative">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
                        {item.gambar && !imageErrors[item.id] ? (
                          <Image
                            src={item.gambar}
                            alt={item.nama}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-[.15s]"
                            onError={() => handleImageError(item.id)}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[var(--primary-color)] to-blue-700 flex items-center justify-center">
                            <div className="text-center text-white p-4">
                              <div className="font-bold text-lg">
                                {item.nama}
                              </div>
                              <div className="text-sm opacity-80">
                                {category}
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="p-6 lg:p-8">
                      <h3 className="text-[1.6rem] md:text-[2rem] font-bold text-[var(--primary-color)] mb-4 duration-[.15s]">
                        {item.nama}
                      </h3>
                      <p className="text-gray-600 text-[1.5rem] md:text-[1.6rem] leading-relaxed mb-6">
                        {item.deskripsi}
                      </p>

                      {item.jadwal && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                          <span className="text-[1.4rem] font-medium text-blue-800">
                            Jadwal: {item.jadwal}
                          </span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-yellow-500">
                          <span className="text-[1.6rem] font-medium">
                            {item.aktif ? "Aktif" : "Nonaktif"}
                          </span>
                          <div
                            className={`w-2 h-2 rounded-full ml-2 ${
                              item.aktif
                                ? "bg-green-500 animate-pulse"
                                : "bg-red-500"
                            }`}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

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
              <button className="border-2 border-[var(--primary-color)] text-[1.4rem] text-[var(--primary-color)] font-[700] px-[2.4rem] sm:px-[3.2rem] py-[1.6rem] sm:py-[1.8rem] rounded-full bg-transparent cursor-pointer hover:bg-yellow-400 hover:text-[var(--primary-color)] hover:border-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl">
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
