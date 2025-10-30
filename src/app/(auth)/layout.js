"use client";

import Header from "@/components/Header";
import { AuthProvider } from "@/hooks/useAuth";

export default function SignInLayout({ children }) {
  return (
    <AuthProvider>
      <Header />
      <main className="min-h-screen bg-gray-50">{children}</main>
    </AuthProvider>
  );
}
