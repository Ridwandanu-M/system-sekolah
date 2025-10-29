"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Upload,
  Eye,
  Calendar,
  Image as ImageIcon,
} from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

const AdminGaleriPage = () => {
  const [galeriItems, setGaleriItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    judul: "",
    deskripsi: "",
    gambar: "",
    tanggal: new Date().toISOString().split("T")[0],
  });
  const [submitting, setSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchGaleriItems();
  }, []);

  const fetchGaleriItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/galeri");
      const result = await response.json();

      if (result.success) {
        setGaleriItems(result.data);
      } else {
        alert("Gagal mengambil data galeri");
      }
    } catch (error) {
      console.error("Error fetching galeri:", error);
      alert("Gagal mengambil data galeri");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.judul || !formData.gambar) {
      alert("Judul dan gambar wajib diisi");
      return;
    }

    try {
      setSubmitting(true);

      const url = editingItem ? `/api/galeri/${editingItem.id}` : "/api/galeri";
      const method = editingItem ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        setShowForm(false);
        setEditingItem(null);
        setFormData({
          judul: "",
          deskripsi: "",
          gambar: "",
          tanggal: new Date().toISOString().split("T")[0],
        });
        fetchGaleriItems();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting galeri:", error);
      alert("Gagal menyimpan galeri");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      judul: item.judul,
      deskripsi: item.deskripsi || "",
      gambar: item.gambar,
      tanggal: new Date(item.tanggal).toISOString().split("T")[0],
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus galeri ini?")) {
      return;
    }

    try {
      const response = await fetch(`/api/galeri/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        alert(result.message);
        fetchGaleriItems();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error deleting galeri:", error);
      alert("Gagal menghapus galeri");
    }
  };

  const handleImageUpload = (result) => {
    if (result.event === "success") {
      setFormData((prev) => ({
        ...prev,
        gambar: result.info.secure_url,
      }));
      alert("Gambar berhasil diupload!");
    }
  };

  const handleImageUploadError = (error) => {
    console.error("Upload error:", error);
    alert("Gagal mengupload gambar. Silakan coba lagi.");
  };

  const resetForm = () => {
    setShowForm(false);
    setEditingItem(null);
    setFormData({
      judul: "",
      deskripsi: "",
      gambar: "",
      tanggal: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[2.8rem] font-bold text-[var(--primary-color)]">
          Kelola Galeri Sekolah
        </h1>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg hover:bg-[var(--primary-color-tint)] transition-colors"
        >
          <Plus size={20} />
          Tambah Galeri
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-[2rem] font-semibold text-gray-800">
                {editingItem ? "Edit Galeri" : "Tambah Galeri Baru"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  Judul Galeri *
                </label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) =>
                    setFormData({ ...formData, judul: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem]"
                  placeholder="Masukkan judul galeri..."
                  required
                />
              </div>

              <div>
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  Deskripsi (Opsional)
                </label>
                <textarea
                  value={formData.deskripsi}
                  onChange={(e) =>
                    setFormData({ ...formData, deskripsi: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] resize-vertical"
                  rows={3}
                  placeholder="Masukkan deskripsi galeri..."
                />
              </div>

              <div>
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  Tanggal
                </label>
                <input
                  type="date"
                  value={formData.tanggal}
                  onChange={(e) =>
                    setFormData({ ...formData, tanggal: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem]"
                />
              </div>

              <div>
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  Gambar *
                </label>
                <div className="space-y-4">
                  <CldUploadWidget
                    uploadPreset="ml_default"
                    onSuccess={handleImageUpload}
                    onError={handleImageUploadError}
                    options={{
                      folder: "system-sekolah/galeri",
                      resourceType: "image",
                      clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
                      maxFileSize: 10000000,
                      maxFiles: 1,
                    }}
                  >
                    {({ open }) => (
                      <button
                        type="button"
                        onClick={() => open()}
                        className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <Upload size={20} />
                        Upload Gambar
                      </button>
                    )}
                  </CldUploadWidget>

                  {formData.gambar && (
                    <div className="mt-4">
                      <p className="text-[1.4rem] text-gray-600 mb-2">
                        Preview:
                      </p>
                      <div className="relative w-48 h-32">
                        <Image
                          src={formData.gambar}
                          alt="Preview"
                          fill
                          className="object-cover rounded-lg border"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={resetForm}
                  className="flex-1 px-4 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 bg-[var(--primary-color)] text-white px-4 py-3 rounded-lg hover:bg-[var(--primary-color-tint)] transition-colors disabled:opacity-50"
                >
                  <Save size={20} />
                  {submitting
                    ? "Menyimpan..."
                    : editingItem
                    ? "Update"
                    : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="text-[1.6rem] text-gray-600">Memuat data...</div>
          </div>
        ) : galeriItems.length === 0 ? (
          <div className="text-center py-12">
            <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <div className="text-[1.6rem] text-gray-600 mb-2">
              Belum ada galeri
            </div>
            <p className="text-[1.4rem] text-gray-500">
              Klik tombol "Tambah Galeri" untuk menambahkan galeri pertama
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galeriItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="relative aspect-square">
                  <Image
                    src={item.gambar}
                    alt={item.judul}
                    fill
                    className="object-cover cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setSelectedImage(item)}
                  />
                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={() => setSelectedImage(item)}
                      className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="text-[1.4rem] font-semibold text-gray-800 mb-2 line-clamp-1">
                    {item.judul}
                  </h3>
                  {item.deskripsi && (
                    <p className="text-[1.2rem] text-gray-600 mb-3 line-clamp-2">
                      {item.deskripsi}
                    </p>
                  )}
                  <div className="flex items-center text-[1.1rem] text-gray-500 mb-3">
                    <Calendar size={14} className="mr-1" />
                    {new Date(item.tanggal).toLocaleDateString("id-ID")}
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white text-[1.2rem] rounded hover:bg-blue-600 transition-colors"
                    >
                      <Edit size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white text-[1.2rem] rounded hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={14} />
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] bg-white rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="relative">
              <Image
                src={selectedImage.gambar}
                alt={selectedImage.judul}
                width={800}
                height={600}
                className="object-contain max-w-full max-h-[70vh]"
              />
            </div>

            <div className="p-6">
              <h3 className="text-[1.8rem] font-semibold text-gray-800 mb-2">
                {selectedImage.judul}
              </h3>
              {selectedImage.deskripsi && (
                <p className="text-[1.4rem] text-gray-600 mb-3">
                  {selectedImage.deskripsi}
                </p>
              )}
              <div className="text-[1.3rem] text-gray-500">
                <Calendar size={16} className="inline mr-2" />
                {new Date(selectedImage.tanggal).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGaleriPage;
