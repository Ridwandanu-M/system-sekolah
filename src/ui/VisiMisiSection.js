import Link from "next/link";

const VisiMisiSection = () => {
  return (
    <section className="relative">
      <div className="max-w-[120rem] mx-auto py-[10.8rem]">
        <div className="flex flex-col w-full items-center gap-[6.4rem] mb-[5.6rem]">
          <div className="border-b-2 pb-[3.2rem] w-full">
            <h2 className="text-center text-[3.2rem] font-[700] text-[var(--primary-color)]">
              Visi
            </h2>
            <p className="text-center text-[1.8rem]">
              <i>
                "Terwujudnya murid yang “Islami, Berintegritas, dan
                Berprestasi."
              </i>
            </p>
          </div>
          <div className="border-b-2 pb-[3.2rem]">
            <h2 className="text-center text-[3.2rem] font-[700] text-[var(--primary-color)]">
              Misi
            </h2>
            <div className="text-[1.8rem] grid grid-cols-3 gap-[1.8rem]">
              <div className="border border-[var(--primary-color)] p-[3.2rem] rounded-4xl shadow-lg">
                <p>Menanamkan nilai-nilai Islam dalam kehidupan sehari-hari.</p>
              </div>
              <div className="border border-[var(--primary-color)] p-[3.2rem] rounded-4xl shadow-lg">
                <p>
                  Mengembangkan potensi akademik dan non-akademik secara
                  seimbang.
                </p>
              </div>
              <div className="border border-[var(--primary-color)] p-[3.2rem] rounded-4xl shadow-lg">
                <p>Membentuk karakter jujur, disiplin, dan tanggung jawab.</p>
              </div>
            </div>
          </div>
          <div className="border-b-2 pb-[3.2rem]">
            <h2 className="text-center text-[3.2rem] font-[700] text-[var(--primary-color)]">
              Tujuan
            </h2>
            <p className="text-center text-[1.8rem]">
              <i>
                "Mewujudkan lulusan yang berakhlak mulia, berwawasan luas,
                menguasai ilmu pengetahuan dan teknologi, serta mampu memberi
                manfaat bagi lingkungan dan masyarakat."
              </i>
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Link
            href="#"
            className="border-2 border-[var(--primary-color)] text-[1.4rem] text-[#fff] font-[700] px-[3.2rem] py-[1.8rem] rounded-full bg-[var(--primary-color)] cursor-pointer hover:bg-[#fff] hover:text-[var(--primary-color)] transition-all duration-[.25s] shadow-lg"
          >
            Visi & Misi Lengkap
          </Link>
        </div>
      </div>
      <div className="absolute top-[18.4rem] left-[8.8rem] h-[10rem] pr-[10rem] bg-[var(--primary-color)] rounded-[50%]"></div>
      <div className="absolute bottom-[18.4rem] right-[8.8rem] h-[10rem] pr-[10rem] bg-[var(--primary-color)] rounded-[50%]"></div>
    </section>
  );
};

export default VisiMisiSection;
