"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import Link from "next/link";

const BeritaDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (params.slug) {
      fetchBeritaDetail();
    }
  }, [params.slug]);

  const fetchBeritaDetail = async () => {
    try {
      setLoading(true);

      const beritaId = params.slug.split("-")[0];

      if (!beritaId || isNaN(beritaId)) {
        throw new Error("Invalid berita ID");
      }

      const response = await fetch(`/api/berita/${beritaId}`);

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error("Berita tidak ditemukan");
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setBerita(result.data);
      } else {
        throw new Error(result.message || "Gagal memuat berita");
      }
    } catch (err) {
      console.error("Error fetching berita:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <section className="pt-[7.4rem] bg-gray-50 min-h-screen">
        <div className="py-[9.6rem]">
          <div className="max-w-[80rem] mx-auto px-8">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--primary-color)] mx-auto"></div>
              <p className="mt-4 text-gray-600 text-[1.4rem]">
                Memuat berita...
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="pt-[7.4rem] bg-gray-50 min-h-screen">
        <div className="py-[9.6rem]">
          <div className="max-w-[80rem] mx-auto px-8 text-center">
            <div className="bg-white rounded-lg shadow-lg p-12">
              <h1 className="text-[2.4rem] font-bold text-gray-800 mb-4">
                Berita Tidak Ditemukan
              </h1>
              <p className="text-[1.6rem] text-gray-600 mb-8">{error}</p>
              <Link
                href="/berita-pengumuman/berita"
                className="inline-flex items-center gap-2 bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-[var(--primary-color-tint)] transition-colors text-[1.4rem] font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Kembali ke Daftar Berita
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!berita) {
    return null;
  }

  return (
    <section className="pt-[7.4rem] bg-gray-50 min-h-screen">
      <div className="py-[9.6rem]">
        <div className="max-w-[80rem] mx-auto px-8">
          <div className="mb-6">
            <Link
              href="/berita-pengumuman/berita"
              className="inline-flex items-center gap-2 text-[var(--primary-color)] hover:text-[var(--primary-color-tint)] transition-colors text-[1.4rem] font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali ke Daftar Berita
            </Link>
          </div>

          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {berita.gambar && (
              <div className="relative h-[40rem] md:h-[50rem]">
                <img
                  src={berita.gambar}
                  alt={berita.judul}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            )}

            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-6 mb-6 text-[1.3rem] text-gray-600">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(berita.tanggalPost)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>{berita.penulis}</span>
                </div>
              </div>

              <h1 className="text-[2.8rem] md:text-[3.2rem] font-bold text-gray-800 leading-tight mb-6">
                {berita.judul}
              </h1>

              <div className="prose prose-lg max-w-none">
                <div className="text-[1.5rem] md:text-[1.6rem] text-gray-700 leading-relaxed whitespace-pre-line">
                  {berita.konten}
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="text-[1.3rem] text-gray-600">
                    <p>
                      Dipublikasikan oleh <strong>{berita.penulis}</strong>
                    </p>
                    <p>Terakhir diperbarui: {formatDate(berita.updatedAt)}</p>
                  </div>

                  <div className="flex gap-3">
                    <Link
                      href="/berita-pengumuman/berita"
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-[1.3rem]"
                    >
                      Berita Lainnya
                    </Link>
                    <Link
                      href="/"
                      className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-color-tint)] transition-colors text-[1.3rem]"
                    >
                      Kembali ke Beranda
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default BeritaDetailPage;
