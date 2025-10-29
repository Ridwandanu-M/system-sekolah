"use client";

import { useState, useEffect } from "react";
import { Save, Edit, Eye, EyeOff, Plus, Trash2 } from "lucide-react";

const AdminFasilitasPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({
    title: "Fasilitas",
    description:
      "SMP Muhammadiyah 1 Seyegan menyediakan berbagai fasilitas penunjang kegiatan pembelajaran dan pengembangan potensi siswa untuk menciptakan lingkungan belajar yang nyaman dan kondusif.",
    fasilitas: [],
  });

  const [editContent, setEditContent] = useState(content);

  useEffect(() => {
    fetchFasilitasData();
  }, []);

  const fetchFasilitasData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/tentang-sekolah/fasilitas");
      const result = await response.json();

      if (result.success && result.data) {
        const fasilitasData = {
          title: "Fasilitas",
          description:
            "SMP Muhammadiyah 1 Seyegan menyediakan berbagai fasilitas penunjang kegiatan pembelajaran dan pengembangan potensi siswa untuk menciptakan lingkungan belajar yang nyaman dan kondusif.",
          fasilitas: result.data.map((item) => ({
            id: item.id,
            nama: item.nama,
            deskripsi: item.deskripsi,
          })),
        };
        setContent(fasilitasData);
        setEditContent(fasilitasData);
      }
    } catch (error) {
      console.error("Error fetching fasilitas data:", error);
      alert("Gagal mengambil data fasilitas");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditContent(content);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditContent(content);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const savePromises = editContent.fasilitas.map(async (fasilitas) => {
        if (!fasilitas.nama?.trim() || !fasilitas.deskripsi?.trim()) {
          return Promise.resolve();
        }

        const payload = {
          nama: fasilitas.nama.trim(),
          deskripsi: fasilitas.deskripsi.trim(),
        };

        if (
          fasilitas.id &&
          fasilitas.id !== null &&
          fasilitas.id > 0 &&
          !fasilitas.id.toString().startsWith("new_")
        ) {
          const response = await fetch("/api/tentang-sekolah/fasilitas", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...payload, id: fasilitas.id }),
          });

          if (!response.ok) {
            throw new Error(
              `Failed to update fasilitas: ${response.statusText}`
            );
          }

          return response.json();
        } else {
          const response = await fetch("/api/tentang-sekolah/fasilitas", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            throw new Error(
              `Failed to create fasilitas: ${response.statusText}`
            );
          }

          return response.json();
        }
      });

      const results = await Promise.all(savePromises);
      console.log("Save results:", results);

      await fetchFasilitasData();
      setIsEditing(false);
      alert("Data berhasil disimpan!");
    } catch (error) {
      console.error("Error saving fasilitas:", error);
      alert("Gagal menyimpan data fasilitas");
    } finally {
      setSaving(false);
    }
  };

  const handleFasilitasChange = (id, field, value) => {
    const newFasilitas = editContent.fasilitas.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setEditContent({
      ...editContent,
      fasilitas: newFasilitas,
    });
  };

  const addFasilitas = () => {
    const newId = `new_${Date.now()}`;
    setEditContent({
      ...editContent,
      fasilitas: [
        ...editContent.fasilitas,
        {
          id: newId,
          nama: "",
          deskripsi: "",
        },
      ],
    });
  };

  const removeFasilitas = async (id) => {
    try {
      if (id && !id.toString().startsWith("new_")) {
        const response = await fetch(
          `/api/tentang-sekolah/fasilitas?id=${id}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to delete fasilitas");
        }
      }

      const newFasilitas = editContent.fasilitas.filter(
        (item) => item.id !== id
      );
      setEditContent({
        ...editContent,
        fasilitas: newFasilitas,
      });
    } catch (error) {
      console.error("Error removing fasilitas:", error);
      alert("Gagal menghapus fasilitas");
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[2.8rem] font-bold text-[var(--primary-color)]">
          Kelola Fasilitas Sekolah
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center text-[1.4rem] cursor-pointer gap-2 px-4 py-2 rounded-lg transition-colors ${
              showPreview
                ? "bg-gray-500 text-white"
                : "bg-yellow-500 text-white hover:bg-yellow-600"
            }`}
          >
            {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
            {showPreview ? "Sembunyikan Preview" : "Tampilkan Preview"}
          </button>
          {!isEditing ? (
            <button
              onClick={handleEdit}
              disabled={loading}
              className="flex items-center text-[1.4rem] cursor-pointer gap-2 bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-color-tint)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Edit size={20} />
              {loading ? "Memuat..." : "Edit Konten"}
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                disabled={saving}
                className="px-4 py-2 bg-gray-500 text-[1.4rem] cursor-pointer text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 text-[1.4rem] cursor-pointer bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={20} />
                {saving ? "Menyimpan..." : "Simpan"}
              </button>
            </div>
          )}
        </div>
      </div>

      <div
        className={`grid ${showPreview ? "grid-cols-2" : "grid-cols-1"} gap-8`}
      >
        <div className="bg-white rounded-lg shadow-lg p-6 max-h-screen overflow-y-auto">
          <h2 className="text-[2rem] font-semibold text-gray-800 mb-6">
            {isEditing ? "Edit Konten" : "Konten Saat Ini"}
          </h2>

          {loading && (
            <div className="text-center py-8">
              <div className="text-[1.4rem] text-gray-600">Memuat data...</div>
            </div>
          )}

          {!loading && (
            <>
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

              <div className="mb-6">
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={
                    isEditing ? editContent.description : content.description
                  }
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
            </>
          )}

          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[1.6rem] font-medium text-gray-700">
                Daftar Fasilitas
              </h3>
              {isEditing && (
                <button
                  onClick={addFasilitas}
                  className="flex items-center gap-2 bg-[var(--primary-color)] text-white px-3 py-1 rounded text-[1.4rem] hover:bg-[var(--primary-color-tint)] transition-colors cursor-pointer"
                >
                  <Plus size={20} />
                  Tambah Fasilitas
                </button>
              )}
            </div>

            <div className="space-y-4">
              {(isEditing ? editContent.fasilitas : content.fasilitas)
                .sort((a, b) => a.nama.localeCompare(b.nama))
                .map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm border-l-4 border-l-[var(--primary-color)]"
                  >
                    <div className="flex justify-between items-start mb-3">
                      {isEditing && (
                        <button
                          onClick={() => removeFasilitas(item.id)}
                          className="flex items-center gap-[.8rem] bg-red-500 text-[1.4rem] cursor-pointer text-white px-[1.2rem] py-[.4rem] rounded hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={20} />
                          Hapus
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[1.4rem] font-medium text-gray-600 mb-1">
                            Nama Fasilitas
                          </label>
                          <input
                            type="text"
                            value={item.nama}
                            onChange={(e) =>
                              handleFasilitasChange(
                                item.id,
                                "nama",
                                e.target.value
                              )
                            }
                            disabled={!isEditing}
                            className="w-full p-2 border border-gray-300 rounded-lg text-[1.3rem] disabled:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            placeholder="Masukkan nama fasilitas..."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[1.4rem] font-medium text-gray-600 mb-1">
                          Deskripsi
                        </label>
                        <textarea
                          value={item.deskripsi}
                          onChange={(e) =>
                            handleFasilitasChange(
                              item.id,
                              "deskripsi",
                              e.target.value
                            )
                          }
                          disabled={!isEditing}
                          rows={3}
                          className="w-full p-2 border border-gray-300 rounded-lg text-[1.4rem] placeholder:text-[1.4rem] disabled:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                          placeholder="Masukkan deskripsi fasilitas..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.fasilitas
                    .sort((a, b) => a.nama.localeCompare(b.nama))
                    .map((item) => (
                      <div
                        key={item.id}
                        className="p-6 border-l-4 border-l-blue-400 bg-white rounded-r-lg shadow-md"
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminFasilitasPage;
