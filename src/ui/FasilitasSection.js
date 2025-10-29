"use client";

import { useState, useEffect } from "react";
import Title from "@/components/Title";
import Link from "next/link";
import { ArrowRight, Building, MapPin } from "lucide-react";

const FasilitasSection = () => {
  const [fasilitas, setFasilitas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFasilitas = async () => {
      try {
        const response = await fetch("/api/tentang-sekolah/fasilitas");

        // Check if response is ok and content-type is JSON
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("Response is not JSON");
        }

        const result = await response.json();
        if (result.success && result.data) {
          // Ambil hanya 6 fasilitas pertama untuk ditampilkan
          setFasilitas(result.data.slice(0, 6));
        }
      } catch (err) {
        console.error("Failed to fetch fasilitas:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFasilitas();
  }, []);

  if (isLoading) {
    return (
      <section className="py-[6rem] bg-gray-50">
        <div className="max-w-[120rem] mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-48 bg-gray-300 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const defaultFasilitas = [
    {
      id: 1,
      nama: "Ruang Kelas",
      deskripsi:
        "18 ruang kelas yang nyaman dan dilengkapi dengan fasilitas pembelajaran modern",
    },
    {
      id: 2,
      nama: "Laboratorium IPA",
      deskripsi:
        "Laboratorium sains lengkap untuk praktikum fisika, kimia, dan biologi",
    },
    {
      id: 3,
      nama: "Laboratorium Komputer",
      deskripsi:
        "Lab komputer dengan perangkat terbaru untuk pembelajaran teknologi informasi",
    },
    {
      id: 4,
      nama: "Perpustakaan",
      deskripsi:
        "Perpustakaan dengan koleksi buku yang lengkap dan suasana belajar yang kondusif",
    },
    {
      id: 5,
      nama: "Masjid",
      deskripsi:
        "Masjid sekolah untuk kegiatan ibadah dan pembelajaran agama Islam",
    },
    {
      id: 6,
      nama: "Lapangan Olahraga",
      deskripsi:
        "Fasilitas olahraga lengkap untuk berbagai aktivitas fisik dan ekstrakurikuler",
    },
  ];

  const displayFasilitas = fasilitas.length > 0 ? fasilitas : defaultFasilitas;

  return (
    <section className="py-[6rem] bg-gray-50">
      <div className="max-w-[120rem] mx-auto px-4">
        <Title>Fasilitas Sekolah</Title>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          {displayFasilitas.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-[1.8rem] font-bold text-gray-800 flex-1">
                  {item.nama}
                </h3>
              </div>

              <p className="text-[1.4rem] text-gray-600 leading-relaxed">
                {item.deskripsi}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/tentang-sekolah/fasilitas"
            className="inline-flex items-center gap-2 bg-purple-500 text-white px-8 py-4 rounded-lg hover:bg-purple-600 transition-colors text-[1.6rem] font-medium"
          >
            Lihat Semua Fasilitas
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FasilitasSection;
