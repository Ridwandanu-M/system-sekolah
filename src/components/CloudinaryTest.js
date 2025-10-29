"use client";

import { CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

const CloudinaryTest = () => {
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleUpload = (result) => {
    console.log("Full upload result:", result);

    if (result.event === "success") {
      setUploadStatus("✅ Upload berhasil!");
      setUploadedImage(result.info.secure_url);
    } else if (result.event === "queued") {
      setUploadStatus("⏳ Upload dalam antrian...");
    } else if (result.event === "abort") {
      setUploadStatus("❌ Upload dibatalkan");
    } else {
      setUploadStatus(`📄 Event: ${result.event}`);
    }
  };

  const handleError = (error) => {
    console.error("Upload error:", error);
    setUploadStatus(`❌ Error: ${error.message || "Unknown error"}`);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-md mx-auto">
      <h3 className="text-xl font-bold mb-4">Test Cloudinary Upload</h3>

      <div className="space-y-4">
        <CldUploadWidget
          uploadPreset="ml_default"
          onSuccess={handleUpload}
          onError={handleError}
          options={{
            folder: "test",
            resourceType: "image",
            clientAllowedFormats: ["jpg", "jpeg", "png"],
            maxFileSize: 5000000, // 5MB
            maxFiles: 1,
            multiple: false,
            showPoweredBy: false,
            sources: ["local"],
          }}
        >
          {({ open }) => (
            <button
              onClick={() => {
                setUploadStatus("Preparing upload...");
                open();
              }}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Test Upload
            </button>
          )}
        </CldUploadWidget>

        {uploadStatus && (
          <div className="p-3 bg-gray-100 rounded text-sm">
            <strong>Status:</strong> {uploadStatus}
          </div>
        )}

        {uploadedImage && (
          <div className="text-center">
            <img
              src={uploadedImage}
              alt="Uploaded test"
              className="w-32 h-32 object-cover rounded mx-auto"
            />
            <p className="text-xs text-gray-500 mt-2 break-all">
              {uploadedImage}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CloudinaryTest;
