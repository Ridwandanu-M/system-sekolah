"use client";

import CloudinaryTest from "@/components/CloudinaryTest";

const CloudinaryTroubleshootPage = () => {
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Cloudinary Upload Troubleshooting
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-yellow-800">
                🔧 Solusi Upload Queue
              </h2>
              <ul className="space-y-3 text-sm text-yellow-700">
                <li className="flex items-start gap-2">
                  <span className="font-bold">1.</span>
                  <span>Periksa koneksi internet Anda</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">2.</span>
                  <span>Pastikan file gambar berukuran kurang dari 10MB</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">3.</span>
                  <span>Gunakan format gambar: JPG, PNG, atau WEBP</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">4.</span>
                  <span>Tunggu beberapa detik antara upload</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold">5.</span>
                  <span>Coba refresh halaman jika masih bermasalah</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-blue-800">
                ℹ️ Informasi Upload
              </h2>
              <div className="space-y-2 text-sm text-blue-700">
                <p>
                  <strong>Upload Preset:</strong> ml_default
                </p>
                <p>
                  <strong>Folder:</strong> system-sekolah/kepala-sekolah
                </p>
                <p>
                  <strong>Max Size:</strong> 10MB
                </p>
                <p>
                  <strong>Format:</strong> JPG, JPEG, PNG, WEBP
                </p>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4 text-green-800">
                💡 Tips
              </h2>
              <ul className="space-y-2 text-sm text-green-700">
                <li>
                  • Gunakan gambar dengan resolusi optimal (1920x1080 atau lebih
                  kecil)
                </li>
                <li>
                  • Compress gambar sebelum upload jika ukuran terlalu besar
                </li>
                <li>• Pastikan nama file tidak mengandung karakter khusus</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Test Upload</h2>
            <CloudinaryTest />
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Jika masalah masih berlanjut, silakan hubungi administrator sistem.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CloudinaryTroubleshootPage;
