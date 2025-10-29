"use client";

import { useState, useEffect } from "react";
import Title from "@/components/Title";
import Link from "next/link";
import { ArrowRight, Clock, Lightbulb, Building } from "lucide-react";

const SejarahSection = () => {
  const [sejarah, setSejarah] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSejarah = async () => {
      try {
        const response = await fetch("/api/tentang-sekolah/sejarah");

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
          setSejarah(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch sejarah:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSejarah();
  }, []);

  if (isLoading) {
    return (
      <section className="py-[6rem] bg-gray-50">
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

  const defaultContent = `SMP Muhammadiyah 1 Seyegan berdiri pada tahun 1967 menempati rumah tokoh masyarakat (Bapak Jono Wikoro) di Dusun Barak, Kalurahan Margoluwih, Kecamatan Seyegan. Dengan Kepala Sekolah Bapak Drs. Soebardi, M.Pd. dibantu oleh Bapak Soeprapto.

Seiring berjalannya waktu, sekolah terus berkembang dan pindah ke beberapa lokasi hingga akhirnya menempati lokasi yang sekarang di Grogol, Margodadi, Seyegan dengan fasilitas yang terus ditingkatkan untuk mendukung proses pembelajaran yang optimal.`;

  const displayContent = sejarah?.konten || defaultContent;
  const previewText = displayContent.split("\n\n")[0];

  return (
    <section className="py-[6rem] bg-gray-50">
      <div className="max-w-[120rem] mx-auto px-4">
        <Title>Sejarah Sekolah</Title>

        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="flex items-start gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-[2.2rem] font-bold text-gray-800 mb-4">
                Perjalanan Panjang Menuju Keunggulan
              </h3>
              <p className="text-[1.6rem] text-gray-600 leading-relaxed mb-6">
                {previewText}
              </p>

              <Link
                href="/tentang-sekolah/sejarah"
                className="inline-flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors text-[1.4rem] font-medium"
              >
                Baca Selengkapnya
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SejarahSection;
