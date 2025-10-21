import Header from "@/component/Header";

export default function SignInLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
