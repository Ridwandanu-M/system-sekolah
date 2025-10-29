"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, ArrowRight, Speaker } from "lucide-react";
import Title from "./Title";

const PengumumanSection = () => {
  const [pengumumanList, setPengumumanList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLatestPengumuman();
  }, []);

  const fetchLatestPengumuman = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/pengumuman?limit=3");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }

      const result = await response.json();
      if (result.success && result.data) {
        setPengumumanList(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch pengumuman:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const generateSlug = (id, title) => {
    return `${id}-${title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")}`;
  };

  if (isLoading) {
    return (
      <div id="pengumuman-section" className="py-[6rem] bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-[4rem]">
            <Title>Pengumuman</Title>
            <p className="text-[1.4rem] text-gray-600">
              Informasi penting dan pengumuman terbaru sekolah
            </p>
          </div>
          <div className="space-y-6">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 animate-pulse"
              >
                <div className="h-6 bg-gray-300 rounded mb-4 w-3/4"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (pengumumanList.length === 0 && !isLoading) {
    return (
      <div id="pengumuman-section" className="py-[6rem] bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-[4rem]">
            <Title>Pengumuman</Title>
            <p className="text-[1.4rem] text-gray-600">
              Informasi penting dan pengumuman terbaru sekolah
            </p>
          </div>
          <div className="text-center py-[4rem]">
            <p className="text-gray-600 text-[1.4rem]">
              Belum ada pengumuman tersedia
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="pengumuman-section" className="py-[6rem] bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-[4rem]">
          <Title>Pengumuman</Title>
          <p className="text-[1.4rem] text-gray-600">
            Informasi penting dan pengumuman terbaru sekolah
          </p>
        </div>

        <div className="space-y-6">
          {pengumumanList.map((item) => (
            <article
              key={item.id}
              className="rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group border-t-4 border-[var(--primary-color)]"
            >
              <div className="p-6">
                <div>
                  <div className="flex items-center mb-3">
                    <div className="bg-[var(--primary-color)] p-2 rounded-full mr-3">
                      <Speaker className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex items-center text-gray-500 text-[1.2rem]">
                      <Calendar className="w-8 h-8 mr-2" />
                      <span>{formatDate(item.tanggalPost)}</span>
                    </div>
                  </div>
                  <h3 className="text-[1.8rem] font-bold text-gray-800 mb-3 group-hover:text-[var(--primary-color)] transition-colors">
                    {item.judul}
                  </h3>
                  <p className="text-gray-600 text-[1.4rem] leading-relaxed mb-4">
                    {item.konten.length > 200
                      ? `${item.konten.substring(0, 200)}...`
                      : item.konten}
                  </p>
                  <Link
                    href="/berita-pengumuman/pengumuman"
                    className="inline-flex items-center text-[var(--primary-color)] font-medium hover:underline text-[1.3rem]"
                  >
                    Lihat Detail
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-[4rem]">
          <Link
            href="/berita-pengumuman/pengumuman"
            className="inline-flex items-center px-6 py-3 bg-[var(--primary-color)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-[1.3rem]"
          >
            Lihat Semua Pengumuman
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PengumumanSection;
