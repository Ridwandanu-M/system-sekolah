"use client";

import { useState, useEffect } from "react";
import { Save, Edit, Eye, EyeOff } from "lucide-react";

const AdminSambutanPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({
    id: null,
    title: "Sambutan Kepala Sekolah",
    judul: "Sambutan Kepala Sekolah",
    konten: "",
    gambar: null,
  });

  const [editContent, setEditContent] = useState(content);

  // Fetch data saat komponen dimount
  useEffect(() => {
    fetchSambutanData();
  }, []);

  const fetchSambutanData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/tentang-sekolah/sambutan");
      const result = await response.json();

      if (result.success && result.data) {
        const sambutanData = {
          id: result.data.id,
          title: "Sambutan Kepala Sekolah",
          judul: result.data.judul,
          konten: result.data.konten,
          gambar: result.data.gambar,
        };
        setContent(sambutanData);
        setEditContent(sambutanData);
      }
    } catch (error) {
      console.error("Error fetching sambutan data:", error);
      alert("Gagal mengambil data sambutan");
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

      const payload = {
        judul: editContent.judul,
        konten: editContent.konten,
        gambar: editContent.gambar,
      };

      if (content.id) {
        payload.id = content.id;
      }

      const response = await fetch("/api/tentang-sekolah/sambutan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        const updatedData = {
          id: result.data.id,
          title: "Sambutan Kepala Sekolah",
          judul: result.data.judul,
          konten: result.data.konten,
          gambar: result.data.gambar,
        };
        setContent(updatedData);
        setEditContent(updatedData);
        setIsEditing(false);
        alert("Data berhasil disimpan!");
      } else {
        alert(result.message || "Gagal menyimpan data");
      }
    } catch (error) {
      console.error("Error saving sambutan:", error);
      alert("Gagal menyimpan data sambutan");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[2.8rem] font-bold text-[var(--primary-color)]">
          Kelola Sambutan Kepala Sekolah
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
              disabled={loading}
              className="flex items-center gap-2 bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-color-tint)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Edit size={20} />
              {loading ? "Memuat..." : "Edit Konten"}
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                disabled={saving}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
        {/* Edit Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
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
              {/* Judul */}
              <div className="mb-6">
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  Judul Sambutan
                </label>
                <input
                  type="text"
                  value={isEditing ? editContent.judul : content.judul}
                  onChange={(e) =>
                    setEditContent({
                      ...editContent,
                      judul: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
                />
              </div>

              {/* Konten Sambutan */}
              <div className="mb-6">
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  Isi Sambutan
                </label>
                <textarea
                  value={isEditing ? editContent.konten : content.konten}
                  onChange={(e) =>
                    setEditContent({
                      ...editContent,
                      konten: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  rows={10}
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100 resize-vertical"
                  placeholder="Masukkan isi sambutan kepala sekolah..."
                />
              </div>

              {/* Gambar */}
              <div className="mb-6">
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  Gambar (URL)
                </label>
                <input
                  type="text"
                  value={
                    isEditing ? editContent.gambar || "" : content.gambar || ""
                  }
                  onChange={(e) =>
                    setEditContent({
                      ...editContent,
                      gambar: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
                  placeholder="Masukkan URL gambar..."
                />
              </div>
            </>
          )}
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-[2rem] font-semibold text-gray-800 mb-6">
              Preview Halaman
            </h2>
            <div className="border rounded-lg p-6 bg-gray-50">
              <h1 className="text-[2.4rem] font-bold text-[var(--primary-color)] mb-8 text-center">
                {content.judul}
              </h1>

              <div className="bg-white rounded-lg shadow-lg p-8">
                {content.gambar && (
                  <div className="mb-6 text-center">
                    <img
                      src={content.gambar}
                      alt="Foto Kepala Sekolah"
                      className="w-48 h-48 object-cover rounded-lg mx-auto shadow-lg"
                      onError={(e) => {
                        e.target.style.display = "none";
                      }}
                    />
                  </div>
                )}
                <div className="text-[1.6rem] leading-relaxed text-gray-700 whitespace-pre-line">
                  {content.konten}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSambutanPage;
