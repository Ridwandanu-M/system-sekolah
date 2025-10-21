"use client";

import { useState } from "react";
import Title from "@/component/Title";
import AnnouncementCard from "@/component/AnnouncementCard";
import SearchFilter from "@/component/SearchFilter";

const sampleAnnouncements = [
  {
    id: 1,
    title: "Libur Hari Raya Idul Fitri",
    content:
      "Sekolah akan libur pada tanggal 10-17 April 2024 dalam rangka memperingati Hari Raya Idul Fitri. Kegiatan belajar mengajar akan dimulai kembali pada tanggal 18 April 2024.",
    date: "2024-04-05",
    author: "Tata Usaha",
    priority: "important",
    isNew: true,
    category: "Libur",
    slug: "libur-idul-fitri-2024",
  },
  {
    id: 2,
    title: "Ujian Tengah Semester Genap 2024",
    content:
      "Ujian Tengah Semester Genap akan dilaksanakan mulai tanggal 20-27 Maret 2024. Siswa diharapkan mempersiapkan diri dengan baik.",
    date: "2024-03-15",
    author: "Wakil Kepala Sekolah",
    priority: "urgent",
    isNew: false,
    category: "Ujian",
    slug: "uts-genap-2024",
  },
  {
    id: 3,
    title: "Pembayaran SPP Bulan April",
    content:
      "Pembayaran SPP bulan April dapat dilakukan mulai tanggal 1 April 2024 melalui bank atau kantin sekolah. Batas akhir pembayaran tanggal 10 April 2024.",
    date: "2024-03-28",
    author: "Bendahara",
    priority: "normal",
    isNew: true,
    category: "Keuangan",
    slug: "pembayaran-spp-april-2024",
  },
  {
    id: 4,
    title: "Rapat Orang Tua Siswa Kelas XII",
    content:
      "Mengundang seluruh orang tua siswa kelas XII untuk menghadiri rapat persiapan ujian nasional yang akan dilaksanakan pada Sabtu, 30 Maret 2024 pukul 08.00 WIB.",
    date: "2024-03-25",
    author: "Wali Kelas XII",
    priority: "important",
    isNew: true,
    category: "Kegiatan",
    slug: "rapat-ortu-kelas-xii",
  },
  {
    id: 5,
    title: "Pelaksanaan Ujian Praktik Bahasa Inggris",
    content:
      "Ujian praktik Bahasa Inggris untuk kelas XI akan dilaksanakan pada tanggal 15-20 Maret 2024. Siswa diharapkan mempersiapkan materi speaking dan listening.",
    date: "2024-03-10",
    author: "Guru Bahasa Inggris",
    priority: "normal",
    isNew: false,
    category: "Ujian",
    slug: "ujian-praktik-bahasa-inggris",
  },
  {
    id: 6,
    title: "Pendaftaran Ekstrakurikuler Baru",
    content:
      "Dibuka pendaftaran untuk ekstrakurikuler baru: Robotika dan Fotografi. Pendaftaran dapat dilakukan di ruang BK mulai tanggal 5 Maret 2024.",
    date: "2024-03-05",
    author: "Pembina Ekstrakurikuler",
    priority: "normal",
    isNew: false,
    category: "Kegiatan",
    slug: "pendaftaran-ekskul-baru",
  },
];

const categories = ["Libur", "Ujian", "Keuangan", "Kegiatan", "Akademik"];

const PengumumanPage = () => {
  const [announcements, setAnnouncements] = useState(sampleAnnouncements);
  const [filteredAnnouncements, setFilteredAnnouncements] =
    useState(sampleAnnouncements);
  const [loading, setLoading] = useState(false);

  const handleSearch = (searchTerm) => {
    const filtered = announcements.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredAnnouncements(filtered);
  };

  const handleFilter = (category) => {
    if (category === "") {
      setFilteredAnnouncements(announcements);
    } else {
      const filtered = announcements.filter(
        (item) => item.category === category,
      );
      setFilteredAnnouncements(filtered);
    }
  };

  return (
    <section className="pt-[7.4rem] bg-gray-50 min-h-screen">
      <div className="py-[9.6rem]">
        <div className="max-w-[120rem] mx-auto px-8">
          <Title>Pengumuman Sekolah</Title>

          <SearchFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            categories={categories}
            type="pengumuman"
          />

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)] mx-auto"></div>
              <p className="mt-4 text-gray-600">Memuat pengumuman...</p>
            </div>
          ) : filteredAnnouncements.length > 0 ? (
            <div className="space-y-6">
              {filteredAnnouncements.map((item) => (
                <AnnouncementCard key={item.id} announcement={item} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-[1.6rem]">
                Tidak ada pengumuman yang ditemukan
              </p>
            </div>
          )}

          {/* Pagination placeholder - implement if needed */}
          {filteredAnnouncements.length > 0 && (
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

export default PengumumanPage;
