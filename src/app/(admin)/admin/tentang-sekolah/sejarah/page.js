"use client";

import { useState } from "react";
import { Save, Edit, Eye, EyeOff } from "lucide-react";

const AdminSejarahPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [content, setContent] = useState({
    title: "Sejarah",
    paragraphs: [
      "1967: SMP Muhammadiyah 1 Seyegan berdiri pada tahun 1967 menempati rumah tokoh masyarakat (Bapak Jono Wikoro) di Dusun Barak, Kalurahan Margoluwih, Kecamatan Seyegan. Dengan Kepala Sekolah Bapak Drs. Soebardi, M.Pd. dibantu oleh Bapak Soeprapto.",
      "1975: Sehubungan rumah/gedung tersebut akan didirikan Sekolah Dasar (SD), maka pada tahun 1975 SMP Muhammadiyah Seyegan pindah di Dusun Gendengan, Kalurahan Margodadi, Kecamatan Seyegan dan juga menempati rumah tokoh masyarakat (Bapak Drs. Ponidi).",
      "1976: Pimpinan Cabang Muhammadiyah Seyegan membangun gedung 3 (tiga) lokal dengan biaya gotong royong bersama Pimpinan Ranting Muhammadiyah se-Seyegan. Gedung tersebut menempati Tanah Sultan Ground, di Dusun Grogol, Kalurahan Margodadi, Kecamatan Seyegan, Kabupaten Sleman.",
      "1977: SMP Muhammadiyah Seyegan pindah menempati gedung baru di Grogol, Margodadi, Seyegan dengan 3 lokal. Karena jumlah rombongan belajar (rombel) pada waktu itu mencapai 6 rombel, maka gedung 3 lokal tersebut disekat gedek/bambu menjadi 7 ruang, yaitu 1 ruang untuk kantor dan 6 ruang untuk kelas.",
      "Di Dusun Cibuk Kidul, Kalurahan Margoluwih, Kecamatan Seyegan, berdiri SMP Muhammadiyah 2 Seyegan yang merupakan pindahan dari pinggiran kota Yogyakarta. Namun tidak berapa lama, SMP Muhammadiyah 2 tersebut mengalami kekurangan siswa. Akhirnya, SMP Muhammadiyah 2 Seyegan dinyatakan ditutup dan siswanya digabung dengan SMP Muhammadiyah 1 Seyegan.",
      "Demikianlah sejarah singkat berdirinya SMP Muhammadiyah 1 Seyegan, sekolah calon pemimpin yang terus berkembang hingga saat ini."
    ]
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
      paragraphs: newParagraphs
    });
  };

  const addParagraph = () => {
    setEditContent({
      ...editContent,
      paragraphs: [...editContent.paragraphs, ""]
    });
  };

  const removeParagraph = (index) => {
    const newParagraphs = editContent.paragraphs.filter((_, i) => i !== index);
    setEditContent({
      ...editContent,
      paragraphs: newParagraphs
    });
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[2.8rem] font-bold text-[var(--primary-color)]">
          Kelola Sejarah Sekolah
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

      <div className={`grid ${showPreview ? "grid-cols-2" : "grid-cols-1"} gap-8`}>
        {/* Edit Form */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-[2rem] font-semibold text-gray-800 mb-6">
            {isEditing ? "Edit Konten" : "Konten Saat Ini"}
          </h2>

          {/* Title */}
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
                  title: e.target.value
                })
              }
              disabled={!isEditing}
              className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
            />
          </div>

          {/* Paragraphs */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[1.6rem] font-medium text-gray-700">
                Isi Sejarah
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
              {(isEditing ? editContent.paragraphs : content.paragraphs).map((paragraph, index) => (
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
                    onChange={(e) => handleParagraphChange(index, e.target.value)}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100 resize-vertical"
                    placeholder="Masukkan isi paragraf sejarah..."
                  />
                </div>
              ))}
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

              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="space-y-6 text-[1.6rem] leading-relaxed text-gray-700">
                  {content.paragraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
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

export default AdminSejarahPage;
