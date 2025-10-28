"use client";

import { useState } from "react";
import { Save, Edit, Eye, EyeOff } from "lucide-react";

const AdminSambutanPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [content, setContent] = useState({
    title: "Sambutan Kepala Sekolah",
    kepalaSekolah: {
      nama: "Rochmadi, S.Sos.I.",
      motto: "Islami, Berintegritas, Berprestasi",
      foto: "/Kepala_Sekolah_Seyegan.png",
    },
    paragraphs: [
      "Alhamdulillahirabbil 'aalamiin segala puji bagi Allah Tuhan semesta alam. Sholawat dan salam senantiasa tercurah kepada junjungan kita nabi besar Muhammad SAW.",
      "Selamat datang di website SMP Muhammadiyah 1 Seyegan. Website ini hadir sebagai jembatan komunikasi dan sumber informasi yang komprehensif bagi seluruh civitas akademika, orang tua/wali siswa, siswa aktif, alumni, dan masyarakat luas.",
      "Melalui platform digital ini, kami berkomitmen untuk menyajikan berbagai informasi penting mulai dari profil sekolah, sejarah perjalanan, program pembelajaran, hingga kegiatan kesiswaan. Website ini juga memuat informasi lengkap tentang guru dan tenaga kependidikan (GTK), data siswa, administrasi sekolah, serta dokumentasi berbagai kegiatan seperti lomba dan kegiatan keagamaan.",
      "Kami akan terus melakukan perbaikan dan penyempurnaan secara berkala agar website ini semakin menarik, informatif, dan bermanfaat. Harapan kami, platform ini dapat menjadi sarana efektif dalam mendukung kemajuan pendidikan di SMP Muhammadiyah 1 Seyegan.",
      "Semoga Allah SWT senantiasa memberikan kemudahan untuk setiap usaha kita dalam memajukan sekolah yang kita cintai ini. Aamiin Ya Rabbal 'Alamin.",
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

  const handleParagraphChange = (index, value) => {
    const newParagraphs = [...editContent.paragraphs];
    newParagraphs[index] = value;
    setEditContent({
      ...editContent,
      paragraphs: newParagraphs,
    });
  };

  const addParagraph = () => {
    setEditContent({
      ...editContent,
      paragraphs: [...editContent.paragraphs, ""],
    });
  };

  const removeParagraph = (index) => {
    const newParagraphs = editContent.paragraphs.filter((_, i) => i !== index);
    setEditContent({
      ...editContent,
      paragraphs: newParagraphs,
    });
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
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-[2rem] font-semibold text-gray-800 mb-6">
            {isEditing ? "Edit Konten" : "Konten Saat Ini"}
          </h2>

          {/* Kepala Sekolah Info */}
          <div className="mb-6">
            <h3 className="text-[1.6rem] font-medium text-gray-700 mb-4">
              Informasi Kepala Sekolah
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  Nama Kepala Sekolah
                </label>
                <input
                  type="text"
                  value={
                    isEditing
                      ? editContent.kepalaSekolah.nama
                      : content.kepalaSekolah.nama
                  }
                  onChange={(e) =>
                    setEditContent({
                      ...editContent,
                      kepalaSekolah: {
                        ...editContent.kepalaSekolah,
                        nama: e.target.value,
                      },
                    })
                  }
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  Motto
                </label>
                <input
                  type="text"
                  value={
                    isEditing
                      ? editContent.kepalaSekolah.motto
                      : content.kepalaSekolah.motto
                  }
                  onChange={(e) =>
                    setEditContent({
                      ...editContent,
                      kepalaSekolah: {
                        ...editContent.kepalaSekolah,
                        motto: e.target.value,
                      },
                    })
                  }
                  disabled={!isEditing}
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Paragraphs */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[1.6rem] font-medium text-gray-700">
                Isi Sambutan
              </h3>
              {isEditing && (
                <button
                  onClick={addParagraph}
                  className="bg-green-500 text-white px-3 py-1 rounded text-[1.2rem] hover:bg-green-600 transition-colors"
                >
                  + Tambah Paragraf
                </button>
              )}
            </div>
            <div className="space-y-4">
              {(isEditing ? editContent.paragraphs : content.paragraphs).map(
                (paragraph, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between items-start mb-2">
                      <label className="block text-[1.4rem] font-medium text-gray-600">
                        Paragraf {index + 1}
                      </label>
                      {isEditing && editContent.paragraphs.length > 1 && (
                        <button
                          onClick={() => removeParagraph(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-[1.2rem] hover:bg-red-600 transition-colors"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                    <textarea
                      value={paragraph}
                      onChange={(e) =>
                        handleParagraphChange(index, e.target.value)
                      }
                      disabled={!isEditing}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100 resize-vertical"
                      placeholder="Masukkan isi paragraf..."
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-[2rem] font-semibold text-gray-800 mb-6">
              Preview Halaman
            </h2>
            <div className="border rounded-lg p-6 bg-gray-50">
              <h1 className="text-[2.4rem] font-bold text-[var(--primary-color)] mb-8 text-center">
                {content.title}
              </h1>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="space-y-6 text-[1.6rem] leading-relaxed text-gray-700">
                      {content.paragraphs.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="bg-[var(--primary-color)] p-6 text-white text-center">
                    <h3 className="text-[2rem] font-bold">Kepala Sekolah</h3>
                    <p className="text-[1.2rem] opacity-90 mt-1">
                      SMP Muhammadiyah 1 Seyegan
                    </p>
                  </div>
                  <div className="p-6">
                    <div className="relative w-full h-[20rem] rounded-lg overflow-hidden mb-4 bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Foto Kepala Sekolah</span>
                    </div>
                    <div className="text-center">
                      <p className="text-[1.6rem] font-bold text-gray-800 mb-2">
                        {content.kepalaSekolah.nama}
                      </p>
                      <p className="text-[1.2rem] text-gray-600 italic">
                        &quot;{content.kepalaSekolah.motto}&quot;
                      </p>
                    </div>
                  </div>
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
