"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  User,
  Calendar,
  MapPin,
  Upload,
  X,
  Eye,
  ZoomIn,
} from "lucide-react";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";

const AdminSiswaPage = () => {
  const [siswaList, setSiswaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingSiswa, setEditingSiswa] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nis: "",
    jenisKelamin: "",
    tempatLahir: "",
    tanggalLahir: "",
    tahun: "",
    image: "",
  });

  const fetchSiswa = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/siswa");
      setSiswaList(response.data);
    } catch (error) {
      console.error("Error fetching siswa:", error);
      if (error.response?.status === 404) {
        setSiswaList([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSiswa();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (result) => {
    const imageUrl = result.info.secure_url;
    setUploadedImage(imageUrl);
    setFormData((prev) => ({
      ...prev,
      image: imageUrl,
    }));
  };

  const removeImage = () => {
    setUploadedImage(null);
    setFormData((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.namaLengkap ||
      !formData.nis ||
      !formData.jenisKelamin ||
      !formData.tempatLahir ||
      !formData.tanggalLahir ||
      !formData.tahun
    ) {
      alert("Semua field yang wajib harus diisi!");
      return;
    }

    const tahunNum = parseInt(formData.tahun, 10);
    if (isNaN(tahunNum) || tahunNum < 2000 || tahunNum > 2100) {
      alert("Tahun ajaran harus berupa angka yang valid (2000-2100)!");
      return;
    }

    const submitData = {
      ...formData,
      tahun: tahunNum,
    };

    console.log("Submitting data:", submitData);

    try {
      if (editingSiswa) {
        await axios.put(`/api/siswa/${editingSiswa.id}`, submitData);
        alert("Data siswa berhasil diupdate!");
      } else {
        await axios.post("/api/siswa", submitData);
        alert("Data siswa berhasil ditambahkan!");
      }

      await fetchSiswa();
      resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
      console.error("Response data:", error.response?.data);
      const errorMessage =
        error.response?.data?.error || "Terjadi kesalahan server";
      alert(errorMessage);
    }
  };

  const handleEdit = (siswa) => {
    setEditingSiswa(siswa);
    setFormData({
      namaLengkap: siswa.namaLengkap,
      nis: siswa.nis,
      jenisKelamin: siswa.jenisKelamin,
      tempatLahir: siswa.tempatLahir,
      tanggalLahir: siswa.tanggalLahir.split("T")[0],
      tahun: siswa.tahun ? siswa.tahun.toString() : "",
      image: siswa.image || "",
    });
    setUploadedImage(siswa.image || null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus data siswa ini?")) {
      try {
        await axios.delete(`/api/siswa/${id}`);
        await fetchSiswa();
        alert("Data siswa berhasil dihapus!");
      } catch (error) {
        console.error("Error deleting siswa:", error);
        alert("Gagal menghapus data siswa");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      namaLengkap: "",
      nis: "",
      jenisKelamin: "",
      tempatLahir: "",
      tanggalLahir: "",
      tahun: "",
      image: "",
    });
    setUploadedImage(null);
    setEditingSiswa(null);
    setShowForm(false);
  };

  const filteredSiswa = siswaList.filter(
    (siswa) =>
      siswa.namaLengkap.toLowerCase().includes(searchTerm.toLowerCase()) ||
      siswa.nis.includes(searchTerm),
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Handle image view
  const handleViewImage = (imageUrl, siswaName) => {
    setSelectedImage({
      url: imageUrl,
      name: siswaName,
    });
    setShowImageModal(true);
  };

  // Close image modal
  const closeImageModal = () => {
    setShowImageModal(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <div className="mb-[2.4rem]">
        <h1 className="text-[2.4rem] font-bold mb-[.4rem]">
          Kelola Data Siswa
        </h1>
        <p className="text-[#000]/75 text-[1.4rem]">
          Tambah, edit, dan kelola data siswa sekolah
        </p>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-[2rem] mb-[2.4rem]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-[var(--primary-color)] text-white px-[1.6rem] py-[.8rem] rounded-lg flex items-center space-x-2 hover:bg-[var(--primary-color-tint)] transition-colors text-[1.4rem] font-[500] cursor-pointer"
            >
              <Plus size={20} />
              <span>Tambah Siswa</span>
            </button>
            <div className="text-[1.4rem] text-[#000]/75">
              Total: <span className="font-[600]">{siswaList.length}</span>{" "}
              siswa
            </div>
          </div>

          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#000]/50"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari nama atau NIS..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-[4rem] pr-4 py-[.8rem] border border-gray-300 rounded-lg text-[1.4rem] w-[25rem] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-[2rem] mb-[2.4rem]">
          <div className="flex items-center justify-between mb-[2rem]">
            <h2 className="text-[2rem] font-[600]">
              {editingSiswa ? "Edit Data Siswa" : "Tambah Siswa Baru"}
            </h2>
            <button
              onClick={resetForm}
              className="text-[#000]/60 hover:text-[#000] text-[1.4rem] cursor-pointer"
            >
              Tutup
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[1.4rem] font-[500] mb-2">
                Foto Siswa
              </label>

              {uploadedImage ? (
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-lg overflow-hidden border border-gray-300">
                    <Image
                      src={uploadedImage}
                      alt="Preview"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors cursor-pointer"
                  >
                    <X size={16} />
                  </button>
                  <div className="mt-2 text-[1.2rem] text-green-600">
                    Gambar berhasil diupload
                  </div>
                </div>
              ) : (
                <CldUploadWidget
                  uploadPreset={
                    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET ||
                    "siswa_upload"
                  }
                  onSuccess={handleImageUpload}
                  onError={(error) => {
                    console.error("Upload error:", error);
                    console.log("Available presets to try:", [
                      "siswa_upload",
                      "ml_default",
                      "unsigned_preset",
                      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
                    ]);
                    alert(
                      `Upload gagal: ${error.error?.message || "Upload preset tidak ditemukan. Silakan:\n1. Buat upload preset 'siswa_upload' di Cloudinary\n2. Set Signing Mode = 'Unsigned'\n3. Set folder = 'siswa'\n4. Atau gunakan environment variable NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET"}`,
                    );
                  }}
                  options={{
                    maxFiles: 1,
                    resourceType: "image",
                    clientAllowedFormats: ["jpg", "jpeg", "png", "webp"],
                    maxFileSize: 5000000,
                    folder: "siswa",
                    transformation: {
                      width: 400,
                      height: 400,
                      crop: "fill",
                      quality: "auto",
                      format: "auto",
                    },
                  }}
                >
                  {({ open }) => (
                    <button
                      type="button"
                      onClick={() => open()}
                      className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center hover:border-[var(--primary-color)] hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <Upload size={24} className="text-gray-400 mb-2" />
                      <span className="text-[1.2rem] text-gray-500 text-center">
                        Upload Foto
                      </span>
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[1.4rem] font-[500] mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="namaLengkap"
                  value={formData.namaLengkap}
                  onChange={handleInputChange}
                  required
                  className="w-full p-[.8rem] border border-gray-300 rounded-lg text-[1.4rem] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  placeholder="Masukkan nama lengkap siswa"
                />
              </div>

              <div>
                <label className="block text-[1.4rem] font-[500] mb-2">
                  NIS <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="nis"
                  value={formData.nis}
                  onChange={handleInputChange}
                  required
                  className="w-full p-[.8rem] border border-gray-300 rounded-lg text-[1.4rem] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  placeholder="Nomor Induk Siswa"
                />
              </div>

              <div>
                <label className="block text-[1.4rem] font-[500] mb-2">
                  Jenis Kelamin <span className="text-red-500">*</span>
                </label>
                <select
                  name="jenisKelamin"
                  value={formData.jenisKelamin}
                  onChange={handleInputChange}
                  required
                  className="w-full p-[.8rem] border border-gray-300 rounded-lg text-[1.4rem] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                >
                  <option value="">Pilih Jenis Kelamin</option>
                  <option value="LAKI_LAKI">Laki-laki</option>
                  <option value="PEREMPUAN">Perempuan</option>
                </select>
              </div>

              <div>
                <label className="block text-[1.4rem] font-[500] mb-2">
                  Tempat Lahir <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tempatLahir"
                  value={formData.tempatLahir}
                  onChange={handleInputChange}
                  required
                  className="w-full p-[.8rem] border border-gray-300 rounded-lg text-[1.4rem] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  placeholder="Tempat lahir siswa"
                />
              </div>

              <div>
                <label className="block text-[1.4rem] font-[500] mb-2">
                  Tanggal Lahir <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="tanggalLahir"
                  value={formData.tanggalLahir}
                  onChange={handleInputChange}
                  required
                  className="w-full p-[.8rem] border border-gray-300 rounded-lg text-[1.4rem] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-[1.4rem] font-[500] mb-2">
                  Tahun Ajaran <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="tahun"
                  value={formData.tahun}
                  onChange={handleInputChange}
                  required
                  min="2000"
                  max="2100"
                  className="w-full p-[.8rem] border border-gray-300 rounded-lg text-[1.4rem] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent"
                  placeholder="2024"
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="bg-[var(--primary-color)] text-white px-[2rem] py-[.8rem] rounded-lg hover:bg-[var(--primary-color-tint)] transition-colors text-[1.4rem] font-[500] cursor-pointer"
              >
                {editingSiswa ? "Update Data" : "Simpan Data"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-[2rem] py-[.8rem] rounded-lg hover:bg-gray-600 transition-colors text-[1.4rem] font-[500] cursor-pointer"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-[2rem] border-b border-gray-200">
          <h2 className="text-[2rem] font-[600]">Daftar Siswa</h2>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-[4rem]">
              <div className="text-[1.6rem] text-[#000]/60">Loading...</div>
            </div>
          ) : filteredSiswa.length === 0 ? (
            <div className="text-center py-[4rem]">
              <User size={48} className="mx-auto text-[#000]/30 mb-4" />
              <div className="text-[1.6rem] text-[#000]/60 mb-2">
                {searchTerm
                  ? "Tidak ada siswa yang ditemukan"
                  : "Belum ada data siswa"}
              </div>
              <div className="text-[1.4rem] text-[#000]/40">
                {searchTerm
                  ? "Coba gunakan kata kunci yang berbeda"
                  : "Tambahkan siswa pertama dengan klik tombol 'Tambah Siswa'"}
              </div>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-[2rem] py-[1.2rem] text-left text-[1.4rem] font-[600] text-[#000]/80">
                    No
                  </th>
                  <th className="px-[2rem] py-[1.2rem] text-left text-[1.4rem] font-[600] text-[#000]/80">
                    Foto
                  </th>
                  <th className="px-[2rem] py-[1.2rem] text-left text-[1.4rem] font-[600] text-[#000]/80">
                    Nama Lengkap
                  </th>
                  <th className="px-[2rem] py-[1.2rem] text-left text-[1.4rem] font-[600] text-[#000]/80">
                    NIS
                  </th>
                  <th className="px-[2rem] py-[1.2rem] text-left text-[1.4rem] font-[600] text-[#000]/80">
                    Jenis Kelamin
                  </th>
                  <th className="px-[2rem] py-[1.2rem] text-left text-[1.4rem] font-[600] text-[#000]/80">
                    TTL
                  </th>
                  <th className="px-[2rem] py-[1.2rem] text-left text-[1.4rem] font-[600] text-[#000]/80">
                    Tahun
                  </th>
                  <th className="px-[2rem] py-[1.2rem] text-center text-[1.4rem] font-[600] text-[#000]/80">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredSiswa.map((siswa, index) => (
                  <tr
                    key={siswa.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-[2rem] py-[1.2rem] text-[1.4rem] text-[#000]/80">
                      {index + 1}
                    </td>
                    <td className="px-[2rem] py-[1.2rem]">
                      <div className="relative w-[4rem] h-[4rem] rounded-full overflow-hidden bg-[var(--primary-color)] flex items-center justify-center">
                        {siswa.image ? (
                          <>
                            <Image
                              src={siswa.image}
                              alt={siswa.namaLengkap}
                              width={40}
                              height={40}
                              className="w-full h-full object-cover"
                            />
                            <button
                              onClick={() =>
                                handleViewImage(siswa.image, siswa.namaLengkap)
                              }
                              className="absolute inset-0 bg-black/50 bg-opacity-0 hover:bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-200 cursor-pointer"
                              title="Lihat gambar"
                            >
                              <Eye size={16} className="text-white" />
                            </button>
                          </>
                        ) : (
                          <User size={20} className="text-white" />
                        )}
                      </div>
                    </td>
                    <td className="px-[2rem] py-[1.2rem]">
                      <div className="text-[1.4rem] font-[500] text-[#000]">
                        {siswa.namaLengkap}
                      </div>
                    </td>
                    <td className="px-[2rem] py-[1.2rem] text-[1.4rem] text-[#000]/80 font-mono">
                      {siswa.nis}
                    </td>
                    <td className="px-[2rem] py-[1.2rem]">
                      <span
                        className={`inline-flex items-center px-[.8rem] py-[.4rem] rounded-full text-[1.2rem] font-[500] ${
                          siswa.jenisKelamin === "LAKI_LAKI"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-pink-100 text-pink-800"
                        }`}
                      >
                        {siswa.jenisKelamin === "LAKI_LAKI"
                          ? "Laki-laki"
                          : "Perempuan"}
                      </span>
                    </td>
                    <td className="px-[2rem] py-[1.2rem] flex flex-col">
                      <div className="flex items-start">
                        <MapPin
                          size={16}
                          className="text-[#000]/50 mt-[.2rem]"
                        />
                        <div className="text-[1.4rem] text-[#000]/75">
                          {siswa.tempatLahir}
                        </div>
                      </div>
                      <div>
                        <div className="text-[1.2rem] text-[#000]/60 flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {formatDate(siswa.tanggalLahir)}
                        </div>
                      </div>
                    </td>
                    <td className="px-[2rem] py-[1.2rem] text-[1.4rem] text-[#000]/80">
                      {siswa.tahun || "-"}
                    </td>
                    <td className="px-[2rem] py-[1.2rem]">
                      <div className="flex justify-center space-x-2">
                        {siswa.image && (
                          <button
                            onClick={() =>
                              handleViewImage(siswa.image, siswa.namaLengkap)
                            }
                            className="p-[.6rem] text-green-600 hover:bg-green-100 rounded-lg transition-colors cursor-pointer"
                            title="Lihat Foto"
                          >
                            <Eye size={16} />
                          </button>
                        )}
                        <button
                          onClick={() => handleEdit(siswa)}
                          className="p-[.6rem] text-blue-600 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(siswa.id)}
                          className="p-[.6rem] text-red-600 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showImageModal && selectedImage && (
        <div className="fixed inset-0 bg-black/80 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div>
                <h3 className="text-[1.8rem] font-[600] text-[#000]">
                  Foto Siswa
                </h3>
                <p className="text-[1.4rem] text-[#000]/75">
                  {selectedImage.name}
                </p>
              </div>
              <button
                onClick={closeImageModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                title="Tutup"
              >
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="p-4">
              <div className="relative">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.name}
                  width={800}
                  height={600}
                  className="max-w-full max-h-[60vh] object-contain mx-auto rounded-lg"
                />
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => window.open(selectedImage.url, "_blank")}
                    className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-700 p-2 rounded-lg shadow-md transition-all"
                    title="Buka di tab baru"
                  >
                    <ZoomIn size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-gray-50">
              <div className="text-[1.2rem] text-[#000]/60">
                Klik gambar untuk melihat ukuran penuh
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => window.open(selectedImage.url, "_blank")}
                  className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-color-tint)] transition-colors text-[1.4rem] cursor-pointer"
                >
                  Buka di Tab Baru
                </button>
                <button
                  onClick={closeImageModal}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-[1.4rem] cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>

          {/* Click outside to close */}
          <div
            className="absolute inset-0 -z-10"
            onClick={closeImageModal}
          ></div>
        </div>
      )}
    </div>
  );
};

export default AdminSiswaPage;
