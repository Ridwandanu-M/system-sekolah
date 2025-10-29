"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Eye, ArrowRight } from "lucide-react";
import Title from "./Title";

const GaleriSection = () => {
  const [galeriImages, setGaleriImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGaleriImages();
  }, []);

  const fetchGaleriImages = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/galeri?limit=3");
      const result = await response.json();

      if (result.success) {
        setGaleriImages(result.data);
      } else {
        console.error("Failed to fetch gallery images");
      }
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-[4rem] lg:py-[6rem] bg-gray-50">
        <div className="max-w-[120rem] mx-auto px-4">
          <div className="text-center mb-[3rem] lg:mb-[5rem]">
            <Title>Galeri</Title>
            <p className="text-[1.4rem] lg:text-[1.6rem] text-gray-600 max-w-2xl mx-auto">
              Dokumentasi kegiatan dan momen berharga di SMP Muhammadiyah 1
              Seyegan
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="bg-gray-200 animate-pulse h-4 rounded mb-2"></div>
                  <div className="bg-gray-200 animate-pulse h-3 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (galeriImages.length === 0) {
    return null; // Don't show section if no images
  }

  return (
    <section className="py-[4rem] lg:py-[6rem] bg-gray-50">
      <div className="max-w-[120rem] mx-auto px-4">
        <div className="text-center mb-[3rem] lg:mb-[5rem]">
          <Title>Galeri</Title>
          <p className="text-[1.4rem] lg:text-[1.6rem] text-gray-600 max-w-2xl mx-auto">
            Dokumentasi kegiatan dan momen berharga di SMP Muhammadiyah 1
            Seyegan
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {galeriImages.map((image) => (
            <div
              key={image.id}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              <Link href="/galeri" className="block">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={image.gambar}
                    alt={image.judul}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />

                  <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Eye className="w-5 h-5 text-white" />
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <div className="bg-black/70 backdrop-blur-sm rounded-lg p-3">
                      <h3 className="text-white font-semibold text-[1.3rem] mb-1 line-clamp-1">
                        {image.judul}
                      </h3>
                      <div className="flex items-center text-white/80 text-[1.1rem]">
                        <Calendar size={12} className="mr-1" />
                        {new Date(image.tanggal).toLocaleDateString("id-ID")}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-[3rem] lg:mt-[5rem]">
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2 bg-[var(--primary-color)] text-white px-8 py-4 rounded-full text-[1.6rem] font-semibold hover:bg-[var(--primary-color-tint)] transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Lihat Semua Galeri
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GaleriSection;
