import Header from "@/components/Header";
import "../globals.css";
import Footer from "@/components/Footer";

export const metadata = {
  title: "SMP Muhammadiyah 1 Seyegan",
  description: "Sistem sekolah SMP Muhammadiyah 1 Seyegan",
};

export default function HomeLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
