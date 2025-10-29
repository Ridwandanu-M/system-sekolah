"use client";

import { useState, useEffect } from "react";
import {
  Save,
  Edit,
  Eye,
  EyeOff,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";

const AdminKontakPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState({
    id: null,
    alamat: "",
    telepon: "",
    email: "",
    facebook: "",
    instagram: "",
    youtube: "",
    tiktok: "",
  });

  const [editContent, setEditContent] = useState(content);

  useEffect(() => {
    fetchKontakData();
  }, []);

  const fetchKontakData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/kontak");
      const result = await response.json();

      if (result.success && result.data) {
        const kontakData = {
          id: result.data.id,
          alamat: result.data.alamat || "",
          telepon: result.data.telepon || "",
          email: result.data.email || "",
          facebook: result.data.facebook || "",
          instagram: result.data.instagram || "",
          youtube: result.data.youtube || "",
          tiktok: result.data.tiktok || "",
        };
        setContent(kontakData);
        setEditContent(kontakData);
      } else {
        const defaultData = {
          id: null,
          alamat: "",
          telepon: "",
          email: "",
          facebook: "",
          instagram: "",
          youtube: "",
          tiktok: "",
        };
        setContent(defaultData);
        setEditContent(defaultData);
      }
    } catch (error) {
      console.error("Error fetching kontak data:", error);
      alert("Gagal mengambil data kontak");
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
        alamat: editContent.alamat,
        telepon: editContent.telepon,
        email: editContent.email,
        facebook: editContent.facebook,
        instagram: editContent.instagram,
        youtube: editContent.youtube,
        tiktok: editContent.tiktok,
      };

      if (content.id) {
        payload.id = content.id;
      }

      const response = await fetch("/api/kontak", {
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
          alamat: result.data.alamat || "",
          telepon: result.data.telepon || "",
          email: result.data.email || "",
          facebook: result.data.facebook || "",
          instagram: result.data.instagram || "",
          youtube: result.data.youtube || "",
          tiktok: result.data.tiktok || "",
        };
        setContent(updatedData);
        setEditContent(updatedData);
        setIsEditing(false);
        alert("Data berhasil disimpan!");
      } else {
        alert(result.message || "Gagal menyimpan data");
      }
    } catch (error) {
      console.error("Error saving kontak:", error);
      alert("Gagal menyimpan data kontak");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[2.8rem] font-bold text-[var(--primary-color)]">
          Kelola Informasi Kontak
        </h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex text-[1.4rem] items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
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
              className="flex text-[1.4rem] items-center gap-2 bg-[var(--primary-color)] text-white px-4 py-2 rounded-lg hover:bg-[var(--primary-color-tint)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Edit size={20} />
              {loading ? "Memuat..." : "Edit Kontak"}
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                disabled={saving}
                className="px-4 py-2 bg-gray-500 text-[1.4rem] text-white rounded-lg hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Batal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 bg-green-500 text-[1.4rem] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-[2rem] font-semibold text-gray-800 mb-6">
            {isEditing ? "Edit Informasi Kontak" : "Informasi Kontak Saat Ini"}
          </h2>

          {loading && (
            <div className="text-center py-8">
              <div className="text-[1.4rem] text-gray-600">Memuat data...</div>
            </div>
          )}

          {!loading && (
            <div className="space-y-6">
              <div>
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  <MapPin className="inline w-5 h-5 mr-2" />
                  Alamat Sekolah <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={isEditing ? editContent.alamat : content.alamat}
                  onChange={(e) =>
                    setEditContent({
                      ...editContent,
                      alamat: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100 resize-vertical"
                  placeholder="Masukkan alamat lengkap sekolah..."
                />
              </div>

              <div>
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  <Phone className="inline w-5 h-5 mr-2" />
                  Nomor Telepon <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={isEditing ? editContent.telepon : content.telepon}
                  onChange={(e) =>
                    setEditContent({
                      ...editContent,
                      telepon: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
                  placeholder="62813xxxxxxxx"
                />
              </div>

              <div>
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  <Mail className="inline w-5 h-5 mr-2" />
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={isEditing ? editContent.email : content.email}
                  onChange={(e) =>
                    setEditContent({
                      ...editContent,
                      email: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
                  placeholder="Contoh: info@smpmuh1seyegan.sch.id"
                />
              </div>

              <div className="border-t pt-6">
                <h3 className="text-[1.6rem] font-medium text-gray-700 mb-4">
                  Media Sosial (Opsional)
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                      <Facebook className="inline w-5 h-5 mr-2" />
                      Facebook
                    </label>
                    <input
                      type="url"
                      value={
                        isEditing ? editContent.facebook : content.facebook
                      }
                      onChange={(e) =>
                        setEditContent({
                          ...editContent,
                          facebook: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
                      placeholder="https://facebook.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                      <Instagram className="inline w-5 h-5 mr-2" />
                      Instagram
                    </label>
                    <input
                      type="url"
                      value={
                        isEditing ? editContent.instagram : content.instagram
                      }
                      onChange={(e) =>
                        setEditContent({
                          ...editContent,
                          instagram: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
                      placeholder="https://instagram.com/..."
                    />
                  </div>

                  <div>
                    <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                      <Youtube className="inline w-5 h-5 mr-2" />
                      YouTube
                    </label>
                    <input
                      type="url"
                      value={isEditing ? editContent.youtube : content.youtube}
                      onChange={(e) =>
                        setEditContent({
                          ...editContent,
                          youtube: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
                      placeholder="https://youtube.com/..."
                    />
                  </div>

                  {/* TikTok */}
                  <div>
                    <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                      <svg
                        className="inline w-5 h-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                      TikTok
                    </label>
                    <input
                      type="url"
                      value={isEditing ? editContent.tiktok : content.tiktok}
                      onChange={(e) =>
                        setEditContent({
                          ...editContent,
                          tiktok: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
                      placeholder="https://tiktok.com/..."
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-[2rem] font-semibold text-gray-800 mb-6">
              Preview Footer
            </h2>
            <div className="border rounded-lg p-6 bg-[#30308A] text-white">
              <h4 className="text-[1.8rem] font-semibold mb-6 text-yellow-400">
                Kontak Kami
              </h4>
              <div className="space-y-4">
                {content.alamat && (
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-yellow-400 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-white/80 text-[1.4rem] leading-relaxed">
                        {content.alamat}
                      </p>
                    </div>
                  </div>
                )}

                {content.telepon && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <div>
                      <p className="text-white/80 text-[1.4rem]">
                        {content.telepon}
                      </p>
                    </div>
                  </div>
                )}

                {content.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <div>
                      <p className="text-white/80 text-[1.4rem]">
                        {content.email}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  {content.facebook && (
                    <a
                      href={content.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 hover:bg-yellow-400 hover:text-[#30308A] rounded-full flex items-center justify-center transition-all duration-[.15s]"
                    >
                      <Facebook className="w-5 h-5" />
                    </a>
                  )}
                  {content.instagram && (
                    <a
                      href={content.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 hover:bg-yellow-400 hover:text-[#30308A] rounded-full flex items-center justify-center transition-all duration-[.15s]"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                  {content.youtube && (
                    <a
                      href={content.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 hover:bg-yellow-400 hover:text-[#30308A] rounded-full flex items-center justify-center transition-all duration-[.15s]"
                    >
                      <Youtube className="w-5 h-5" />
                    </a>
                  )}
                  {content.tiktok && (
                    <a
                      href={content.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 hover:bg-yellow-400 hover:text-[#30308A] rounded-full flex items-center justify-center transition-all duration-[.15s]"
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminKontakPage;
