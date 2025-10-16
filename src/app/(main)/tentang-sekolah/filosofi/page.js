const FilosofiPage = () => {
  return (
    <section className="pt-[7.4rem]">
      <div className="py-[9.6rem]">
        <div className="max-w-[120rem] mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-[3rem] md:text-[3.6rem] lg:text-[4.2rem] font-bold text-[var(--primary-color)] mb-4">
              Filosofi
            </h1>
            <div className="w-[6rem] h-[0.4rem] bg-yellow-400 mx-auto rounded-full"></div>
          </div>

          {/* Content Section */}
          <div className="max-w-5xl mx-auto">
            {/* Main Philosophy Statement */}
            <article className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-[var(--primary-color)] mb-12">
              <div className="bg-gray-50 rounded-r-xl p-6 md:p-8 mb-8 shadow-sm">
                <p className="text-[1.8rem] md:text-[2rem] text-[#000]/75 leading-relaxed font-[600] text-center">
                  Mendidik manusia berakhlak mulia, cerdas, dan berkemajuan
                  dengan mengintegrasikan ajaran Islam, nilai-nilai kemanusiaan,
                  ilmu pengetahuan, serta teknologi untuk membentuk kader
                  Muhammadiyah dan agen perubahan bagi masyarakat.
                </p>
              </div>

              {/* Tujuan Filosofi */}
              <div className="mb-8">
                <h2 className="text-[2.4rem] font-bold text-[var(--primary-color)] mb-6 text-center">
                  Tujuan Filosofis
                </h2>
                <div className="bg-gray-50 rounded-xl p-[2.4rem] shadow-sm">
                  <p className="text-[1.6rem] text-gray-700 leading-relaxed text-center">
                    Melahirkan individu yang taat pada tauhid, menguasai sains
                    dan seni, serta aktif melakukan{" "}
                    <span className="font-semibold italic">
                      amar ma'ruf nahi munkar
                    </span>
                    .
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FilosofiPage;
