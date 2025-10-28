"use client";

import { useState } from "react";
import { Save, Edit, Eye, EyeOff, Plus, Trash2 } from "lucide-react";

const AdminStrukturPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [content, setContent] = useState({
    title: "Struktur Organisasi",
    description:
      "Struktur organisasi SMP Muhammadiyah 1 Seyegan menunjukkan hierarki kepemimpinan dan pembagian tugas yang jelas dalam mengelola kegiatan pendidikan dan administrasi sekolah.",
    struktur: [
      {
        id: 1,
        jabatan: "Kepala Sekolah",
        nama: "Rochmadi, S.Sos.I.",
        level: 1,
      },
      {
        id: 2,
        jabatan: "Wakil Kepala Sekolah Kurikulum",
        nama: "Drs. Ahmad Subandi, M.Pd.",
        level: 2,
      },
      {
        id: 3,
        jabatan: "Wakil Kepala Sekolah Kesiswaan",
        nama: "Sri Wahyuni, S.Pd.",
        level: 2,
      },
      {
        id: 4,
        jabatan: "Wakil Kepala Sekolah Sarana Prasarana",
        nama: "Bambang Sutrisno, S.Pd.",
        level: 2,
      },
      {
        id: 5,
        jabatan: "Kepala Tata Usaha",
        nama: "Siti Nurjanah, S.Pd.",
        level: 2,
      },
      {
        id: 6,
        jabatan: "Koordinator Guru Kelas VII",
        nama: "Eny Purwanti, S.Pd.",
        level: 3,
      },
      {
        id: 7,
        jabatan: "Koordinator Guru Kelas VIII",
        nama: "Mulyadi, S.Pd.",
        level: 3,
      },
      {
        id: 8,
        jabatan: "Koordinator Guru Kelas IX",
        nama: "Retno Wulandari, S.Pd.",
        level: 3,
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

  const handleStrukturChange = (id, field, value) => {
    const newStruktur = editContent.struktur.map((item) =>
      item.id === id ? { ...item, [field]: value } : item,
    );
    setEditContent({
      ...editContent,
      struktur: newStruktur,
    });
  };

  const addStruktur = () => {
    const newId = Math.max(...editContent.struktur.map((s) => s.id)) + 1;
    setEditContent({
      ...editContent,
      struktur: [
        ...editContent.struktur,
        {
          id: newId,
          jabatan: "",
          nama: "",
          level: 1,
        },
      ],
    });
  };

  const removeStruktur = (id) => {
    const newStruktur = editContent.struktur.filter((item) => item.id !== id);
    setEditContent({
      ...editContent,
      struktur: newStruktur,
    });
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 1:
        return "bg-blue-500";
      case 2:
        return "bg-green-500";
      case 3:
        return "bg-yellow-500";
      case 4:
        return "bg-purple-500";
      default:
        return "bg-gray-500";
    }
  };

  const getLevelName = (level) => {
    switch (level) {
      case 1:
        return "Pimpinan Tertinggi";
      case 2:
        return "Pimpinan Menengah";
      case 3:
        return "Koordinator";
      case 4:
        return "Staf";
      default:
        return "Lainnya";
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[2.8rem] font-bold text-[var(--primary-color)]">
          Kelola Struktur Organisasi
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

          {/* Struktur Organisasi */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[1.6rem] font-medium text-gray-700">
                Struktur Organisasi
              </h3>
              {isEditing && (
                <button
                  onClick={addStruktur}
                  className="flex items-center gap-2 bg-green-500 text-white px-3 py-1 rounded text-[1.2rem] hover:bg-green-600 transition-colors"
                >
                  <Plus size={16} />
                  Tambah Posisi
                </button>
              )}
            </div>

            {/* Level Legend */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <h4 className="text-[1.2rem] font-medium text-gray-600 mb-2">
                Level Jabatan:
              </h4>
              <div className="flex flex-wrap gap-3">
                {[1, 2, 3, 4].map((level) => (
                  <div key={level} className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded ${getLevelColor(level)}`}
                    ></div>
                    <span className="text-[1.1rem] text-gray-600">
                      {level}. {getLevelName(level)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {(isEditing ? editContent.struktur : content.struktur)
                .sort(
                  (a, b) =>
                    a.level - b.level || a.jabatan.localeCompare(b.jabatan),
                )
                .map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 bg-white border border-gray-200 rounded-lg shadow-sm border-l-4 ${getLevelColor(item.level)}`}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div
                        className={`px-3 py-1 ${getLevelColor(item.level)} text-white text-[1.1rem] rounded-full font-medium`}
                      >
                        Level {item.level} - {getLevelName(item.level)}
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => removeStruktur(item.id)}
                          className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded text-[1.1rem] hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                          Hapus
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-[1.2rem] font-medium text-gray-600 mb-1">
                          Jabatan
                        </label>
                        <input
                          type="text"
                          value={item.jabatan}
                          onChange={(e) =>
                            handleStrukturChange(
                              item.id,
                              "jabatan",
                              e.target.value,
                            )
                          }
                          disabled={!isEditing}
                          className="w-full p-2 border border-gray-300 rounded-lg text-[1.3rem] disabled:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Masukkan jabatan..."
                        />
                      </div>

                      <div>
                        <label className="block text-[1.2rem] font-medium text-gray-600 mb-1">
                          Nama
                        </label>
                        <input
                          type="text"
                          value={item.nama}
                          onChange={(e) =>
                            handleStrukturChange(
                              item.id,
                              "nama",
                              e.target.value,
                            )
                          }
                          disabled={!isEditing}
                          className="w-full p-2 border border-gray-300 rounded-lg text-[1.3rem] disabled:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Masukkan nama..."
                        />
                      </div>

                      <div>
                        <label className="block text-[1.2rem] font-medium text-gray-600 mb-1">
                          Level
                        </label>
                        <select
                          value={item.level}
                          onChange={(e) =>
                            handleStrukturChange(
                              item.id,
                              "level",
                              parseInt(e.target.value),
                            )
                          }
                          disabled={!isEditing}
                          className="w-full p-2 border border-gray-300 rounded-lg text-[1.3rem] disabled:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        >
                          <option value={1}>1 - Pimpinan Tertinggi</option>
                          <option value={2}>2 - Pimpinan Menengah</option>
                          <option value={3}>3 - Koordinator</option>
                          <option value={4}>4 - Staf</option>
                        </select>
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

                <div className="space-y-6">
                  {[1, 2, 3, 4].map((level) => {
                    const levelItems = content.struktur
                      .filter((item) => item.level === level)
                      .sort((a, b) => a.jabatan.localeCompare(b.jabatan));

                    if (levelItems.length === 0) return null;

                    return (
                      <div key={level} className="space-y-4">
                        <h3
                          className={`text-[1.8rem] font-bold text-white px-4 py-2 rounded ${getLevelColor(level)}`}
                        >
                          {getLevelName(level)}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {levelItems.map((item) => (
                            <div
                              key={item.id}
                              className={`p-4 border-l-4 ${getLevelColor(level)} bg-white rounded-r-lg shadow`}
                            >
                              <h4 className="text-[1.4rem] font-semibold text-gray-800 mb-2">
                                {item.jabatan}
                              </h4>
                              <p className="text-[1.3rem] text-gray-600">
                                {item.nama}
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

export default AdminStrukturPage;
