import Header from "@/components/Header";

export default function SignInLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
