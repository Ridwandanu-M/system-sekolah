import "../globals.css";

export const metadata = {
  title: "School System",
  description: "School system created by Ridwandanu Maulana with Next.js",
};

export default function HomeLayout({ children }) {
  return (
    <section>
      <main>{children}</main>
    </section>
  );
}
