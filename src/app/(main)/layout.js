import Header from "@/component/Header";
import "../globals.css";
import Footer from "@/component/Footer";

export const metadata = {
  title: "School System",
  description: "School system created by Ridwandanu Maulana with Next.js",
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
