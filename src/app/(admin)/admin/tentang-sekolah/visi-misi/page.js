"use client";

import { useState } from "react";
import { Save, Edit, Eye, EyeOff } from "lucide-react";

const AdminVisiMisiPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [content, setContent] = useState({
    title: "Visi, Misi & Tujuan",
    visi: {
      statement:
        "Terwujudnya Murid yang Islami, Berintegritas, dan Berprestasi",
      indikator: {
        islami:
          "Aqidah yang lurus dan kuat, memahami dan menjalankan ibadah dengan baik, akhlak mulia dalam kehidupan sehari-hari, mampu membaca, menghafal, dan mengamalkan Al-Qur'an, bermanfaat bagi masyarakat, berkemajuan dengan menguasai IPTEK dan IMTAQ.",
        berintegritas:
          "Bertanggung jawab terhadap diri dan lingkungan, jujur dalam perkataan dan perbuatan, disiplin dalam kehidupan sehari-hari, sopan dan santun dalam tutur kata, peduli terhadap lingkungan sekitar.",
        berprestasi:
          "Berprestasi dalam bidang akademik seperti lomba sains, IPA, matematika, dan lomba keagamaan (MTQ, Olympicad). Serta berprestasi dalam bidang non-akademik seperti olahraga (O2SN, YKTC, POPDA) dan seni budaya.",
      },
    },
    misi: [
      "Menanamkan nilai-nilai akidah yang lurus dan kuat dalam kehidupan sehari-hari.",
      "Melakukan pembelajaran yang menekankan praktek cara beribadah yang baik.",
      "Membiasakan akhlak yang baik dan menghindari akhlak buruk.",
      "Membiasakan berbuat baik kepada sesama untuk bermanfaat bagi masyarakat.",
      "Membekali siswa dengan wawasan berkemajuan, menguasai IPTEK dan IMTAQ yang seimbang.",
      "Menanamkan nilai tanggung jawab terhadap diri, keluarga, dan lingkungan.",
      "Menanamkan nilai jujur dalam perkataan dan perbuatan.",
      "Menanamkan nilai disiplin dalam kehidupan sehari-hari.",
      "Membiasakan sikap sopan dan santun dalam tutur kata dan perbuatan.",
      "Membiasakan sikap peduli lingkungan dengan menjaga kebersihan.",
      "Melatih siswa mengikuti berbagai lomba untuk memotivasi berprestasi.",
    ],
    tujuan: [
      "Sejalan dengan tujuan pendidikan menengah dalam Sistem Pendidikan Nasional yaitu meletakkan dasar kecerdasan, pengetahuan, kepribadian, akhlak mulia, serta keterampilan untuk hidup mandiri dan mengikuti pendidikan lebih lanjut, pendidikan di SMP Muhammadiyah 1 Seyegan diarahkan untuk:",
      "Meningkatkan pencapaian nilai rata-rata Ujian Sekolah 80 dan nilai rata-rata ASPD 50. Membentuk lulusan yang memiliki aqidah lurus, berakhlak mulia, dan mampu mengamalkan Al-Qur'an. Membentuk lulusan berkarakter tanggung jawab, jujur, disiplin, dan sopan.",
      "Menyusun Kurikulum Operasional SMP Muhammadiyah 1 Seyegan dan menyusun administrasi pembelajaran. Melaksanakan pembelajaran yang baik, menyenangkan, dan bermutu. Mengembangkan strategi pembelajaran diferensiasi dengan pendekatan saintifik dan PAIKEM, didukung Media Interaktif Kreatif Inovatif dan Rekreatif (MIKIR) dengan Kurikulum Merdeka.",
      "Mengupayakan 100% guru dan karyawan memiliki SK GTP dan mengupayakan 90% guru memiliki NUPTK. Memiliki sarana pembelajaran lengkap: LCD proyektor di tiap kelas, papan tulis, dan meja belajar yang memadai. Lingkungan sekolah bersih dan nyaman.",
      "Melaksanakan administrasi keuangan dengan tertib (transparan dan akuntabel) menggunakan aplikasi ARKAS dan SIP Lah. Meningkatkan kesejahteraan guru dan karyawan. Mengembangkan penilaian Literasi Numerasi dengan konsep belajar tuntas (mastery learning) dan pemanfaatan TIK.",
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
    alert("Data berhasil disimpan!");
  };

  const handleMisiChange = (index, value) => {
    const newMisi = [...editContent.misi];
    newMisi[index] = value;
    setEditContent({
      ...editContent,
      misi: newMisi,
    });
  };

  const addMisi = () => {
    setEditContent({
      ...editContent,
      misi: [...editContent.misi, ""],
    });
  };

  const removeMisi = (index) => {
    const newMisi = editContent.misi.filter((_, i) => i !== index);
    setEditContent({
      ...editContent,
      misi: newMisi,
    });
  };

  const handleTujuanChange = (index, value) => {
    const newTujuan = [...editContent.tujuan];
    newTujuan[index] = value;
    setEditContent({
      ...editContent,
      tujuan: newTujuan,
    });
  };

  const addTujuan = () => {
    setEditContent({
      ...editContent,
      tujuan: [...editContent.tujuan, ""],
    });
  };

  const removeTujuan = (index) => {
    const newTujuan = editContent.tujuan.filter((_, i) => i !== index);
    setEditContent({
      ...editContent,
      tujuan: newTujuan,
    });
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
        <div className="bg-white rounded-lg shadow-lg p-6 max-h-screen overflow-y-auto">
          <h2 className="text-[2rem] font-semibold text-gray-800 mb-6">
            {isEditing ? "Edit Konten" : "Konten Saat Ini"}
          </h2>

          {/* Visi Section */}
          <div className="mb-8">
            <h3 className="text-[1.8rem] font-medium text-gray-700 mb-4">
              Visi
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  Pernyataan Visi
                </label>
                <textarea
                  value={
                    isEditing
                      ? editContent.visi.statement
                      : content.visi.statement
                  }
                  onChange={(e) =>
                    setEditContent({
                      ...editContent,
                      visi: {
                        ...editContent.visi,
                        statement: e.target.value,
                      },
                    })
                  }
                  disabled={!isEditing}
                  rows={3}
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  Indikator Islami
                </label>
                <textarea
                  value={
                    isEditing
                      ? editContent.visi.indikator.islami
                      : content.visi.indikator.islami
                  }
                  onChange={(e) =>
                    setEditContent({
                      ...editContent,
                      visi: {
                        ...editContent.visi,
                        indikator: {
                          ...editContent.visi.indikator,
                          islami: e.target.value,
                        },
                      },
                    })
                  }
                  disabled={!isEditing}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  Indikator Berintegritas
                </label>
                <textarea
                  value={
                    isEditing
                      ? editContent.visi.indikator.berintegritas
                      : content.visi.indikator.berintegritas
                  }
                  onChange={(e) =>
                    setEditContent({
                      ...editContent,
                      visi: {
                        ...editContent.visi,
                        indikator: {
                          ...editContent.visi.indikator,
                          berintegritas: e.target.value,
                        },
                      },
                    })
                  }
                  disabled={!isEditing}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-[1.4rem] font-medium text-gray-600 mb-2">
                  Indikator Berprestasi
                </label>
                <textarea
                  value={
                    isEditing
                      ? editContent.visi.indikator.berprestasi
                      : content.visi.indikator.berprestasi
                  }
                  onChange={(e) =>
                    setEditContent({
                      ...editContent,
                      visi: {
                        ...editContent.visi,
                        indikator: {
                          ...editContent.visi.indikator,
                          berprestasi: e.target.value,
                        },
                      },
                    })
                  }
                  disabled={!isEditing}
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
                />
              </div>
            </div>
          </div>

          {/* Misi Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[1.8rem] font-medium text-gray-700">Misi</h3>
              {isEditing && (
                <button
                  onClick={addMisi}
                  className="bg-green-500 text-white px-3 py-1 rounded text-[1.2rem] hover:bg-green-600 transition-colors"
                >
                  + Tambah Misi
                </button>
              )}
            </div>
            <div className="space-y-4">
              {(isEditing ? editContent.misi : content.misi).map(
                (misi, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between items-start mb-2">
                      <label className="block text-[1.4rem] font-medium text-gray-600">
                        Misi {index + 1}
                      </label>
                      {isEditing && editContent.misi.length > 1 && (
                        <button
                          onClick={() => removeMisi(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-[1.2rem] hover:bg-red-600 transition-colors"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                    <textarea
                      value={misi}
                      onChange={(e) => handleMisiChange(index, e.target.value)}
                      disabled={!isEditing}
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
                    />
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Tujuan Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[1.8rem] font-medium text-gray-700">
                Tujuan
              </h3>
              {isEditing && (
                <button
                  onClick={addTujuan}
                  className="bg-green-500 text-white px-3 py-1 rounded text-[1.2rem] hover:bg-green-600 transition-colors"
                >
                  + Tambah Tujuan
                </button>
              )}
            </div>
            <div className="space-y-4">
              {(isEditing ? editContent.tujuan : content.tujuan).map(
                (tujuan, index) => (
                  <div key={index} className="relative">
                    <div className="flex justify-between items-start mb-2">
                      <label className="block text-[1.4rem] font-medium text-gray-600">
                        Tujuan {index + 1}
                      </label>
                      {isEditing && editContent.tujuan.length > 1 && (
                        <button
                          onClick={() => removeTujuan(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded text-[1.2rem] hover:bg-red-600 transition-colors"
                        >
                          Hapus
                        </button>
                      )}
                    </div>
                    <textarea
                      value={tujuan}
                      onChange={(e) =>
                        handleTujuanChange(index, e.target.value)
                      }
                      disabled={!isEditing}
                      rows={4}
                      className="w-full p-3 border border-gray-300 rounded-lg text-[1.4rem] disabled:bg-gray-100"
                    />
                  </div>
                ),
              )}
            </div>
          </div>
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
                <p className="text-[1.8rem] font-semibold text-gray-700 text-center leading-relaxed mb-8">
                  &quot;{content.visi.statement}&quot;
                </p>
                <div className="space-y-6 text-[1.6rem] leading-relaxed text-gray-700">
                  <div>
                    <h3 className="text-[1.8rem] font-bold text-[var(--primary-color)] mb-3">
                      Islami
                    </h3>
                    <p>{content.visi.indikator.islami}</p>
                  </div>
                  <div>
                    <h3 className="text-[1.8rem] font-bold text-[var(--primary-color)] mb-3">
                      Berintegritas
                    </h3>
                    <p>{content.visi.indikator.berintegritas}</p>
                  </div>
                  <div>
                    <h3 className="text-[1.8rem] font-bold text-[var(--primary-color)] mb-3">
                      Berprestasi
                    </h3>
                    <p>{content.visi.indikator.berprestasi}</p>
                  </div>
                </div>
              </div>

              {/* Misi */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-[2.4rem] font-bold text-[var(--primary-color)] mb-6">
                  Misi
                </h2>
                <div className="space-y-4 text-[1.6rem] leading-relaxed text-gray-700">
                  {content.misi.map((misi, index) => (
                    <p key={index}>{misi}</p>
                  ))}
                </div>
              </div>

              {/* Tujuan */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-[2.4rem] font-bold text-[var(--primary-color)] mb-6">
                  Tujuan
                </h2>
                <div className="space-y-6 text-[1.6rem] leading-relaxed text-gray-700">
                  {content.tujuan.map((tujuan, index) => (
                    <p key={index}>{tujuan}</p>
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

export default AdminVisiMisiPage;
