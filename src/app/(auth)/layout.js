import Header from "@/components/Header";

export const metadata = {
  title: "Admin Account",
  description: "School system created by Ridwandanu Maulana with Next.js",
};

export default function SignInLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
