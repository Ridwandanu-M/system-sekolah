"use client";

import { useState, useEffect } from "react";
import { Save, Edit, Eye, EyeOff } from "lucide-react";

const AdminVisiMisiPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({
    id: null,
    title: "Visi, Misi & Tujuan",
    visi: "",
    misi: "",
  });

  const [editContent, setEditContent] = useState(content);

  // Fetch data saat komponen dimount
  useEffect(() => {
    fetchVisiMisiData();
  }, []);

  const fetchVisiMisiData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/tentang-sekolah/visi-misi");
      const result = await response.json();

      if (result.success && result.data) {
        const visiMisiData = {
          id: result.data.id,
          title: "Visi, Misi & Tujuan",
          visi: result.data.visi || "",
          misi: result.data.misi || "",
        };
        setContent(visiMisiData);
        setEditContent(visiMisiData);
      } else {
        // Set default empty data if no data exists
        const defaultData = {
          id: null,
          title: "Visi, Misi & Tujuan",
          visi: "",
          misi: "",
        };
        setContent(defaultData);
        setEditContent(defaultData);
      }
    } catch (error) {
      console.error("Error fetching visi misi data:", error);
      alert("Gagal mengambil data visi misi");
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
        visi: editContent.visi,
        misi: editContent.misi,
      };

      if (content.id) {
        payload.id = content.id;
      }

      const response = await fetch("/api/tentang-sekolah/visi-misi", {
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
          title: "Visi, Misi & Tujuan",
          visi: result.data.visi,
          misi: result.data.misi,
        };
        setContent(updatedData);
        setEditContent(updatedData);
        setIsEditing(false);
        alert("Data berhasil disimpan!");
      } else {
        alert(result.message || "Gagal menyimpan data");
      }
    } catch (error) {
      console.error("Error saving visi misi:", error);
      alert("Gagal menyimpan data visi misi");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[2.8rem] font-bold text-[var(--primary-color)]">
          Kelola Visi, Misi & Tujuan
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
              {/* Visi */}
              <div className="mb-8">
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  Visi Sekolah
                </label>
                <textarea
                  value={isEditing ? editContent.visi : content.visi}
                  onChange={(e) =>
                    setEditContent({
                      ...editContent,
                      visi: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  rows={8}
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100 resize-vertical"
                  placeholder="Masukkan visi sekolah..."
                />
              </div>

              {/* Misi */}
              <div className="mb-6">
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  Misi Sekolah
                </label>
                <textarea
                  value={isEditing ? editContent.misi : content.misi}
                  onChange={(e) =>
                    setEditContent({
                      ...editContent,
                      misi: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  rows={12}
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100 resize-vertical"
                  placeholder="Masukkan misi sekolah..."
                />
              </div>
            </>
          )}
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="bg-white rounded-lg shadow-lg p-6 max-h-screen overflow-y-auto">
            <h2 className="text-[2rem] font-semibold text-gray-800 mb-6">
              Preview Halaman
            </h2>
            <div className="border rounded-lg p-6 bg-gray-50 space-y-8">
              <h1 className="text-[2.4rem] font-bold text-[var(--primary-color)] mb-8 text-center">
                {content.title}
              </h1>

              {/* Visi */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-[2.4rem] font-bold text-[var(--primary-color)] mb-6">
                  Visi
                </h2>
                <div className="text-[1.6rem] leading-relaxed text-gray-700 whitespace-pre-line">
                  {content.visi || "Visi belum diisi..."}
                </div>
              </div>

              {/* Misi */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-[2.4rem] font-bold text-[var(--primary-color)] mb-6">
                  Misi
                </h2>
                <div className="text-[1.6rem] leading-relaxed text-gray-700 whitespace-pre-line">
                  {content.misi || "Misi belum diisi..."}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVisiMisiPage;
