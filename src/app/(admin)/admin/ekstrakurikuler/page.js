"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";
import { Plus, Edit, Trash2 } from "lucide-react";

const AdminEkstrakurikulerPage = () => {
  const [ekstrakurikuler, setEkstrakurikuler] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    gambar: "",
    jadwal: "",
    aktif: true,
  });
  const [imageErrors, setImageErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const [uploadMethod, setUploadMethod] = useState("cloudinary"); // "cloudinary" or "manual"

  // Fetch data ekstrakurikuler
  const fetchEkstrakurikuler = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/ekstrakurikuler");
      const result = await response.json();
      if (result.success) {
        setEkstrakurikuler(result.data);
      } else {
        console.error("Failed to fetch ekstrakurikuler:", result.message);
      }
    } catch (error) {
      console.error("Error fetching ekstrakurikuler:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEkstrakurikuler();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Cloudinary upload success
  const handleUploadSuccess = (result) => {
    console.log("Upload success:", result);
    const imageUrl = result.info.secure_url;
    setImagePreview(imageUrl);
    setFormData((prev) => ({
      ...prev,
      gambar: imageUrl,
    }));
    alert("Gambar berhasil diupload!");
  };

  // Handle upload open
  const handleUploadOpen = () => {
    console.log("Upload widget opened");
    console.log("Cloud name:", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME);
  };

  // Handle manual file upload (fallback)
  const handleManualUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      setFormData((prev) => ({
        ...prev,
        gambar: e.target.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingItem
        ? `/api/ekstrakurikuler/${editingItem.id}`
        : "/api/ekstrakurikuler";
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
        alert(
          editingItem
            ? "Ekstrakurikuler berhasil diupdate!"
            : "Ekstrakurikuler berhasil ditambahkan!"
        );
        setShowModal(false);
        setEditingItem(null);
        setFormData({
          nama: "",
          deskripsi: "",
          gambar: "",
          jadwal: "",
          aktif: true,
        });
        setImagePreview("");
        fetchEkstrakurikuler();
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Terjadi kesalahan saat menyimpan data");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      nama: item.nama,
      deskripsi: item.deskripsi,
      gambar: item.gambar || "",
      jadwal: item.jadwal || "",
      aktif: item.aktif,
    });
    // Set preview untuk gambar existing
    setImagePreview(item.gambar || "");
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus ekstrakurikuler ini?")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/ekstrakurikuler/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        alert("Ekstrakurikuler berhasil dihapus!");
        fetchEkstrakurikuler();
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error deleting ekstrakurikuler:", error);
      alert("Terjadi kesalahan saat menghapus data");
    } finally {
      setLoading(false);
    }
  };

  const handleImageError = (itemId) => {
    setImageErrors((prev) => ({ ...prev, [itemId]: true }));
  };

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[2.8rem] font-bold text-[var(--primary-color)]">
            Manajemen Ekstrakurikuler
          </h1>
          <p className="text-gray-600 text-[1.4rem]">
            Kelola data ekstrakurikuler sekolah
          </p>
        </div>
        <button
          onClick={() => {
            setEditingItem(null);
            setFormData({
              nama: "",
              deskripsi: "",
              gambar: "",
              jadwal: "",
              aktif: true,
            });
            setImagePreview("");
            setShowModal(true);
          }}
          className="flex items-center bg-[var(--primary-color)] text-[1.4rem] text-white px-6 py-3 rounded-lg hover:bg-[var(--primary-color-tint)] transition-colors font-[500] cursor-pointer"
        >
          <Plus size={20} /> Tambah Ekstrakurikuler
        </button>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading...</span>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-[1.4rem] font-[500] text-gray-500 uppercase tracking-wider">
                  No.
                </th>
                <th className="px-6 py-4 text-left text-[1.4rem] font-[500] text-gray-500 uppercase tracking-wider">
                  Gambar
                </th>
                <th className="px-6 py-4 text-left text-[1.4rem] font-[500] text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-4 text-left text-[1.4rem] font-[500] text-gray-500 uppercase tracking-wider">
                  Deskripsi
                </th>
                <th className="px-6 py-4 text-left text-[1.4rem] font-[500] text-gray-500 uppercase tracking-wider">
                  Jadwal
                </th>
                <th className="px-6 py-4 text-left text-[1.4rem] font-[500] text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-[1.4rem] font-[500] text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {!loading && ekstrakurikuler.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-8 text-[1.4rem] text-center text-gray-500"
                  >
                    Belum ada data ekstrakurikuler
                  </td>
                </tr>
              ) : (
                ekstrakurikuler.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-[2.4rem] py-4 whitespace-nowrap text-[1.4rem] text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-[10rem] h-[10rem] relative">
                        {item.gambar && !imageErrors[item.id] ? (
                          <Image
                            src={item.gambar}
                            alt={item.nama}
                            fill
                            className="object-cover rounded-lg"
                            onError={() => handleImageError(item.id)}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-400 text-xs">
                              No Image
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-[1.4rem] font-[500] text-gray-900">
                        {item.nama}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[1.4rem] text-gray-600 max-w-xs truncate">
                        {item.deskripsi}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[1.4rem] text-gray-600">
                      {item.jadwal || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-[1.8rem] py-[.8rem] text-[1.4rem] font-semibold rounded-full ${
                          item.aktif
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {item.aktif ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-[500]">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-[.6rem] text-blue-600 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-[.6rem] text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[1.8rem] font-bold text-gray-800">
                {editingItem
                  ? "Edit Ekstrakurikuler"
                  : "Tambah Ekstrakurikuler"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-[2.4rem] cursor-pointer"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-[1.4rem] font-[500] text-gray-700 mb-2">
                  Nama Ekstrakurikuler <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleInputChange}
                  required
                  className="w-full text-[1.4rem] px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder:text-[1.4rem]"
                  placeholder="Masukkan nama ekstrakurikuler"
                />
              </div>

              <div>
                <label className="block text-[1.4rem] font-[500] text-gray-700 mb-2">
                  Deskripsi <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="deskripsi"
                  value={formData.deskripsi}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full text-[1.4rem] px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder:text-[1.4rem]"
                  placeholder="Masukkan deskripsi ekstrakurikuler"
                />
              </div>

              <div>
                <label className="block text-[1.4rem] font-[500] text-gray-700 mb-2">
                  Gambar Ekstrakurikuler
                </label>

                {imagePreview && (
                  <div className="mb-4">
                    <div className="relative w-40 h-40 border-2 border-gray-300 rounded-lg overflow-hidden">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview("");
                          setFormData((prev) => ({
                            ...prev,
                            gambar: "",
                          }));
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                )}

                <CldUploadWidget
                  uploadPreset="ml_default"
                  onSuccess={handleUploadSuccess}
                  onOpen={handleUploadOpen}
                  onError={(error, { widget }) => {
                    console.error("Upload error details:", error);
                    console.error("Widget info:", widget);
                    console.error("Error type:", typeof error);
                    console.error("Error keys:", Object.keys(error || {}));

                    let errorMessage = "Unknown error occurred";
                    if (error?.message) {
                      errorMessage = error.message;
                    } else if (error?.error?.message) {
                      errorMessage = error.error.message;
                    } else if (typeof error === "string") {
                      errorMessage = error;
                    } else if (error?.status_text) {
                      errorMessage = error.status_text;
                    }

                    alert(`Gagal mengupload gambar: ${errorMessage}`);
                  }}
                  options={{
                    folder: "system-sekolah/ekstrakurikuler",
                    resourceType: "image",
                    maxFiles: 1,
                    maxFileSize: 2000000,
                    sources: ["local"],
                    multiple: false,
                    cropping: false,
                    showAdvancedOptions: false,
                    clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
                    maxImageWidth: 2000,
                    maxImageHeight: 2000,
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => {
                        console.log(
                          "Button clicked, attempting to open widget"
                        );
                        open();
                      }}
                      className="w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-center cursor-pointer"
                    >
                      <div className="flex flex-col items-center">
                        <svg
                          className="w-12 h-12 text-gray-400 mb-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <p className="text-[1.4rem] font-medium text-gray-700">
                          {imagePreview ? "Ganti Gambar" : "Upload Gambar"}
                        </p>

                        <p className="text-[1.2rem] text-gray-400 mt-2">
                          JPG, PNG, WebP • Max 2MB
                        </p>
                      </div>
                    </button>
                  )}
                </CldUploadWidget>
              </div>

              <div>
                <label className="block text-[1.4rem] font-[500] text-gray-700 mb-2">
                  Jadwal
                </label>
                <input
                  type="text"
                  name="jadwal"
                  value={formData.jadwal}
                  onChange={handleInputChange}
                  className="w-full text-[1.4rem] px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder:text-[1.4rem]"
                  placeholder="Contoh: Senin & Rabu 14:00-16:00"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="aktif"
                  id="aktif"
                  checked={formData.aktif}
                  onChange={handleInputChange}
                  className="h-8 w-8 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="aktif"
                  className="ml-2 text-[1.4rem] text-gray-700"
                >
                  Aktif
                </label>
              </div>

              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-[1.4rem] cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-color-tint)] transition-colors disabled:opacity-50 text-[1.4rem] cursor-pointer"
                >
                  {loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AdminEkstrakurikulerPage;
