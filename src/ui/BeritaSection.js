"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, User, ArrowRight, Newspaper } from "lucide-react";
import Title from "@/components/Title";

const BeritaSection = () => {
  const [beritaList, setBeritaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLatestBerita();
  }, []);

  const fetchLatestBerita = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/berita?limit=3");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }

      const result = await response.json();
      if (result.success && result.data) {
        setBeritaList(result.data);
      }
    } catch (err) {
      console.error("Failed to fetch berita:", err);
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
      <div
        id="berita-section"
        className="py-[6rem] bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-[4rem]">
            <Title>Berita</Title>
            <p className="text-[1.4rem] text-gray-600">
              Dapatkan informasi terkini tentang kegiatan dan pengumuman sekolah
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2.5rem]">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
              >
                <div className="h-[20rem] bg-gray-300"></div>
                <div className="p-[2rem]">
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (beritaList.length === 0 && !isLoading) {
    return (
      <div
        id="berita-section"
        className="py-[6rem] bg-gradient-to-b from-white to-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-[4rem]">
            <Title>Berita</Title>
            <p className="text-[1.4rem] text-gray-600">
              Dapatkan informasi terkini tentang kegiatan dan pengumuman sekolah
            </p>
          </div>
          <div className="text-center py-[4rem]">
            <p className="text-gray-600 text-[1.4rem]">
              Belum ada berita tersedia
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      id="berita-section"
      className="py-[6rem] bg-gradient-to-b from-white to-gray-50"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-[4rem]">
          <Title>Berita</Title>
          <p className="text-[1.4rem] text-gray-600">
            Dapatkan informasi terkini tentang kegiatan dan pengumuman sekolah
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2.5rem]">
          {beritaList.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              <div className="relative overflow-hidden h-[20rem]">
                <img
                  src={item.gambar || "/placeholder-image.svg"}
                  alt={item.judul}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = "/placeholder-image.svg";
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[var(--primary-color)] text-white px-3 py-1 rounded-full text-[1.1rem] font-medium">
                    {item.kategori}
                  </span>
                </div>
              </div>
              <div className="p-[2rem]">
                <div className="flex items-center gap-4 mb-3 text-[1.2rem] text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(item.tanggalPost)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{item.penulis}</span>
                  </div>
                </div>
                <h3 className="text-[1.6rem] font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-[var(--primary-color)] transition-colors">
                  {item.judul}
                </h3>
                <p className="text-gray-600 text-[1.4rem] line-clamp-3 mb-4 leading-relaxed">
                  {item.ringkasan || item.konten.substring(0, 150) + "..."}
                </p>
                <Link
                  href={`/berita-pengumuman/berita/${generateSlug(
                    item.id,
                    item.judul
                  )}`}
                  className="inline-flex items-center text-[var(--primary-color)] font-medium hover:underline text-[1.2rem]"
                >
                  Baca Selengkapnya
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-[4rem]">
          <Link
            href="/berita-pengumuman"
            className="inline-flex items-center px-6 py-3 bg-[var(--primary-color)] text-white font-medium rounded-lg hover:opacity-90 transition-opacity text-[1.3rem]"
          >
            Lihat Semua Berita
            <ArrowRight className="w-5 h-5 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BeritaSection;
