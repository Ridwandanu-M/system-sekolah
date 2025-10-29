"use client";

import { useState, useEffect } from "react";
import Title from "@/components/Title";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Lightbulb } from "lucide-react";

const FilosofiSection = () => {
  const [filosofi, setFilosofi] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFilosofi = async () => {
      try {
        const response = await fetch("/api/tentang-sekolah/filosofi");

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
          setFilosofi(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch filosofi:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilosofi();
  }, []);

  if (isLoading) {
    return (
      <section className="py-[6rem] bg-white">
        <div className="max-w-[120rem] mx-auto px-4">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const defaultContent = `Mendidik manusia berakhlak mulia, cerdas, dan berkemajuan dengan mengintegrasikan ajaran Islam, nilai-nilai kemanusiaan, ilmu pengetahuan, serta teknologi untuk membentuk kader Muhammadiyah dan agen perubahan bagi masyarakat.

Filosofi pendidikan di SMP Muhammadiyah 1 Seyegan bertujuan melahirkan individu yang taat pada tauhid, menguasai sains dan seni, serta aktif melakukan amar ma'ruf nahi munkar.`;

  const displayContent = filosofi?.konten || defaultContent;
  const previewText = displayContent.split("\n\n")[0];

  return (
    <section className="py-[12rem] bg-white">
      <div className="max-w-[120rem] mx-auto px-4">
        <Title>Filosofi Pendidikan</Title>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="flex-1 p-8 lg:p-12 flex flex-col">
              <div className="flex items-start gap-6 flex-1">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gradient-to-r bg-[var(--primary-color)] rounded-full flex items-center justify-center">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-[2.2rem] font-bold text-gray-800 mb-4">
                    Landasan Filosofi Pendidikan
                  </h3>
                  <p className="text-[1.6rem] text-gray-600 leading-relaxed">
                    {previewText}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-start">
                <Link
                  href="/tentang-sekolah/filosofi"
                  className="inline-flex items-center gap-2 bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-[var(--primary-color-tint)] transition-colors text-[1.4rem] font-medium"
                >
                  Pelajari Lebih Lanjut
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="lg:w-[300px] lg:h-[300px] w-full h-[200px] flex-shrink-0 relative overflow-hidden lg:order-2">
              <Image
                src="/Galeri/gambar9.jpeg"
                alt="SMP Muhammadiyah 1 Seyegan - Kegiatan Siswa"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-black/10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilosofiSection;
