const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // Seed Sambutan Kepala Sekolah
  console.log("📝 Seeding Sambutan Kepala Sekolah...");
  await prisma.sambutanKepalaSekolah.upsert({
    where: { id: 1 },
    update: {},
    create: {
      judul: "Sambutan Kepala Sekolah",
      konten: `Assalamu'alaikum Warahmatullahi Wabarakatuh

Alhamdulillahirabbil 'aalamiin segala puji bagi Allah Tuhan semesta alam. Sholawat dan salam senantiasa tercurah kepada junjungan kita nabi besar Muhammad SAW.

Selamat datang di website SMP Muhammadiyah 1 Seyegan. Website ini hadir sebagai jembatan komunikasi dan sumber informasi yang komprehensif bagi seluruh civitas akademika, orang tua/wali siswa, siswa aktif, alumni, dan masyarakat luas.

Melalui platform digital ini, kami berkomitmen untuk menyajikan berbagai informasi penting mulai dari profil sekolah, sejarah perjalanan, program pembelajaran, hingga kegiatan kesiswaan. Website ini juga memuat informasi lengkap tentang guru dan tenaga kependidikan (GTK), data siswa, administrasi sekolah, serta dokumentasi berbagai kegiatan seperti lomba dan kegiatan keagamaan.

Kami akan terus melakukan perbaikan dan penyempurnaan secara berkala agar website ini semakin menarik, informatif, dan bermanfaat. Harapan kami, platform ini dapat menjadi sarana efektif dalam mendukung kemajuan pendidikan di SMP Muhammadiyah 1 Seyegan.

Semoga Allah SWT senantiasa memberikan kemudahan untuk setiap usaha kita dalam memajukan sekolah yang kita cintai ini. Aamiin Ya Rabbal 'Alamin.

Wassalamu'alaikum Warahmatullahi Wabarakatuh

Rochmadi, S.Sos.I.
Kepala SMP Muhammadiyah 1 Seyegan`,
      gambar: "/images/kepala-sekolah.jpg",
    },
  });

  // Seed Visi Misi
  console.log("🎯 Seeding Visi Misi...");
  await prisma.visiMisi.upsert({
    where: { id: 1 },
    update: {},
    create: {
      visi: `"Terwujudnya Murid yang Islami, Berintegritas, dan Berprestasi"

INDIKATOR VISI:

ISLAMI:
• Aqidah yang lurus dan kuat
• Memahami dan menjalankan ibadah dengan baik
• Akhlak mulia dalam kehidupan sehari-hari
• Mampu membaca, menghafal, dan mengamalkan Al-Qur'an
• Bermanfaat bagi masyarakat
• Berkemajuan dengan menguasai IPTEK dan IMTAQ

BERINTEGRITAS:
• Bertanggung jawab terhadap diri dan lingkungan
• Jujur dalam perkataan dan perbuatan
• Disiplin dalam kehidupan sehari-hari
• Sopan dan santun dalam tutur kata
• Peduli terhadap lingkungan sekitar

BERPRESTASI:
• Berprestasi dalam bidang akademik seperti lomba sains, IPA, matematika, dan lomba keagamaan (MTQ, Olympicad)
• Berprestasi dalam bidang non-akademik seperti olahraga (O2SN, YKTC, POPDA) dan seni budaya`,
      misi: `1. Menanamkan nilai-nilai akidah yang lurus dan kuat dalam kehidupan sehari-hari

2. Melakukan pembelajaran yang menekankan praktek cara beribadah yang baik

3. Membiasakan akhlak yang baik dan menghindari akhlak buruk

4. Membiasakan berbuat baik kepada sesama untuk bermanfaat bagi masyarakat

5. Membekali siswa dengan wawasan berkemajuan, menguasai IPTEK dan IMTAQ yang seimbang

6. Menanamkan nilai tanggung jawab terhadap diri, keluarga, dan lingkungan

7. Menanamkan nilai jujur dalam perkataan dan perbuatan

8. Menanamkan nilai disiplin dalam kehidupan sehari-hari

9. Membiasakan sikap sopan dan santun dalam tutur kata dan perbuatan

10. Membiasakan sikap peduli lingkungan dengan menjaga kebersihan

11. Melatih siswa mengikuti berbagai lomba untuk memotivasi berprestasi`,
    },
  });

  // Seed Sejarah
  console.log("📚 Seeding Sejarah...");
  await prisma.sejarah.upsert({
    where: { id: 1 },
    update: {},
    create: {
      judul: "Sejarah SMP Muhammadiyah 1 Seyegan",
      konten: `1967: SMP Muhammadiyah 1 Seyegan berdiri pada tahun 1967 menempati rumah tokoh masyarakat (Bapak Jono Wikoro) di Dusun Barak, Kalurahan Margoluwih, Kecamatan Seyegan. Dengan Kepala Sekolah Bapak Drs. Soebardi, M.Pd. dibantu oleh Bapak Soeprapto.

1975: Sehubungan rumah/gedung tersebut akan didirikan Sekolah Dasar (SD), maka pada tahun 1975 SMP Muhammadiyah Seyegan pindah di Dusun Gendengan, Kalurahan Margodadi, Kecamatan Seyegan dan juga menempati rumah tokoh masyarakat (Bapak Drs. Ponidi).

1976: Pimpinan Cabang Muhammadiyah Seyegan membangun gedung 3 (tiga) lokal dengan biaya gotong royong bersama Pimpinan Ranting Muhammadiyah se-Seyegan. Gedung tersebut menempati Tanah Sultan Ground, di Dusun Grogol, Kalurahan Margodadi, Kecamatan Seyegan, Kabupaten Sleman.

1977: SMP Muhammadiyah Seyegan pindah menempati gedung baru di Grogol, Margodadi, Seyegan dengan 3 lokal. Karena jumlah rombongan belajar (rombel) pada waktu itu mencapai 6 rombel, maka gedung 3 lokal tersebut disekat gedek/bambu menjadi 7 ruang, yaitu 1 ruang untuk kantor dan 6 ruang untuk kelas.

Di Dusun Cibuk Kidul, Kalurahan Margoluwih, Kecamatan Seyegan, berdiri SMP Muhammadiyah 2 Seyegan yang merupakan pindahan dari pinggiran kota Yogyakarta. Namun tidak berapa lama, SMP Muhammadiyah 2 tersebut mengalami kekurangan siswa. Akhirnya, SMP Muhammadiyah 2 Seyegan dinyatakan ditutup dan siswanya digabung dengan SMP Muhammadiyah 1 Seyegan.

Demikianlah sejarah singkat berdirinya SMP Muhammadiyah 1 Seyegan, sekolah calon pemimpin yang terus berkembang hingga saat ini.`,
    },
  });

  // Seed Filosofi
  console.log("💭 Seeding Filosofi...");
  await prisma.filosofi.upsert({
    where: { id: 1 },
    update: {},
    create: {
      judul: "Filosofi Pendidikan",
      konten: `Mendidik manusia berakhlak mulia, cerdas, dan berkemajuan dengan mengintegrasikan ajaran Islam, nilai-nilai kemanusiaan, ilmu pengetahuan, serta teknologi untuk membentuk kader Muhammadiyah dan agen perubahan bagi masyarakat.

Filosofi pendidikan di SMP Muhammadiyah 1 Seyegan bertujuan melahirkan individu yang taat pada tauhid, menguasai sains dan seni, serta aktif melakukan amar ma'ruf nahi munkar.

Melalui pendekatan holistik, sekolah berupaya mengembangkan potensi siswa dalam aspek spiritual, intelektual, emosional, dan sosial. Setiap siswa didorong untuk menjadi pribadi yang tidak hanya unggul secara akademik, tetapi juga memiliki karakter yang kuat berdasarkan nilai-nilai Islam.

Filosofi ini menekankan pentingnya keseimbangan antara kehidupan dunia dan akhirat, dimana siswa diharapkan mampu menjadi khalifah di bumi yang bertanggung jawab terhadap dirinya, keluarga, masyarakat, dan lingkungan.

Dengan landasan filosofi yang kuat, SMP Muhammadiyah 1 Seyegan berkomitmen menghasilkan generasi yang siap menghadapi tantangan zaman dengan tetap berpegang teguh pada nilai-nilai keislaman dan kemuhammadiyahan.`,
    },
  });

  // Seed Struktur Organisasi
  console.log("🏢 Seeding Struktur Organisasi...");
  const strukturData = [
    {
      id: 1,
      jabatan: "Kepala Sekolah",
      nama: "Rochmadi, S.Sos.I.",
      level: 1,
    },
    {
      id: 2,
      jabatan: "Wakil Kepala Sekolah Kurikulum",
      nama: "Drs. Ahmad Subandi, M.Pd.",
      level: 2,
    },
    {
      id: 3,
      jabatan: "Wakil Kepala Sekolah Kesiswaan",
      nama: "Sri Wahyuni, S.Pd.",
      level: 2,
    },
    {
      id: 4,
      jabatan: "Wakil Kepala Sekolah Sarana Prasarana",
      nama: "Bambang Sutrisno, S.Pd.",
      level: 2,
    },
    {
      id: 5,
      jabatan: "Kepala Tata Usaha",
      nama: "Siti Nurjanah, S.Pd.",
      level: 2,
    },
    {
      id: 6,
      jabatan: "Koordinator Guru Kelas VII",
      nama: "Eny Purwanti, S.Pd.",
      level: 3,
    },
    {
      id: 7,
      jabatan: "Koordinator Guru Kelas VIII",
      nama: "Mulyadi, S.Pd.",
      level: 3,
    },
    {
      id: 8,
      jabatan: "Koordinator Guru Kelas IX",
      nama: "Retno Wulandari, S.Pd.",
      level: 3,
    },
  ];

  await prisma.strukturOrganisasi.upsert({
    where: { id: 1 },
    update: {},
    create: {
      judul: "Struktur Organisasi SMP Muhammadiyah 1 Seyegan",
      deskripsi:
        "Struktur organisasi SMP Muhammadiyah 1 Seyegan menunjukkan hierarki kepemimpinan dan pembagian tugas yang jelas dalam mengelola kegiatan pendidikan dan administrasi sekolah.",
      struktur: strukturData,
    },
  });

  // Seed Fasilitas
  console.log("🏫 Seeding Fasilitas...");
  const fasilitasData = [
    {
      nama: "Ruang Kelas",
      deskripsi:
        "15 ruang kelas yang dilengkapi dengan AC, LCD projector, dan sound system untuk mendukung proses pembelajaran yang efektif.",
      gambar: "/images/fasilitas/ruang-kelas.jpg",
    },
    {
      nama: "Laboratorium IPA",
      deskripsi:
        "Laboratorium IPA lengkap dengan peralatan praktikum untuk mata pelajaran Fisika, Kimia, dan Biologi.",
      gambar: "/images/fasilitas/lab-ipa.jpg",
    },
    {
      nama: "Laboratorium Komputer",
      deskripsi:
        "Laboratorium komputer dengan 30 unit komputer terbaru dan akses internet untuk mendukung pembelajaran TIK.",
      gambar: "/images/fasilitas/lab-komputer.jpg",
    },
    {
      nama: "Perpustakaan",
      deskripsi:
        "Perpustakaan dengan koleksi buku yang lengkap, ruang baca yang nyaman, dan sistem digital untuk pencarian buku.",
      gambar: "/images/fasilitas/perpustakaan.jpg",
    },
    {
      nama: "Masjid",
      deskripsi:
        "Masjid sekolah untuk kegiatan ibadah harian, sholat berjamaah, dan kegiatan keagamaan lainnya.",
      gambar: "/images/fasilitas/masjid.jpg",
    },
    {
      nama: "Lapangan Olahraga",
      deskripsi:
        "Lapangan serbaguna untuk kegiatan olahraga seperti futsal, basket, voli, dan upacara bendera.",
      gambar: "/images/fasilitas/lapangan.jpg",
    },
    {
      nama: "Kantin Sekolah",
      deskripsi:
        "Kantin yang menyediakan makanan dan minuman sehat dengan harga terjangkau untuk siswa dan guru.",
      gambar: "/images/fasilitas/kantin.jpg",
    },
    {
      nama: "Ruang UKS",
      deskripsi:
        "Unit Kesehatan Sekolah dengan peralatan P3K lengkap untuk menangani masalah kesehatan siswa dan guru.",
      gambar: "/images/fasilitas/uks.jpg",
    },
    {
      nama: "Ruang Guru",
      deskripsi:
        "Ruang guru yang nyaman dengan fasilitas AC dan area diskusi untuk koordinasi pembelajaran.",
      gambar: "/images/fasilitas/ruang-guru.jpg",
    },
    {
      nama: "Ruang Tata Usaha",
      deskripsi:
        "Ruang administrasi sekolah dengan sistem komputerisasi untuk pelayanan administrasi siswa dan guru.",
      gambar: "/images/fasilitas/tata-usaha.jpg",
    },
  ];

  for (const fasilitas of fasilitasData) {
    await prisma.fasilitas.create({
      data: fasilitas,
    });
  }

  // Seed User Admin Default
  console.log("👤 Seeding Default Admin User...");
  const bcrypt = require("bcryptjs");
  const hashedPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.upsert({
    where: { email: "admin@smpmuh1seyegan.sch.id" },
    update: {},
    create: {
      name: "Administrator",
      email: "admin@smpmuh1seyegan.sch.id",
      password: hashedPassword,
      role: "SUPER_ADMIN",
      aktif: true,
    },
  });

  // Seed Kontak Sekolah
  console.log("📞 Seeding Kontak Sekolah...");
  await prisma.kontak.upsert({
    where: { id: 1 },
    update: {},
    create: {
      alamat:
        "Jl. Wates Km. 15, Grogol, Margodadi, Seyegan, Sleman, D.I. Yogyakarta 55561",
      telepon: "(0274) 868394",
      email: "smpmuh1seyegan@gmail.com",
      website: "https://smpmuh1seyegan.sch.id",
      facebook: "https://facebook.com/smpmuh1seyegan",
      instagram: "@smpmuh1seyegan",
      jamBuka: "Senin - Jumat: 07.00 - 15.00 WIB, Sabtu: 07.00 - 11.00 WIB",
    },
  });

  console.log("✅ Database seeding completed successfully!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Error during seeding:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
