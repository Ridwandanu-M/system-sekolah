"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ErrorMessage = () => {
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  useEffect(() => {
    const errorParam = searchParams.get("error");

    if (errorParam) {
      switch (errorParam) {
        case "CredentialsSignin":
          setError("Email atau password salah");
          break;
        case "Configuration":
          setError("Terjadi kesalahan konfigurasi");
          break;
        case "AccessDenied":
          setError("Akses ditolak");
          break;
        case "Verification":
          setError("Token verifikasi tidak valid");
          break;
        default:
          setError("Terjadi kesalahan saat masuk");
      }
    }
  }, [searchParams]);

  if (!error) return null;

  return (
    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
      <p className="text-sm">{error}</p>
    </div>
  );
};

export default ErrorMessage;
