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
  User,
  Upload,
  X,
} from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import axios from "axios";

const AdminBeritaPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [beritaList, setBeritaList] = useState([]);
  const [editingBerita, setEditingBerita] = useState(null);
  const [formData, setFormData] = useState({
    judul: "",
    konten: "",
    ringkasan: "",
    gambar: "",
    penulis: "",
  });

  useEffect(() => {
    fetchBeritaData();
  }, []);

  const fetchBeritaData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/berita");
      const result = response.data;

      if (result.success) {
        setBeritaList(result.data || []);
      }
    } catch (error) {
      console.error("Error fetching berita:", error);
      alert("Gagal memuat data berita");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (berita = null) => {
    if (berita) {
      setEditingBerita(berita);
      setFormData({
        judul: berita.judul,
        konten: berita.konten,
        ringkasan: berita.ringkasan || "",
        gambar: berita.gambar || "",
        penulis: berita.penulis,
      });
    } else {
      setEditingBerita(null);
      setFormData({
        judul: "",
        konten: "",
        ringkasan: "",
        gambar: "",
        penulis: "",
      });
    }
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingBerita(null);
    setFormData({
      judul: "",
      konten: "",
      ringkasan: "",
      gambar: "",
      penulis: "",
    });
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      if (
        !formData.judul.trim() ||
        !formData.konten.trim() ||
        !formData.penulis.trim()
      ) {
        alert("Judul, konten, dan penulis harus diisi");
        return;
      }

      const payload = {
        judul: formData.judul.trim(),
        konten: formData.konten.trim(),
        ringkasan: formData.ringkasan.trim(),
        gambar: formData.gambar.trim(),
        penulis: formData.penulis.trim(),
      };

      let response;
      if (editingBerita) {
        response = await axios.put("/api/berita", {
          id: editingBerita.id,
          ...payload,
        });
      } else {
        response = await axios.post("/api/berita", payload);
      }

      if (!response.ok) {
        throw new Error(`Failed to save berita: ${response.statusText}`);
      }

      await fetchBeritaData();
      setIsEditing(false);
      setEditingBerita(null);
      setFormData({
        judul: "",
        konten: "",
        ringkasan: "",
        gambar: "",
        penulis: "",
      });
      alert(
        editingBerita
          ? "Berita berhasil diperbarui!"
          : "Berita berhasil dibuat!"
      );
    } catch (error) {
      console.error("Error saving berita:", error);
      alert("Gagal menyimpan berita");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus berita ini?")) {
      return;
    }

    try {
      await axios.delete(`/api/berita?id=${id}`);

      await fetchBeritaData();
      alert("Berita berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting berita:", error);
      alert("Gagal menghapus berita");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUploadSuccess = (result) => {
    console.log("Upload result:", result);
    try {
      if (result.event === "success" && result.info && result.info.secure_url) {
        handleInputChange("gambar", result.info.secure_url);
        alert("Gambar berhasil diupload!");
      }
    } catch (error) {
      console.error("Error processing upload result:", error);
      alert("Terjadi kesalahan saat memproses gambar");
    }
  };

  const handleUploadError = (error) => {
    console.error("Cloudinary upload error:", error);
    let errorMessage = "Gagal mengupload gambar";

    if (error && typeof error === "object") {
      if (error.message) {
        errorMessage += `: ${error.message}`;
      } else if (error.status) {
        errorMessage += `: Status ${error.status}`;
      }
    }

    alert(errorMessage + ". Silakan coba lagi atau gunakan URL gambar manual.");
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
      <div className="p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[var(--primary-color)] mx-auto"></div>
          <p className="mt-4 text-gray-600">Memuat data berita...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[2.8rem] font-bold text-[var(--primary-color)]">
          Kelola Berita
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center text-[1.4rem] cursor-pointer gap-2 bg-yellow-500 text-gray-700 px-4 py-2 rounded-lg hover:text-gray-700 transition-colors"
          >
            {showPreview ? <EyeOff size={20} /> : <Eye size={20} />}
            {showPreview ? "Sembunyikan Preview" : "Tampilkan Preview"}
          </button>
          {!isEditing ? (
            <button
              onClick={() => handleEdit()}
              className="flex items-center text-[1.8rem] gap-2 bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-color-tint)] transition-colors cursor-pointer"
            >
              <Plus size={20} />
              Tambah Berita
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center text-[1.4rem] cursor-pointer gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                <Save size={18} />
                {saving ? "Menyimpan..." : editingBerita ? "Update" : "Simpan"}
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center text-[1.4rem] cursor-pointer gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
              >
                Batal
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-[2rem] font-semibold text-gray-800 mb-6">
            {isEditing
              ? editingBerita
                ? "Edit Berita"
                : "Tambah Berita"
              : "Daftar Berita"}
          </h2>

          {isEditing ? (
            <div className="space-y-6">
              <div>
                <label className="block text-[1.2rem] font-medium text-gray-600 mb-2">
                  Judul Berita <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.judul}
                  onChange={(e) => handleInputChange("judul", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.3rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Masukkan judul berita..."
                />
              </div>

              <div>
                <label className="block text-[1.2rem] font-medium text-gray-600 mb-2">
                  Penulis <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.penulis}
                  onChange={(e) => handleInputChange("penulis", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.3rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Masukkan nama penulis..."
                />
              </div>

              <div>
                <label className="block text-[1.2rem] font-medium text-gray-600 mb-2">
                  Gambar Berita
                </label>

                {formData.gambar && (
                  <div className="relative mb-4">
                    <img
                      src={formData.gambar}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border"
                      onError={(e) => {
                        console.error("Image failed to load:", e);
                        e.target.src = "/placeholder-news.jpg";
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => handleInputChange("gambar", "")}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      title="Hapus gambar"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <div className="mb-4">
                  <CldUploadWidget
                    uploadPreset="ml_default"
                    onSuccess={handleUploadSuccess}
                    onError={handleUploadError}
                    options={{
                      multiple: false,
                      maxFiles: 1,
                      resourceType: "image",
                      clientAllowedFormats: [
                        "jpg",
                        "jpeg",
                        "png",
                        "gif",
                        "webp",
                      ],
                      maxFileSize: 2000000,
                      folder: "berita",
                      sources: ["local", "camera"],
                      showAdvancedOptions: false,
                      cropping: false,
                      showSkipCropButton: true,
                      theme: "minimal",
                    }}
                  >
                    {({ open, isLoading }) => (
                      <button
                        type="button"
                        onClick={() => {
                          console.log("Opening Cloudinary widget...");
                          try {
                            open();
                          } catch (error) {
                            console.error(
                              "Error opening upload widget:",
                              error
                            );
                            alert(
                              "Gagal membuka upload widget. Silakan gunakan input URL di bawah."
                            );
                          }
                        }}
                        disabled={isLoading}
                        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center gap-2 disabled:opacity-50"
                      >
                        <Upload className="w-8 h-8 text-gray-400" />
                        <span className="text-[1.3rem] text-gray-600">
                          {isLoading
                            ? "Memuat..."
                            : formData.gambar
                            ? "Ganti Gambar"
                            : "Upload Gambar"}
                        </span>
                        <span className="text-[1.1rem] text-gray-500">
                          JPG, PNG, GIF hingga 2MB
                        </span>
                      </button>
                    )}
                  </CldUploadWidget>
                </div>
              </div>

              <div>
                <label className="block text-[1.2rem] font-medium text-gray-600 mb-2">
                  Konten Berita <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.konten}
                  onChange={(e) => handleInputChange("konten", e.target.value)}
                  rows={12}
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.3rem] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Tulis konten berita lengkap di sini..."
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {beritaList.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  Belum ada berita
                </p>
              ) : (
                beritaList.map((berita) => (
                  <div
                    key={berita.id}
                    className="p-4 bg-gray-50 border border-gray-200 rounded-lg"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-[1.4rem] font-semibold text-gray-800 line-clamp-2">
                        {berita.judul}
                      </h3>
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleEdit(berita)}
                          className="flex items-center gap-1 bg-blue-500 text-white px-2 py-1 rounded text-[1.1rem] hover:bg-blue-600 transition-colors"
                        >
                          <Edit size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(berita.id)}
                          className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 rounded text-[1.1rem] hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={14} />
                          Hapus
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-[1.1rem] text-gray-600 mb-2">
                      <span className="flex items-center gap-1">
                        <User size={14} />
                        {berita.penulis}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={14} />
                        {formatDate(berita.tanggalPost)}
                      </span>
                    </div>
                    <p className="text-[1.2rem] text-gray-600 line-clamp-2">
                      {berita.ringkasan ||
                        berita.konten.substring(0, 100) + "..."}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="bg-white rounded-lg shadow-lg p-6 max-h-screen overflow-y-auto">
            <h2 className="text-[2rem] font-semibold text-gray-800 mb-6">
              Preview Berita
            </h2>
            {isEditing && (formData.judul || formData.konten) ? (
              <div className="border rounded-lg p-6 bg-gray-50">
                <article className="bg-white rounded-lg shadow-md overflow-hidden">
                  {formData.gambar && (
                    <div className="relative h-[20rem]">
                      <img
                        src={formData.gambar}
                        alt={formData.judul}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-4 mb-3 text-[1.2rem] text-gray-600">
                      <span>{new Date().toLocaleDateString("id-ID")}</span>
                      <span>•</span>
                      <span>{formData.penulis || "Penulis"}</span>
                    </div>
                    <h1 className="text-[2.4rem] font-bold text-gray-800 mb-4">
                      {formData.judul || "Judul Berita"}
                    </h1>
                    {formData.ringkasan && (
                      <p className="text-[1.6rem] text-gray-600 italic mb-6 border-l-4 border-blue-400 pl-4">
                        {formData.ringkasan}
                      </p>
                    )}
                    <div className="prose max-w-none">
                      <div className="text-[1.5rem] text-gray-700 leading-relaxed whitespace-pre-line">
                        {formData.konten ||
                          "Konten berita akan ditampilkan di sini..."}
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">
                {isEditing
                  ? "Mulai menulis untuk melihat preview"
                  : "Pilih berita untuk melihat preview"}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBeritaPage;
