"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Edit,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Calendar,
  X,
} from "lucide-react";

const AdminPengumumanPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pengumumanList, setPengumumanList] = useState([]);
  const [editingPengumuman, setEditingPengumuman] = useState(null);
  const [formData, setFormData] = useState({
    judul: "",
    konten: "",
  });

  useEffect(() => {
    fetchPengumumanData();
  }, []);

  const fetchPengumumanData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/pengumuman");
      const result = await response.json();

      if (result.success) {
        setPengumumanList(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching pengumuman:", error);
      alert("Gagal memuat data pengumuman");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      if (!formData.judul.trim() || !formData.konten.trim()) {
        alert("Judul dan konten harus diisi");
        return;
      }

      const url = editingPengumuman ? "/api/pengumuman" : "/api/pengumuman";
      const method = editingPengumuman ? "PUT" : "POST";
      const payload = editingPengumuman
        ? { ...formData, id: editingPengumuman.id }
        : formData;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        alert(
          editingPengumuman
            ? "Pengumuman berhasil diperbarui"
            : "Pengumuman berhasil dibuat"
        );
        setIsEditing(false);
        setEditingPengumuman(null);
        setFormData({ judul: "", konten: "", gambar: "" });
        fetchPengumumanData();
      } else {
        alert(result.message || "Gagal menyimpan pengumuman");
      }
    } catch (error) {
      console.error("Error saving pengumuman:", error);
      alert("Gagal menyimpan pengumuman");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (pengumuman) => {
    setEditingPengumuman(pengumuman);
    setFormData({
      judul: pengumuman.judul,
      konten: pengumuman.konten,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus pengumuman ini?")) return;

    try {
      const response = await fetch(`/api/pengumuman?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        alert("Pengumuman berhasil dihapus");
        fetchPengumumanData();
      } else {
        alert(result.message || "Gagal menghapus pengumuman");
      }
    } catch (error) {
      console.error("Error deleting pengumuman:", error);
      alert("Gagal menghapus pengumuman");
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
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-[2.8rem] font-bold text-[var(--primary-color)]">
          Manajemen Pengumuman
        </h1>
        <button
          onClick={() => {
            setIsEditing(true);
            setEditingPengumuman(null);
            setFormData({ judul: "", konten: "" });
          }}
          className="bg-[var(--primary-color)] text-white text-[1.4rem] px-4 py-2 rounded-lg hover:bg-[var(--primary-color-tint)] flex items-center gap-2 cursor-pointer"
        >
          <Plus className="w-8 h-8" />
          Tambah Pengumuman
        </button>
      </div>

      {isEditing && (
        <div className="bg-white rounded-lg shadow-lg p-6 border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[1.8rem] font-semibold">
              {editingPengumuman ? "Edit Pengumuman" : "Tambah Pengumuman Baru"}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="px-3 py-1 bg-yellow-500 text-gray-700 text-[1.2rem] rounded hover:bg-yellow-600 flex items-center gap-1 cursor-pointer"
              >
                {showPreview ? (
                  <EyeOff className="w-8 h-8" />
                ) : (
                  <Eye className="w-8 h-8" />
                )}
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingPengumuman(null);
                  setFormData({ judul: "", konten: "" });
                }}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-8 h-8 cursor-pointer" />
              </button>
            </div>
          </div>

          <div className={showPreview ? "grid grid-cols-2 gap-6" : ""}>
            <div className="space-y-4">
              <div>
                <label className="block text-[1.4rem] font-medium text-gray-700 mb-2">
                  Judul Pengumuman <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) =>
                    setFormData({ ...formData, judul: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Masukkan judul pengumuman..."
                />
              </div>

              <div>
                <label className="block text-[1.4rem] font-medium text-gray-700 mb-2">
                  Konten Pengumuman <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.konten}
                  onChange={(e) =>
                    setFormData({ ...formData, konten: e.target.value })
                  }
                  rows={12}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tulis konten pengumuman..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-blue-600 text-white text-[1.4rem] font-[500] px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  <Save className="w-8 h-8" />
                  {saving ? "Menyimpan..." : "Simpan"}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingPengumuman(null);
                    setFormData({ judul: "", konten: "" });
                  }}
                  className="bg-gray-500 text-white text-[1.4rem] font-[500] px-6 py-2 rounded-lg hover:bg-gray-600 cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </div>

            {showPreview && (
              <div className="border-l pl-6">
                <h3 className="text-[1.8rem] font-semibold mb-4">Preview</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="text-[1.8rem] font-bold mb-2">
                    {formData.judul || "Judul Pengumuman"}
                  </h4>
                  <div className="text-[1.4rem] text-gray-600 whitespace-pre-wrap">
                    {formData.konten ||
                      "Konten pengumuman akan muncul di sini..."}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-[1.8rem] font-semibold">Daftar Pengumuman</h2>
        </div>

        {pengumumanList.length === 0 ? (
          <div className="text-[1.4rem] p-6 text-center text-gray-500">
            Belum ada pengumuman. Klik "Tambah Pengumuman" untuk membuat
            pengumuman pertama.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-[1.4rem] font-medium text-gray-500 uppercase tracking-wider">
                    Pengumuman
                  </th>
                  <th className="px-6 py-3 text-left text-[1.4rem] font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal
                  </th>
                  <th className="px-6 py-3 text-left text-[1.4rem] font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pengumumanList.map((pengumuman) => (
                  <tr key={pengumuman.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="text-[1.4rem] font-medium text-gray-900">
                          {pengumuman.judul}
                        </h3>
                        <p className="text-[1.4rem] text-gray-500 mt-1 line-clamp-2">
                          {pengumuman.konten.substring(0, 100)}...
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-[1.4rem] text-gray-500">
                        <Calendar className="w-8 h-8 mr-[1.2rem]" />
                        {formatDate(pengumuman.tanggalPost)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(pengumuman)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit className="w-8 h-8 cursor-pointer" />
                        </button>
                        <button
                          onClick={() => handleDelete(pengumuman.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-8 h-8 cursor-pointer" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPengumumanPage;
