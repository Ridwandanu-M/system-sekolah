"use client";

import { useState, useEffect } from "react";
import Title from "@/components/Title";
import NewsCard from "@/components/NewsCard";
import SearchFilter from "@/components/SearchFilter";

const sampleNews = [
  {
    id: 1,
    title: "Penerimaan Siswa Baru Tahun Ajaran 2024/2025",
    excerpt:
      "Sekolah membuka pendaftaran siswa baru untuk tahun ajaran 2024/2025. Pendaftaran dibuka mulai tanggal 15 Januari hingga 28 Februari 2024.",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    image: "/news-1.jpg",
    date: "2024-01-15",
    author: "Admin Sekolah",
    category: "Akademik",
    slug: "penerimaan-siswa-baru-2024-2025",
  },
  {
    id: 2,
    title: "Prestasi Siswa dalam Olimpiade Matematika Nasional",
    excerpt:
      "Tim Olimpiade Matematika sekolah berhasil meraih medali emas dalam kompetisi tingkat nasional yang diselenggarakan di Jakarta.",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    image: "/news-2.jpg",
    date: "2024-01-12",
    author: "Guru Matematika",
    category: "Prestasi",
    slug: "prestasi-olimpiade-matematika",
  },
  {
    id: 3,
    title: "Program Beasiswa untuk Siswa Berprestasi",
    excerpt:
      "Sekolah menyediakan program beasiswa penuh untuk siswa berprestasi dari keluarga kurang mampu.",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    image: "/news-3.jpg",
    date: "2024-01-10",
    author: "Kepala Sekolah",
    category: "Beasiswa",
    slug: "program-beasiswa-siswa-berprestasi",
  },
  {
    id: 4,
    title: "Kegiatan Ekstrakurikuler Semester Genap",
    excerpt:
      "Berbagai kegiatan ekstrakurikuler menarik telah dimulai untuk semester genap. Siswa dapat memilih sesuai minat dan bakat.",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    image: "/news-4.jpg",
    date: "2024-01-08",
    author: "Pembina Ekskul",
    category: "Kegiatan",
    slug: "ekstrakurikuler-semester-genap",
  },
  {
    id: 5,
    title: "Turnamen Olahraga Antar Sekolah",
    excerpt:
      "Sekolah akan mengadakan turnamen olahraga antar sekolah se-kecamatan pada bulan Maret mendatang.",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    image: "/news-5.jpg",
    date: "2024-01-05",
    author: "Guru Olahraga",
    category: "Olahraga",
    slug: "turnamen-olahraga-antar-sekolah",
  },
  {
    id: 6,
    title: "Workshop Digital Learning untuk Guru",
    excerpt:
      "Sekolah mengadakan workshop pelatihan digital learning untuk meningkatkan kualitas pembelajaran di era digital.",
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit...",
    image: "/news-6.jpg",
    date: "2024-01-03",
    author: "Wakil Kepala Sekolah",
    category: "Akademik",
    slug: "workshop-digital-learning",
  },
];

const categories = ["Akademik", "Prestasi", "Beasiswa", "Kegiatan", "Olahraga"];

const BeritaPage = () => {
  const [news, setNews] = useState(sampleNews);
  const [filteredNews, setFilteredNews] = useState(sampleNews);
  const [loading, setLoading] = useState(false);

  const handleSearch = (searchTerm) => {
    const filtered = news.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredNews(filtered);
  };

  const handleFilter = (category) => {
    if (category === "") {
      setFilteredNews(news);
    } else {
      const filtered = news.filter((item) => item.category === category);
      setFilteredNews(filtered);
    }
  };

  return (
    <section className="pt-[7.4rem] bg-gray-50 min-h-screen">
      <div className="py-[9.6rem]">
        <div className="max-w-[120rem] mx-auto px-8">
          <Title>Berita Sekolah</Title>

          <SearchFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            categories={categories}
            type="berita"
          />

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto"></div>
              <p className="mt-4 text-gray-600">Memuat berita...</p>
            </div>
          ) : filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-[1.6rem]">
                Tidak ada berita yang ditemukan
              </p>
            </div>
          )}

          {/* Pagination placeholder - implement if needed */}
          {filteredNews.length > 0 && (
            <div className="flex justify-center mt-12">
              <div className="flex items-center gap-2">
                <button
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                  disabled
                >
                  Sebelumnya
                </button>
                <span className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg">
                  1
                </span>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  2
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  3
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Selanjutnya
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BeritaPage;
