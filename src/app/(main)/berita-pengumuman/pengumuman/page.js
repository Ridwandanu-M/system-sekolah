"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Search, Filter } from "lucide-react";
import Title from "@/components/Title";

const PengumumanPage = () => {
  const [pengumumanList, setPengumumanList] = useState([]);
  const [filteredPengumuman, setFilteredPengumuman] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalPengumuman, setTotalPengumuman] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchPengumuman();
  }, [currentPage]);

  const fetchPengumuman = async () => {
    try {
      setLoading(true);
      const offset = (currentPage - 1) * itemsPerPage;
      const response = await fetch(
        `/api/pengumuman?limit=${itemsPerPage}&offset=${offset}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setPengumumanList(result.data);
        setFilteredPengumuman(result.data);
        setTotalPengumuman(result.total || 0);
        setTotalPages(Math.ceil((result.total || 0) / itemsPerPage));
      }
    } catch (error) {
      console.error("Error fetching pengumuman:", error);
      setPengumumanList([]);
      setFilteredPengumuman([]);
    } finally {
      setLoading(false);
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

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredPengumuman(pengumumanList);
    } else {
      const filtered = pengumumanList.filter(
        (item) =>
          item.judul.toLowerCase().includes(term.toLowerCase()) ||
          item.konten.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredPengumuman(filtered);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <section className="pt-[7.4rem] bg-gray-50 min-h-screen">
      <div className="py-[9.6rem]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-[4rem]">
            <Title>Pengumuman</Title>
            <p className="text-[1.8rem] text-gray-600">
              Semua pengumuman dan informasi penting sekolah
            </p>
            {totalPengumuman > 0 && (
              <p className="text-[1.4rem] text-gray-500 mt-2">
                Menampilkan {(currentPage - 1) * itemsPerPage + 1}-
                {Math.min(currentPage * itemsPerPage, totalPengumuman)} dari{" "}
                {totalPengumuman} pengumuman
              </p>
            )}
          </div>

          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Cari pengumuman..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-color)] focus:border-[var(--primary-color)] text-[1.4rem]"
              />
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto"></div>
              <p className="mt-4 text-gray-600 text-[1.4rem]">
                Memuat pengumuman...
              </p>
            </div>
          ) : filteredPengumuman.length > 0 ? (
            <>
              <div className="space-y-6 mb-8">
                {filteredPengumuman.map((item) => (
                  <article
                    key={item.id}
                    className="bg-white border-t-4 border-[var(--primary-color)] rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="p-6">
                      <div className="mb-4">
                        <h2 className="text-[1.8rem] font-bold text-gray-800 mb-2 hover:text-[var(--primary-color)] transition-colors">
                          {item.judul}
                        </h2>
                        <div className="flex items-center text-gray-500 text-[1.2rem] mb-4">
                          <Calendar className="w-4 h-4 mr-2" />
                          <span>{formatDate(item.tanggalPost)}</span>
                        </div>
                      </div>
                      <div className="text-gray-600 text-[1.4rem] leading-relaxed">
                        {item.konten.length > 300
                          ? `${item.konten.substring(0, 300)}...`
                          : item.konten}
                      </div>
                      {item.konten.length > 300 && (
                        <button className="text-[var(--primary-color)] font-medium hover:underline text-[1.3rem] mt-3 inline-flex items-center">
                          Baca Selengkapnya
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination Controls */}
              {!searchTerm && totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  {renderPaginationButtons()}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-[1.6rem]">
                {searchTerm
                  ? "Tidak ada pengumuman yang sesuai dengan pencarian"
                  : "Belum ada pengumuman tersedia"}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PengumumanPage;
