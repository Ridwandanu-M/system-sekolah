"use client";

import { useState } from "react";
import { Save, Edit, Eye, EyeOff, Plus, Trash2 } from "lucide-react";

const AdminFasilitasPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [content, setContent] = useState({
    title: "Fasilitas",
    description:
      "SMP Muhammadiyah 1 Seyegan menyediakan berbagai fasilitas penunjang kegiatan pembelajaran dan pengembangan potensi siswa untuk menciptakan lingkungan belajar yang nyaman dan kondusif.",
    fasilitas: [
      {
        id: 1,
        nama: "Ruang Kelas",
        deskripsi:
          "15 ruang kelas yang dilengkapi dengan AC, LCD projector, dan sound system untuk mendukung proses pembelajaran yang efektif.",
        kategori: "Akademik",
      },
      {
        id: 2,
        nama: "Laboratorium IPA",
        deskripsi:
          "Laboratorium IPA lengkap dengan peralatan praktikum untuk mata pelajaran Fisika, Kimia, dan Biologi.",
        kategori: "Akademik",
      },
      {
        id: 3,
        nama: "Laboratorium Komputer",
        deskripsi:
          "Laboratorium komputer dengan 30 unit komputer terbaru dan akses internet untuk mendukung pembelajaran TIK.",
        kategori: "Akademik",
      },
      {
        id: 4,
        nama: "Perpustakaan",
        deskripsi:
          "Perpustakaan dengan koleksi buku yang lengkap, ruang baca yang nyaman, dan sistem digital untuk pencarian buku.",
        kategori: "Akademik",
      },
      {
        id: 5,
        nama: "Masjid",
        deskripsi:
          "Masjid sekolah untuk kegiatan ibadah harian, sholat berjamaah, dan kegiatan keagamaan lainnya.",
        kategori: "Keagamaan",
      },
      {
        id: 6,
        nama: "Lapangan Olahraga",
        deskripsi:
          "Lapangan serbaguna untuk kegiatan olahraga seperti futsal, basket, voli, dan upacara bendera.",
        kategori: "Olahraga",
      },
      {
        id: 7,
        nama: "Kantin Sekolah",
        deskripsi:
          "Kantin yang menyediakan makanan dan minuman sehat dengan harga terjangkau untuk siswa dan guru.",
        kategori: "Penunjang",
      },
      {
        id: 8,
        nama: "Ruang UKS",
        deskripsi:
          "Unit Kesehatan Sekolah dengan peralatan P3K lengkap untuk menangani masalah kesehatan siswa dan guru.",
        kategori: "Penunjang",
      },
      {
        id: 9,
        nama: "Ruang Guru",
        deskripsi:
          "Ruang guru yang nyaman dengan fasilitas AC dan area diskusi untuk koordinasi pembelajaran.",
        kategori: "Penunjang",
      },
      {
        id: 10,
        nama: "Ruang Tata Usaha",
        deskripsi:
          "Ruang administrasi sekolah dengan sistem komputerisasi untuk pelayanan administrasi siswa dan guru.",
        kategori: "Penunjang",
      },
    ],
  });

  const [editContent, setEditContent] = useState(content);

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(content);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent(content);
  };

  const handleSave = () => {
    setContent(editContent);
    setIsEditing(false);
    // TODO: Implement API call to save data
    alert("Data berhasil disimpan!");
  };

  const handleFasilitasChange = (id, field, value) => {
    const newFasilitas = editContent.fasilitas.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );
    setEditContent({
      ...editContent,
      fasilitas: newFasilitas,
    });
  };

  const addFasilitas = () => {
    const newId = Math.max(...editContent.fasilitas.map((f) => f.id)) + 1;
    setEditContent({
      ...editContent,
      fasilitas: [
        ...editContent.fasilitas,
        {
          id: newId,
          nama: "",
          deskripsi: "",
          kategori: "Akademik",
        },
      ],
    });
  };

  const removeFasilitas = (id) => {
    const newFasilitas = editContent.fasilitas.filter((item) => item.id !== id);
    setEditContent({
      ...editContent,
      fasilitas: newFasilitas,
    });
  };

  const getCategoryColor = (kategori) => {
    switch (kategori) {
      case "Akademik":
        return "bg-blue-500";
      case "Keagamaan":
        return "bg-green-500";
      case "Olahraga":
        return "bg-red-500";
      case "Penunjang":
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const categories = ["Akademik", "Keagamaan", "Olahraga", "Penunjang"];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[2.8rem] font-bold text-[var(--primary-color)]">
          Kelola Fasilitas Sekolah
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              showPreview
                ? "bg-gray-500 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
            {showPreview ? "Sembunyikan Preview" : "Tampilkan Preview"}
          </button>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-color-tint)] transition-colors"
            >
              <Edit size={20} />
              Edit Konten
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Save size={20} />
                Simpan
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className={`grid ${showPreview ? "grid-cols-2" : "grid-cols-1"} gap-8`}
      >
        {/* Edit Form */}
        <div className="bg-white rounded-lg shadow-lg p-6 max-h-screen overflow-y-auto">
          <h2 className="text-[2rem] font-semibold text-gray-800 mb-6">
            {isEditing ? "Edit Konten" : "Konten Saat Ini"}
          </h2>

          {/* Title */}
          <div className="mb-6">
            <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
              Judul Halaman
            </label>
            <input
              type="text"
              value={isEditing ? editContent.title : content.title}
              onChange={(e) =>
                setEditContent({
                  ...editContent,
                  title: e.target.value,
                })
              }
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
            />
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
              Deskripsi
            </label>
            <textarea
              value={isEditing ? editContent.description : content.description}
              onChange={(e) =>
                setEditContent({
                  ...editContent,
                  description: e.target.value,
                })
              }
              disabled={!isEditing}
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
            />
          </div>

          {/* Fasilitas */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[1.6rem] font-medium text-gray-700">
                Daftar Fasilitas
              </h3>
              {isEditing && (
                <button
                  onClick={addFasilitas}
                  className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded text-[1.2rem] hover:bg-green-600 transition-colors"
                >
                  <Plus size={16} />
                  Tambah Fasilitas
                </button>
              )}
            </div>

            {/* Category Legend */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <h4 className="text-[1.2rem] font-medium text-gray-600 mb-2">
                Kategori Fasilitas:
              </h4>
              <div className="flex flex-wrap gap-3">
                {categories.map((kategori) => (
                  <div key={kategori} className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded ${getCategoryColor(kategori)}`}
                    ></div>
                    <span className="text-[1.1rem] text-gray-600">
                      {kategori}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {(isEditing ? editContent.fasilitas : content.fasilitas)
                .sort(
                  (a, b) =>
                    a.kategori.localeCompare(b.kategori) ||
                    a.nama.localeCompare(b.nama),
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 bg-white border border-gray-200 rounded-lg shadow-sm border-l-4 ${getCategoryColor(item.kategori)}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div
                        className={`px-3 py-1 ${getCategoryColor(item.kategori)} text-white text-[1.1rem] rounded-full font-medium`}
                      >
                        {item.kategori}
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => removeFasilitas(item.id)}
                          className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded text-[1.1rem] hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                          Hapus
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[1.2rem] font-medium text-gray-600 mb-1">
                            Nama Fasilitas
                          </label>
                          <input
                            type="text"
                            value={item.nama}
                            onChange={(e) =>
                              handleFasilitasChange(
                                item.id,
                                "nama",
                                e.target.value,
                              )
                            }
                            disabled={!isEditing}
                            className="w-full p-2 border border-gray-300 rounded-lg text-[1.3rem] disabled:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Masukkan nama fasilitas..."
                          />
                        </div>

                        <div>
                          <label className="block text-[1.2rem] font-medium text-gray-600 mb-1">
                            Kategori
                          </label>
                          <select
                            value={item.kategori}
                            onChange={(e) =>
                              handleFasilitasChange(
                                item.id,
                                "kategori",
                                e.target.value,
                              )
                            }
                            disabled={!isEditing}
                            className="w-full p-2 border border-gray-300 rounded-lg text-[1.3rem] disabled:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          >
                            {categories.map((kategori) => (
                              <option key={kategori} value={kategori}>
                                {kategori}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[1.2rem] font-medium text-gray-600 mb-1">
                          Deskripsi
                        </label>
                        <textarea
                          value={item.deskripsi}
                          onChange={(e) =>
                            handleFasilitasChange(
                              item.id,
                              "deskripsi",
                              e.target.value,
                            )
                          }
                          disabled={!isEditing}
                          rows={3}
                          className="w-full p-2 border border-gray-300 rounded-lg text-[1.3rem] disabled:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Masukkan deskripsi fasilitas..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="bg-white rounded-lg shadow-lg p-6 max-h-screen overflow-y-auto">
            <h2 className="text-[2rem] font-semibold text-gray-800 mb-6">
              Preview Halaman
            </h2>
            <div className="border rounded-lg p-6 bg-gray-50">
              <h1 className="text-[2.4rem] font-bold text-[var(--primary-color)] mb-6 text-center">
                {content.title}
              </h1>

              <div className="bg-white rounded-lg shadow-lg p-8">
                <p className="text-[1.6rem] leading-relaxed text-gray-700 mb-8 text-center">
                  {content.description}
                </p>

                <div className="space-y-8">
                  {categories.map((kategori) => {
                    const categoryItems = content.fasilitas
                      .filter((item) => item.kategori === kategori)
                      .sort((a, b) => a.nama.localeCompare(b.nama));

                    if (categoryItems.length === 0) return null;

                    return (
                      <div key={kategori} className="space-y-4">
                        <h3
                          className={`text-[2rem] font-bold text-white px-4 py-2 rounded ${getCategoryColor(kategori)}`}
                        >
                          Fasilitas {kategori}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {categoryItems.map((item) => (
                            <div
                              key={item.id}
                              className={`p-6 border-l-4 ${getCategoryColor(kategori)} bg-white rounded-r-lg shadow-md`}
                            >
                              <h4 className="text-[1.6rem] font-semibold text-gray-800 mb-3">
                                {item.nama}
                              </h4>
                              <p className="text-[1.4rem] text-gray-600 leading-relaxed">
                                {item.deskripsi}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFasilitasPage;
