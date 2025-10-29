"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Title from "@/components/Title";
import Struktur_Organisasi_Seyegan from "../../../../../public/Struktur_Organisasi_Seyegan.png";

const StrukturPages = () => {
  const [struktur, setStruktur] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStruktur = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/tentang-sekolah/struktur");

        // Check if response is ok and content-type is JSON
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const result = await response.json();

        if (result.success) {
          setStruktur(result.data);
        } else {
          setError(result.message || "Gagal memuat data struktur organisasi");
        }
      } catch (err) {
        console.error("Error fetching struktur:", err);
        setError("Terjadi kesalahan saat memuat data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStruktur();
  }, []);

  const getLevelColor = (level) => {
    switch (level) {
      case 1:
        return "bg-red-500";
      case 2:
        return "bg-blue-500";
      case 3:
        return "bg-green-500";
      case 4:
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getLevelName = (level) => {
    switch (level) {
      case 1:
        return "Pimpinan Tertinggi";
      case 2:
        return "Pimpinan Menengah";
      case 3:
        return "Koordinator";
      case 4:
        return "Staf";
      default:
        return "Tidak Diketahui";
    }
  };

  if (isLoading) {
    return (
      <section className="pt-[7.4rem]">
        <div className="py-[9.6rem]">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <Title>Struktur Organisasi</Title>
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-[7.4rem]">
        <div className="py-[9.6rem]">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <Title>Struktur Organisasi</Title>
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
              <p className="text-red-600 text-lg">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Jika tidak ada data atau struktur kosong, tampilkan gambar default
  if (!struktur || !struktur.struktur || struktur.struktur.length === 0) {
    return (
      <section className="pt-[7.4rem]">
        <div className="py-[9.6rem]">
          <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
            <Title>Struktur Organisasi</Title>
            <div className="flex justify-center">
              <Image
                src={Struktur_Organisasi_Seyegan}
                alt="Struktur Organisasi Seyegan"
                className="max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-[7.4rem]">
      <div className="py-[9.6rem]">
        <div className="max-w-[120rem] mx-auto px-6 lg:px-12">
          <Title>{struktur.judul}</Title>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {struktur.deskripsi && (
              <p className="text-[1.6rem] leading-relaxed text-gray-700 mb-8 text-center">
                {struktur.deskripsi}
              </p>
            )}

            <div className="space-y-8">
              {[1, 2, 3, 4].map((level) => {
                const levelItems = struktur.struktur
                  .filter((item) => item.level === level)
                  .sort((a, b) => a.jabatan.localeCompare(b.jabatan));

                if (levelItems.length === 0) return null;

                return (
                  <div key={level} className="space-y-6">
                    <h3 className="text-[2rem] font-bold text-gray-800 mb-6 text-center">
                      <span
                        className={`${getLevelColor(
                          level
                        )} text-white px-6 py-3 rounded-lg shadow-md inline-block`}
                      >
                        {getLevelName(level)}
                      </span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {levelItems.map((item) => (
                        <div
                          key={item.id}
                          className="p-6 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                        >
                          <div className="flex items-center justify-center mb-4">
                            <span
                              className={`${getLevelColor(
                                item.level
                              )} text-white px-3 py-1 rounded-full text-[1rem] font-medium`}
                            >
                              Level {item.level}
                            </span>
                          </div>
                          <h4 className="text-[1.6rem] font-semibold text-gray-800 mb-3 text-center leading-tight">
                            {item.jabatan}
                          </h4>
                          <p className="text-[1.4rem] text-gray-600 font-medium text-center">
                            {item.nama}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StrukturPages;
