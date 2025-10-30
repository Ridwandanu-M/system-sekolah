"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import Title from "./Title";

const BeritaPaginatedList = () => {
  const [beritaList, setBeritaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalBerita, setTotalBerita] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    fetchBerita();
  }, [currentPage]);

  const fetchBerita = async () => {
    try {
      setIsLoading(true);
      const offset = (currentPage - 1) * itemsPerPage;
      const response = await fetch(
        `/api/berita?limit=${itemsPerPage}&offset=${offset}`
      );

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
        setTotalBerita(result.total || 0);
        setTotalPages(Math.ceil((result.total || 0) / itemsPerPage));
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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      document.querySelector("#berita-list")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    buttons.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-[1.3rem] transition-colors"
      >
        ‹
      </button>
    );

    if (startPage > 1) {
      buttons.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-[1.3rem] transition-colors"
        >
          1
        </button>
      );
      if (startPage > 2) {
        buttons.push(
          <span key="ellipsis1" className="px-2 text-gray-500">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 rounded-lg text-[1.3rem] transition-colors ${
            currentPage === i
              ? "bg-[var(--primary-color)] text-white"
              : "border border-gray-300 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        buttons.push(
          <span key="ellipsis2" className="px-2 text-gray-500">
            ...
          </span>
        );
      }
      buttons.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-[1.3rem] transition-colors"
        >
          {totalPages}
        </button>
      );
    }

    buttons.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-[1.3rem] transition-colors"
      >
        ›
      </button>
    );

    return buttons;
  };

  if (isLoading) {
    return (
      <div id="berita-list" className="py-[9.6rem] bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-[4rem]">
            <Title>Berita</Title>
            <p className="text-[1.4rem] text-gray-600">
              Semua informasi dan berita terbaru sekolah
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2.5rem]">
            {[...Array(9)].map((_, index) => (
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
      <div id="berita-list" className="py-[9.6rem] bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-[4rem]">
            <Title>Berita</Title>
            <p className="text-[1.4rem] text-gray-600">
              Semua informasi dan berita terbaru sekolah
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
    <div id="berita-list" className="py-[9.6rem] bg-white">
      <div className="container mx-auto px-4 pt-[7.4rem]">
        <div className="text-center mb-[4rem] ">
          <Title>Berita</Title>
          <p className="text-[1.4rem] text-gray-600">
            Semua informasi dan berita terbaru sekolah
          </p>
          {totalBerita > 0 && (
            <p className="text-[1.4rem] text-gray-500 mt-2">
              Menampilkan {(currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, totalBerita)} dari{" "}
              {totalBerita} berita
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[2.5rem] mb-[4rem]">
          {beritaList.map((item) => (
            <article
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
                  <Link
                    href={`/berita-pengumuman/berita/${generateSlug(
                      item.id,
                      item.judul
                    )}`}
                  >
                    {item.judul}
                  </Link>
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
            </article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            {renderPaginationButtons()}
          </div>
        )}
      </div>
    </div>
  );
};

export default BeritaPaginatedList;
